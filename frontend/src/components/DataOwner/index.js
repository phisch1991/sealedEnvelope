import './style.css';
import CryptoJS from 'crypto-js';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { sealStore } from '../../lib/db'

function DataOwner() {

  const encryptData = (plaintextData, secret, salt) => {
    const encryptedData = {
      id: plaintextData.id,
      label: plaintextData.label,
      schema: plaintextData.schema,
      payload: ''
    }
    encryptedData.payload = CryptoJS.AES.encrypt(plaintextData.payload + salt, secret).toString()
    return encryptedData
  }

  const [encryptedDataString, setEncryptedDataString] = useState('')
  const [payload] = useState('some test data')
  const [label] = useState('my front door pin')
  const [unsealedEnvelopes, setUnsealedEnvelopes] = useState([])



  useEffect(async () => {
    fetch('http://localhost:4000/seals', { method: 'POST' })
      .then(res => {
        return res.json()
      })
      .then(async envelope => {
        let input = {
          id: envelope.id,
          payload,
          label
        }
        setEncryptedDataString(JSON.stringify(encryptData(input, envelope.secret, envelope.salt)))
        await sealStore.setItem(envelope.id, { label })
        await findUnsealedEnvelopes()
      })
  }, [])

  const findUnsealedEnvelopes = async () => {
    const envelopes = []
    const sealIds = await sealStore.keys()
    for (let sealId of sealIds) {
      let seal = await (await fetch(`http://localhost:4000/seals/${sealId}`)).json()
      if (seal.status != 'sealed') {
        let item = await sealStore.getItem(sealId)
        envelopes.push(item.label)
      }
    }
    setUnsealedEnvelopes(envelopes)

  }

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
      {unsealedEnvelopes.length > 0 && <p className="caution">Achtung, es wurde(n) {unsealedEnvelopes.length} Brief(e) von dir geöffnet:</p>}
      {unsealedEnvelopes.map((label, index) => <p className="caution">{index + 1}: {label}</p>)}

    </div>
  );
}

export default DataOwner;
