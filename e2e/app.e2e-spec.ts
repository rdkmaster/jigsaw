import { Ng2RdkPage } from './app.po';

describe('ng2-rdk App', () => {
  let page: Ng2RdkPage;

  beforeEach(() => {
    page = new Ng2RdkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
