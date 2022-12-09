const express = require("express");
const salaryRoutes = express.Router();
const { User } = require("../models/user");
const puppeteer = require("puppeteer");
const { on } = require("events");
const fileSystem = require("fs");

/*
 * Call this API when you want to read scraped data from JSON file
 * Returns the map of maps of maps of salaries to the frontend
 */
salaryRoutes.route("/salary/scrape").get(async (req, res) => {
  //Read data from JSON file
  const buffer = fileSystem.readFileSync("levelsData.json");
  const fileContent = buffer.toString();
  //console.log(JSON.parse(fileContent));
  res.status(200).send({ data: JSON.parse(fileContent), message: "Scraped" });
});

/* Practice scraper ~ Ignore */

salaryRoutes.route("/salary").get(async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // store Amazon, Microsoft, Google, Facebook, Apple, and Netflix salaries
  const salaries = [];
  await page.goto("https://www.levels.fyi/t/product-manager?countryId=254", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(
    "#__next > div > div.MuiContainer-root.MuiContainer-maxWidthXl.job-family-page_jobFamilyContainer__fV2kV.css-yp9our > div.MuiGrid-root.MuiGrid-container.css-amehku > div > article > div > div.percentiles_statsAndSelector__tGhxk > div.percentiles_median__ZQVGl > h3",
    { timeout: 5_000 }
  );

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
  // store SWE, PM, Designer, and Data Scientist salaries

});

salaryRoutes.route("/salary/scraper").get(async function (req, res) {
  console.log("scraper");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.levels.fyi/t/product-manager?countryId=254", {
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
      //console.log(JSON.stringify(document.body));
      console.log("here");
    }
  });

  console.log("salary: ", salary);
  await browser.close();
  res.status(200).send({ data: salary, message: "Scraped" });
});

module.exports = salaryRoutes;
