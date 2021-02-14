import React, { useState, useEffect } from 'react';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from '@material-ui/core'
import { decrypt } from '../../lib/crypto'
import { unsealInfo } from '../../lib/serverAdapter'
import { deleteEnvelope, getAllEnvelopes, getEnvelopeById } from '../../lib/envelopes'

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

function LetterBox() {
  const classes = useStyles();

  const [envelopes, setEnvelopes] = useState([])
  const [unsealedPayload, setUnsealedPayload] = useState('')

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState({
    top: '100px',
    margin: 'auto',
  });

  useEffect(async () => {
    await reloadEnvelopes()
  }, []);

  const unsealEnvelope = async (key) => {
    const envelope = await getEnvelopeById(key)
    let seal = await unsealInfo(envelope.id)
    setUnsealedPayload(decrypt(envelope.payload, seal.secret, seal.salt))
    setOpen(true)
  }

  const reloadEnvelopes = async () => {
    setEnvelopes(await getAllEnvelopes())
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
          <Button onClick={() => deleteEnvelope(envelope.id) && reloadEnvelopes()} color="secondary">Löschen</Button>
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
          <p> {unsealedPayload}
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default LetterBox;
