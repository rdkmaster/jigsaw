import {browser, by, element, ElementFinder, ExpectedConditions} from "protractor";
import {waitForNotPresence} from "./asserts";

export type Position = { top: number, left: number };
export type Size = { width: number, height: number };
export type Offset = { x: number, y: number };

export async function expectClosePopup(selector: string, blockSelector?: string) {
    element(by.css(selector)).element(by.css('.fa-times')).click();

    await waitForNotPresence('.jigsaw-dialog');

    if (blockSelector) {
        expect(element(by.css(blockSelector)).isPresent()).toBe(false);
    }
    expect(element(by.css(selector)).isPresent()).toBe(false);
}

export async function expectPopupBlock(selector: string) {
    expect(element(by.css(selector)).isPresent()).toBe(true);

    expect(element(by.css(selector)).getCssValue('position')).toBe('fixed');
    expect(element(by.css(selector)).getCssValue('top')).toBe('0px');
    expect(element(by.css(selector)).getCssValue('left')).toBe('0px');

    const blockSize = await element(by.css(selector)).getSize();
    const windowSize = await getWindowSize();
    expect(blockSize.width).toBe(windowSize.width);
    expect(blockSize.height).toBe(windowSize.height);
}

export async function expectPopupByModal(selector: string, top?: number) {
    expect(element(by.css(selector)).isPresent()).toBe(true);
    const popupSize = await element(by.css(selector)).getSize();
    const popupPosition = await getPopupPosition(popupSize, top);
    expect(element(by.css(selector)).getCssValue('position')).toBe('fixed');
    expect(element(by.css(selector)).getCssValue('top')).toBe(popupPosition.top + 'px');
    expect(element(by.css(selector)).getCssValue('left')).toBe(popupPosition.left + 'px');
}

export async function expectPopupAtPoint(trigger: ElementFinder, selector: string, triggerOffset: Offset, popupOffset: Offset) {
    expect(element(by.css(selector)).isPresent()).toBe(true);
    expect(element(by.css(selector)).getCssValue('position')).toBe('absolute');
    expect(element(by.css(selector)).getCssValue('top')).toBe(
        Math.floor((await trigger.getLocation()).y) + triggerOffset.y + popupOffset.y + 'px');
    expect(element(by.css(selector)).getCssValue('left')).toBe(
        Math.floor((await trigger.getLocation()).x) + triggerOffset.x + popupOffset.x + 'px');
}

export async function getPopupPosition(popupSize: Size, top?: number): Promise<Position> {
    const script = `
        let top, left;
        if(` + top + `){
            top = document.documentElement.clientHeight * ` + top + `;
        }else{
            top = (document.documentElement.clientHeight / 2 - ` + popupSize.height + ` / 2);
        }
        left = (document.documentElement.clientWidth / 2 - ` + popupSize.width + ` / 2);
        return {top: top, left: left}
    `;
    return await browser.executeScript<Position>(script);
}

export async function getWindowSize(): Promise<Size> {
    const script = `
        return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight}
    `;
    return await browser.executeScript<Size>(script);
}
