import { createContext, useContext } from 'react';
import usePersistedState from '../components/use-local-storage/usePersistedState.js';
import useFetch from '../hooks/useFetch.js';

export const UserContext = createContext({
    user: null,
    loginHandler: async () => { },
    registerHandler: async () => { },
    logoutHandler: async () => { },
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

    // const { request: logoutRequest } = useFetch(
    //     'auth/v1/logout',
    //     '',
    //     false,
    // );

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

        // console.log(localStorage.getItem('auth'))

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

    // Handles user logout by clearing the session both locally and on Supabase.
    // Tuk trqbwa, poneje logout trqbwa da izprashta request kum Supabase s access token-a, predi da izchistim local state.
    const logoutHandler = async () => {
        // 1. Grab the token right away while it's still there
        const currentAccessToken = user?.accessToken;

        // console.log('Session before logout:', !!currentAccessToken);

        if (!currentAccessToken) {
            // console.error('No access token available');
            setUser(null);
            return;
        }

        try {
            // 2. Perform a direct fetch to Supabase auth logout
            await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/logout`, {
                method: 'POST',
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${currentAccessToken}`,
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            // console.error('Logout request failed:', error);
        } finally {
            // 3. Always clear local user state regardless of network outcome
            setUser(null);
        }
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