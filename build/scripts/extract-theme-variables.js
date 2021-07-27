const fs = require("fs");

const scssFiles = fs.readdirSync(`./src/jigsaw/common/core/theming/prebuilt/settings`);
scssFiles.forEach(scssFile => {
    const inputPath = `./src/jigsaw/common/core/theming/prebuilt/settings/${scssFile}`;
    const outputPath = `./src/jigsaw/common/core/theming/prebuilt/extraction/${scssFile}`;
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
