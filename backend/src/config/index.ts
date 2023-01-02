import "dotenv/config"

const DEV_PORT = encodeURIComponent(process.env.DB_DEV_PORT!);
const DB_DEV_USER = encodeURIComponent(process.env.DB_DEV_USER!);
const DB_DEV_PASSWORD = encodeURIComponent(process.env.DB_DEV_PASSWORD!);

const PROD_PORT = encodeURIComponent(process.env.DB_PROD_PORT!);
const DB_PROD_USER = encodeURIComponent(process.env.DB_PROD_USER!);
const DB_PROD_PASSWORD = encodeURIComponent(process.env.DB_PROD_PASSWORD!);

module.exports = {
    development: {
        PORT: DEV_PORT,
        DB_USER: DB_DEV_USER,
        DB_PASSWORD: DB_DEV_PASSWORD
    },
    production: {
        PORT: PROD_PORT,
        DB_USER: DB_PROD_USER,
        DB_PASSWORD: DB_PROD_PASSWORD
    }
}