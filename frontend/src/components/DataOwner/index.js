import './style.css'
import React, { useState, useContext } from 'react'
import QRCode from 'qrcode.react'
import { TextField, Button, Link } from '@material-ui/core'
import { sealEnvelope } from '../../lib/envelopes'
import { SharedSnackbarContext } from '../../contexts/SnackbarProvider'
import { useTranslation } from 'react-i18next'

function DataOwner() {
  const { openSnackbar } = useContext(SharedSnackbarContext)
  const { t } = useTranslation()

  const [encryptedDataString, setEncryptedDataString] = useState('')
  const [payload, setPayload] = useState('')
  const [label, setLabel] = useState('')

  const handleSubmit = async () => {
    if (payload && label) {
      const sealedEnvelope = await sealEnvelope(payload, label)
      setEncryptedDataString(JSON.stringify(sealedEnvelope))
      openSnackbar(t('envelopeSealed'))
    }
  }

  if (!encryptedDataString) {
    return (
      <form noValidate autoComplete="off">
        <TextField
          required
          id="label"
          label={t('label')}
          onChange={(event) => setLabel(event.target.value)}
        />
        <br />
        <TextField
          required
          id="message"
          label={t('message')}
          onChange={(event) => setPayload(event.target.value)}
        />
        <br />
        <br />
        <Button onClick={handleSubmit}>{t('seal')}</Button>
      </form>
    )
  } else {
    return (
      <>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              {(encryptedDataString != '' && (
                <QRCode
                  value={encryptedDataString}
                  size={290}
                  level={'H'}
                  includeMargin={true}
                  className="qrcode"
                />
              )) || <p className="text">Loading...</p>}
            </div>
            <div className="flip-card-back">
              <p>{payload}</p>
            </div>
          </div>
        </div>
        <p>
          <Link href={window.location.origin + '#' + btoa(encryptedDataString)}>
            {t('envelopeUrlTransfer')}
          </Link>
        </p>
      </>
    )
  }
}

export default DataOwner
