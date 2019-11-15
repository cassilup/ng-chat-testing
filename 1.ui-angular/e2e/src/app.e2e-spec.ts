import { browser, logging, element, by, Key } from 'protractor';

describe('workspace-project App', () => {

  it('Exercise 1: should start at the login page', async () => {
    await browser.get("");
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).toContain("/login");
  });

  it('Exercise 2: should send keys "automated testing" to the login username field', async () => {
    await browser.get("/login");
    element(by.css(".login-form #username")).sendKeys("automated testing");
    // browser.sleep(1000);
  });

  it('Exercise 3: should check that submit button is disabled when username field is empty', async () => {
    await browser.get("/login");

    const usernameInput = element(by.css('.login-form #username'));
    usernameInput.clear();

    const submitButton = element(by.css('.login-form .submit-btn'));
    const isElementDisabled = await submitButton.getAttribute('disabled')

    expect(isElementDisabled).toBeTruthy();
  });

  it('Exercise 4: should show the Home page after successfully having logged in', async () => {
    // because the `/home` route invokes ChatService, which opens up a WebSocket Connection
    // that keeps a HTTP request Pending, protractor thinks Angular HTTP calls are still pending.
    // In order to disable that behavior, we need to specify `browser.waitForAngularEnabled(false);`
    await browser.waitForAngularEnabled(false);

    await browser.get("/login");

    const usernameInput = element(by.css('.login-form #username'));
    const passwordInput = element(by.css('.login-form #password'));
    const loginForm = element(by.css('.login-form form'));

    usernameInput.sendKeys("admin");
    passwordInput.sendKeys("pass");

    const urlBeforeLogin = await browser.getCurrentUrl();

    await loginForm.submit();

    const urlAfterLogin = await browser.getCurrentUrl();

    expect(urlBeforeLogin).toContain('/login');
    expect(urlAfterLogin).toContain('/home');
  });

  it('Exercise 5: send a random message and verify that it has been added to the messages list', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get("/home");

    const randomMessage = Math.random().toString(36).substring(2);
    const newMessageInput = element(by.css('.new-message'));

    await newMessageInput.sendKeys(randomMessage);
    await newMessageInput.sendKeys(Key.ENTER);
    await newMessageInput.sendKeys(randomMessage);

    const lastMessage = await element.all(by.css('.message-list li')).last().getText();
    expect(lastMessage).toContain(randomMessage);
  });

  it('Exercise 6: send a new message and notice how the messages count increases', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get("/home");

    const randomMessage = Math.random().toString(36).substring(2);
    const newMessageInput = element(by.css('.new-message'));

    const initialMessagesCount = await element.all(by.css('.message-list li')).count();

    await newMessageInput.sendKeys(randomMessage);
    await newMessageInput.sendKeys(Key.ENTER);

    const newMessagesCount = await element.all(by.css('.message-list li')).count();

    expect(newMessagesCount).toEqual(initialMessagesCount + 1);
  });

  it('Exercise 7: should refresh the page and notice that the count remains the same', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get("/home");

    const randomMessage = Math.random().toString(36).substring(2);
    const newMessageInput = element(by.css('.new-message'));
    await newMessageInput.sendKeys(randomMessage);
    await newMessageInput.sendKeys(Key.ENTER);

    browser.sleep(100); // give the new message time to arrive

    const messagesCountBeforeRefresh = await element.all(by.css('.message-list li')).count();

    await browser.refresh();

    const messagesCountAfterRefresh = await element.all(by.css('.message-list li')).count();

    expect(messagesCountAfterRefresh).toEqual(messagesCountBeforeRefresh);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
