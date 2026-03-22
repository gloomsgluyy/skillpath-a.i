const fs = require('fs');
const files = ['c:/Users/Glooms/Downloads/JKJK2/my-app/app/explore/page.tsx', 'c:/Users/Glooms/Downloads/JKJK2/my-app/app/journey/page.tsx'];

for (const file of files) {
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    console.log(`\nConflicts in ${file}:`);
    lines.forEach((line, i) => {
      if (line.startsWith('<<<<<<< ') || line.startsWith('=======') || line.startsWith('>>>>>>> ')) {
        console.log(`L${i + 1}: ${line}`);
      }
    });
  }
}
