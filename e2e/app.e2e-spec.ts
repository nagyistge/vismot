import { VismotPage } from './app.po';

describe('vismot App', () => {
  let page: VismotPage;

  beforeEach(() => {
    page = new VismotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
