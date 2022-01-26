const https = require('https');

const url = process.env.CIRCLE_PULL_REQUEST;
console.log('CIRCLE_PULL_REQUEST =', url);
const match = url.match(/.*\/(\d+)$/);
if (!match) {
    console.error('unable to read PR id from env CIRCLE_PULL_REQUEST');
    process.exit(1);
}
const id = match[1];
const types = ['新增', '优化', '故障', '其他', '破坏性修改'];

const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/rdkmaster/jigsaw/pulls/${id}`,
    method: 'GET',
    headers: {
        "User-Agent": "jigsaw-checker"
    }
};
const req = https.request(options, res => {
    console.log(`status code: ${res.statusCode}`);

    let data = '';
    res.on('data', d => {
        data += d.toString();
    });

    res.on('end', d => {
        const pr = JSON.parse(data);
        const match = pr.title.match(/^\s*\[(.+)].+/);
        if (!match) {
            exit('PR标题格式非法，未找到类型，title:', pr.title);
        }
        if (types.indexOf(match[1]) == -1) {
            exit(`PR标题格式非法，类型 ${match[1]} 不存在，title:`, pr.title);
        }
        console.log('PR标题符合要求！');
    });
});

req.on('error', error => {
    console.error('failed to read data from github, detail:', error)
    process.exit(1);
});

req.end();

function exit(...messages) {
    console.error(...messages);
    console.error('PR标题格式必须为如下格式之一：');
    types.map(type => `[${type}] xxxxx`).forEach(item => console.error(item));
    process.exit(1);
}
