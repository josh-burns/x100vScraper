const scraperObject = {
  url: "https://www.mpb.com/en-uk/used-equipment/used-photo-and-video/used-mirrorless-cameras/used-fujifilm-mirrorless-cameras/fujifilm-x100v/",

  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector("span");

    const stringIsIncluded = await page.evaluate(() => {
      const outOfStockString =
        "The last Fujifilm X100V is gone, but not for long";
      const selector = "h3 > span";

      try {
        return document
          .querySelector(selector)
          .innerText.includes(outOfStockString);
      } catch (error) {
        return false;
      }
    });

    const sleep = (waitTimeInMs) =>
      new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

    if (!stringIsIncluded) {
      return "CAMERA IS AVAILABLE";
    } else {
      sleep(60000);
    }
  },
};

module.exports = scraperObject;
