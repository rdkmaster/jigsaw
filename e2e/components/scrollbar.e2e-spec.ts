import {browser, $} from 'protractor';

describe('scrollbar', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic ', () => {
        it('should be scroll', async () => {
            await browser.get('/scrollbar/basic');
            let outSideScrollbarTop,insideScrollbarTop;
            outSideScrollbarTop = await $('.box-1 > .ps__rail-y').getCssValue('top');
            expect(outSideScrollbarTop).toBe('0px');
            browser.executeScript('$(".box-1").scrollTop(1000);');
            outSideScrollbarTop = await $('.box-1 > .ps__rail-y').getCssValue('top');
            expect(outSideScrollbarTop).toBe('1000px');
            insideScrollbarTop = await $('.box-2 > .ps__rail-y').getCssValue('top');
            expect(insideScrollbarTop).toBe('0px');
            browser.executeScript('$(".box-2").scrollTop(200);');
            insideScrollbarTop = await $('.box-2 > .ps__rail-y').getCssValue('top');
            expect(insideScrollbarTop).toBe('200px');
        })
    });
});
