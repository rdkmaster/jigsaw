import {browser, by, element, ElementFinder, ExpectedConditions} from "protractor";

export function expectToExist(selector: string | ElementFinder, expected: boolean = true) {
    if (typeof selector === 'string') {
        expect(element(by.css(selector)).isPresent()).toBe(expected);
    } else if (selector instanceof ElementFinder) {
        expect(selector.isPresent()).toBe(expected);
    }
}
export function expectToNotExist(selector: string | ElementFinder, expected: boolean = false) {
    if (typeof selector === 'string') {
        expect(element(by.css(selector)).isPresent()).toBe(expected);
    } else if (selector instanceof ElementFinder) {
        expect(selector.isPresent()).toBe(expected);
    }
}

export async function expectStringFromAlert(expectString: string) {
    await browser.wait(ExpectedConditions.alertIsPresent());
    const alertDialog = browser.switchTo().alert();
    await expect(alertDialog.getText()).toEqual(expectString);
    await alertDialog.accept();
}

export async function expectGlobalBlock(blockElement:ElementFinder){
    await expect(blockElement.getCssValue('position')).toBe('fixed');
    await expect(blockElement.getCssValue('z-index')).toBe('1000');
    await expect(blockElement.getCssValue('background-color')).toBe('rgba(0, 0, 0, 0)');
}
