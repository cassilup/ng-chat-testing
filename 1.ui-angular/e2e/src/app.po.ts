import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url = "") {
    return browser.get(`${browser.baseUrl}${url}`) as Promise<any>;
  }

  getLoginFormLabel() {
    return element(by.css('app-root .login-form label')).getText() as Promise<string>;
  }
}
