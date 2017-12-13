import {browser, by, element, ElementFinder, ExpectedConditions} from "protractor";

export async function waitForPresence(selector: string) {
    return await browser.wait(ExpectedConditions.presenceOf(element(by.css(selector))))
}

export async function waitForNotPresence(selector: string) {
    return await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.css(selector)))));
}

export async function waitForTextPresence(selector: string|ElementFinder, text: any) {
    if (typeof selector === 'string') {
        await browser.wait(ExpectedConditions.textToBePresentInElement(element(by.css(selector)), text));
    }
    else if(selector instanceof ElementFinder) {
        await browser.wait(ExpectedConditions.textToBePresentInElement(selector, text));
    }
}

export async function waitForNotTextPresence(selector: string, text: any) {
    await browser.wait(ExpectedConditions.not(ExpectedConditions.textToBePresentInElement(element(by.css(selector)), text)));
}
