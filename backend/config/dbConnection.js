import { Sequelize } from "sequelize";
import "dotenv/config";

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.USER_NAME,
    process.env.USER_PASSWORD,

    {
        host: process.env.HOST_NAME,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false
    }
);

export default db;