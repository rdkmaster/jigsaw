const fs = require("fs");
const glob = require('glob').sync;

console.log('creating component wings theme ...');

process.chdir(`${__dirname}/../../src/jigsaw/`);

const tsFiles = [
    ...glob('**/*.ts', {cwd: `pc-components`}).map(f => `pc-components/${f}`),
    ...glob('**/*.ts', {cwd: `common`}).map(f => `common/${f}`),
];
const ignoredComponents = [
    'JigsawBox', 'JigsawBreadcrumbItem', 'JigsawFishBone', 'JigsawTileOption', 'JigsawRadioOption', 'JigsawRoot',
    'JigsawTabPane', 'JigsawViewport', 'JigsawBlock', 'JigsawScrollbar', 'JigsawUploadFileInfoListFallback'
];
const wingsThemeIds = [], invalidComponents = [];
tsFiles.forEach(file => {
    const rx = /(\/\*[\s\S]*?\*\/)?\s*(^\s*@WingsTheme\s*\((.*)\))?\s*(@Component\s*\([\s\S]*?\))\s*export\s+class\s+(\w+)/mg;
    fs.readFileSync(file).toString().replace(rx, (_1, comment, _2, wingsThemeId, componentMeta, className) => {
        if (comment && comment.indexOf('@internal') !== -1) {
            return;
        }
        if (!componentMeta || !componentMeta.match(/\bselector\s*:/)) {
            return;
        }
        if (!wingsThemeId) {
            if (ignoredComponents.indexOf(className) === -1) {
                invalidComponents.push(className);
            }
            return;
        }
        wingsThemeIds.push(wingsThemeId.replace(/['"]/g, ''));
    });
});
if (invalidComponents.length) {
    console.error('下面这些组件没有使用 @WingsTheme 装饰器指明 wings theme id，请添加！');
    console.error(invalidComponents.join(', '));
}

// wingsThemeId不允许重复
const duplicated = wingsThemeIds.filter((id, idx, arr) => idx !== arr.indexOf(id));
if (duplicated.length) {
    console.error('下面这些 wings theme id 被重复使用，请修改！');
    console.error(duplicated.join(', '));
}

if (duplicated.length + invalidComponents.length > 0) {
    process.exit(1);
}

console.log('所有组件的 wings theme id 校验通过！');

const wingsThemeOutput = 'common/core/theming/prebuilt/wings-theme';
if (fs.existsSync(wingsThemeOutput)) {
    glob('**/*.scss', {cwd: wingsThemeOutput})
        .forEach(file => fs.unlinkSync(`${wingsThemeOutput}/${file}`));
} else {
    fs.mkdirSync(wingsThemeOutput);
}

const styleFiles = styleFilesParser();
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
    const wingsThemeId = `jigsaw-${fileName}`;
    if (wingsThemeIds.indexOf(wingsThemeId) === -1) {
        return;
    }

    const fileContent = fs.readFileSync(`pc-components/theming/${filePath}.scss`).toString();
    const scssCode = commonImport + fileContent.replace(/(^\..+)-host\s*{/mg, "$1-host[data-theme='$THEME'] {");
    fs.writeFileSync(`common/core/theming/prebuilt/wings-theme/${wingsThemeId}-dark.scss`,
        scssCode.replace(/\$THEME/g, 'dark'));
    fs.writeFileSync(`common/core/theming/prebuilt/wings-theme/${wingsThemeId}-light.scss`,
        scssCode.replace(/\$THEME/g, 'light'));

    options.styles.push({
        "input": `src/jigsaw/common/core/theming/prebuilt/wings-theme/${wingsThemeId}-dark.scss`,
        "bundleName": `themes/wings-theme/${wingsThemeId}-dark`, "inject": false
    });
    options.styles.push({
        "input": `src/jigsaw/common/core/theming/prebuilt/wings-theme/${wingsThemeId}-light.scss`,
        "bundleName": `themes/wings-theme/${wingsThemeId}-light`, "inject": false
    });
});
fs.writeFileSync('../../angular.json', JSON.stringify(angularJson, null, 2));

console.log('component wings theme created');

function styleFilesParser () {
    const styleFiles = [];
    fs.readFileSync(`${__dirname}/../../src/jigsaw/pc-components/theming/all-theme.scss`).toString()
        .replace(/@import\s+"(.*?)"/g, (_, file) => {
            if (file.startsWith('../../common/assets/scss/') || file.startsWith('../fallback/')) {
                return;
            }
            styleFiles.push(file);
        });
    return styleFiles;
}
