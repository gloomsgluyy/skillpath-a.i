import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  // Groq dipindah ke DALAM function agar tidak dieksekusi saat build
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "dummy_key_hanya_untuk_build123",
  });

  try {
    const { career, profile, question } = await req.json();

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
4. CRITICAL: Detect if user wants to CHANGE career, BUILD a new roadmap, or REGENERATE/REBUILD/UPDATE the roadmap.
   - Examples that MUST trigger shouldRegenerate=true:
     "buatkan roadmap", "ubah roadmap", "ganti ke frontend", "tolong ubah", "buat ulang",
     "saya ingin menjadi X", "ubah ke X", "ganti karir", "buat road map baru",
     "regenerate", "rebuild", "update roadmap"
   - If user wants to KEEP the same career but rebuild, set newCareer to "${career}"
   - If user mentions a DIFFERENT career, set newCareer to that career name

Respond ONLY in this JSON:
{
  "answer": "plain text response in Indonesian",
  "shouldRegenerate": true or false,
  "newCareer": "career name or empty string"
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
      return NextResponse.json(JSON.parse(chatCompletion.choices[0]?.message?.content || '{}'));
    }

    // Roadmap generation mode
    const prompt = `
You are an expert tech educator building a Neural Roadmap for someone who wants to become a ${career}.
The user has this background:
- Education: ${profile?.pendidikan || 'Unknown'}
- Learning Style/Archetype: ${profile?.archetype || 'Unknown'}

Create a highly detailed, chronological learning path.
Respond ONLY in valid JSON format:
{
  "careerTitle": "${career}",
  "estimatedMonths": "Total estimated months",
  "nodes": [
    {
      "id": "node_1",
      "title": "Topic title",
      "description": "Short explanation",
      "estimatedHours": 20,
      "prerequisites": []
    }
  ]
}
}
Generate 6 to 8 sequential nodes. Write in Indonesian.
Do NOT use any emojis in your response.
`;

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