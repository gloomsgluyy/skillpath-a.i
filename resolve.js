const fs = require('fs');

function resolveJourney() {
  const file = 'c:/Users/Glooms/Downloads/JKJK2/my-app/app/journey/page.tsx';
  let content = fs.readFileSync(file, 'utf8');
  // keep HEAD
  content = content.replace(/<<<<<<< HEAD\n([\s\S]*?)=======\n[\s\S]*?>>>>>>> origin\/Explore-Career\n/g, '$1');
  fs.writeFileSync(file, content);
  console.log('Journey resolved (Kept HEAD)');
}

function resolveExplore() {
  const file = 'c:/Users/Glooms/Downloads/JKJK2/my-app/app/explore/page.tsx';
  let content = fs.readFileSync(file, 'utf8');
  
  const blocks = [];
  const regex = /<<<<<<< HEAD\r?\n([\s\S]*?)=======\r?\n([\s\S]*?)>>>>>>> origin\/Explore-Career\r?\n/g;
  
  let match;
  let count = 0;
  content = content.replace(regex, (full, head, theirs) => {
    count++;
    if (count === 1) {
      // Top of file: imports, AI logic, and Origin's mock data/components. Keep both, we'll fix duplicate imports later.
      return head + '\n' + theirs;
    } else if (count === 2) {
      // Filter UI (buttons). Origin has better UI buttons.
      return theirs;
    } else if (count === 3) {
      // Selected Category active state class. Origin has better UI.
      return theirs;
    } else if (count === 4) {
      // The career cards grid. Keep theirs (CardContainer 3D), but we need to inject HEAD's isMatched logic later.
      return theirs;
    }
    return head;
  });
  
  fs.writeFileSync(file, content);
  console.log(`Explore resolved with custom merge (${count} blocks replaced)`);
}

resolveJourney();
resolveExplore();
