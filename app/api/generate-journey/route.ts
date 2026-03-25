import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic = body.career || body.topic;
    const durationDays = body.durationDays || 7;

    const prompt = `
Create a ${durationDays}-day Starter Learning Journey checklist for the topic: "${topic}".
Break it down into actionable daily tasks.
Respond ONLY in valid JSON format matching this EXACT structure:
{
  "topic": "${topic}",
  "tasks": [
    {
      "id": "task_1",
      "day": 1,
      "title": "Task title (actionable, e.g., Pelajari konsep dasar X)",
      "estimatedMinutes": 30,
      "resources": [
        {"title": "Judul Kursus/Video (Misal: FreeCodeCamp Tutorial YouTube)", "url": "https://...", "type": "video"},
        {"title": "Dokumentasi Resmi / Artikel", "url": "https://...", "type": "artikel"}
      ]
    }
  ],
  "weeklyMilestone": "Reward title for finishing this week (m.g., 'Sertifikat Dasar-Dasar X')"
}
CRITICAL RULES:
1. Provide exactly ${durationDays} tasks (one per day). 
2. Write in Indonesian.
3. Every single task MUST have EXACTLY 5 high-quality learning "resources" in the array. Prioritize real search URLs or popular platform links (YouTube, Medium, W3Schools) to avoid broken links.
4. Do NOT use any emojis in your response.
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: 'Output strict JSON in Indonesian. No emojis.' }, { role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    return NextResponse.json(JSON.parse(completion.choices[0]?.message?.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
