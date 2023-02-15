"use strict";
import { Sequelize } from 'sequelize';

const DATABASE: any = 'test1';
const USER: any = 'root';
const PASSWORD: any = 'Meet@2001';
const HOST: any = 'localhost';
const PORT: any = 3306;
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    port: PORT,
    pool: {
        max: 25,
        min: 0,
        idle: 10000
    },
    logging: console.log,
    define: {
        timestamps: false,
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(async function (err) {
    console.log('Unable to connect to the database:', err);
});

const db: any = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db as default };