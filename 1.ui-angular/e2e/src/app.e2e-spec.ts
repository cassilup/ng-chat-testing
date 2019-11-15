import { browser, element, by, ExpectedConditions, Key } from "protractor";
import { AppPage } from "./app.po";

const page = new AppPage();

describe("ng-chat-testing", () => {
  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
  });

  it("should check that opening the app redirects to '/login'", async () => {
    page.navigateTo("");
    const currentUrl: string = await page.getCurrentUrl();
    expect(currentUrl).toContain("/login");
  });

  it("should type something", async () => {
    page.navigateTo("");
    await page.usernameElement.sendKeys("automated typing");
    browser.sleep(1000);
  });

  it("should attempt to login and check that it redirects to /home", async () => {
    page.navigateTo("");

    await page.usernameElement.sendKeys("admin");
    await page.passwordElement.sendKeys("pass");

    page.submitButton.click();

    const currentUrl: string = await browser.getCurrentUrl();
    expect(currentUrl).toContain("/home");

    browser.sleep(5000);
  });

  it('should send a random message and see that it appears in the list', () => {
    page.navigateTo("/home");

    const randomMessage = Math.random().toString(36).substring(2);
    const newMessageInput = element(by.css('.new-message'));

    newMessageInput.sendKeys(randomMessage);
    newMessageInput.sendKeys(Key.ENTER);

    const lastMessage = element.all(by.css('.message-list li')).last();

    expect(lastMessage.getText()).toContain(randomMessage);

    browser.sleep(2000);
  });
});
