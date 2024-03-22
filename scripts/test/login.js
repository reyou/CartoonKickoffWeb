const { Builder, By } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

async function main() {
  let options = new edge.Options();

  let driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(options)
    .build();
  try {
    await driver.get('http://localhost:3001/account/login');
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
