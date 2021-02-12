import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import QrReader from 'react-qr-reader';

function DataRecipient() {

  const [result, setResult] = useState('No result')
  const [camera, setCamera] = useState('environment')


  const handleScan = data => {
    if (data) {
      setResult(data)
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
      <div onClick={switchCamera}>
        <QrReader onClick={switchCamera}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          facingMode={camera}
          style={{ width: '290px' }}
        />
      </div>
    </div>
  );
}

export default DataRecipient;
