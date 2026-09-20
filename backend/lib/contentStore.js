// File-based content store (no database). The live content lives in
// data/content.json (gitignored, survives deploys); data/content.default.json
// is the committed fallback used to seed it on first run.
const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')

const DATA_DIR = path.join(__dirname, '..', 'data')
const LIVE_PATH = path.join(DATA_DIR, 'content.json')
const DEFAULT_PATH = path.join(DATA_DIR, 'content.default.json')

function ensureLiveFile() {
  if (!fs.existsSync(LIVE_PATH)) {
    fs.copyFileSync(DEFAULT_PATH, LIVE_PATH)
    console.log('Content store: seeded content.json from defaults')
  }
}

async function readContent() {
  ensureLiveFile()
  const raw = await fsp.readFile(LIVE_PATH, 'utf8')
  return JSON.parse(raw)
}

// Atomic write: write to a temp file in the same directory, then rename over
// the live file so a crash mid-write can never leave a truncated content.json.
async function writeContent(content) {
  const tmpPath = `${LIVE_PATH}.tmp`
  await fsp.writeFile(tmpPath, JSON.stringify(content, null, 2), 'utf8')
  await fsp.rename(tmpPath, LIVE_PATH)
}

module.exports = { readContent, writeContent }
