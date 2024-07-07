import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('PostsPage E2E Test', () => {
  beforeEach(async () => {
    await browser.get('/posts');
    await browser.wait(EC.presenceOf(element(by.css('ion-content'))), 5000);
  });

  it('should have a header with title and logout button', async () => {
    const title = element(by.css('ion-title'));
    expect(await title.getText()).toBe('Home');

    const logoutButton = element(by.cssContainingText('ion-button', 'Logout'));
    expect(await logoutButton.isPresent()).toBe(true);
  });

  it('should have a "Volver" button', async () => {
    const backButton = element(by.cssContainingText('ion-button', 'Volver'));
    expect(await backButton.isPresent()).toBe(true);
  });

  it('should display posts', async () => {
    const posts = element.all(by.css('ion-card'));
    await browser.wait(EC.presenceOf(posts.first()), 10000);
    expect(await posts.count()).toBeGreaterThan(0);
  });

  it('should display correct information for each post', async () => {
    const firstPost = element.all(by.css('ion-card')).first();
    await browser.wait(EC.presenceOf(firstPost), 10000);

    const subtitle = firstPost.element(by.css('ion-card-subtitle'));
    const title = firstPost.element(by.css('ion-card-title'));
    const content = firstPost.element(by.css('ion-card-content'));

    expect(await subtitle.getText()).toMatch(/Post #\d+/);
    expect(await title.getText()).toBeTruthy();
    expect(await content.getText()).toBeTruthy();
  });
});
