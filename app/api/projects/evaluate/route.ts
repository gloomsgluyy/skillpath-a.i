import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Initialize Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { projectId, userId, githubUrl, demoUrl } = await req.json();

    // 1. (Simulated) Fetch Data from GitHub API
    // We simulate fetching the repository README for evaluation context.
    // In a real application, you would make an authenticated fetch to github api.
    const simulatedGithubReadme = `Tugas Proyek Node.js API ${projectId}. Dibuat dengan Express, menangani data secara asinkron menggunakan routing dan best practices. Semua endpoint berjalan baik.`;

    // 2. Evaluasi menggunakan Groq AI (Llama 3 / Mixtral)
    const systemPrompt = `
      Kamu adalah Senior Developer yang mengevaluasi portofolio junior.
      Tugasmu adalah menganalisis kode/deskripsi proyek dan memberikan penilaian yang objektif.
      
      ATURAN MUTLAK: Kamu WAJIB merespons HANYA dalam format JSON murni tanpa markdown \`\`\`json.
      Struktur JSON:
      {
        "score": number (0-100),
        "message": "string (pesan feedback yang membangun dan detail. Beritahu bagian mana yang bagus dan apa yang kurang dalam bahasa Indonesia)",
        "passed": boolean (true jika skor >= 80)
      }
    `;

    const userPrompt = `
      Proyek ID: ${projectId}. 
      Syarat kelulusan: Sesuai dengan jenis proyek, struktur rapi, best practices, dan memenuhi checklist awal.
      Berikut adalah deskripsi repo dari murid berdasarkan URL repositori ${githubUrl} ${demoUrl ? `dan live demo ${demoUrl}` : ''}: 
      "${simulatedGithubReadme}"
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "llama-3.3-70b-versatile", // Powerful model supporting robust JSON
      temperature: 0.2, // Low temp for analytical evaluation and stable JSON mapping
      response_format: { type: "json_object" }, // Native Groq JSON extraction
    });

    const aiResponseText = chatCompletion.choices[0]?.message?.content || "{}";
    const evaluation = JSON.parse(aiResponseText);

    // We do NOT save DB updates here in backend. 
    // State architecture persists offline first in client side (via firestore.ts local caching).

    // 4. Send response to frontend to allow gamification UI update
    return NextResponse.json(evaluation);

  } catch (error) {
    console.error("Evaluation Error:", error);
    return NextResponse.json(
      { error: "Gagal mengevaluasi proyek. Sistem AI sedang sibuk." }, 
      { status: 500 }
    );
  }
}
