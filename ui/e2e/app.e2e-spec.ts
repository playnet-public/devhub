import { AppPage } from './app.po';

describe('ui App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a logo', () => {
    page.navigateTo();
    expect(page.getLogo()).toBeDefined();
  });
});
