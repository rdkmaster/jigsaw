import {browser, $} from "protractor";


describe('movable', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });
    describe("test movable", () => {
        it("should be clickable and movable", async () => {
            await browser.get("/movable/move-and-click");
            expect(await  $('button').getLocation()).toEqual(jasmine.objectContaining({
                x: 6,
                y: 50
            }));
            await browser.actions().dragAndDrop($('button'), {x: 100, y: 0}).perform();
            expect(await  $('button').getLocation()).toEqual(jasmine.objectContaining({
                x: 106,
                y: 50
            }));
        })
    })
});
