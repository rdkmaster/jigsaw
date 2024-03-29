const fs = require('fs');
const { execSync } = require('child_process');

const packageJsonPath = `${__dirname}/package.json`;
const backupPackageJsonPath = `${__dirname}/package.json.backup`;

// Step 1: 备份 package.json
fs.unlinkSync(backupPackageJsonPath);
fs.copyFileSync(packageJsonPath, backupPackageJsonPath);

// Step 2: 修改 package.json
const packageJson = require(packageJsonPath);
packageJson.dependencies = packageJson.dependenciesGovernance;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

try {
    // Step 3: 执行 npm install
    execSync('npm install', { stdio: 'inherit' });
} catch (error) {
    console.error("An error occurred:", error);
}

// Step 4: 恢复备份文件
fs.unlinkSync(packageJsonPath);
fs.renameSync(backupPackageJsonPath, packageJsonPath);
