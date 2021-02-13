import React, { useState, useEffect } from 'react';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from '@material-ui/core'
import CryptoJS from 'crypto-js';
import { inboxStore } from '../../lib/db'


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: 150,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const decrypt = (data, secret, salt) => {
  const decryptedData = {
    id: data.id,
    schema: data.schema,
    payload: ''
  }
  decryptedData.payload = CryptoJS.AES.decrypt(data.payload, secret).toString(CryptoJS.enc.Utf8).slice(0, -salt.length)

  return decryptedData
}

function LetterBox() {
  const classes = useStyles();

  const [envelopes, setEnvelopes] = useState([])
  const [unsealedEnvelope, setUnsealedEnvelope] = useState({ payload: '' })

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState({
    top: '100px',
    margin: 'auto',
  });

  useEffect(async () => {
    await reloadEnvelopes()
  }, []);

  const unsealEnvelope = async (key) => {
    const data = JSON.parse(await inboxStore.getItem(key))
    fetch(`http://localhost:4000/seals/${data.id}?mode=unseal`)
      .then(res => {
        return res.json()
      })
      .then(seal => {
        setUnsealedEnvelope(decrypt(data, seal.secret, seal.salt))
        console.log(unsealedEnvelope)
        setOpen(true)
      })

  }

  const reloadEnvelopes = async () => {
    const envelopes = []
    for (let key of (await inboxStore.keys())) {
      const item = await inboxStore.getItem(key)
      envelopes.push(JSON.parse(item))
    }
    setEnvelopes(envelopes)
  }

  const deleteEnvelope = async (key) => {
    await inboxStore.removeItem(key)
    await reloadEnvelopes()
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <div>
        Deine Inbox ({envelopes.length}):
      {envelopes.map(envelope => (
        <div className="item">
          <p>{envelope.label}</p>
          <Button onClick={() => unsealEnvelope(envelope.id)} color="secondary">Entsiegeln</Button>
          <Button onClick={() => deleteEnvelope(envelope.id)} color="secondary">Löschen</Button>
        </div>
      ))
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Inhalt</h2>
          <p>
            Unverschlüsselte Nachricht:</p>
          <p> {unsealedEnvelope.payload}
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default LetterBox;
