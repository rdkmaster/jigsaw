const fs = require("fs");

console.log('creating component build in theme ...');

process.chdir(`${__dirname}/../../src/jigsaw/`);
if (!fs.existsSync(`common/core/theming/prebuilt/wings-theme`)) {
    fs.mkdirSync(`common/core/theming/prebuilt/wings-theme`);
}

const styleFiles = [];
fs.readFileSync(`pc-components/theming/all-theme.scss`).toString()
    .replace(/@import\s+"(.*?)"/g, (_, file) => {
        if (file.startsWith('../../common/assets/scss/') || file.startsWith('../fallback/')) {
            return;
        }
        styleFiles.push(file);
    });

const angularJson = require(`../../angular.real.json`);
const options = angularJson.projects["jigsaw-app"].architect.build.options;
options.styles = options.styles.filter(style => typeof style === 'string' ||
    (style.input && style.input.indexOf('/wings-theme/')) === -1);

const commonImport = `
        @import "../settings/paletx-pro-base.scss";
        @import "../settings/paletx-pro-$THEME.scss";
    `;
styleFiles.forEach(filePath => {
    const fileName = filePath.split("/").pop();
    const fileContent = fs.readFileSync(`pc-components/theming/${filePath}.scss`).toString();
    const scssCode = commonImport + fileContent.replace(/(^\..+)-host\s*{/mg, "$1-host[data-theme='$THEME'] {");
    fs.writeFileSync(`common/core/theming/prebuilt/wings-theme/${fileName}-dark.scss`,
        scssCode.replace(/\$THEME/g, 'dark'));
    fs.writeFileSync(`common/core/theming/prebuilt/wings-theme/${fileName}-light.scss`,
        scssCode.replace(/\$THEME/g, 'light'));

    options.styles.push({
        "input": `src/jigsaw/common/core/theming/prebuilt/wings-theme/${fileName}-dark.scss`,
        "bundleName": `themes/wings-theme/${fileName}-dark`, "inject": false
    });
    options.styles.push({
        "input": `src/jigsaw/common/core/theming/prebuilt/wings-theme/${fileName}-light.scss`,
        "bundleName": `themes/wings-theme/${fileName}-light`, "inject": false
    });
});
fs.writeFileSync('../../angular.json', JSON.stringify(angularJson, null, 2));

console.log('component build in theme created');

