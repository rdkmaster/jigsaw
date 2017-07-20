import {browser, element, by, ProtractorBy, ElementFinder} from 'protractor';
import {WebElement} from "selenium-webdriver";

describe('graph', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test graph display', () => {

        it('should show the graph view', () => {
            browser.get('graph/basic');
            //expectGraphRendered('test-graph');
            expectToExist(getGraphCanvas());
        });

        xit('should show the line bar graph basic', () => {
            browser.get('graph/line-bar-graph-basic');
            expectGraphRendered('test-graph1');
            expectGraphRendered('test-graph2');
        });

        it('should show the line bar graph witch data from ajax', () => {
            browser.get('graph/line-bar-graph-ajax');
            //expectGraphRendered('test-graph');
            expectToExist(getGraphCanvas());
        });

        xit('should show the pie graph', () => {
            browser.get('graph/pie-graph-basic');
            expectGraphRendered('test-graph1');
            expectGraphRendered('test-graph2');
            expectGraphRendered('test-graph3');
        });

        xit('should change size', async () => {
            browser.get('graph/resize');
            expectGraphRendered('test-graph');
            const graphCanvas = element(by.id('test-graph')).element(by.tagName('canvas'));
            const graphWidthInput = element(by.id('graph-width')).element(by.tagName('input'));
            const graphHeightInput = element(by.id('graph-height')).element(by.tagName('input'));
            let graphSize;

            await graphWidthInput.clear();
            await graphHeightInput.clear();
            await graphWidthInput.sendKeys('500');
            await graphHeightInput.sendKeys('200');
            browser.sleep(600);
            graphSize = await graphCanvas.getSize();
            expect(graphSize.width).toBe(500);
            expect(graphSize.height).toBe(200);
        });

        function expectGraphRendered(id){
            expect(element(by.id(id)).element(by.tagName('canvas')).isPresent()).toBe(true);
        }

        function getGraphCanvas(): ElementFinder {
            return element(by.id('test-graph')).element(by.tagName('canvas'));
        }
    })
});

export function expectToExist(selector: string | WebElement | ElementFinder, selectorType: string = 'id', expected = true) {
    return waitForElement(selector, selectorType).then((isPresent: boolean) => {
        expect(isPresent).toBe(expected, `Expected "${selector}"${expected ? '' : ' not'} to exist`);
    });
}

export function waitForElement(selector: string | WebElement | ElementFinder, selectorType: string) {
    if(typeof selector === 'string'){
        if(selectorType == 'css'){
            return browser.isElementPresent(by.css(selector) as ProtractorBy);
        }else if(selectorType == 'id'){
            return browser.isElementPresent(by.id(selector) as ProtractorBy);
        }
    }else{
        return browser.isElementPresent(selector);
    }
}
