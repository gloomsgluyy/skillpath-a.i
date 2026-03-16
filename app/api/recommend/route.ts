import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { pendidikan, jurusan, minat, archetype, roleInterests } = await req.json();

    if (!minat) {
      return NextResponse.json({ error: 'Data tidak lengkap.' }, { status: 400 });
    }

    const prompt = `Sebagai konsultan karir AI elit untuk dunia Teknologi dan Digital, analisislah profil berikut:
- Pendidikan: ${pendidikan || 'Belum diisi'}
- Arketipe Kerja: ${archetype || 'Belum diisi'}
- Role yang Diminati: ${roleInterests?.join(', ') || 'Belum diisi'}
- Bidang/Jurusan: ${jurusan || 'Belum diisi'}
- Minat & Hobi: ${minat}

Tugas Anda:
1. Rekomendasikan 1 karir digital utama yang paling cocok dari yang diminati (misal: "Full-Stack Developer", "UX Designer", "AI Engineer").
2. Berikan skor kecocokan (0-100).
3. Berikan alasan singkat kenapa cocok (max 2 kalimat, Bahasa Indonesia, nada motivatif).
4. List 3 skill teknis utama yang harus dipelajari.

Format output WAJIB JSON:
{
  "careerTitle": "Nama Karir",
  "matchScore": number,
  "reason": "Alasan kenapa cocok dalam Bahasa Indonesia",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
HANYA kembalikan JSON murni, jangan ada teks lain di luar JSON.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'Anda adalah SkillPath AI, asisten pemandu karir teknologi yang memberikan feedback dalam format JSON murni.' },
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

  } catch (error: any) {
    console.error('Error generating recommendation:', error);
    return NextResponse.json({ error: 'Gagal memproses rekomendasi AI.', details: error.message }, { status: 500 });
  }
}
