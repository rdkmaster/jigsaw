// npm i puppeteer@18.1.0
const puppeteer = require('puppeteer');

const user = process.env.GITEE_USER, pwd = process.env.GITEE_PWD;
if (!user || !pwd) {
    console.error('Error: invalid GITEE_USER or GITEE_PWD environment variables, need this info to auto deploy ued site');
    process.exit(1);
}
deployVersion('latest').then();

async function deployVersion(version) {
    const headless = process.argv[2] !== '--no-headless';
    if (headless) {
        console.log('Tips: the script is running in headless mode, add --no-headless to run in full (non-headless) Chrome/Chromium');
    }
    const browser = await puppeteer.launch({headless});
    const page = await browser.newPage();
    page.setViewport({width: 1200, height: 600});
    await login(user, pwd);

    console.log(`${version}: going to deploy ...`);
    await page.goto(`https://gitee.com/jigsaw-zte/${version}/pages`, {timeout: 300000});
    console.log(`${version}: waiting for redeploy button ...`);
    await page.waitForSelector('.redeploy-button');
    page.click('.redeploy-button');
    await waitAndAcceptDeployConfirm(page);

    console.log(`${version}: waiting for deploying start message ...`);
    await page.waitForSelector('#pages_deploying');
    console.log(`${version}: waiting for deploying to finish ...`);
    await page.waitForSelector('.start-service-description', {timeout: 1200000});
    console.log(`${version}: website deployed!`);
    await browser.close();

    async function login(user, pwd) {
        await page.goto('https://gitee.com/login', {timeout: 300000});
        await page.waitForSelector('#user_login', {timeout: 300000});
        await page.type("#user_login", user, { delay: 30 });
        await page.type("#user_password", pwd, { delay: 30 });
        await page.click("input[type=submit][name=commit]");
        await page.waitForSelector('strong[title=jigsaw-zte]');
    }

    async function waitAndAcceptDeployConfirm() {
        return new Promise(resolve => {
            page.on('dialog', async dialog => {
                console.log(`${version}: confirm message: ${dialog.message()}`, );
                await dialog.accept();
                resolve();
            });
        });
    }
}

async function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
}
