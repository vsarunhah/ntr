const express = require("express");
const salaryRoutes = express.Router();
const { User } = require("../models/user");
const puppeteer = require("puppeteer");
const { on } = require("events");

// List of Companies
const companies = ["google"];

// Create urls for each company
const urlArray = companies.map((company) => {
  return `https://www.levels.fyi/companies/${company}/salaries`;
});

//Data structures for scraping
const positionSalaryData = new Map();
const positionLinkMap = new Map();

//Scraping

salaryRoutes.route("/salary/scraper/company").get(async function (req, res) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //Loop through each company url
  for (let i = 0; i < urlArray.length; i++) {
    console.log("url: ", urlArray[i]);
    await page.goto(urlArray[i], { waitUntil: "domcontentloaded" });
    await page.waitForSelector("h6");
    await page.content();

    //logging from page to our console
    page.on("console", (msg) => {
      for (let i = 0; i < msg.args().length; ++i)
        console.log(`${i}: ${msg.args()[i]}`);
    });

    //Get links for each position
    const positionLinks = await page.evaluate(() => {
      const positionLinks = [];
      document
        .querySelectorAll("a[href^='/companies/google/salaries/']")
        .forEach((link) => {
          positionLinks.push(link.href);
        });
      return positionLinks;
    });

    //Create position : link map
    for (let i = 0; i < positionLinks.length; i++) {
      const positionName = positionLinks[i].split("/").pop();
      positionLinkMap[positionName] = positionLinks[i];
    }

    //Loop through each position link
    //TODO: change limit back to 0
    for (let i = positionLinks.length - 3; i < positionLinks.length; i++) {
      console.log("position link: ", positionLinks[i]);
      await page.goto(positionLinks[i], { waitUntil: "domcontentloaded" });
      await page.waitForSelector("a");

      //check if there is only one level
      const oneLevelExists = await page.evaluate(() => {
        const oneLevelExists = document.querySelector(".jss25");
        if (oneLevelExists) {
          return true;
        }
        return false;
      });

      if (oneLevelExists) {
        //Special scraping for one level

        //Returned array structure: [level, total, base, stock, bonus]
        const levelSalaryArray = await page.evaluate(() => {
          const levelSalaryArray = [];
          const level = document.querySelector(".jss44").textContent;
          const total = document.querySelector(".jss40").textContent;
          const baseStockBonus = document.querySelectorAll(".jss48");

          levelSalaryArray.push(
            level,
            total,
            baseStockBonus[0].textContent,
            baseStockBonus[1].textContent,
            baseStockBonus[2].textContent
          );
          return levelSalaryArray;
        });

        //Convert to salaries map
        const salaries = {
          total: levelSalaryArray[1],
          base: levelSalaryArray[2],
          stock: levelSalaryArray[3],
          bonus: levelSalaryArray[4],
        };

        const level = levelSalaryArray[0];
        const levelSalaryData = { level, salaries };

        const position = positionLinks[i].split("/").pop();
        positionSalaryData.set(position, levelSalaryData);
      } else {
        //multiple levels exist

        //handle pagination
        const paginationLinkExists = await page.evaluate(() => {
          return (
            document.querySelector(
              "#__next > div.MuiContainer-root.MuiContainer-maxWidthXl.css-z6jx37 > div > div.MuiBox-root.css-0 > div.MuiTableContainer-root.job-family_tableContainer__MOxEY.css-kge0eu > a"
            ) != null
          );
        });
        if (paginationLinkExists) {
          await page.click(
            "#__next > div.MuiContainer-root.MuiContainer-maxWidthXl.css-z6jx37 > div > div.MuiBox-root.css-0 > div.MuiTableContainer-root.job-family_tableContainer__MOxEY.css-kge0eu > a"
          );
        }

        //Get all salaries for each position
        const allSalaries = await page.evaluate(() => {
          const allSalaries = [];
          document
            .querySelectorAll(
              "table.MuiTable-root.css-1q6os2a > tbody > tr > td"
            )
            .forEach((td) => {
              allSalaries.push(td.innerText);
            });
          return allSalaries;
        });

        // Convert allSalaries to map of maps
        // Structure -> {position : {level : Object of salaries}}

        //Inner map
        const levelSalaryData = new Map();
        for (let j = 0; j < allSalaries.length; j += 5) {
          const level = allSalaries[j];
          const salaries = {
            total: allSalaries[j + 1],
            base: allSalaries[j + 2],
            stock: allSalaries[j + 3],
            bonus: allSalaries[j + 4],
          };
          levelSalaryData.set(level, salaries);
          //   console.log("levelSalaryData: ", levelSalaryData);
        }
        //Outer map
        const position = positionLinks[i].split("/").pop();
        positionSalaryData.set(position, levelSalaryData);
      }
    }

    console.log("positionSalaryData: ", positionSalaryData);
  }
});

/* Practice scraper */

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
      //console.log(JSON.stringify(document.body));
      console.log("here");
    }
  });

  console.log("salary: ", salary);
  await browser.close();
  res.status(200).send({ data: salary, message: "Scraped" });
});

module.exports = salaryRoutes;
