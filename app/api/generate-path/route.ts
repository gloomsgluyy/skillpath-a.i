import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const NEURAL_SYSTEM_PROMPT = `Role: Kamu adalah Senior Learning Architect & UI Specialist untuk SkillPath AI. Tugasmu adalah mengubah minat pengguna menjadi struktur data "Neural Roadmap" yang teknis dan terorganisir.

Constraint Utama:
- Hanya berikan output dalam format JSON murni. Jangan ada basa-basi, salam, atau penjelasan.
- Gunakan terminologi industri nyata.
- PENTING DAN WAJIB: Tiap node (materi) HARUS memiliki ARRAY "learning_resources" yang berisi TEPAT 5 OBJECT resource nyata (URL HTTPS) berupa link YouTube, freeCodeCamp, dokumentasi resmi, kursus Udemy, atau artikel Medium. JANGAN kosongkan array ini dengan alasan apapun!
- Semua status node WAJIB diatur ke "locked", KECUALI node pertama yang harus "active". Jalur akan terus terbuka saat target sebelumnya selesai.
- MAKSIMUM KETAT: Dilarang menggunakan semua jenis emoji unicode di manapun.

Struktur JSON yang Wajib Diikuti:
{
  "roadmap_title": "string",
  "career_goal": "string",
  "estimatedMonths": "string",
  "nodes": [
    {
      "id": "string (unique slug seperti node_html_basics)",
      "label": "string (judul materi)",
      "description": "string (max 100 karakter, tulis dalam Bahasa Indonesia)",
      "duration": "string (misal: '2 Minggu')",
      "difficulty": "Pemula | Menengah | Ahli",
      "status": "completed | active | locked",
      "coordinates": { "x": number, "y": number },
      "icon_type": "code | design | cloud | database | search",
      "connections": ["id_node_tujuan"],
      "learning_resources": [
        {"title": "Nama Video/Artikel", "url": "https://...", "type": "video | artikel | kursus"}
      ]
    }
  ]
}

Style Logic untuk coordinates:
- Sumbu X: tersebar antara 150 dan 700 piksel
- Sumbu Y: mulai dari 100 dan bertambah sekitar 120-160 piksel per level
- Buat alur yang menyebar secara ASIMETRIS (bukan garis lurus kaku) untuk mendukung estetika "Neural Network"
- Beberapa node bisa sejajar (fork/parallel paths) di level Y yang sama
- Pastikan connections menciptakan alur yang logis dari atas ke bawah`;

export async function POST(req: Request) {
  try {
    const { career, profile, question, history = [] } = await req.json();

    if (!career) {
      return NextResponse.json({ error: 'Career title is required.' }, { status: 400 });
    }

    if (question) {
      // Chat mode — detect if user wants to change/rebuild their roadmap
      const chatPrompt = `
You are an expert AI Career Consultant. The user's current roadmap is for: "${career}".
The user says: "${question}"

IMPORTANT RULES:
1. Your "answer" field MUST be a plain text string in Indonesian. Use Markdown formatting (bold, lists, etc.).
2. NEVER put JSON objects, arrays, or code structures inside the "answer" field. Only human-readable text.
3. Do NOT use any emojis.
4. CRITICAL RULES ON LINKS: If the user asks for links, tutorials, videos, or learning materials, you MUST provide at least 3 REAL, VALID LINKS (URL starting with https://). Use markdown format: [Title](https://link).
5. CRITICAL: Identify carefully if the user wants to keep chatting OR generate a whole new roadmap.
6. PENTING: Jika user meminta materi, modul, video, atau tanya link (misal "minta link", "kasih materi", "mana linknya"), JANGAN trigger regenerate (shouldRegenerate: false)! Jawab sebagai mentor dan berikan minimal 3 link HTTPS YouTube / Artikel nyata dalam bentuk markdown list!
7. KAPAN HARUS REGENERATE (shouldRegenerate: true)? HANYA saat user meminta mengubah PILIHAN KARIR mereka secara keseluruhan (Misal: "Saya ingin ganti fokus jadi Backend", "Buatkan roadmap baru untuk Data Engineer"). Jangan restart roadmap jika mereka hanya mengeluh atau tanya materi.
8. STRICT RELEVANCE: Jika pertanyaan user SAMA SEKALI diluar konteks karir, teknologi, roadmap pembelajaran, atau skill pengembangan diri (contoh: "apa itu reboisasi", "resep masakan", "siapa presiden indonesia"), tolak dengan ramah dan jelaskan bahwa kamu adalah konsultan karir AI.

Respond ONLY in this JSON:
{
  "answer": "plain text response in Indonesian",
  "shouldRegenerate": true or false,
  "newCareer": "career name or empty string"
}
`;
      const formattedHistory = history.map((msg: any) => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content
      })).slice(-6); // Only keep last 6 messages to avoid token bloat

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a career consultant AI. You MUST output valid JSON with "answer" as a plain Indonesian text string (never nested JSON). Provide real URLs if requested. Also detect if user wants to change career. No emojis.' },
          ...formattedHistory,
          { role: 'user', content: chatPrompt }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });
      const chatResult = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
      // Ensure answer is always a string
      const answer = typeof chatResult.answer === 'string' ? chatResult.answer : JSON.stringify(chatResult.answer || 'Maaf, saya tidak bisa memproses permintaan ini.');
      
      // Client-side fallback: detect regeneration keywords if AI missed them
      const lowerQ = question.toLowerCase();
      const aiSaysRegen = chatResult.shouldRegenerate === true;
      
      // Strict exact matching to avoid false positives like "tolong ubah link"
      const strictRegenRegex = /^(ganti karir|buatkan roadmap baru|saya ingin pindah karir menjadi|ubah target karir saya)/;
      const keywordMatch = strictRegenRegex.test(lowerQ);
      const shouldRegenerate = aiSaysRegen || keywordMatch;
      
      // Extract career from newCareer or fallback to current
      let newCareer = typeof chatResult.newCareer === 'string' && chatResult.newCareer.trim() ? chatResult.newCareer.trim() : '';
      if (shouldRegenerate && !newCareer) {
        newCareer = career; // rebuild same career if no new one specified
      }

      return NextResponse.json({
        answer,
        shouldRegenerate,
        newCareer,
      });
    }

    // Roadmap generation mode — Neural Roadmap format
    const prompt = `Buatkan Neural Roadmap untuk seseorang yang ingin menjadi ${career}.

Latar belakang pengguna:
- Pendidikan: ${profile?.pendidikan || 'Tidak diketahui'}
- Gaya Belajar: ${profile?.archetype || 'Tidak diketahui'}

Buat 6 sampai 8 node yang terstruktur dengan coordinates yang asimetris seperti neural network.
Tulis dalam Bahasa Indonesia. Jangan gunakan emoji.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: NEURAL_SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const rawContent = chatCompletion.choices[0]?.message?.content || '{}';
    let parsedData: any = {};
    
    try {
      // Attempt 1: Standard parse
      parsedData = JSON.parse(rawContent);
    } catch (e) {
      // Attempt 2: Extract JSON from markdown or arbitrary text
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedData = JSON.parse(jsonMatch[0]);
        } catch (e2) {
          console.error("Failed to extract JSON from raw content", rawContent);
          throw new Error("Invalid roadmap JSON format from AI.");
        }
      } else {
        throw new Error("No JSON structure found in AI response.");
      }
    }

    if (!parsedData.nodes || !Array.isArray(parsedData.nodes) || parsedData.nodes.length === 0) {
       console.warn("AI returned empty nodes", parsedData);
       throw new Error("AI gagal menyusun materi. Silakan coba lagi.");
    }

    // Transform AI output to match expected frontend format
    const transformedNodes = (parsedData.nodes || []).map((n: any, i: number) => ({
      id: n.id || `node-${i}`,
      title: n.label || n.title || `Step ${i + 1}`,
      description: n.description || '',
      estimatedHours: parseInt(n.duration) || 10,
      duration: n.duration || '2 Minggu',
      difficulty: n.difficulty || 'Menengah',
      icon_type: n.icon_type || 'code',
      prerequisites: [],
      status: i === 0 ? 'active' : 'locked',
      coordinates: n.coordinates || { x: 300 + (i % 3) * 180, y: 100 + Math.floor(i / 2) * 150 },
      connections: n.connections || (i < (parsedData.nodes?.length || 0) - 1 ? [(parsedData.nodes[i + 1]?.id || `node-${i + 1}`)] : []),
      learning_resources: n.learning_resources || [],
      // Legacy compat
      x: n.coordinates?.x || 300 + (i % 3) * 180,
      y: n.coordinates?.y || 100 + Math.floor(i / 2) * 150,
    }));

    return NextResponse.json({
      careerTitle: parsedData.career_goal || parsedData.roadmap_title || career,
      estimatedMonths: parsedData.estimatedMonths || '6',
      nodes: transformedNodes,
    });
  } catch (error: any) {
    console.error('Error generating path:', error);
    return NextResponse.json({ error: 'Failed to generate path', details: error.message }, { status: 500 });
  }
}
