const sass = require('node-sass');
const fs = require('fs');

// const file = `${__dirname}/../../src/jigsaw/common/core/theming/prebuilt/settings/zte.scss`;
const file = `d:/Codes/jigsaw/src/jigsaw/pc-components/theming/prebuilt/zte-purple.scss`;
const scssSource = fs.readFileSync(file).toString()//.replace(/^\s*@import\s+.+$/mg, '');

// let spySource = '';
// scssSource.replace(/^\$(.+?)\s*:\s*(.+?);?$/gm, (found, varName, value) => {
//     value = value.replace(/\s*\/\/.*/, '');
//     value = value.replace(/\/\*[\s\S]*?\*\//, '');
//     spySource += `.a { ${varName}: ${value} }\n`;
// });

// console.log(spySource)

const result = sass.renderSync({
    data: scssSource,
    importer: (url, prev) => {
        let path = `src/jigsaw/pc-components/theming/prebuilt/${url}.scss`;
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
            file: path, contents: addSpy(path)
        }
    }
});

function addSpy(path) {
    const source = fs.readFileSync(path).toString();
    let spySource = '';
    return source.replace(/^\$(.+?)\s*:\s*(.+?);?$/gm, (found, varName, value) => {
            value = value.replace(/\s*\/\/.*/, '');
            value = value.replace(/\/\*[\s\S]*?\*\//, '');
            spySource += `.css-spy-mark { ${varName}: ${value} }\n`;
        });
    return source + '\n' + spySource;
}

// console.log(result.css.toString());
fs.writeFileSync('d:/temp/22/aa.css', result.css.toString())