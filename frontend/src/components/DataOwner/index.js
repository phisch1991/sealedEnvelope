import './style.css';
import CryptoJS from 'crypto-js';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

function DataOwner() {

  const encryptData = (plaintextData, secret, salt) => {
    const encryptedData = {
      id: plaintextData.id,
      schema: plaintextData.schema,
      payload: {}
    }
    Object.keys(plaintextData.payload).forEach(key => {
      encryptedData.payload[key] = CryptoJS.AES.encrypt(JSON.stringify(plaintextData.payload[key]) + salt, secret).toString()
    })
    return encryptedData
  }

  const [encryptedDataString, setEncryptedDataString] = useState('')
  const [payload] = useState({
    firstname: "Philipp",
    lastname: "Schneider"
  })

  useEffect(() => {
    fetch('http://localhost:4000/envelopes', { method: 'POST' })
      .then(res => {
        return res.json()
      })
      .then(envelope => {
        let input = {
          id: envelope.id,
          payload
        }
        setEncryptedDataString(JSON.stringify(encryptData(input, envelope.secret, envelope.salt)))
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
          <p>Vorname: {payload.firstname}</p>
          <p>Nachname: {payload.lastname}</p>
        </div>
      </div>
    </div>
  );
}

export default DataOwner;
