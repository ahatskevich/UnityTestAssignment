import { Sequelize } from 'sequelize';
import logger from "../utils/logger";

export const sequelize = new Sequelize({
    dialect: 'mysql' as const,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: (msg) => logger.debug(msg),
});
