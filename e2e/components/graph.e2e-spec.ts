import {browser, element, by, ElementFinder} from 'protractor';
import {expectToExist, waitForNotPresence, waitForPresence} from "../utils/asserts";

describe('graph', () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
    });

    describe('test graph display', () => {

        it('should show the graph view', () => {
            browser.get('/#/graph/basic');
            expectToExist(getGraphCanvas('test-graph'));
        });

        it('should show the line bar graph basic', () => {
            browser.get('/#/graph/line-bar-graph-basic');
            expectToExist(getGraphCanvas('test-graph1'));
            expectToExist(getGraphCanvas('test-graph2'));
        });

        it('should show the line bar graph witch data from ajax', async () => {
            browser.get('/#/graph/line-bar-graph-ajax');
            await waitForNotPresence('#test-graph2 img.no-data');
            expectToExist(getGraphCanvas('test-graph'));
            
        });

        it('should show the pie graph', async () => {
            browser.get('/#/graph/pie');
            await waitForNotPresence('#test-graph1 img.no-data');
            expectToExist(getGraphCanvas('test-graph1'));
            await waitForNotPresence('#test-graph2 img.no-data');
            expectToExist(getGraphCanvas('test-graph2'));
            await waitForNotPresence('#test-graph3 img.no-data');
            expectToExist(getGraphCanvas('test-graph3'));
        });

        it('should change size', async () => {
            browser.get('/#/graph/resize');
            expectToExist(getGraphCanvas('test-graph'));
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

        function getGraphCanvas(id: string): ElementFinder {
            return element(by.id(id)).element(by.tagName('canvas'));
        }
    })
});

