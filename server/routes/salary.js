const express = require("express");
const salaryRoutes = express.Router();
const { User } = require("../models/user");
const puppeteer = require("puppeteer");

salaryRoutes.route("/salary/scraper").get(async function (req, res) {
  console.log("scraper");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.levels.fyi/t/software-engineer?countryId=254", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(
    "#__next > div > div.MuiContainer-root.MuiContainer-maxWidthXl.job-family-page_jobFamilyContainer__fV2kV.css-yp9our > div.MuiGrid-root.MuiGrid-container.css-amehku > div > article > div > div.percentiles_statsAndSelector__tGhxk > div.percentiles_median__ZQVGl > h3",
    { timeout: 5_000 }
  );

  page.on("console", (msg) => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
  });

  const salary = await page.evaluate(() => {
    console.log("inside evaluate");
    const temp = document.querySelector(
      "#__next > div > div.MuiContainer-root.MuiContainer-maxWidthXl.job-family-page_jobFamilyContainer__fV2kV.css-yp9our > div.MuiGrid-root.MuiGrid-container.css-amehku > div > article > div > div.percentiles_statsAndSelector__tGhxk > div.percentiles_median__ZQVGl > h3"
    );
    if (temp) {
      return temp.textContent;
    } else {
      console.log(JSON.stringify(document.body));
      console.log("here");
    }
  });

  console.log("salary: ", salary);
  await browser.close();
  res.status(200).send({ data: salary, message: "Scraped" });
});

module.exports = salaryRoutes;