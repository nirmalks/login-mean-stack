import { MeanStackLoginPage } from './app.po';

describe('mean-stack-login App', () => {
  let page: MeanStackLoginPage;

  beforeEach(() => {
    page = new MeanStackLoginPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
