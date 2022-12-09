const { User } = require("../models/user");
const puppeteer = require("puppeteer");
const { on } = require("events");
const fileSystem = require("fs");

/*
 * Scrapes data from levels and writes a map of maps of maps to levelsData.json
 * Structure of map of maps of maps -> {company : {position : {level : Object of salaries}}}
 *
 * Note: To scrape data for a new company, add the company to the list of companies below
 * Note: To run this file, run "npm run scrape" in the server directory
 */

// List of Companies
const companies = ["hubspot", "google", "apple", "amazon"];

// Create urls for each company
const urlArray = companies.map((company) => {
  return `https://www.levels.fyi/companies/${company}/salaries`;
});

//Data structures for scraping
const positionLinkMap = new Map();
const companyData = new Map();

scrapeLevels = async () => {
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

    const company = companies[i];
    const positionSalaryData = new Map();

    //Get links for each position
    const positionLinks = await page.evaluate((company) => {
      const positionLinks = [];
      const searchQuery = "a[href^='/companies/" + company + "/salaries/']";
      document.querySelectorAll(searchQuery).forEach((link) => {
        positionLinks.push(link.href);
      });
      return positionLinks;
    }, company);

    //Create position : link map
    for (let i = 0; i < positionLinks.length; i++) {
      const positionName = positionLinks[i].split("/").pop();
      positionLinkMap[positionName] = positionLinks[i];
    }

    //Loop through each position link
    //TODO: change limit back to 0
    for (let i = 0; i < positionLinks.length; i++) {
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
        positionSalaryData.set(position, Object.fromEntries(levelSalaryData));
      }
    }

    //console.log("positionSalaryData: ", positionSalaryData);
    companyData.set(company, Object.fromEntries(positionSalaryData));
    // console.log("companyData: ", companyData);
  }

  await browser.close();
};

//Write scraped data to JSON file
scrapeLevels().then(() => {
  fileSystem.writeFile(
    "levelsData.json",
    JSON.stringify(Object.fromEntries(companyData)),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});
