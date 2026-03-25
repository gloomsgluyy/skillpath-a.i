import fs from 'fs';

const filePath = 'lib/data/projects.ts';
let content = fs.readFileSync(filePath, 'utf8');

// A mapping of categories/keywords to some nice Unsplash images
const imgPool = {
  "Frontend": [
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800", // Code on screen
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800", // Laptop HTML
    "https://images.unsplash.com/photo-1627398244163-9f5b66d8d641?auto=format&fit=crop&q=80&w=800", // React-like
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
  ],
  "Backend": [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800", // Servers
    "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800", // Dark code
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800", // Matrix style
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  ],
  "Design": [
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800", // UI/UX design
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800", // Web design
    "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&q=80&w=800", // Color palette
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"  // Creative
  ],
  "Data Science": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", // Charts
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800", // Graphs
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800"
  ],
  "AI": [
    "https://images.unsplash.com/photo-1620712948343-0008ece88852?auto=format&fit=crop&q=80&w=800", // Network
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800", // AI brain
    "https://images.unsplash.com/photo-1684369175833-8b77a161c28b?auto=format&fit=crop&q=80&w=800"
  ],
  "Security": [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800", // Hacker
    "https://images.unsplash.com/photo-1555562151-54b9f07fe758?auto=format&fit=crop&q=80&w=800", // Lock
    "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800"
  ],
  "Game": [
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800", // Controller
    "https://images.unsplash.com/photo-1580234811432-841fbcfee218?auto=format&fit=crop&q=80&w=800", // PC Gaming
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800"
  ],
  "Mobile": [
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800", // Phone on desk
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800", // Apps
    "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800"
  ]
};

const defaultPool = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800"
];

let globalMatchCount = 0;

const newContent = content.replace(/"category":\s*"([^"]+)",[\s]+(?:.|\n)*?"imageUrl":\s*"([^"]+)"/g, (match, category, oldImageUrl) => {
  let pool = defaultPool;
  globalMatchCount++;
  
  // Find a matching pool category based on substring matches
  for (const key of Object.keys(imgPool)) {
    if (category.toLowerCase().includes(key.toLowerCase()) || match.toLowerCase().includes(key.toLowerCase())) {
      pool = imgPool[key];
      break;
    }
  }
  
  const randomImage = pool[Math.floor(Math.random() * pool.length)];
  return match.replace(oldImageUrl, randomImage);
});

fs.writeFileSync(filePath, newContent);
console.log('Replaced images across ' + globalMatchCount + ' projects!');
