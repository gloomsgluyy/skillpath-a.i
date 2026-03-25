import fs from 'fs';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const careers = [
  "UI/UX Product Designer", "Frontend Web Engineer", "Graphic Designer", "Motion Graphics Designer", 
  "UX Researcher", "Brand Identity Designer", "3D Artist & Modeler", "Digital Illustrator", 
  "Interaction Designer", "Design System Lead", "Full-Stack Developer", "Backend Developer", 
  "Software Architect", "QA Engineer", "Embedded Systems Developer", "API Developer", 
  "Low-Code Developer", "Compiler Engineer", "Desktop App Developer", "Cloud Architecture Engineer", 
  "Network System Engineer", "System Administrator", "Site Reliability Engineer", "Database Administrator", 
  "Telecommunications Engineer", "Data Scientist", "AI/ML Engineer", "Data Engineer", 
  "Data Analyst", "NLP Engineer", "Computer Vision Engineer", "Business Intelligence Analyst", 
  "MLOps Engineer", "Cyber Security Analyst", "Penetration Tester", "Security Architect", 
  "SOC Analyst", "DevSecOps Engineer", "Mobile App Developer", "Android Developer", 
  "iOS Developer", "IoT Engineer", "Wearable Tech Developer", "Game Developer", 
  "Game Designer", "Unreal Engine Developer", "Technical Artist", "Product Manager", 
  "Scrum Master", "Technical Lead", "IT Project Manager", "Business Analyst (IT)", 
  "Digital Marketing Specialist", "SEO Specialist", "Social Media Manager", "Content Creator / Strategist", 
  "Growth Hacker", "Email Marketing Specialist", "Video Editor", "DevOps Engineer", 
  "Platform Engineer", "Cloud Solutions Architect", "Blockchain Developer", "Fintech Developer", 
  "DeFi Specialist", "Health Informatics Specialist", "Biomedical Software Engineer", "Telemedicine Developer", 
  "EdTech Developer", "Instructional Designer", "E-Commerce Developer", "Marketplace Product Manager", 
  "Podcast Producer", "VR/AR Developer", "Technical Writer"
]; // 75 careers

const chunkArray = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

// Grouping into chunks of 5
const careerChunks = chunkArray(careers, 5);

const schema = {
  projects: [
    {
      id: "string (unique hyphenated, e.g. proj-ui-landing)",
      title: "string (Indonesian)",
      description: "string (Indonesian, 2 sentences)",
      difficulty: "Pemula | Menengah | Ahli",
      category: "string (matching the broad career field like Data & AI, Frontend, Backend, Design, Cyber Security, etc)",
      skills: ["string", "string", "string"],
      imageUrl: "string (an unsplash URL relevant to the project, e.g. https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800)",
      targetCareer: "string (Exact match from the request array)",
      checklist: [
        {
          title: "string",
          detail: "string",
          code: "string (Optional code snippet)"
        }
      ],
      resources: [
        { title: "string", url: "https://..." }
      ]
    }
  ]
};

async function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function run() {
  let allProjects = [];
  
  console.log(`Starting generation of ~150 projects for ${careers.length} careers in ${careerChunks.length} chunks...`);

  for (let i = 0; i < careerChunks.length; i++) {
    const chunk = careerChunks[i];
    console.log(`Processing Chunk ${i + 1}/${careerChunks.length}: ${chunk.join(", ")}`);
    
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Anda adalah pakar kurikulum portofolio IT. Hasilkan persis 2 project portofolio detail untuk SETIAP karir yang diberikan. Output dalam JSON dengan skema:\n${JSON.stringify(schema, null, 2)}\n\nPENTING: Hasilkan dalam Bahasa Indonesia. URL gambar Unsplash gunakan kata kunci bebas tapi valid (misal: photo-123456...). Pastikan checklist memiliki minimal 4 langkah solid yang sangat bisa dipraktikkan. HANYA OUTPUT JSON DENGAN KEY "projects".`
          },
          {
            role: "user",
            content: `Hasilkan masing-masing 2 project untuk karir berikut ini:\n${chunk.join("\n")}`
          }
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
        temperature: 0.4
      });

      const responseJSON = JSON.parse(completion.choices[0].message.content);
      if (responseJSON && responseJSON.projects) {
        allProjects = allProjects.concat(responseJSON.projects);
        console.log(`-> Received ${responseJSON.projects.length} projects. Total so far: ${allProjects.length}`);
      }
    } catch (e) {
      console.error(`Error on chunk ${i + 1}:`, e.message);
    }
    
    // sleep to prevent rate limits
    await delay(3000);
  }
  
  if (!fs.existsSync('lib/data')) {
    fs.mkdirSync('lib/data', { recursive: true });
  }

  const outputCode = `export interface LabProject {
  id: string;
  title: string;
  description: string;
  difficulty: "Pemula" | "Menengah" | "Ahli";
  category: string;
  skills: string[];
  imageUrl: string;
  targetCareer: string;
  checklist: Array<{ title: string; detail: string; code?: string }>;
  resources: Array<{ title: string; url: string }>;
}

export const LAB_PROJECTS: LabProject[] = ${JSON.stringify(allProjects, null, 2)};
`;

  fs.writeFileSync('lib/data/projects.ts', outputCode);
  console.log(`\n✅ Done! Successfully generated ${allProjects.length} projects and saved to lib/data/projects.ts`);
}

run();
