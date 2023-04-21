require('dotenv').config()

// Databas url hämtas från .env filen med dotenv
module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
}