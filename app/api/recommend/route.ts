import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { pendidikan, jurusan, minat, archetype, roleInterests } = await req.json();

    if (!minat) {
      return NextResponse.json({ error: 'Data tidak lengkap.' }, { status: 400 });
    }

    const prompt = `Sebagai konsultan karir AI elit untuk dunia Teknologi dan Digital, analisislah profil berikut:
- Pendidikan: ${pendidikan || 'Belum diisi'}
- Bidang/Jurusan: ${jurusan || 'Belum diisi'}
- Arketipe Kerja: ${archetype || 'Belum diisi'}
- Role yang SECARA EKSPLISIT Diminati Pengguna: ${roleInterests?.join(', ') || 'Belum diisi'}
- Minat & Hobi: ${minat}

1. Anda WAJIB merekomendasikan 3 pilihan karir yang berbeda namun relevan dengan profil pengguna. Prioritaskan setidaknya 1-2 karir dari daftar "Role yang Diminati" jika ada.
2. Setiap rekomendasi harus berbeda fokusnya (misal: satu lebih teknis, satu lebih manajerial/kreatif, satu spesialis).
3. Pertimbangkan jurusan/pendidikan pengguna secara mendalam.
4. Berikan skor kecocokan (70-100) yang realistis untuk setiap opsi.
5. Berikan alasan singkat kenapa karir tersebut cocok (max 2 kalimat, Bahasa Indonesia, nada motivatif).
6. List 3 skill teknis utama yang harus dipelajari khusus untuk karir tersebut.

Format output WAJIB JSON:
{
  "recommendations": [
    {
      "careerTitle": "Nama Karir 1",
      "matchScore": number,
      "reason": "Alasan singkat kenapa cocok...",
      "skills": ["Skill A", "Skill B", "Skill C"]
    },
    // tambahkan 2 rekomendasi lagi dengan format persis sama
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

  } catch (error: any) {
    console.error('Error generating recommendation:', error);
    return NextResponse.json({ error: 'Gagal memproses rekomendasi AI.', details: error.message }, { status: 500 });
  }
}
