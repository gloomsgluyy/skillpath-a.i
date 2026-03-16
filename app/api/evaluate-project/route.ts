import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

export async function POST(req: Request) {
  try {
    const { projectTitle, submissionLink, difficulty } = await req.json();

    const prompt = `
You are a Senior Tech Mentor evaluating a student's project submission.
Project Title: ${projectTitle}
Difficulty: ${difficulty}
Submitted Resource: ${submissionLink}

Provide constructive, encouraging mentor feedback.
Respond ONLY in valid JSON:
{
  "score": 85, // integer 0-100
  "feedback": "2 paragraphs of constructive mentor feedback in Indonesian. Praise strengths and suggest 1 area for improvement.",
  "earnedSkills": ["skill1", "skill2"] // 2-3 specific technical skills demonstrated
}
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: 'Output JSON only.' }, { role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.6,
      response_format: { type: 'json_object' },
    });

    return NextResponse.json(JSON.parse(completion.choices[0]?.message?.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
