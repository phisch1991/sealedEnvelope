import React, { useState } from 'react';
import SharedSnackbar from '../components/Snackbar'

export const SharedSnackbarContext = React.createContext();

export function SharedSnackbarProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')

    const openSnackbar = message => {
        setMessage(message)
        setIsOpen(true)
    };

    const closeSnackbar = () => {
        setMessage('')
        setIsOpen(false)
    };

    return (
        <SharedSnackbarContext.Provider
            value={{
                openSnackbar,
                closeSnackbar,
                snackbarIsOpen: isOpen,
                message
            }}
        >
            <SharedSnackbar />
            {children}
        </SharedSnackbarContext.Provider>
    );
}

export const SharedSnackbarConsumer = SharedSnackbarContext.Consumer;