// Generates a bcrypt hash for ADMIN_PASSWORD_HASH in .env.
// Usage: node scripts/hash-password.js "your-password"
const bcrypt = require('bcryptjs')

const password = process.argv[2]
if (!password) {
  console.error('Usage: node scripts/hash-password.js "your-password"')
  process.exit(1)
}

console.log(bcrypt.hashSync(password, 12))
