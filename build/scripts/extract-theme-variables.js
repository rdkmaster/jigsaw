const sass = require('node-sass');
const fs = require('fs');

// const file = `${__dirname}/../../src/jigsaw/common/core/theming/prebuilt/settings/zte.scss`;
const file = `d:/Codes/jigsaw/src/jigsaw/pc-components/theming/prebuilt/zte-purple.scss`;
const scssSource = fs.readFileSync(file).toString()//.replace(/^\s*@import\s+.+$/mg, '');

let spySource = '';
scssSource.replace(/^\$(.+?)\s*:\s*(.+?);?$/gm, (found, varName, value) => {
    value = value.replace(/\s*\/\/.*/, '');
    spySource += `.a { ${varName}: ${value} }\n`;
});

// console.log(spySource)

const result = sass.renderSync({
    data: scssSource + '\n' + spySource,
    importer: (url, prev) => {
        let path = `d:/Codes/jigsaw/src/jigsaw/pc-components/theming/prebuilt/${url}.scss`;
        if (prev != 'stdin') {
            url = url.replace(/(.+)\.scss$/i, '$1');
            prev = prev.replace(/(.+\/).+/, '$1');
            path = prev + url + '.scss';
            if (!fs.existsSync(path)) {
                url = url.replace(/(.+\/)?(.*)/, '$1_$2');
                path = prev + url + '.scss';
            }
        }
        console.log(path);
        return {
            file: path,
            contents: fs.readFileSync(path).toString()
        }
    }
});

// console.log(result.css.toString());