import fs from "fs";
import path from "path";
import './config/env';
import express, {Express, Request, Response, Router} from 'express';
import logger from './utils/logger';
import cors from 'cors';

import {errorHandler} from './middleware/errorHandler';
import {sequelize} from './config/database';
import {requestLogger} from "./middleware/requestLogger";

const app: Express = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
const port = process.env.PORT;

app.use(requestLogger);

const router = Router();

const pathToRoutes = path.resolve(__dirname, './routes');

fs.readdirSync(pathToRoutes)
    .filter((file) => file !== 'index.js' && file.indexOf(".map") === -1)
    .forEach((file) => {
        const route = require(path.join(pathToRoutes, file)).default;
        router.use('/', route);
    });

app.use(router);
app.use(errorHandler);

app.get('/', (_req: Request, res: Response) => {
    return res.send('Unity Test Application Backend')
})

sequelize.sync()
    .then(() => {
        logger.info('Database synchronized');
        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        logger.error('Unable to connect to the database: %o', error);
    });

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception: %o', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection: %o', reason);
    process.exit(1);
});
