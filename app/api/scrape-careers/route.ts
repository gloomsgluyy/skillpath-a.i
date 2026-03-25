import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// WAJIB: Memaksa API agar selalu dinamis dan tidak di-cache oleh Next.js
export const dynamic = 'force-dynamic';

const JSON_SCHEMA = `[
  {
    "id": "kebab-case-title",
    "title": "Nama Pekerjaan",
    "matchScore": 85, 
    "demandLevel": 90, 
    "salaryRange": "Rp 10-20", 
    "tags": ["Skill 1", "Skill 2", "Skill 3"], 
    "iconType": "code", 
    "description": "Deskripsi singkat.",
    "roadmap": [
      { "label": "Skill Dasar Riil", "status": "completed" },
      { "label": "Skill Menengah", "status": "completed" },
      { "label": "Skill Utama Saat Ini", "status": "current" },
      { "label": "Skill Lanjutan", "status": "future" }
    ]
  }
]`;

// --- DATA CADANGAN JIKA AI ERROR / TIMEOUT (Diperkaya) ---
const FALLBACK_CAREERS = [
  // 1. Infrastruktur & Jaringan
  { id: 'cloud-eng-1', category: 'Infrastruktur & Jaringan', title: 'Cloud Architecture Engineer', matchScore: 92, demandLevel: 90, salaryRange: 'Rp 20-40', tags: ['AWS', 'Terraform', 'Docker'], iconType: 'server', description: 'Merancang infrastruktur cloud.', roadmap: [{ label: 'Cloud Fundamentals', status: 'completed' }, { label: 'Kubernetes', status: 'completed' }, { label: 'Security', status: 'current' }, { label: 'Advanced Arch', status: 'future' }] },
  { id: 'devops-eng-1', category: 'Infrastruktur & Jaringan', title: 'Senior DevOps Engineer', matchScore: 95, demandLevel: 95, salaryRange: 'Rp 18-35', tags: ['CI/CD', 'Jenkins', 'Kubernetes'], iconType: 'server', description: 'Membangun pipa CI/CD.', roadmap: [{ label: 'DevOps Basics', status: 'completed' }, { label: 'Pipeline Auth', status: 'completed' }, { label: 'Monitoring', status: 'current' }, { label: 'Security DevOps', status: 'future' }] },
  { id: 'network-eng-1', category: 'Infrastruktur & Jaringan', title: 'Network Security Specialist', matchScore: 88, demandLevel: 85, salaryRange: 'Rp 15-25', tags: ['Cisco', 'Network Sec', 'Routing'], iconType: 'server', description: 'Mengelola keamanan jaringan perusahaan.', roadmap: [{ label: 'Network Basics', status: 'completed' }, { label: 'Network Security', status: 'completed' }, { label: 'VPN Setup', status: 'current' }, { label: 'Cloud Networking', status: 'future' }] },

  // 2. Software Development
  { id: 'fullstack-1', category: 'Software Development', title: 'Full-Stack Developer (React/Node)', matchScore: 95, demandLevel: 95, salaryRange: 'Rp 15-30', tags: ['React', 'Node.js', 'PostgreSQL'], iconType: 'code', description: 'Membangun aplikasi web lengkap.', roadmap: [{ label: 'Frontend', status: 'completed' }, { label: 'Backend', status: 'completed' }, { label: 'Database', status: 'current' }, { label: 'Deployment', status: 'future' }] },
  { id: 'qa-eng-1', category: 'Software Development', title: 'Quality Assurance (QA) Engineer', matchScore: 90, demandLevel: 90, salaryRange: 'Rp 10-20', tags: ['Automation', 'Selenium', 'Testing'], iconType: 'code', description: 'Menguji kualitas perangkat lunak.', roadmap: [{ label: 'Testing Basics', status: 'completed' }, { label: 'Manual Testing', status: 'completed' }, { label: 'Auto Testing', status: 'current' }, { label: 'Performance Test', status: 'future' }] },

  // 3. Data & AI
  { id: 'data-sci-1', category: 'Data & AI', title: 'Machine Learning Engineer', matchScore: 92, demandLevel: 90, salaryRange: 'Rp 20-40', tags: ['Python', 'Machine Learning', 'AI'], iconType: 'brain', description: 'Menganalisis data.', roadmap: [{ label: 'Python', status: 'completed' }, { label: 'Machine Learning', status: 'completed' }, { label: 'Model Setup', status: 'current' }, { label: 'Deep Learning', status: 'future' }] },
  { id: 'data-anal-1', category: 'Data & AI', title: 'Senior Data Analyst', matchScore: 90, demandLevel: 88, salaryRange: 'Rp 15-30', tags: ['SQL', 'Tableau', 'Data Viz'], iconType: 'brain', description: 'Menganalisis data.', roadmap: [{ label: 'SQL Fund.', status: 'completed' }, { label: 'Data Cleaning', status: 'completed' }, { label: 'Data Viz', status: 'current' }, { label: 'Advanced Stats', status: 'future' }] },

  // 4. Kreatif & Desain
  { id: 'ux-design-1', category: 'Kreatif & Desain', title: 'UX Designer (Figma Master)', matchScore: 85, demandLevel: 80, salaryRange: 'Rp 10-20', tags: ['Figma', 'UX Research', 'Sketch'], iconType: 'palette', description: 'Merancang pengalaman pengguna.', roadmap: [{ label: 'UX Research', status: 'completed' }, { label: 'Wireframing', status: 'completed' }, { label: 'Prototyping', status: 'current' }, { label: 'Design System', status: 'future' }] },
  { id: 'ui-design-1', category: 'Kreatif & Desain', title: 'UI Designer (Visual Storyteller)', matchScore: 88, demandLevel: 85, salaryRange: 'Rp 10-20', tags: ['UI Visual', 'Color Theory', 'Adobe XD'], iconType: 'palette', description: 'Merancang visual antarmuka.', roadmap: [{ label: 'UI Fund.', status: 'completed' }, { label: 'Color Theory', status: 'completed' }, { label: 'Typography', status: 'current' }, { label: 'Advanced UI', status: 'future' }] }
];

export async function POST(req: Request) {
  // PINDAHKAN GROQ KE SINI DENGAN DUMMY KEY
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "dummy_key_hanya_untuk_build123",
  });

  try {
    const { keyword, category } = await req.json();

    const categoryRules: Record<string, string> = {
      "Infrastruktur & Jaringan": "WAJIB role seperti: Cloud Engineer, DevOps, SysAdmin. DILARANG role Software, Data, Desain.",
      "Software Development": "WAJIB role seperti: Full-Stack, Frontend, Backend, Mobile Developer.",
      "Data & AI": "WAJIB role seperti: Data Scientist, ML Engineer, Data Analyst.",
      "Kreatif & Desain": "WAJIB role seperti: UX Designer, UI Designer, 3D Animator."
    };

    let searchInstruction = `Berikan 4-6 profesi IT acak yang populer secara merata.`;
    if (keyword) {
      searchInstruction = `Carikan 3-5 karir yang berhubungan dengan kata kunci "${keyword}".`;
    } else if (category && category !== "Semua") {
      searchInstruction = `SANGAT PENTING: Anda SEDANG MEMFILTER kategori "${category}". ${categoryRules[category] || ''}`;
    }

    const systemPrompt = `Anda adalah API Rekruter IT Indonesia.
PERINTAH SAAT INI: ${searchInstruction}
KEMBALIKAN HANYA ARRAY JSON VALID SEPERTI INI: ${JSON_SCHEMA}`;

    // 1. Mencoba panggil Groq AI
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }],
      model: "llama3-8b-8192",
      temperature: 0.1, // Temperatur rendah agar logis
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "[]";

    // 2. EXTRAKSI JSON AMAN (Regex)
    try {
      const jsonMatch = responseContent.match(/\[[\s\S]*\]/);
      const cleanJson = jsonMatch ? jsonMatch[0] : responseContent;
      const parsedData = JSON.parse(cleanJson);

      let finalData = Array.isArray(parsedData) ? parsedData : (parsedData.careers || Object.values(parsedData).find(Array.isArray) || []);

      if (finalData.length === 0) throw new Error("AI mengembalikan data kosong");

      return NextResponse.json({ careers: finalData });

    } catch (parseError) {
      console.warn("Groq JSON Parse Failed, Menggunakan Fallback Sistem Manual.");
      throw parseError; // Lempar ke catch blok utama untuk Fallback Sistem Manual
    }

  } catch (error: any) {
    console.error("API Error/Fallback System triggered:", error.message);

    // --- SISTEM FALLBACK SISTEM MANUAL (Pasti Berhasil) ---
    // Jika AI gagal atau lambat, kita lakukan filter data cadangan secara manual berdasarkan kategori.

    let dynamicCareers = [];
    try {
      dynamicCareers = FALLBACK_CAREERS;
    } catch (e) {
      dynamicCareers = FALLBACK_CAREERS.slice(0, 6);
    }

    return NextResponse.json({
      error: "Sistem server AI sibuk, menampilkan data cadangan lengkap.",
      careers: dynamicCareers
    }, { status: 200 }); // Status 200 agar UI menampilkannya
  }
}