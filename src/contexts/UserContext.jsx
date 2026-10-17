import { createContext, useContext } from 'react';
import usePersistedState from '../components/use-local-storage/usePersistedState.js';
import useFetch from '../hooks/useFetch.js';

export const UserContext = createContext({
    user: null,
    loginHandler: async () => {},
    registerHandler: async () => {},
    logoutHandler() {},
});

export function UserProvider({ children }) {
    const [user, setUser] = usePersistedState(null, 'auth');

    const { request: loginRequest } = useFetch(
        'auth/v1/token',
        'grant_type=password',
        false,
    );

    const { request: registerRequest } = useFetch(
        'auth/v1/signup',
        '',
        false,
    );

    const loginHandler = async (email, password) => {
        const result = await loginRequest('POST', {
            email,
            password,
        });

        if (result?.access_token) {
            setUser({
                user: result.user,
                accessToken: result.access_token,
                refreshToken: result.refresh_token,
            });
        }

        return result;
    };

    const registerHandler = async (email, password) => {
        const result = await registerRequest('POST', {
            email,
            password,
        });

        // Save the session only if registration also logs
        // the user in and returns an access token.
        if (result?.access_token) {
            setUser({
                user: result.user,
                accessToken: result.access_token,
                refreshToken: result.refresh_token,
            });
        }

        return result;
    };

    const logoutHandler = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                loginHandler,
                registerHandler,
                logoutHandler,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}