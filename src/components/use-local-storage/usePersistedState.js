import { useState } from 'react';
export default function usePersistedState(initialState, key) {
    const [state, setState] = useState(() => {
        const storageData = localStorage.getItem(key);
        if (!storageData) {
            return initialState;
        }
        try {
            return JSON.parse(storageData);
        } catch {
            localStorage.removeItem(key);
            return initialState;
        }
    });
    const setPersistedState = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    };
    return [
        state,
        setPersistedState,
    ];
}