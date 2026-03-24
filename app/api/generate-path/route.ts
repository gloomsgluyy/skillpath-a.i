import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const NEURAL_SYSTEM_PROMPT = `Role: Kamu adalah Senior Learning Architect & UI Specialist untuk SkillPath AI. Tugasmu adalah mengubah minat pengguna menjadi struktur data "Neural Roadmap" yang teknis dan terorganisir.

Constraint Utama:
- Hanya berikan output dalam format JSON murni. Jangan ada basa-basi, salam, atau penjelasan di luar blok JSON.
- Gunakan terminologi industri nyata (misal: "State Management", "CI/CD Pipeline", "Semantic HTML").
- Tentukan status node berdasarkan progres logis: completed (hanya untuk 1-2 materi dasar awal), active (materi yang harus dikerjakan sekarang), dan locked (materi tingkat lanjut).
- Jangan gunakan emoji apapun.

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
      "connections": ["id_node_tujuan"]
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
    const { career, profile, question } = await req.json();

    if (!career) {
      return NextResponse.json({ error: 'Career title is required.' }, { status: 400 });
    }

    if (question) {
      // Chat mode — detect if user wants to change their roadmap/career
      const chatPrompt = `
You are an expert AI Career Consultant. The user's current roadmap is for: "${career}".
The user says: "${question}"

IMPORTANT RULES:
1. Your "answer" field MUST be a plain text string in Indonesian. Use Markdown formatting (bold, lists, etc.).
2. NEVER put JSON objects, arrays, or code inside the "answer" field.
3. Do NOT use any emojis.
4. If the user is asking to CHANGE their career path or REGENERATE a new roadmap for a different career, set "shouldRegenerate" to true and "newCareer" to the career they want. Otherwise set "shouldRegenerate" to false.

Respond ONLY in this exact JSON format:
{
  "answer": "Your helpful plain-text response here in Indonesian",
  "shouldRegenerate": false,
  "newCareer": ""
}
`;
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a career consultant AI. You MUST output valid JSON with "answer" as a plain Indonesian text string (never nested JSON). Also detect if user wants to change career. No emojis.' },
          { role: 'user', content: chatPrompt }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        response_format: { type: 'json_object' },
      });
      const chatResult = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
      // Ensure answer is always a string
      const answer = typeof chatResult.answer === 'string' ? chatResult.answer : JSON.stringify(chatResult.answer || 'Maaf, saya tidak bisa memproses permintaan ini.');
      return NextResponse.json({
        answer,
        shouldRegenerate: chatResult.shouldRegenerate === true,
        newCareer: typeof chatResult.newCareer === 'string' ? chatResult.newCareer : '',
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
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const parsedData = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');

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
      status: n.status || (i === 0 ? 'active' : 'locked'),
      coordinates: n.coordinates || { x: 300 + (i % 3) * 180, y: 100 + Math.floor(i / 2) * 150 },
      connections: n.connections || (i < (parsedData.nodes?.length || 0) - 1 ? [(parsedData.nodes[i + 1]?.id || `node-${i + 1}`)] : []),
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
