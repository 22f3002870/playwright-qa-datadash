const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [89,90,91,92,93,94,95,96,97,98];
  let total = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    console.log("Visiting:", url);

    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a,b) => a + b, 0);
    console.log(`Seed ${seed} sum:`, pageSum);

    total += pageSum;
  }

  console.log("FINAL TOTAL:", total);

  await browser.close();
})();