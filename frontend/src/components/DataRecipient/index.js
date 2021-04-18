import React, { useState, useContext } from 'react'
import QrReader from 'react-qr-reader'
import { saveEnvelope } from '../../lib/envelopes'
import { SharedSnackbarContext } from '../../contexts/SnackbarProvider'
import { useTranslation } from 'react-i18next'

function DataRecipient() {
  const { openSnackbar } = useContext(SharedSnackbarContext)
  const [camera, setCamera] = useState('environment')
  const { t } = useTranslation()

  const handleScan = async (data) => {
    if (data) {
      await saveEnvelope(data)
      openSnackbar(t('envelopeSaved'))
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  const switchCamera = () => {
    if (camera == 'environment') {
      setCamera('user')
    } else if (camera == 'user') {
      setCamera('environment')
    }
  }

  return (
    <div>
      <div onClick={switchCamera}>
        <QrReader
          onClick={switchCamera}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          facingMode={camera}
          style={{ width: '290px' }}
        />
      </div>
    </div>
  )
}

export default DataRecipient
