const puppeteer = require("puppeteer");
const BASE_URL = "https://ecobankonline.ecobank.com/index.html?module=login";

const scrapper = {
    browser: null,
    page: null,

    initialize: async () => {
        this.browser = await puppeteer.launch({
            headless: false
        });

        this.page = await this.browser.newPage();
    },

    login: async (login, passwd) => {
        await this.page.goto(BASE_URL, { waitUntil: "load", timeout: 0 });

        await this.page.waitFor(3000);

        const usernameselector = "#login_username";
        const passwordselector = "#login_password";

        await this.page.waitForSelector(usernameselector);
        await this.page.waitForSelector(passwordselector);

        await this.page.type(usernameselector, login);
        await this.page.type(passwordselector, passwd);

        await this.page.click("#login-button");

        await this.page.setDefaultNavigationTimeout(0);
        await this.page.waitFor(2000);

        await this.page.waitForSelector(".networth-value");

        const netbalance = await this.page.evaluate(
            () => document.querySelector(".networth-value").innerText
        );

        const welcomeaccount = await this.page.evaluate(
            () => document.querySelector(".welcome-box-text").innerText
        );
        await this.browser.close();

        return { netbalance, welcomeaccount };
    }
};

module.exports = scrapper;
