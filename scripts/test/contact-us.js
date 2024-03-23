const { By } = require('selenium-webdriver');
const SeleniumSetup = require('./selenium-setup');

async function main() {
  try {
    // Open the contact page
    const driver = await SeleniumSetup.getDriver('contact');

    // Fill in the form fields
    await driver.findElement(By.id('name')).sendKeys('John Doe');
    await driver.findElement(By.id('email')).sendKeys('john.doe@example.com');
    await driver
      .findElement(By.id('message'))
      .sendKeys('This is a test message.');

    // Hit submit
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Add a wait or other actions as needed
    // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    // Quit the browser after the actions
    // await driver.quit();
  }
}

main();
