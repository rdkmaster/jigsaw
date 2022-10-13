
const {execSync} = require("child_process");

const env = process.argv[2], port = process.argv[3] || 4200;
console.log(`starting env ${env} on port ${port} ...`);

execSync(`node build/scripts/extract-theme-variables.js`, {stdio: 'inherit'});
execSync(`node build/scripts/create-component-wings-theme.js`, {stdio: 'inherit'});
execSync(`node build/scripts/generate-external-demo-info.js`, {stdio: 'inherit'});

execSync(`node --max_old_space_size=2048 node_modules/@angular/cli/bin/ng serve ${env} ` +
    `--poll 500 --disable-host-check --host 0.0.0.0 --port ${port}`, {stdio: 'inherit'});
