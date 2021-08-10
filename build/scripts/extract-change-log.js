// 这是一个半成品脚本，没时间搞下去了
// versions变量需要从npm网站上爬出jigsaw的所有发布的版本，并提取出对应的发布时间
const versions = [
 {
  "ver": "10.9.6",
  "ts": 1628167223221
 }
];

const childProcess = require('child_process');

const cwd = 'd:/Codes/ide-ui';
versions.filter(v => v.ver.startsWith("10.")).forEach((v, idx, arr) => {
	const after = idx == arr.length - 1 ? '' : `--after="${new Date(arr[idx+1].ts).toLocaleString()}"`;
	const cmd = `git log ${after} --before="${new Date(v.ts).toLocaleString()}" --no-merges`;
	console.log('running command:', cmd);
	const gitLog = childProcess.execSync(cmd, {cwd}).toString();
	gitLog.split(/\n\ncommit\s+/)
	console.log(gitLog.split(/\n\ncommit\s+/));
	console.log('=============================================================');
	// process.exit()
})
