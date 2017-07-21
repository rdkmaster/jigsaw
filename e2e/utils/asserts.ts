import {ElementFinder} from "protractor";

export function expectToExist(elementFinder: ElementFinder, expected: boolean = true){
    expect(elementFinder.isPresent()).toBe(expected);
}


