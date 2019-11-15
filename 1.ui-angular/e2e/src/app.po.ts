import { browser, element, by } from 'protractor';

export class AppPage {
  async navigateTo(url) {
    return await browser.get(url);
  }

  async getCurrentUrl() {
    return await browser.getCurrentUrl();
  }

  usernameElement = element(by.id("username"));
  passwordElement = element(by.id("password"));
  submitButton = element(by.css(".submit-btn"));
}
