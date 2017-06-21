import {Ng2RdkPage} from './app.po';

describe('Jigsaw App', () => {
    let page: Ng2RdkPage;

    beforeEach(() => {
        page = new Ng2RdkPage();
    });

    it('should display message saying Jigsaw', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Jigsaw');
    });
});
