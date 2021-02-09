import puppeteer from 'puppeteer'
import fs from 'fs'

/** Puppeteer Launch Configs */
const launchConfig = {
  headless: false,
  slowMo: 0
}

/** Sample Google Test */
;(async () => {
  const browser = await puppeteer.launch(launchConfig)
  const page = await browser.newPage()

  setViewPort(page)
  checkOutput()
  const searchBar = '[name=q]'
  const searchBtn = '[name=btnK]'
  const timeElement = '#rso > div:nth-child(1)'

  await page.goto('https://google.com')
  await page.type(searchBar, 'Time', { delay: 100 })
  await page.tap(searchBtn)
  await page.waitForSelector(timeElement)
  await page.screenshot({ path: `output/${new Date(Date.now())}.png` })
  await browser.close()
})()

/** Set View Port size */
function setViewPort(page: puppeteer.Page) {
  page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1
  })
}

/** Create output folder */
function checkOutput() {
  if (!fs.existsSync('./output')) {
    fs.mkdirSync('output')
  }
}
