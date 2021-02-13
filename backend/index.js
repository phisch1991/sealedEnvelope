var express = require("express");
var cors = require('cors')
var uuid = require('uuid')
var crypto = require('crypto')

const seals = []

var app = express();
const PORT = 4000;

app.use(cors());

app.get("/seals", (req, res, next) => {
    res.json(seals);
});

app.get("/seals/:id", (req, res, next) => {
    const unseal = req.query.mode === 'unseal' ? true : false;
    const sealIndex = seals.findIndex(seal => seal.id === req.params.id)
    if (unseal) {
        seals[sealIndex].status = 'unsealed'
        res.json(seals[sealIndex])
    } else {
        res.json({ id: seals[sealIndex].id, status: seals[sealIndex].status })
    }
});

app.post("/seals", (req, res) => {
    const envelope = {
        id: uuid.v4(),
        status: 'sealed',
        secret: uuid.v4(),
        salt: crypto.pseudoRandomBytes(32).toString('hex')
    }
    seals.push(envelope)
    res.status(201).json(envelope);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});