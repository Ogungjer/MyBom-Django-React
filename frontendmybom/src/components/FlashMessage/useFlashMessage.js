// src/components/FlashMessage/useFlashMessage.js
import { useState } from 'react';

const useFlashMessage = () => {
    const [flashMessage, setFlashMessage] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const showFlashMessage = (message, severity = 'success') => {
        setFlashMessage({ open: true, message, severity });
    };

    const hideFlashMessage = () => {
        setFlashMessage({ ...flashMessage, open: false });
    };

    return { flashMessage, showFlashMessage, hideFlashMessage };
};

export default useFlashMessage;