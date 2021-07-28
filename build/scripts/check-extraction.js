const fs = require("fs");

process.chdir(`${__dirname}/../../src/jigsaw/common/core/theming/`);

// 找出当前已经支持的规范和色系
const themes = [], majorStyles = [];
fs.readFileSync(`theme.ts`).toString().replace(/^\s*export\s+type\s+(SupportedTheme|MajorStyle)\s*=\s*(.*)$/mg,
    (_, type, value) => {
        const arr = type === 'SupportedTheme' ? themes : majorStyles;
        arr.push(...value.split('|').map(v => eval(v)));
        return '';
    });
console.log('themes =', themes.join(', '));
console.log('majorStyles =', majorStyles.join(', '));
if (themes.length === 0 || majorStyles.length === 0) {
    console.error('Error: no themes or major styles found!');
    process.exit(1);
}

const props = [];
themes.forEach(th => {
    majorStyles.forEach(st => {
        props.push(readCSSProp(th, st).join(','));
    });
});
if (props.filter(p => !!p).filter((p, idx, arr) => idx === arr.indexOf(p)).length !== 1) {
    console.error('Error: mismatch css properties found!');
    console.error(props);
    process.exit(1);
}

function readCSSProp(theme, style) {
    const file = `./prebuilt/extraction/${theme}-${style}.scss`;
    if (!fs.existsSync(file)) {
        return [];
    }
    return fs.readFileSync(file).toString()
        .match(/--.*?:/g).map(item => item.match(/--(.*?):/)[1])
        .sort((a, b) => a.localeCompare(b));
}

