import path from "path";
import dotenv from 'dotenv';

const loadEnv = () => {
    dotenv.config({path: path.resolve(__dirname, '../../.env')});
};

loadEnv();