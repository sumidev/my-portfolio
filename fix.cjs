const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src/App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// Fix HTML comments
content = content.replace(/<!--(.*?)-->/g, '{/*$1*/}');

// Fix some self-closing issues that might have been missed or broken
content = content.replace(/<hr>/g, '<hr />');
// Any other common ones?

fs.writeFileSync(appPath, content);
console.log('Fixed JSX comments');
