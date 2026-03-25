import { NextResponse } from 'next/server';
import { z } from 'zod';
import Groq from 'groq-sdk';

const evaluateSchema = z.object({
  projectTitle: z.string().min(1, 'Judul proyek wajib diisi'),
  submissionLink: z.string().url('Tautan tidak valid, harus berupa URL (http/https)'),
  difficulty: z.string().optional(),
  career: z.string().optional(),
});

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = evaluateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validasi data gagal.', details: validation.error.format() }, { status: 400 });
    }

    const { projectTitle, submissionLink, difficulty, career } = validation.data;

    const prompt = `You are a Senior Tech Mentor evaluating a student's portfolio/project link.
Project Title: ${projectTitle}
Target Career/Role: ${career || 'Technology Professional'}
Submitted Resource Link: ${submissionLink}
Stated Skills Used: ${difficulty} (Note: user inputs skills here)

EVALUATION RULES:
1. If the link is GitHub/Code: Evaluate tech stack, architecture, and coding logic.
2. If the link is Figma/Design: Evaluate UX/UI principles, visual hierarchy, and user-centric design.
3. If the link is Google Drive/Docs/PDF (e.g. Data Analysis or Marketing plan): Evaluate methodology, insights, and structure.
4. Always provide constructive, encouraging mentor feedback tailored to their Target Career.

Respond ONLY in valid JSON:
{
  "score": 85, // integer 0-100 based on the quality inferred
  "feedback": "2 paragraphs of constructive mentor feedback in Indonesian. Praise strengths and suggest 1 area for improvement.",
  "earnedSkills": ["skill1", "skill2"] // 2-3 specific skills demonstrated
}
Do NOT use any emojis in your response.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: 'Output JSON only. No emojis.' }, { role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.6,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    return NextResponse.json(JSON.parse(completion.choices[0]?.message?.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
