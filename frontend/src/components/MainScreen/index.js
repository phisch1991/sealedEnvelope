import logo from '../../logo.svg';
import './style.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core'
import DataOwner from '../DataOwner'
import DataRecipient from '../DataRecipient'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabpanel: {

    marginLeft: "auto",
    marginRight: "auto"

}
}));

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
          Coming soon...
        </TabPanel>
      </div>
    </div>
  );
}

export default MainScreen;
