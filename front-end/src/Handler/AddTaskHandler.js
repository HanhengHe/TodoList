import React, { useContext } from 'react';

import { AuthContext } from './AuthContext'
import { useHttpClient } from './HttpHook';

export const AddTaskHandler = async (title, from, to, description) => {
    const auth = useContext(AuthContext);
    
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', from);
        formData.append('address', to);
        formData.append('image', description);
        await sendRequest('http://localhost:5000/api/tasks', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
    } catch (err) {}

    return "succeed", error;
}