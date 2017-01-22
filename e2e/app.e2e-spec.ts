import { BootstrapCarouselInNg2Page } from './app.po';

describe('bootstrap-carousel-in-ng2 App', function() {
  let page: BootstrapCarouselInNg2Page;

  beforeEach(() => {
    page = new BootstrapCarouselInNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
