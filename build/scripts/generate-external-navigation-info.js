const glob = require("glob").sync;
const fs = require("fs-extra");

console.log("generating external navigation info ....");

const output = {};

process.chdir(`${__dirname}/../../src/app/for-external/demo`);

glob("**/readme.md", { cwd: `.` }).forEach((file) => {
    const label = fs
        .readFileSync(file, "utf-8")
        .match(/^#+.*/)[0]
        .split("#")
        .pop()
        .trim();
    const path = file.replace("/readme.md", '').replace("/", "-");
    output[path] = { label };
});

fs.writeFileSync(`../template/demo-navigation-info.json`, JSON.stringify(output));

console.log("external navigation info generated!");
