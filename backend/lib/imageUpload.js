const crypto = require('crypto')
const path = require('path')
const fs = require('fs/promises')
const multer = require('multer')
const sharp = require('sharp')

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

function createImageReceiver() {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_IMAGE_BYTES, files: 1 },
    fileFilter: (_req, file, done) => {
      if (!ACCEPTED_IMAGE_TYPES.has(file.mimetype)) {
        return done(new Error('Choose a JPG, PNG, or WebP image.'))
      }
      done(null, true)
    },
  })

  return function receiveImage(req, res, next) {
    upload.single('image')(req, res, (err) => {
      if (!err) return next()
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'Image must be 5MB or smaller.' })
      }
      return res.status(400).json({ error: err.message || 'Image upload failed.' })
    })
  }
}

function createImageUploadHandlers({ subdirectory, width, height }) {
  const uploadDirectory = path.join(__dirname, '..', 'data', 'uploads', subdirectory)
  const receiveImage = createImageReceiver()

  async function processImage(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'Choose an image to upload.' })
    }

    let image
    try {
      image = await sharp(req.file.buffer, { limitInputPixels: 25_000_000 })
        .rotate()
        .resize(width, height, { fit: 'cover', position: 'attention' })
        .webp({ quality: 82 })
        .toBuffer()
    } catch (err) {
      console.warn(`Rejected invalid ${subdirectory} image:`, err.message)
      return res.status(400).json({ error: 'The selected file is not a valid image.' })
    }

    const filename = `${crypto.randomUUID()}.webp`
    const outputPath = path.join(uploadDirectory, filename)

    try {
      await fs.mkdir(uploadDirectory, { recursive: true })
      await fs.writeFile(outputPath, image, { flag: 'wx' })
      return res.status(201).json({ image: `/api/uploads/${subdirectory}/${filename}` })
    } catch (err) {
      if (err.code === 'EEXIST') {
        return res.status(409).json({ error: 'Image filename collision. Please try again.' })
      }
      console.error(`Failed to save ${subdirectory} image:`, err)
      return res.status(500).json({ error: 'The image could not be saved.' })
    }
  }

  return [receiveImage, processImage]
}

module.exports = { createImageUploadHandlers }
