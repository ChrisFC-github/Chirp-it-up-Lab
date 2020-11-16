import * as express from "express";
import chirpsRouter from "./chirps";
import * as mysql from 'mysql';
import Chirpsdata from '../db/chirpsdata';
import db from '../db';

export const Connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'chirps',
    password: 'root',
    database: 'chirps'
});

export const Query = (query: string, values?: Array<string | number>) => {

    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        })
    });
};

const router: express.Router = express.Router();
// router.use("/chirps", chirpsRouter);

router.get('/api/chirps', async (req, res) => {
    try {
        res.json(await db.chirpsdata.all());
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    } 
});

router.get('/api/chirps/:id', async (req, res) => {
    try {
        res.json((await db.chirpsdata.all(req.params.id))[0]);
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    } 
});

export default {
    Chirpsdata
}