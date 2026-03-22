const fs = require('fs');
const files = ['c:/Users/Glooms/Downloads/JKJK2/my-app/app/explore/page.tsx', 'c:/Users/Glooms/Downloads/JKJK2/my-app/app/journey/page.tsx'];

let out = '';
for (const file of files) {
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    out += `\nConflicts in ${file}:\n`;
    lines.forEach((line, i) => {
      if (line.startsWith('<<<<<<< ') || line.startsWith('=======') || line.startsWith('>>>>>>> ')) {
        out += `L${i + 1}: ${line}\n`;
      }
    });
  }
}
fs.writeFileSync('c:/Users/Glooms/Downloads/JKJK2/my-app/conflicts.txt', out);
