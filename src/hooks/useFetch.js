
import { useEffect, useRef, useState } from "react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function useFetch(table, query = "select=*", immediate = true) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const controllerRef = useRef(null);

    async function request(method = "GET", body = null, requestQuery = query) {
        // Cancel the previous request
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${SUPABASE_URL}/${table}?${requestQuery}`,
                {
                    method,
                    headers: {
                        apikey: SUPABASE_KEY,
                        Authorization: `Bearer ${SUPABASE_KEY}`,
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
            if (err.name !== "AbortError") {
                setError(err.message);
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
