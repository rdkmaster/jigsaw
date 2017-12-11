import {browser} from "protractor";
import {ILocation, WebElement} from "selenium-webdriver";

export function pressKeys(...keys: string[]): void {
    let actions = browser.actions();
    actions.sendKeys.call(actions, keys).perform();
}

export function mouseMove(location: WebElement | ILocation): void {
    let actions = browser.actions();
    actions.mouseMove(location).perform();
}
