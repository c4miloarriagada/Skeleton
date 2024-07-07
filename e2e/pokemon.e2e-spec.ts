import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('PokemonPage E2E Test', () => {
  beforeEach(() => {
    browser.get('/pokemon');
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

  it('should display a grid of Pokemon cards', async () => {
    const cards = element.all(by.css('ion-card'));
    await browser.wait(EC.presenceOf(cards.first()), 5000);
    expect(await cards.count()).toBeGreaterThan(0);
  });

  it('should navigate back when clicking "Volver" button', async () => {
    const backButton = element(by.cssContainingText('ion-button', 'Volver'));
    await backButton.click();
    expect(await browser.getCurrentUrl()).not.toContain('/pokemon');
  });
});
