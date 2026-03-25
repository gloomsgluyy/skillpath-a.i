import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export const dynamic = 'force-dynamic';

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
      // Chat mode
      const chatPrompt = `
You are an expert AI Career Consultant guiding the user on their path to becoming a ${career}.
The user asks: "${question}"
Answer directly, concisely, and encouragingly in Indonesian.
Do NOT use any emojis in your response. Use Markdown for formatting (e.g. bold, lists).
Respond in valid JSON format:
{ "answer": "your response here" }
`;
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'system', content: 'You are an AI consultant. Output strict JSON. No emojis.' }, { role: 'user', content: chatPrompt }],
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
Generate 6 to 8 sequential nodes. Write in Indonesian.
Do NOT use any emojis in your response.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an AI generating structured JSON neural roadmaps in Indonesian. No emojis.' },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    const parsedData = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Error generating path:', error);
    return NextResponse.json({ error: 'Failed to generate path', details: error.message }, { status: 500 });
  }
}