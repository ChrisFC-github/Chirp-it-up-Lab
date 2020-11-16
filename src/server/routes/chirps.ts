import * as express from "express";
import { GetChirps, GetChirp, UpdateChirp, CreateChirp, DeleteChirp } from "../utils/chirpstore";

const router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    const data = GetChirps();
    const chirps = Object.keys(data).map((key) => {
        return {
            id: key,
            username: data[key].username,
            message: data[key].message,
        };
    });
    chirps.pop();
    res.json(chirps);
});

router.get("/:id", (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    const data = GetChirp(id);
    const chirp = {
        id: id,
        username: data.username,
        message: data.message
    };
    res.send(JSON.stringify(chirp));
});

router.post("/", (req: express.Request, res: express.Response) => {
    let chirpObj: chirp = {
        username: req.body.username,
        message: req.body.message
    };
    CreateChirp(chirpObj);

    res.sendStatus(200);
});

router.put("/:id", (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    let chirpObj: chirp = {
        username: req.body.username,
        message: req.body.message
    };
    UpdateChirp(id, chirpObj);

    res.sendStatus(200);
});

router.delete("/:id", (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    console.log(id)
    DeleteChirp(id);

    res.send(`chirp ${req.params.id} was deleted`);
});

interface chirp {
    username: string,
    message: string
}

export default router