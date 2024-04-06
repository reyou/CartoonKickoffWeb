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
    const newEmailInput = await driver.wait(
      until.elementIsEnabled(driver.findElement(By.id('newEmail'))),
      10000
    );

    const newEmail = 'qmmtcvgewnnwthjyef@cazlp.com';
    await newEmailInput.sendKeys(email);
    await driver.findElement(By.css('button[type="submit"]')).click();
  } finally {
    // await driver.quit();
  }
}

main();
