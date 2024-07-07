import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('HomePage E2E Test', () => {
  beforeEach(() => {
    browser.get('/home');
  });

  it('should display the welcome message', async () => {
    const welcomeMessage = element(by.css('ion-card-title'));
    await browser.wait(EC.visibilityOf(welcomeMessage), 5000);
    expect(await welcomeMessage.getText()).toContain('Bienvenido,');
  });

  it('should have a logout button', async () => {
    const logoutButton = element(by.cssContainingText('ion-button', 'Logout'));
    expect(await logoutButton.isPresent()).toBe(true);
  });

  it('should have a segment with three options', async () => {
    const segment = element(by.css('ion-segment'));
    const options = segment.all(by.css('ion-segment-button'));
    expect(await options.count()).toBe(3);
  });

  it('should have navigation buttons', async () => {
    const buttons = element.all(by.css('ion-buttons ion-button'));
    expect(await buttons.count()).toBe(6);
  });

  it('should have a form with input fields', async () => {
    const form = element(by.css('form'));
    const inputs = form.all(by.css('ion-input'));
    expect(await inputs.count()).toBe(3);
  });

  it('should have an education level select', async () => {
    const select = element(by.css('ion-select'));
    expect(await select.isPresent()).toBe(true);
  });

  it('should have clear and save buttons', async () => {
    const clearButton = element(by.cssContainingText('ion-button', 'Limpiar'));
    const saveButton = element(by.cssContainingText('ion-button', 'Guardar'));
    expect(await clearButton.isPresent()).toBe(true);
    expect(await saveButton.isPresent()).toBe(true);
  });

  it('should change segment content when selecting different options', async () => {
    const segment = element(by.css('ion-segment'));
    const options = segment.all(by.css('ion-segment-button'));

    await options.get(1).click();
    expect(await element(by.tagName('app-certificaciones')).isPresent()).toBe(
      true
    );

    await options.get(2).click();
    expect(await element(by.tagName('app-mis-datos')).isPresent()).toBe(true);
  });

  it('should navigate to different pages when clicking navigation buttons', async () => {
    const todoButton = element(
      by.cssContainingText('ion-button', 'Ir a To-Do App')
    );
    await todoButton.click();
    expect(await browser.getCurrentUrl()).toContain('/todo');

    await browser.navigate().back();

    const profileButton = element(
      by.cssContainingText('ion-button', 'Ir a Mi Perfil')
    );
    await profileButton.click();
    expect(await browser.getCurrentUrl()).toContain('/profile');
  });
});
