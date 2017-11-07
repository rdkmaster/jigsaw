import {browser, element, by} from 'protractor';

describe('collapse', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic function', () => {
        beforeEach(() => {
            browser.get('/collapse/basic')
        });

        it('should map the head and content into collapse', () => {
            const collapse1 = element(by.id('test-collapse1'));
            const panes1 = collapse1.all(by.tagName('jigsaw-collapse-pane'));
            expect(panes1.get(0).element(by.css('.jigsaw-collapse-header')).getText()).toBe('测试col');
            expect(panes1.get(0).element(by.css('.jigsaw-collapse-content'))
                .element(by.tagName('jigsaw-input')).isPresent()).toBe(true);

            const collapse2 = element(by.id('test-collapse2'));
            const panes2 = collapse2.all(by.tagName('jigsaw-collapse-pane'));
            expect(panes2.get(0).element(by.css('.jigsaw-collapse-header'))
                .element(by.css('div[jigsaw-title]')).isPresent()).toBe(true);
            expect(panes2.get(0).element(by.css('.jigsaw-collapse-content'))
                .element(by.css('div[jigsaw-body]')).isPresent()).toBe(true);
        });

        it('should drop down and up when click the pane', () => {
            const collapse1 = element(by.id('test-collapse1'));
            const panes1 = collapse1.all(by.tagName('jigsaw-collapse-pane'));

            expect(panes1.get(0).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(false);
            expect(panes1.get(1).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);
            expect(panes1.get(2).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);

            panes1.get(1).element(by.css('.jigsaw-collapse-header')).click();

            expect(panes1.get(0).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(false);
            expect(panes1.get(1).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(false);
            expect(panes1.get(2).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);

            panes1.get(0).element(by.css('.jigsaw-collapse-header')).click();

            expect(panes1.get(0).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);
            expect(panes1.get(1).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(false);
            expect(panes1.get(2).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);
        });

        it('should drop down one pane when set accordion mode', () => {
            const collapse2 = element(by.id('test-collapse2'));
            const panes2 = collapse2.all(by.tagName('jigsaw-collapse-pane'));

            expect(panes2.get(0).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(false);
            expect(panes2.get(1).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);
            expect(panes2.get(2).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);

            panes2.get(1).element(by.css('.jigsaw-collapse-header')).click();

            expect(panes2.get(0).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);
            expect(panes2.get(1).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(false);
            expect(panes2.get(2).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);

            panes2.get(0).element(by.css('.jigsaw-collapse-header')).click();

            expect(panes2.get(0).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(false);
            expect(panes2.get(1).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);
            expect(panes2.get(2).element(by.css('.jigsaw-collapse-item-inactive')).isPresent()).toBe(true);
        })

    })

});
