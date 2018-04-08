import {$$, $,browser} from "protractor";
import {expectToExist} from "../utils/asserts";
import {waitForPresence} from "../utils/await";

describe('notification', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test full', () => {
        it("should popup notification as regulations",async()=>{
            await browser.get('/notification/full');
            await $('.wrapper').$$("input").get(0).clear();
            await $('.wrapper').$$("input").get(0).sendKeys("消息写入");
            await $('.wrapper').$$("input").get(1).clear();
            await $('.wrapper').$$("input").get(1).sendKeys("标题写入");
            await $('.wrapper').$$("input").get(2).clear();
            await $('.wrapper').$$("input").get(2).sendKeys("fa fa-info");
            await $("jigsaw-button").click();
            await waitForPresence("jigsaw-notification");
            expect(await $(".jigsaw-notification-icon").$("i").getAttribute("class")).toBe("jigsaw-notification-icon fa fa-info");
            const notificationText = $('.jigsaw-notification-text');
            expect(await notificationText.$$("div").get(0).getText()).toBe("标题写入");
            expect(await notificationText.$$("div").get(1).getText()).toBe("消息写入");
        })
    })
});
