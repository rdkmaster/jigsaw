import {browser, by, element, ElementFinder, ExpectedConditions} from "protractor";

export function expectToExist(selector: string | ElementFinder, expected: boolean = true){
    if(typeof selector === 'string'){
        expect(element(by.css(selector)).isPresent()).toBe(expected);
    }else if(selector instanceof ElementFinder){
        expect(selector.isPresent()).toBe(expected);
    }
}

export async function waitForPresence(selector: string){
    return await browser.wait(ExpectedConditions.presenceOf(element(by.css(selector))))
}

export async function waitForNotPresence(selector: string){
    return await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.css(selector)))));
}
