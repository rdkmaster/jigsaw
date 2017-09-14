import {browser,element,by } from "protractor";
import {before} from "selenium-webdriver/testing";
// import {beforeEach, describe} from "selenium-webdriver/testing";

describe('alert',()=>{
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe('test popup',()=>{
        beforeEach(()=>{
            browser.get('/#/alert/popup');
        });
        it('should be alert when click button popup and display ok when click definite ',()=>{
           const componentEl=element(by.tagName('ng-component')),
               alertButtonEl = componentEl.all(by.css('.jigsaw-button')),
              definiteEl =element(by.id('jigsaw-info-alert-primary-definite')),
              alertStateEl = componentEl.element(by.tagName('p'));
           alertButtonEl.get(0).click();
           expect(alertStateEl.getText()).toBe('waiting for an answer');
           // browser.sleep(300);
           definiteEl.click();
           expect(alertStateEl.getText()).toBe('great! your answer is: alert.button.ok');
        })
    })
describe('test customized',()=>{
    before(()=>{
        browser.get('/#/alert/customized');
    });
    it('should ')
})
});
