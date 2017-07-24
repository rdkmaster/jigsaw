import {Ng2RdkPage} from './app.po';
import {waitForPresence} from "./utils/asserts";

describe('Jigsaw App', () => {
    let page: Ng2RdkPage;

    beforeEach(() => {
        page = new Ng2RdkPage();
    });

    it('should display message saying Jigsaw', async () => {
        page.navigateTo();
        await waitForPresence('app-root .app-wrap header h4 a');
        expect(page.getParagraphText()).toEqual('Jigsaw');
    });
});
