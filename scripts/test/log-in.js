const { By } = require('selenium-webdriver');
const SeleniumSetup = require('./selenium-setup');

async function main() {
  const driver = await SeleniumSetup.getDriver('account/log-in');
  try {
    await driver
      .findElement(By.id('email'))
      .sendKeys('example@cartoonkickoff.com');
    await driver.findElement(By.id('password')).sendKeys('&xPkFS0a^b%J%K8P');
    await driver.findElement(By.css('button[type="submit"]')).click();
  } finally {
    // await driver.quit();
  }
}

main();
