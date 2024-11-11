// src/hooks/useFetchData.js
import {useState, useEffect} from 'react';
import {fetchDataFromAPI} from '../services/ApiClient';

export const useFetchData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchDataFromAPI(endpoint);
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint]);

    return {data, loading, error};
};
