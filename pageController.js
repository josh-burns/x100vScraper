const pageScraper = require("./pageScraper");
require("dotenv").config();
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);

async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    let isAvailable = false;

    while (!isAvailable) {
      await pageScraper.scraper(browser).then((result) => {
        if (result === "CAMERA IS AVAILABLE") {
          console.log(new Date().toLocaleString(), localSuccess);
          client.messages
            .create({
              body: smsSuccess,
              messagingServiceSid: process.env.SID,
              to: process.env.PHONENUMBER,
            })
            .then((message) => console.log(message.sid))
            .done();
          isAvailable = true;
        } else {
          console.log(new Date().toLocaleString(), "not available");
        }
      });
    }
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);

const smsSuccess = "Camera is available, see https://bit.ly/37TEkT7";

let localSuccess = `

THE CAMERA IS IN STOCK!!!!

.-------------------.
/--"--.------.------/|
|fuji |__Ll__| [==] ||
|     | .--. | """" ||
|     |( () )|      ||
|     | '--' |      |/
'-----'------'------'
`;
