
import { useEffect, useRef, useState } from "react";
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router';

import { toast } from 'react-toastify';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function useFetch(table, query = "select=*", immediate = true) {
    const { user, locallyLogout } = useUserContext();
    const navigate = useNavigate();

    // console.log("Access token:", accessToken);

    // console.log("User from context:", user);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const controllerRef = useRef(null);

    async function request(method = "GET", body = null, requestQuery = query) {
        const accessToken = user?.accessToken; // promenih tuk
        //console.log("Access token:", accessToken);

        // Cancel the previous request
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError(null);

        const requestUrl = requestQuery
            ? `${SUPABASE_URL}/${table}?${requestQuery}`
            : `${SUPABASE_URL}/${table}`;

        // console.log("Request URL:", requestUrl);

        try {
            //console.log("Has access token:", Boolean(accessToken));

            const response = await fetch(
                requestUrl,
                {
                    method,
                    headers: {
                        apikey: SUPABASE_KEY,
                        Authorization: `Bearer ${accessToken || SUPABASE_KEY}`,
                        "Content-Type": "application/json",
                        Prefer: "return=representation",
                    },
                    body: body === null ? null : JSON.stringify(body),
                    signal: controller.signal,
                }
            );

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const text = await response.text();
            const result = text ? JSON.parse(text) : null;

            if (method === "GET") {
                setData(result);
            }

            return result;
        } catch (err) {
            
            if (err.name === "AbortError") {
                return null;
            }
            const raw = err.message ?? "Request failed";

            if (raw.includes("JWT expired")) {
                locallyLogout();
                navigate("/login", { replace: true });
                return null;
            }
            
            let extractedError = null;
            try {
                const parsed = JSON.parse(raw.replace(/^Error:\s*/, ""));
                extractedError = parsed?.msg || parsed?.message || parsed?.error_description || null;
            } catch {
                extractedError = null;
            }
            const displayError = extractedError || raw;
            if (displayError === "Invalid login credentials") {
                toast.error("Invalid login credentials");
                setError("Invalid login credentials");
            } else if (displayError === "User already registered") {
                toast.error("User already registered");
                setError("User already registered");
            } else {
                toast.error(displayError);
                setError(displayError);
            }
            return null;
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        if (immediate) {
            request();
        }

        return () => {
            controllerRef.current?.abort();
        };
    }, [table, query]);

    return { data, loading, error, request };
}
