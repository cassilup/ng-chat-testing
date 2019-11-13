import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should start at the login page', async () => {
    page.navigateTo();
    // browser.sleep(100000);
    const currentUrl = await browser.getCurrentUrl()
    expect(currentUrl).toContain("/login");
  });

  it('should login and see the messages page', async () => {
    page.navigateTo('/login');

    // type in login data
    element(by.css('.login-form #username')).sendKeys('admin')
    element(by.css('.login-form #password')).sendKeys('pass')
    browser.waitForAngularEnabled(false);
    element(by.css('.login-form form')).submit();
    // browser.waitForAngularEnabled(true);

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain("/home");
  });

  it('should be able to send a message and check that it appears in the list', async () => {
  });

  it('should refresh page and check that the same number of messages appear (persistance)', async () => {
  });

  it('should check that appropriate classes are present in the header', () => {
  });

  it('should check that home is only accessible to logged in users', () => {
    // https://blog.cloudboost.io/building-your-first-tests-for-angular5-with-protractor-a48dfc225a75
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
