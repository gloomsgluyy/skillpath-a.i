import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { DISCOVER_QUESTIONS } from '@/lib/questions';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { answers, profile } = body;

    if (!answers || answers.length !== 25) {
      return NextResponse.json(
        { error: 'Invalid answers. Expected 25 answers.' },
        { status: 400 }
      );
    }

    const mappedAnswers = DISCOVER_QUESTIONS.map((q, index) => ({
      category: q.category,
      question: q.text,
      score: answers[index], // 1 to 5 scale
    }));

    const categoryScores = mappedAnswers.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.score;
      return acc;
    }, {} as Record<string, number>);

    const prompt = `
You are an expert Career Counselor AI for "SkillPath AI" an advanced career navigation platform for Indonesian students.
The user has completed a 25-question assessment. The score is 1 (Strongly Agree) to 5 (Strongly Disagree).

User Profile Data:
- Education: ${profile?.pendidikan || 'Unknown'}
- Preferred Work Archetype: ${profile?.archetype || 'Unknown'}
- Initial Interests: ${profile?.roleInterests?.join(', ') || 'Unknown'}

User Assessment Answers Breakdown:
Infrastructure Score (Lower is better/more passion): ${categoryScores.infrastructure}
Software Dev Score (Lower is better): ${categoryScores.software}
Data Score (Lower is better): ${categoryScores.data}
Creative Score (Lower is better): ${categoryScores.creative}
Leadership Score (Lower is better): ${categoryScores.leadership}

Raw Answers:
${JSON.stringify(mappedAnswers, null, 2)}

Analyze this data and provide a highly accurate, personalized career recommendation.
Respond ONLY in valid JSON format matching this EXACT structure:
{
  "primaryField": "The top recommended technology field (e.g., Cloud Infrastructure, Full-Stack Development, UI/UX Design)",
  "secondaryField": "The second best field",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "matchedCareers": ["Career 1", "Career 2", "Career 3"],
  "personalityTraits": ["Trait 1", "Trait 2", "Trait 3"],
  "detailedAnalysis": "A 2-3 paragraph encouraging and insightful analysis of why these fields fit the user based on their specific answers. Write in fluent, modern Indonesian."
}
Do NOT use any emojis in your response.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an advanced career AI. You communicate in Indonesian and ONLY return valid JSON. No emojis.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    const content = chatCompletion.choices[0]?.message?.content || '{}';
    const parsedData = JSON.parse(content);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Error in assessment API:', error);
    return NextResponse.json(
      { error: 'Gagal menganalisis data assessment', details: error.message },
      { status: 500 }
    );
  }
}
