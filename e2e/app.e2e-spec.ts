import {browser} from 'protractor';

describe('Jigsaw App', () => {
    browser.waitForAngularEnabled(false);
    browser.get('/');
    it('should have a title', () => {
        expect(browser.getTitle()).toBe('Jigsaw');
    });
});
