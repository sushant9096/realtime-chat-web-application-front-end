const HOST = process.env.DB_HOST // database connection host
const USER = process.env.DB_USER //database username
const PASS = process.env.DB_PASS // database password
const NAME = process.env.DB_NAME // database name
const DIALECT = process.env.DB_DIALECT //database dialect
const PORT = process.env.DB_PORT //database port

module.exports = {HOST, USER, PASS, NAME,DIALECT, PORT}