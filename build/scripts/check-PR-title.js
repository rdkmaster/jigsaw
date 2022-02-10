const { execSync } = require("child_process");

let branch = process.env.CIRCLE_BRANCH;
if (branch === 'master') {
    process.exit(0);
}
if (!branch) {
    branch = process.argv[2];
}
if (!branch) {
    console.error('need a branch to check in local env.');
    process.exit(0);
}

const url = readUrl(branch);
console.log(`CIRCLE_PULL_REQUEST = ${url}, CIRCLE_BRANCH = ${branch}`);
if (!url) {
    console.warn('unable to read PR url, rerun this job may fix this problem.');
    process.exit(1);
}

const urlMatch = url.match(/.*\/(\d+)$/);
if (!urlMatch) {
    console.error('unable to read PR id from env CIRCLE_PULL_REQUEST');
    process.exit(1);
}
const id = urlMatch[1];
const prInfo = readData(`https://api.github.com/repos/rdkmaster/jigsaw/pulls/${id}`);
const titleMatch = prInfo.title.match(/^\s*\[(.+)].+/);
if (!titleMatch) {
    exit('PR标题格式非法，未找到类型，title:', prInfo.title);
}
const types = ['新增', '优化', '故障', '其他', '破坏性修改'];
if (types.indexOf(titleMatch[1]) === -1) {
    exit(`PR标题格式非法，类型 ${titleMatch[1]} 不存在，title:`, prInfo.title);
}
console.log('PR标题符合要求！');

function readUrl(branch) {
    if (process.env.CIRCLE_PULL_REQUEST) {
        return process.env.CIRCLE_PULL_REQUEST;
    }
    const prList = readData('https://api.github.com/repos/rdkmaster/jigsaw/pulls?state=open');
    const pr = prList.find(pr => pr.head.ref === branch);
    return pr ? pr.url : null;
}

function readData(url) {
    const proxy = process.env.CIRCLE_BRANCH ? '' : '-x "http://proxyhk.zte.com.cn:80"';
    const str = execSync(`curl -s ${proxy} ${url}`).toString();
    return JSON.parse(str);
}

function exit(...messages) {
    console.error(...messages);
    console.error('PR标题格式必须为如下格式之一：');
    types.map(type => `[${type}] 任意修改描述，可选关联@123，可选解决@456`).forEach(item => console.error(item));
    process.exit(1);
}
