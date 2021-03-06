import logo from '../../logo.svg'
import './style.css'
import PropTypes from 'prop-types'
import React, { useEffect, useContext } from 'react'
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core'
import DataOwner from '../DataOwner'
import DataRecipient from '../DataRecipient'
import LetterBox from '../LetterBox'
import { getNewlyUnsealedEnvelopes, saveEnvelope } from '../../lib/envelopes'
import { sealStore } from '../../lib/db'
import { SharedSnackbarContext } from '../../contexts/SnackbarProvider'
import { useTranslation } from 'react-i18next'

function TabPanel(props) {
  const { openSnackbar } = useContext(SharedSnackbarContext)
  const { children, value, index, ...other } = props
  const { t } = useTranslation()

  useEffect(async () => {
    // TODO: Backend calls are currently executed multiple times without additional use
    const envelopes = await getNewlyUnsealedEnvelopes()
    if (envelopes.length > 0) {
      openSnackbar(
        t('envelopesUnsealed') +
          ': ' +
          JSON.stringify(envelopes.map((envelope) => envelope.label).join(', '))
      )
      for (let envelope of envelopes) {
        let item = await sealStore.getItem(envelope.id)
        item.acknowledged = true
        await sealStore.setItem(item.id, item)
      }
    }
    try {
      const encodedEnvelopeToImport = window.location.hash.replace('#', '')
      if (encodedEnvelopeToImport) {
        const decodedEnvelopeToImport = atob(encodedEnvelopeToImport)
        console.log(decodedEnvelopeToImport)
        openSnackbar(t('envelopeImported'))
        await saveEnvelope(decodedEnvelopeToImport)
      }
    } catch {
      console.log('Could not decode and/or import envelope.')
    }
  }, [])

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="centered">{children}</div>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function MainScreen(props) {
  const [value, setValue] = React.useState(0)
  const { t } = useTranslation()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            <Tab label={t('send')} {...a11yProps(0)} />
            <Tab label={t('receive')} {...a11yProps(1)} />
            <Tab label={t('envelopes')} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <DataOwner />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DataRecipient />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <LetterBox />
        </TabPanel>
      </div>
    </div>
  )
}

export default MainScreen
