import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';
import { SharedSnackbarConsumer } from '../../contexts/SnackbarProvider';

const SharedSnackbar = () => (
  <SharedSnackbarConsumer>
    {({ snackbarIsOpen, message, closeSnackbar }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarIsOpen}
        onClose={closeSnackbar}
        message={message}
        action={[
          <IconButton key="close" color="inherit" onClick={closeSnackbar}>
            <Close />
          </IconButton>,
        ]}
      />
    )}
  </SharedSnackbarConsumer>
);

export default SharedSnackbar;