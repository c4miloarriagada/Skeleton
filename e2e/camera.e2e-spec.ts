import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('CameraPage E2E Test', () => {
  beforeEach(() => {
    browser.get('/camera');
  });

  it('should have a header with title and logout button', async () => {
    const title = element(by.css('ion-title'));
    expect(await title.getText()).toBe('Camera');

    const logoutButton = element(by.cssContainingText('ion-button', 'Logout'));
    expect(await logoutButton.isPresent()).toBe(true);
  });

  it('should have a "Volver" button', async () => {
    const backButton = element(by.cssContainingText('ion-button', 'Volver'));
    expect(await backButton.isPresent()).toBe(true);
  });

  it('should have a "Take Picture" button', async () => {
    const takePictureButton = element(
      by.cssContainingText('ion-button', 'Take Picture')
    );
    expect(await takePictureButton.isPresent()).toBe(true);
  });

  it('should not display a photo card initially', async () => {
    const photoCard = element(by.css('ion-card'));
    expect(await photoCard.isPresent()).toBe(false);
  });

  it('should navigate back when clicking "Volver" button', async () => {
    const backButton = element(by.cssContainingText('ion-button', 'Volver'));
    await backButton.click();
    expect(await browser.getCurrentUrl()).not.toContain('/camera');
  });
});
