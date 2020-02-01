const puppeteer = require("puppeteer");

const BASE_URL = "";

const trust = {
    browser: null,
    page: null,

    initialize: async () => {
        trust.browser = await puppeteer.launch({
            headless: false
        });

        trust.page = await trust.browser.newPage();

        await trust.page.goto(BASE_URL, { waitUntil: "load", timeout: 0 });

        // await trust.page.waitFor(3000);

        const Services = await trust.page.evaluate(
            () =>
                document.querySelector(
                    ".et_pb_section.et_pb_section_1.et_section_regular"
                ).innerText
        );
        console.log("Law firm services are the following: \n", Services);

        await trust.browser.close();

        return { Services };

        //    const usernameselector = '#login_username';
        //    const passwordselector = '#login_password';

        //     await trust.page.waitForSelector(usernameselector);
        //     await trust.page.waitForSelector(passwordselector);

        //    await trust.page.type(usernameselector, login);
        //    await trust.page.type(passwordselector, passwd);

        //   await trust.page.click('#login-button');

        //   await trust.page.setDefaultNavigationTimeout(0);
        //   await trust.page.waitFor(2000);

        //   await trust.page.waitForSelector('.networth-value');

        //   const netbalance = await trust.page.evaluate(() => document.querySelector('.networth-value').innerText);
        //    console.log('my net balance', netbalance);
    }
};

module.exports = trust;
