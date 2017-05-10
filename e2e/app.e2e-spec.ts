import { TestBasePage } from './app.po';

describe('test-base App', () => {
  let page: TestBasePage;

  beforeEach(() => {
    page = new TestBasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
