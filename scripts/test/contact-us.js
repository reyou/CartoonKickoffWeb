const { Builder, By } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

(async function fillContactForm() {
  // Set up Edge options
  let options = new edge.Options();
  // For Edge version 18 or lower, use `setEdgeChromium(false)`
  // For Edge version 79 or higher, the line below is not needed
  // options.setEdgeChromium(true);

  let driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(options)
    .build();
  try {
    // Open the contact page
    await driver.get('http://localhost:3001/contact');

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
    await driver.quit();
  }
})();
