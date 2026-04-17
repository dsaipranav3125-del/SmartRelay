const { chromium } = require('playwright')
const path = require('path')

async function run() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 3000, height: 8000 } })

  const imgPath = `file:///${path.resolve('photo/02-dashboard-home.png').replace(/\\/g, '/')}`
  const html = `<html><body style="margin:0;background:#fff;"><img id="img" src="${imgPath}" style="display:block;max-width:none;" /></body></html>`
  await page.setContent(html)
  await page.waitForSelector('#img')

  const box = await page.locator('#img').boundingBox()
  if (!box) throw new Error('Image not found for splitting')

  const x = Math.floor(box.x)
  const y = Math.floor(box.y)
  const width = Math.floor(box.width)
  const height = Math.floor(box.height)
  const partHeight = Math.floor(height / 4)

  for (let i = 0; i < 4; i += 1) {
    const clipY = y + i * partHeight
    const clipHeight = i === 3 ? height - partHeight * 3 : partHeight
    await page.screenshot({
      path: path.resolve(`photo/02-dashboard-part${i + 1}.png`),
      clip: { x, y: clipY, width, height: clipHeight },
    })
  }

  await browser.close()
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})

