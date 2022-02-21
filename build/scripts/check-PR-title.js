const https = require('https');


(async () => {
    const branch = process.env.CIRCLE_BRANCH;
    if (branch === 'master') {
        process.exit(0);
    }

    const url = await readUrl(branch);
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
    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/repos/rdkmaster/jigsaw/pulls/${id}`,
        method: 'GET',
        headers: {
            "User-Agent": "jigsaw-checker"
        }
    };
    const prInfo = await readData(options);
    const titleMatch = prInfo.title.match(/^\s*\[(.+?)].+/);
    if (!titleMatch) {
        exit('PR标题格式非法，未找到类型，title:', prInfo.title);
    }
    const types = ['新增', '优化', '故障', '其他', '破坏性修改'];
    if (types.indexOf(titleMatch[1]) === -1) {
        exit(`PR标题格式非法，类型 ${titleMatch[1]} 不存在，title:`, prInfo.title);
    }
    console.log('PR标题符合要求！');

    async function readUrl(branch) {
        if (process.env.CIRCLE_PULL_REQUEST) {
            return Promise.resolve(process.env.CIRCLE_PULL_REQUEST);
        }

        console.log('reading url from github...');
        const options = {
            hostname: 'api.github.com',
            port: 443,
            path: `/repos/rdkmaster/jigsaw/pulls?state=open`,
            method: 'GET',
            headers: {"User-Agent": "jigsaw-checker"}
        };
        const prList = await readData(options);
        const pr = prList.find(pr => pr.head.ref === branch);
        return pr ? pr.url : null;
    }

    async function readData(options) {
        return new Promise(resolve => {
            const req = https.request(options, res => {
                console.log(`status code: ${res.statusCode}`);

                let data = '';
                res.on('data', d => {
                    data += d.toString();
                });

                res.on('end', d => {
                    resolve(JSON.parse(data));
                });
            });
            req.on('error', error => {
                console.error('failed to read data from github, detail:', error)
                process.exit(1);
            });
            req.end();
        });
    }

    async function sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec * 1000));
    }
})();

function exit(...messages) {
    console.error(...messages);
    console.error('PR标题格式必须为如下格式之一：');
    types.map(type => `[${type}] 任意修改描述，可选关联@123，可选解决@456`).forEach(item => console.error(item));
    process.exit(1);
}
