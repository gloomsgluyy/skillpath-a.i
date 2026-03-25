import { Groq } from "groq-sdk";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const CATEGORIES = [
  "Software Development",
  "Kreatif & Desain",
  "Data & AI",
  "Cyber Security",
  "Product & Management",
  "Digital Marketing",
  "Mobile & IoT",
  "Cloud & DevOps"
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log("Memulai proses generasi project dengan Groq secara Batch...");
  
  let allProjects = [];
  const basePrompt = fs.readFileSync("scripts/prompt.txt", "utf-8");

  for (const category of CATEGORIES) {
      console.log("Generating 15 projects for category", category, "...");
      
      const safeCategory = category.replace(/[^a-zA-Z]/g, '').toLowerCase();
      const prompt = basePrompt
          .replace(/{{CATEGORY}}/g, category)
          .replace(/{{SAFE_CATEGORY}}/g, safeCategory);

      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: "user", content: prompt }
          ],
          model: "llama-3.1-8b-instant",
          temperature: 0.7,
          max_completion_tokens: 6000,
        });

        let content = chatCompletion.choices[0]?.message?.content || "";
        
        // Clean potential markdown blocks
        if (content.startsWith("```json")) {
          content = content.replace(/^```json\n/, "").replace(/\n```$/, "");
        }
        if (content.startsWith("```")) {
          content = content.replace(/^```\n/, "").replace(/\n```$/, "");
        }
        content = content.trim();

        const parsed = JSON.parse(content);
        allProjects = allProjects.concat(parsed);
        console.log("Berhasil parse JSON untuk", category, "! (", parsed.length, " projects)");
      } catch (error) {
        console.log("Gagal melakukan generasi untuk", category, error.message);
      }
      
      console.log("Menunggu 6 detik sebelum melanjutkan...");
      await sleep(6000); // 6 seconds delay
  }

  const outputFile = "lib/data/generated_projects.json";
  fs.writeFileSync(outputFile, JSON.stringify(allProjects, null, 2));
  console.log("Selesai! Berhasil menyimpan", allProjects.length, "total project ke", outputFile);
}

main();
