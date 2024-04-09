const { By, until } = require('selenium-webdriver');
const SeleniumSetup = require('./selenium-setup');

async function main() {
  const driver = await SeleniumSetup.getDriver('account/log-in');
  try {
    const email = 'cdiiyxrswoqnidyruf@cazlv.com';
    const password = '&xPkFS0a^b%J%K8P';
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.css('button[type="submit"]')).click();

    // account page
    await driver.wait(until.elementLocated(By.id('current-email')), 10000);
    const submitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await driver.wait(async () => {
      const isEnabled = await submitButton.isEnabled();
      return isEnabled;
    }, 10000);

    const newEmail = 'bfjyhngpttsyvivmey@cazlq.com';
    await driver.findElement(By.id('newEmail')).sendKeys(newEmail);
    await driver.findElement(By.css('button[type="submit"]')).click();
  } finally {
    // await driver.quit();
  }
}

main();
