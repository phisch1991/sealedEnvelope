var express = require("express");
var cors = require('cors')
var uuid = require('uuid')
var crypto = require('crypto')

const envelopes = []

var app = express();
const PORT = 4000;

app.use(cors());

app.get("/envelopes", (req, res, next) => {
    res.json(envelopes);
});

app.get("/envelopes/:envelopeId", (req, res, next) => {
    res.json(envelopes.filter(envelope => envelope.id == req.params.envelopeId)[0]);
});

app.post("/envelopes", (req, res, next) => {
    let envelope = {
        id: uuid.v4(),
        status: 'unrevealed',
        secret: uuid.v4(),
        salt: crypto.pseudoRandomBytes(32).toString('hex')
    }
    envelopes.push(envelope)
    res.status(201).json(envelope);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});