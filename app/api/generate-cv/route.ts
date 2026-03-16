import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

export async function POST(req: Request) {
  try {
    const { profile, radarStats, projects } = await req.json();

    const prompt = `
You are a Professional Career Assistant generating a tailored CV for a job application.
Candidate Name: ${profile?.displayName || 'Unknown'}
Education: ${profile?.pendidikan || 'Unknown'}
Target Role: ${profile?.primaryField || profile?.archetype || 'Tech Professional'}

Skill Radar Stats (0-100):
${JSON.stringify(radarStats, null, 2)}

Completed Projects:
${JSON.stringify(projects, null, 2)}

Generate a highly professional ATS-friendly resume layout in markdown format as a JSON string field.
Make the tone professional, confident, and action-oriented. Indonesian language.
Respond ONLY in JSON:
{
  "markdown": "# Header\n\n## Experience\n...",
  "recommendedRole": "Specific role based on stats (e.g. Junior Cloud Engineer)"
}
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: 'Output strict JSON only.' }, { role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      response_format: { type: 'json_object' },
    });

    return NextResponse.json(JSON.parse(completion.choices[0]?.message?.content || '{}'));
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
