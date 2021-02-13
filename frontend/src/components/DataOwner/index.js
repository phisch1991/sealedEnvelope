import './style.css';
import CryptoJS from 'crypto-js';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { sealStore } from '../../lib/db'

function DataOwner() {

  const encryptData = (plaintextData, secret, salt) => {
    const encryptedData = {
      id: plaintextData.id,
      schema: plaintextData.schema,
      payload: ''
    }
    encryptedData.payload = CryptoJS.AES.encrypt(plaintextData.payload + salt, secret).toString()
    return encryptedData
  }

  const [encryptedDataString, setEncryptedDataString] = useState('')
  const [payload] = useState('some test data')

  useEffect(async () => {
    fetch('http://localhost:4000/seals', { method: 'POST' })
      .then(res => {
        return res.json()
      })
      .then(async envelope => {
        let input = {
          id: envelope.id,
          payload
        }
        setEncryptedDataString(JSON.stringify(encryptData(input, envelope.secret, envelope.salt)))
        await sealStore.setItem(envelope.id, { status: 'sealed' })
      })
  }, [])

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
  );
}

export default DataOwner;
