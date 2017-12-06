import {browser} from "protractor";

export function pressKeys(...keys: string[]): void {
    let actions = browser.actions();
    actions.sendKeys.call(actions, keys).perform();
}
