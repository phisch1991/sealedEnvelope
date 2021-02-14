import './style.css';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { sealEnvelope, getLabelsOfUnsealedEnvelopes } from '../../lib/envelopes'

function DataOwner() {

  const [encryptedDataString, setEncryptedDataString] = useState('')
  const [payload] = useState('some test data')
  const [label] = useState('my front door pin')
  const [unsealedEnvelopes, setUnsealedEnvelopes] = useState([])

  useEffect(async () => {
    setEncryptedDataString(JSON.stringify(await sealEnvelope(payload, label)))
    setUnsealedEnvelopes(await getLabelsOfUnsealedEnvelopes())
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
      {unsealedEnvelopes.length > 0 && <p className="caution">Achtung, es wurde(n) {unsealedEnvelopes.length} Brief(e) von dir geöffnet:</p>}
      {unsealedEnvelopes.map((label, index) => <p className="caution">{index + 1}: {label}</p>)}

    </div>
  );
}

export default DataOwner;