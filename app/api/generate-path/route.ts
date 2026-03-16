import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { career, profile } = await req.json();

    if (!career) {
      return NextResponse.json({ error: 'Career title is required.' }, { status: 400 });
    }

    const prompt = `
You are an expert tech educator building a Neural Roadmap for someone who wants to become a ${career}.
The user has this background:
- Education: ${profile?.pendidikan || 'Unknown'}
- Learning Style/Archetype: ${profile?.archetype || 'Unknown'}

Create a highly detailed, chronological learning path.
Respond ONLY in valid JSON format matching this EXACT structure:
{
  "careerTitle": "${career}",
  "estimatedMonths": "Total estimated months (e.g., '6 Bulan')",
  "nodes": [
    {
      "id": "node_1",
      "title": "Topic title (e.g., Basic Linux)",
      "description": "Short explanation of what will be learned",
      "estimatedHours": 20,
      "prerequisites": [] // empty array for first nodes
    },
    {
      "id": "node_2",
      "title": "Next Topic (e.g., Bash Scripting)",
      "description": "Short explanation",
      "estimatedHours": 15,
      "prerequisites": ["node_1"] // ID of the required previous node
    }
  ]
}
Generate at least 8 to 12 sequential nodes covering fundamentals to advanced topics for ${career}.
Write content in fluent Indonesian.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an AI generating structured JSON neural roadmaps in Indonesian.' },
        { role: 'user', content: prompt }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.6,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const parsedData = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Error generating path:', error);
    return NextResponse.json({ error: 'Failed to generate path', details: error.message }, { status: 500 });
  }
}
