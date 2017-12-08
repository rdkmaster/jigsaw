import {browser, by, element, ExpectedConditions} from 'protractor';
import {expectToExist} from "../utils/asserts";

describe('plunker alert', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test alert in dom', () => {
        it('iframe should display components view', async () => {
            await browser.get('http://rdk.zte.com.cn/jigsaw/live-demo/alert/in-dom/index.html');
            await browser.switchTo().frame(0);
            await browser.switchTo().frame(0);
            const previewDiv = element(by.tagName('demo-root')).element(by.tagName('DIV'));
            await browser.wait(ExpectedConditions.presenceOf(element(by.tagName('jigsaw-live-demo'))));
            expectToExist(previewDiv,false);
            expectToExist(element(by.tagName('jigsaw-live-demo')),true);
        })
    })
});
