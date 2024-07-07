import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('LoginPage E2E Test', () => {
  beforeEach(() => {
    browser.get('/login');
  });

  it('should have a header with title', async () => {
    const title = element(by.css('ion-title'));
    expect(await title.getText()).toBe('Skeleton App');
  });
});
