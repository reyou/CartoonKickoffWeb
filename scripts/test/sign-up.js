const { By } = require('selenium-webdriver');
const SeleniumSetup = require('./selenium-setup');

async function main() {
  const driver = await SeleniumSetup.getDriver('account/sign-up');
  const email = 'yyszcvpjnrtfqcatxd@cazlp.com';
  const passwordInvalid = '123';
  const password = '&xPkFS0a^b%J%K8P';
  try {
    await driver.findElement(By.id('email')).sendKeys(email);
    await driver.findElement(By.id('password')).sendKeys(password);
    await driver.findElement(By.id('verifyPassword')).sendKeys(password);
    await driver.findElement(By.css('button[type="submit"]')).click();
  } finally {
    // await driver.quit();
  }
}

main();
