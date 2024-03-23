const { Builder } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const config = require('./config.json');
class SeleniumSetup {
  static async getDriver(url) {
    let options = new edge.Options();
    options.addArguments('--guest');

    let driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
      .build();

    const screenWidth = await driver.executeScript('return screen.availWidth;');
    const screenHeight = await driver.executeScript(
      'return screen.availHeight;'
    );
    const width = screenWidth * 0.8;
    const height = screenHeight;

    await driver.manage().window().setRect({ width: width, height: height });
    await driver.get(`${config.url}/${url}`);
    return driver;
  }
}

module.exports = SeleniumSetup;
