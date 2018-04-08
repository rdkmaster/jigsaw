import {$$, $,browser} from "protractor";
import {expectToExist} from "../utils/asserts";

describe('form', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test template-driven', () => {
        it("should meet conditions when submit form",async()=>{
            await browser.get('/form/template-driven');
            const formFieldSet2 = $("fieldset").$$(".field").get(1);
            await formFieldSet2.$("input").sendKeys("abcd");
            expect(await formFieldSet2.$$("SPAN").get(1).getText()).toBe("Last name should be more than 5 alphabets.");
            await formFieldSet2.$("input").sendKeys("e");
            await expectToExist(formFieldSet2.$$("SPAN").get(1),false);
            expect(await $(".separated").$("button").getCssValue('pointer-events')).toBe('none');
            await $$(".field").get(2).$("jigsaw-radio-option").click();
            await browser.sleep(500);
            expect(await $(".separated").$("button").getCssValue('background-color')).toBe("rgba(65, 173, 220, 1)");
        })
    })
});
