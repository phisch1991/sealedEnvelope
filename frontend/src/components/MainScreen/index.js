import logo from '../../logo.svg';
import './style.css';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core'
import DataOwner from '../DataOwner'
import DataRecipient from '../DataRecipient'
import LetterBox from '../LetterBox'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { getNewlyUnsealedEnvelopes } from '../../lib/envelopes'
import { sealStore } from '../../lib/db'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const [unsealedEnvelopes, setUnsealedEnvelopes] = useState([])
  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    for (let envelope of unsealedEnvelopes) {
      let item = await sealStore.getItem(envelope.id)
      item.acknowledged = true
      await sealStore.setItem(item.id, item)
      setUnsealedEnvelopes([])
    }
  };
  useEffect(async () => {
    setUnsealedEnvelopes(await getNewlyUnsealedEnvelopes())
  }, [])


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (

        <div className="centered">
          {children}
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={unsealedEnvelopes.length > 0}
        onClose={handleClose}
        message={`Umschläge von dir wurden geöffnet: ${unsealedEnvelopes.map(envelope => envelope.label)}`}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MainScreen(props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
            <Tab label="Senden" {...a11yProps(0)} />
            <Tab label="Empfangen" {...a11yProps(1)} />
            <Tab label="Briefumschläge" {...a11yProps(2)} />
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
  );
}

export default MainScreen;
