const glob = require("glob").sync;
const fs = require("fs-extra");

console.log("generating external navigation info ....");

const output = {};

process.chdir(`${__dirname}/../../src/app/for-external/demo`);
// glob('**/*.{ts,html,css,scss,md}', {cwd: `.`})
//     .forEach(file => {
//         const match = file.match(/^([^\/]+?\/[^\/]+?)\/(.+?)$/);
//         if (!match) {
//             return;
//         }

//         const name = match[2];
//         if (name === 'readme.md') {
//             return;
//         }

//         const path = `demo/${match[1]}`;
//         const files = output[path] || [];
//         output[path] = files;

//         const m1 = name.match(/^.+\.(\w+)$/);
//         const language = m1 ? m1[1] : 'txt';
//         const label = name === 'demo.component.html' ? "HTML" :
//             name === 'demo.component.ts' ? "Typescript" :
//             name === 'demo.component.scss' ? "Style" :
//             name === 'demo.component.css' ? "Style" : name;
//         files.push({label, language, file});
//     });

glob("*/readme.md", { cwd: `.` }).forEach(file => {
    const label = fs.readFileSync(file, "utf-8").match(/^#+.*/)[0].split("#").pop().trim();
    const path = `${file.split("/readme.md")[0]}`;
    output[path] = { label };
});

fs.writeFileSync(`../template/demo-template/navigation-info.js`, `window.demoNavigationInfo=${JSON.stringify(output)}`);

console.log("external navigation info generated!");
