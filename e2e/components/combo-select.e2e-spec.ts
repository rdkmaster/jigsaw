import {browser, element, by} from 'protractor';

describe('combo-select', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    xdescribe('test basic function', () => {
         it('should display options when mouse enter into combo',async()=>{
             await browser.get('/combo-select/auto-width');
             const script = `document.getElementsByTagName("jigsaw-combo-select").mouseenter`;
             await browser.executeScript(script);
             await browser.sleep(3000);
         })
    })
});
