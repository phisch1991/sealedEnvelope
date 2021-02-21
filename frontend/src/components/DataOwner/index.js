import './style.css';
import React, { useState, useContext } from 'react';
import QRCode from 'qrcode.react';
import { TextField, Button } from '@material-ui/core'
import { sealEnvelope } from '../../lib/envelopes'
import { SharedSnackbarContext } from '../../contexts/SnackbarProvider';

function DataOwner() {
  const { openSnackbar } = useContext(SharedSnackbarContext)

  const [encryptedDataString, setEncryptedDataString] = useState('')
  const [payload, setPayload] = useState('')
  const [label, setLabel] = useState('')

  const handleSubmit = async () => {
    if (payload && label) {
      const sealedEnvelope = await sealEnvelope(payload, label)
      setEncryptedDataString(JSON.stringify(sealedEnvelope))
      openSnackbar('Umschlag erfolgreich versiegelt')
    }
  }

  if (!encryptedDataString) {
    return (
      <form noValidate autoComplete="off">
        <TextField required id="label" label="Label" onChange={event => setLabel(event.target.value)} /><br />
        <TextField required id="message" label="Nachricht" onChange={event => setPayload(event.target.value)} /><br /><br />
        <Button onClick={handleSubmit}>Versiegeln</Button>
      </form>
    )
  } else {
    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {encryptedDataString != '' &&
              <QRCode
                value={encryptedDataString}
                size={290}
                level={"H"}
                includeMargin={true}
                className='qrcode'
              /> || <p className="text">Loading...</p>}
          </div>
          <div className="flip-card-back">
            <p>{payload}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default DataOwner;