// src/components/FlashMessage/FlashMessage.js
import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const FlashMessage = ({ message, severity, open, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{
                    width: '100%',
                    maxWidth: '600px', // Ajustez cette valeur selon vos besoins
                    '& .MuiAlert-message': {
                        width: '100%',
                        textAlign: 'center'
                    }
                }}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default FlashMessage;