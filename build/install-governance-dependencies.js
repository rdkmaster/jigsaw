const fs = require('fs');
const { execSync } = require('child_process');

process.chdir(`${__dirname}/../`);

// Step 1: 备份 package.json
if (fs.existsSync('package.json.backup')) {
    fs.unlinkSync('package.json.backup');
}
fs.copyFileSync('package.json', 'package.json.backup');

// Step 2: 修改 package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
packageJson.dependencies = packageJson.dependenciesGovernance;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

try {
    // Step 3: 执行 npm install
    execSync('npm install', { stdio: 'inherit' });
} catch (error) {
    console.error("An error occurred:", error);
}

// // Step 4: 恢复备份文件
// fs.unlinkSync('package.json');
// fs.renameSync('package.json.backup', 'package.json');
// execSync('git checkout package-lock.json', { stdio: 'inherit' });

