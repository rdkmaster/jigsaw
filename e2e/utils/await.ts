import {browser, by, element, ExpectedConditions} from "protractor";

export async function waitForPresence(selector: string){
    return await browser.wait(ExpectedConditions.presenceOf(element(by.css(selector))),2000)
}

export async function waitForNotPresence(selector: string){
    return await browser.wait(ExpectedConditions.not(ExpectedConditions.presenceOf(element(by.css(selector)))),2000);
}
