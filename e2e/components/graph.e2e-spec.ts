import {browser, element, by, ElementFinder, ExpectedConditions} from 'protractor';
import {expectToExist, waitForNotPresence, waitForPresence} from "../utils/index";

describe('graph', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test graph display', () => {

        it('should show the graph view', () => {
            browser.get('/graph/basic');
            expectToExist(getGraphCanvas('test-graph'));
        });

        it('should show the line bar graph basic', () => {
            browser.get('/graph/line-bar-graph-basic');
            expectToExist(getGraphCanvas('test-graph1'));
            expectToExist(getGraphCanvas('test-graph2'));
        });

        it('should show the line bar graph witch data from ajax', async () => {
            await browser.get('/graph/line-bar-graph-ajax');
            browser.sleep(1000);
            await expectToExist(getGraphCanvas('test-graph'));
        });

        it('should show the pie graph', async () => {
            await browser.get('/graph/pie');
            browser.sleep(1000);
            await expectToExist(getGraphCanvas('test-graph1'));
            browser.sleep(1000);
            await expectToExist(getGraphCanvas('test-graph2'));
            browser.sleep(1000);
            await expectToExist(getGraphCanvas('test-graph3'));
        });

        it('should change size', async () => {
            browser.get('/graph/resize');
            const graphCanvas = element(by.id('test-graph')).element(by.tagName('canvas'));
            const graphWidthInput = element(by.id('graph-width')).element(by.tagName('input'));
            const graphHeightInput = element(by.id('graph-height')).element(by.tagName('input'));
            let graphSize;
            await waitForPresence('.jigsaw-input');
            await waitForPresence('.jigsaw-graph');
            await graphWidthInput.clear();
            await graphHeightInput.clear();
            await graphWidthInput.sendKeys('500');
            await graphHeightInput.sendKeys('200');
            await browser.sleep(1000);
            graphSize = await graphCanvas.getSize();
            await expect(graphSize.width).toBe(500);
            await  expect(graphSize.height).toBe(200);
        });

        function getGraphCanvas(id: string): ElementFinder {
            return element(by.id(id)).element(by.tagName('canvas'));
        }
    })
});

