import React, { useState, useEffect, useContext } from 'react'
import './style.css'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Modal } from '@material-ui/core'
import { decrypt } from '../../lib/crypto'
import { unsealInfo } from '../../lib/serverAdapter'
import { useTranslation } from 'react-i18next'
import {
  deleteEnvelope,
  getAllEnvelopes,
  getEnvelopeById,
} from '../../lib/envelopes'
import { SharedSnackbarContext } from '../../contexts/SnackbarProvider'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'relative',
    width: 150,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}))

function LetterBox() {
  const { openSnackbar } = useContext(SharedSnackbarContext)
  const { t } = useTranslation()

  const classes = useStyles()

  const [envelopes, setEnvelopes] = useState([])
  const [unsealedPayload, setUnsealedPayload] = useState('')

  const [open, setOpen] = React.useState(false)
  const [modalStyle] = React.useState({
    top: '100px',
    margin: 'auto',
    borderRadius: '20px',
    border: '',
  })

  useEffect(async () => {
    await reloadEnvelopes()
  }, [])

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
        {t('inbox')} ({envelopes.length}):
        {envelopes.map((envelope) => (
          <div className="item">
            <p>{envelope.label}</p>
            <Button onClick={() => unsealEnvelope(envelope.id)}>
              {t('unseal')}
            </Button>
            <Button
              onClick={() =>
                deleteEnvelope(envelope.id) &&
                reloadEnvelopes() &&
                openSnackbar(t('envelopeDeleted'))
              }
            >
              {t('delete')}
            </Button>
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <p>{t('unsealedMessage')}</p>
          <p> {unsealedPayload}</p>
        </div>
      </Modal>
    </div>
  )
}

export default LetterBox
