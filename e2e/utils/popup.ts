import {browser, by} from "protractor";

export type Position = { top: number, left: number };
export type Size = { width: number, height: number };
export type Offset = { x: number, y: number };

export async function expectClosePopup(popupEl, popupBlock?) {
    popupEl.element(by.css('.fa-times')).click();
    browser.sleep(350);
    if (popupBlock) {
        expect(popupBlock.isPresent()).toBe(false);
    }
    expect(popupEl.isPresent()).toBe(false);
}

export async function expectPopupBlock(popupBlock) {
    expect(popupBlock.isPresent()).toBe(true);

    expect(popupBlock.getCssValue('position')).toBe('fixed');
    expect(popupBlock.getCssValue('top')).toBe('0px');
    expect(popupBlock.getCssValue('left')).toBe('0px');

    const blockSize = await popupBlock.getSize();
    const windowSize = await getWindowSize();
    expect(blockSize.width).toBe(windowSize.width);
    expect(blockSize.height).toBe(windowSize.height);
}

export async function expectPopupByModal(popupEl, top?: number) {
    expect(popupEl.isPresent()).toBe(true);
    const popupSize = await popupEl.getSize();
    const popupPosition = await getPopupPosition(popupSize, top);
    expect(popupEl.getCssValue('position')).toBe('fixed');
    expect(popupEl.getCssValue('top')).toBe(popupPosition.top + 'px');
    expect(popupEl.getCssValue('left')).toBe(popupPosition.left + 'px');
}

export async function expectPopupAtPoint(trigger, popupEl, triggerOffset: Offset, popupOffset: Offset) {
    expect(popupEl.isPresent()).toBe(true);
    expect(popupEl.getCssValue('position')).toBe('absolute');
    expect(popupEl.getCssValue('top')).toBe(
        Math.floor((await trigger.getLocation()).y) + triggerOffset.y + popupOffset.y + 'px');
    expect(popupEl.getCssValue('left')).toBe(
        Math.floor((await trigger.getLocation()).x) + triggerOffset.x + popupOffset.x + 'px');
}

export async function getPopupPosition(popupSize, top?: number): Promise<Position> {
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
