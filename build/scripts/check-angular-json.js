const fs = require('fs');

const json = fs.readFileSync(`${__dirname}/../../angular.json`).toString();
if (json.indexOf('/build-in-theme/') !== -1) {
    console.error(`There are some auth generated content in angular.json, do NOT submit these modifications!`);
    process.exit(1);
} else {
    console.log(`angular.json is fine!`);
}


