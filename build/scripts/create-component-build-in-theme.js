const fs = require("fs");
const args = process.argv.slice(2);

if (args[0] === "clean") {
    process.chdir(`${__dirname}/../../src/jigsaw/common/core/theming/prebuilt/`);
    if (!fs.existsSync(`angular.json`)) {
        return;
    }
    fs.copyFileSync(`angular.json`, `${__dirname}/../../angular.json`);
    fs.unlinkSync(`angular.json`);
    return;
}

process.chdir(`${__dirname}/../../src/jigsaw/pc-components/theming`);

const source = fs.readFileSync(`all-theme.scss`).toString().split("Component Style")[1];

const angularJson = fs.readFileSync(`${__dirname}/../../angular.json`).toString();
if (!fs.existsSync(`../../common/core/theming/prebuilt/build-in-theme`)) {
    fs.mkdirSync(`../../common/core/theming/prebuilt/build-in-theme`);
}
fs.copyFileSync(`${__dirname}/../../angular.json`, `../../common/core/theming/prebuilt/angular.json`);

let angularString = "";

const allStyleFilePath = source.match(/"(.*?)"/g);
if (!allStyleFilePath) {
    return;
}

console.log("creating component build-in themes");

// allStyleFilePath.length = 3;

allStyleFilePath.forEach((scssFile, index) => {
    const filePath = scssFile.replace(/['"]+/g, "");
    const fileName = filePath.split("/").pop();
    const fileContent = fs.readFileSync(filePath + ".scss").toString();
    const darkImport = `@import "../settings/paletx-pro-base.scss";
    @import "../settings/paletx-pro-dark.scss";
    `;
    const lightImport = `@import "../settings/paletx-pro-base.scss";
    @import "../settings/paletx-pro-light.scss";
    `;
    const darkRes = darkImport + fileContent.replace(/-host/g, "-host[data-theme='dark']");
    const lightRes = lightImport + fileContent.replace(/-host/g, "-host[data-theme='light']");
    const darkOutputPath = `../../common/core/theming/prebuilt/build-in-theme/${fileName}-dark.scss`;
    const lightOutputPath = `../../common/core/theming/prebuilt/build-in-theme/${fileName}-light.scss`;

    if (!fs.existsSync(darkOutputPath)) {
        fs.appendFile(darkOutputPath, darkRes, function (err) {
            if (err) throw err;
        });
    } else {
        fs.writeFileSync(darkOutputPath, darkRes, function (err) {
            if (err) throw err;
        });
    }

    if (!fs.existsSync(lightOutputPath)) {
        fs.appendFile(lightOutputPath, lightRes, function (err) {
            if (err) throw err;
        });
    } else {
        fs.writeFileSync(lightOutputPath, lightRes, function (err) {
            if (err) throw err;
        });
    }
    angularString += `
    {
        "input": "src/jigsaw/common/core/theming/prebuilt/build-in-theme/${fileName}-dark.scss",
        "bundleName": "themes/components/${fileName}-dark",
        "inject": false
    },
    {
        "input": "src/jigsaw/common/core/theming/prebuilt/build-in-theme/${fileName}-light.scss",
        "bundleName": "themes/components/${fileName}-light",
        "inject": false
    },`;
});

fs.writeFileSync(
    `../../../../angular.json`,
    angularJson.replace(`"src/styles.scss",`, `"src/styles.scss",${angularString}`),
    function (err, file) {
        if (err) throw err;
    }
);
