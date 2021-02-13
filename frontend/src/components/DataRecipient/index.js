import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import { inboxStore } from '../../lib/db'

function DataRecipient() {

  const [scanned, setScanned] = useState(false)
  const [camera, setCamera] = useState('environment')

  const handleScan = async data => {
    if (data) {
      const parsedData = JSON.parse(data)
      await inboxStore.setItem(parsedData.id, data)
      setScanned(true)
    }
  }

  const handleError = err => {
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
      {!scanned && <div onClick={switchCamera}>
        <QrReader onClick={switchCamera}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          facingMode={camera}
          style={{ width: '290px' }}
        />
      </div>}
      {scanned && <p>Erfolgreich gespeichert!</p>}
    </div>
  );
}

export default DataRecipient;
