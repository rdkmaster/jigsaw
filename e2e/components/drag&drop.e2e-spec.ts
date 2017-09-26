import {browser, element, by, ExpectedConditions} from 'protractor';
import {ILocation, until} from "selenium-webdriver";


describe('scrollbar', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test drag-to-replace ', () => {
        beforeEach(() => {
            browser.get('/#/dragdrop/drag-to-replace')
        });

        it('should exchange position', async () => {
            const comBox1 = element(by.tagName('ng-component')).element(by.css('.box1')),
                comBox2 = element(by.tagName('ng-component')).element(by.css('.box2')),
                dragwarpEl = element.all(by.css('.drag-wrap'));
            // expect(comBox1.getLocation()).toBe('');
            expect(dragwarpEl.get(0).getText()).toBe('111');
            expect(dragwarpEl.get(1).getText()).toBe('222');
            browser.sleep(2000);
            browser.actions().dragAndDrop(dragwarpEl.get(0),dragwarpEl.get(1) ).perform();
            browser.sleep(2000);
            // await  browser.wait(ExpectedConditions.textToBePresentInElement(element.all(by.css('.drag-wrap')).get(0), '222'));
            expect(dragwarpEl.get(1).getText()).toBe('111');
            expect(dragwarpEl.get(0).getText()).toBe('222');
        });
    });
});
