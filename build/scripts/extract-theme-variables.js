const fs = require("fs");

process.chdir(`${__dirname}/../../src/jigsaw/common/core/theming/prebuilt/`);

fs.readdirSync(`./extraction`)
    .filter(file => !!file.endsWith('.scss'))
    .forEach(file => fs.unlinkSync(`./extraction/${file}`));

console.log('extracting css properties...');

const scssFiles = fs.readdirSync(`./settings`);
scssFiles.forEach(scssFile => {
    const inputPath = `./settings/${scssFile}`;
    const outputPath = `./extraction/${scssFile}`;
    const res = extractVariables(inputPath);
    fs.writeFileSync(outputPath, res);
});

function extractVariables(path) {
    const source = fs.readFileSync(path).toString();
    let variables = "";
    source.replace(/^\/\*@public\*\/\s*\$(.+?)\s*:\s*(.+?);?$/gm, (found, varName, value) => {
        value = value.replace(/\s*\/\/.*/, "");
        value = value.replace(/\/\*[\s\S]*?\*\//, "");
        variables += `:root { --${varName}: #{${value}} }\n`;
    });
    return variables;
}
