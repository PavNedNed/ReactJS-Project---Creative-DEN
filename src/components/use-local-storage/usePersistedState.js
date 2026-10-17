import { useState } from 'react';

export default function usePersistedState(initialState, key) {
    const [state, setState] = useState(() => {
        const storageData = localStorage.getItem(key);
        return storageData ? JSON.parse(storageData) : initialState;
    });

    const setPersistedState = (value) => {
        
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    }

    return [
        state,
        setPersistedState,
    ]
}