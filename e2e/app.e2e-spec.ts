import { GravedadZeroPage } from './app.po';

describe('gravedad-zero App', function() {
  let page: GravedadZeroPage;

  beforeEach(() => {
    page = new GravedadZeroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
