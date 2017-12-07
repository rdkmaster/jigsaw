import {browser, element, by} from "protractor";

describe('radio', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test basic function', () => {
        beforeEach(() => {
            browser.get('/radio-group/basic');
        });

        it('should checked when click radio button', () => {
            const radioEl = element(by.id('test-radio'));
            const radioButtons = radioEl.all(by.tagName('jigsaw-radio-option'));

            function getCheckedIndexes() {
                return radioButtons.reduce((arr, elem, index) => {
                    return elem.element(by.css('.jigsaw-radio-option-checked')).isPresent().then(isChecked => {
                        if (isChecked) {
                            arr.push(index);
                        }
                        return arr;
                    })
                }, []);
            }

            expect(getCheckedIndexes()).toEqual([5]);

            radioButtons.get(0).click();
            expect(getCheckedIndexes()).toEqual([0]);
            expect(element(by.id('select-message')).getText()).toBe('北京');

            radioButtons.get(2).click();
            expect(getCheckedIndexes()).toEqual([2]);
            expect(element(by.id('select-message')).getText()).toBe('南京');
        });

    })

});
