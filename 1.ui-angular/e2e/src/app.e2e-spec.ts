import { browser, element, by, ExpectedConditions } from "protractor";

it("should check that opening the app redirects to '/login'", async () => {
  await browser.get("");
  const currentUrl: string = await browser.getCurrentUrl();
  expect(currentUrl).toContain("/login");
});

it("should type something", async () => {
  browser.get("");
  await element(by.id("username")).sendKeys("automated typing");
  browser.sleep(1000);
});

fit("should attempt to login and check that it redirects to /home", async () => {
  browser.waitForAngularEnabled(false);
  browser.get("");

  await element(by.id("username")).sendKeys("admin");
  await element(by.id("password")).sendKeys("pass");

  element(by.css(".submit-btn")).click();

  // browser.wait(ExpectedConditions.presenceOf(element(by.css('.message-list'))), 5000);

  const currentUrl: string = await browser.getCurrentUrl();
  expect(currentUrl).toContain("/home");

  browser.sleep(5000);
});
