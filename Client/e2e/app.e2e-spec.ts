import { GzPrjPage } from './app.po';

describe('gz-prj App', () => {
  let page: GzPrjPage;

  beforeEach(() => {
    page = new GzPrjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
