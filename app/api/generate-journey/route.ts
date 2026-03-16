import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

export async function POST(req: Request) {
  try {
    const { topic, durationDays = 7 } = await req.json();

    const prompt = `
Create a ${durationDays}-day Learning Journey task checklist for the specific topic: "${topic}".
Break it down into actionable daily tasks.
Respond ONLY in valid JSON format matching this EXACT structure:
{
  "topic": "${topic}",
  "tasks": [
    {
      "id": "task_1",
      "day": 1,
      "title": "Task title (actionable, e.g., Tonton video intro konsep X)",
      "estimatedMinutes": 30
    },
    {
      "id": "task_2",
      "day": 2,
      "title": "Another task",
      "estimatedMinutes": 45
    }
  ],
  "weeklyMilestone": "Reward title for finishing this week (m.g., 'Sertifikat Dasar-Dasar X')"
}
Provide exactly ${durationDays} tasks (one per day). Write in Indonesian.
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: 'Output strict JSON in Indonesian.' }, { role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    return NextResponse.json(JSON.parse(completion.choices[0]?.message?.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
