import { AppPage } from './app.po';
import { browser, logging, element, by, Key } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should start at the login page', async () => {
    browser.get('');
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain("/login");
  });

  it('should login and see the messages page', async (done) => {
    page.navigateTo('/login');

    // type in login data
    element(by.css('.login-form #username')).sendKeys('admin')
    element(by.css('.login-form #password')).sendKeys('pass')
    browser.waitForAngularEnabled(false);
    element(by.css('.login-form form')).submit();

    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain("/home");
    done();
  });

  it('should check that submit button is disabled when username field is empty', async () => {
    browser.get('/login');

    const usernameInput = element(by.css('.login-form #username'));
    usernameInput.clear();

    const submitButton = element(by.css('.login-form .submit-btn'));
    const isElementDisabled = await submitButton.getAttribute('disabled');

    expect(isElementDisabled).toBeTruthy();
  });

  it('should refresh page and check that the same number of messages appear (persistance)', async () => {
    // const ben = element(by.css('.list')).all(by.tagName('li')).first();
    // const sophi = element(by.css('.list')).all(by.tagName('li')).get(2);
    // sophi.click();

    // const sophiClass = await sophi.getAttribute('class');
    // expect(sophiClass).toMatch('selected'))
  });

  it('should send the keys "automated testing" to the login username field', () => {
    browser.get('/login');
    element(by.css('.login-form #username')).sendKeys("automated testing");
    browser.sleep(1000);
  });

  it('should send a random message and see that it appears in the list', () => {
    browser.waitForAngularEnabled(false);
    browser.get('/home');

    const randomMessage = Math.random().toString(36).substring(2);
    const newMessageInput = element(by.css('.new-message'));

    newMessageInput.sendKeys(randomMessage);
    newMessageInput.sendKeys(Key.ENTER);

    const lastMessage = element.all(by.css('.message-list li')).last();

    expect(lastMessage.getText()).toContain(randomMessage);
  });

  it('should refresh the page and notice that the messages count remains the same', async () => {
    browser.waitForAngularEnabled(false);
    browser.get('/home');

    const randomMessage = Math.random().toString(36).substring(2);
    const newMessageInput = element(by.css('.new-message'));

    const messagesCountBeforeRefresh = await element.all(by.css('.message-list li')).count();

    browser.refresh();

    const messagesCountAfterRefresh = await element.all(by.css('.message-list li')).count();

    expect(messagesCountBeforeRefresh).toEqual(messagesCountAfterRefresh);
  });

  it('should send a random message and see that the message count increases', async () => {
    browser.waitForAngularEnabled(false);
    browser.get('/home');

    const randomMessage = Math.random().toString(36).substring(2);
    const newMessageInput = element(by.css('.new-message'));

    const initialMessagesCount = await element.all(by.css('.message-list li')).count();

    newMessageInput.sendKeys(randomMessage);
    newMessageInput.sendKeys(Key.ENTER);

    const newMessagesCount = await element.all(by.css('.message-list li')).count();

    expect(initialMessagesCount + 1).toEqual(newMessagesCount);
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
