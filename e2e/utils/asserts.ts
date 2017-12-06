import {browser, by, element, ElementFinder, ExpectedConditions} from "protractor";

export function expectToExist(selector: string | ElementFinder, expected: boolean = true){
    if(typeof selector === 'string'){
        expect(element(by.css(selector)).isPresent()).toBe(expected);
    }else if(selector instanceof ElementFinder){
        expect(selector.isPresent()).toBe(expected);
    }
}

