import express from 'express';
import cors from 'cors';
import {v4} from 'uuid';
import crypto from 'crypto';
import winston from 'winston';
import Seal from './types/seal';

const logger = winston.createLogger();

const seals: Seal[] = [];

const app = express();
const PORT: number = 4000;

app.use(cors());

app.get("/seals", (req, res, next) => {
    res.json(seals)
});

app.get("/seals/:id", (req, res, next) => {
    const unseal: boolean = req.query.action === 'unseal' ? true : false;
    const sealIndex: number = seals.findIndex(seal => seal.id === req.params.id)
    if (sealIndex < 0) {
        res.status(404).json({error: 'Not found'})
    }
    if (unseal) {
        seals[sealIndex].status = 'unsealed'
        res.json(seals[sealIndex])
    } else {
        res.json({ id: seals[sealIndex].id, status: seals[sealIndex].status })
    }
});

app.post("/seals", (req, res) => {
    const seal: Seal = {
        id: v4(),
        status: 'sealed',
        secret: v4(),
        salt: crypto.pseudoRandomBytes(32).toString('hex')
    }
    seals.push(seal)
    res.status(201).json(seal);
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

export {
    app
}