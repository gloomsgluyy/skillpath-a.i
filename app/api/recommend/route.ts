import { NextResponse } from 'next/server';
import { z } from 'zod';
import { CAREERS, computeMatchScore } from '@/lib/careers-database';

const recommendSchema = z.object({
  pendidikan: z.string().optional(),
  jurusan: z.string().optional(),
  minat: z.string().min(1, 'Minat wajib diisi'),
  archetype: z.string().optional(),
  roleInterests: z.array(z.string()).optional(),
});

type RecommendProfile = z.infer<typeof recommendSchema>;

function buildFallbackRecommendations(profile: RecommendProfile) {
  return CAREERS
    .map((career) => ({
      careerTitle: career.title,
      matchScore: computeMatchScore(career, profile),
      reason: `Cocok dengan minat ${profile.roleInterests?.join(', ') || profile.minat} dan latar ${profile.jurusan || profile.pendidikan || 'profil'} yang kamu isi.`,
      skills: career.skills.slice(0, 3),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

export async function POST(req: Request) {
  let fallbackProfile: RecommendProfile | null = null;

  try {
    const body = await req.json();
    const validation = recommendSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Validasi data gagal.', details: validation.error.format() }, { status: 400 });
    }

    const { pendidikan, jurusan, minat, archetype, roleInterests } = validation.data;
    fallbackProfile = validation.data;

    const prompt = `Sebagai konsultan karir AI elit, analisislah profil berikut:
- Pendidikan: ${pendidikan || 'Belum diisi'}
- Bidang/Jurusan: ${jurusan || 'Belum diisi'}
- Arketipe Kerja: ${archetype || 'Belum diisi'}
- Role yang SECARA EKSPLISIT Diminati Pengguna: ${roleInterests?.join(', ') || 'Belum diisi'}
- Minat & Hobi: ${minat}

INSTRUKSI KETAT:
1. Rekomendasikan 3 pilihan karir. PRIORITASKAN karir yang SANGAT RELEVAN dengan "Role yang Diminati" atau "Arketipe" (misal: Jika minat AI/ML, JANGAN merekomendasikan Desain/UI/UX kecuali dia punya background desain kuat).
2. Berikan skor kecocokan yang LOGIS dan KRITIS:
   - 88-99%: Sangat sesuai dengan Role yang Diminati & Jurusan
   - 70-87%: Sesuai secara fungsi atau skill transferabel
   - JANGAN MENGARANG SKOR TINGGI (>90%) untuk karir lintas bidang yang tidak nyambung (misal MLOps ke UX/UI).
3. Berikan alasan singkat namun berbobot kenapa karir tersebut cocok (max 2 kalimat, Bahasa Indonesia).
4. List 3 skill teknis utama (hard skills spesifik seperti PyTorch, Figma, AWS) yang relevan.

Format output WAJIB JSON:
{
  "recommendations": [
    {
      "careerTitle": "Nama Karir 1",
      "matchScore": number,
      "reason": "Alasan singkat kenapa cocok...",
      "skills": ["Skill A", "Skill B", "Skill C"]
    },
  ]
}
HANYA kembalikan JSON murni, jangan ada teks lain. DILARANG KERAS MENGGUNAKAN EMOJI.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'Anda adalah SkillPath AI, asisten pemandu karir teknologi yang memberikan feedback dalam format JSON murni tanpa emoji sama sekali.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error response:", errorText);
      throw new Error(`Groq API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const result = JSON.parse(content);
    
    return NextResponse.json(result);

  } catch (error: unknown) {
    console.error('Error generating recommendation:', error);
    if (fallbackProfile) {
      return NextResponse.json({
        recommendations: buildFallbackRecommendations(fallbackProfile),
        source: 'local-fallback',
      });
    }
    const details = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Gagal memproses rekomendasi AI.', details }, { status: 500 });
  }
}
