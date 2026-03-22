const fs = require('fs');
const file = 'c:/Users/Glooms/Downloads/JKJK2/my-app/app/journey/page.tsx';
let lines = fs.readFileSync(file, 'utf8').split('\n');

// Find markers
const headIdx = lines.findIndex(l => l.startsWith('<<<<<<< '));
const sepIdx = lines.findIndex(l => l.startsWith('======='));
const tailIdx = lines.findIndex(l => l.startsWith('>>>>>>> '));

if (headIdx !== -1 && sepIdx !== -1 && tailIdx !== -1) {
  // Remove L300 to L521 (sepIdx to tailIdx)
  lines.splice(sepIdx, tailIdx - sepIdx + 1);
  // Remove L4 (headIdx)
  lines.splice(headIdx, 1);
  fs.writeFileSync(file, lines.join('\n'));
  console.log('Fixed journey');
} else {
  console.log('Markers not found');
}
