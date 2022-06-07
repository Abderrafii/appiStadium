import {useEffect, useState} from "react";

export const useFetchData = (fn, params) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setLoading(true);
        fn(...params)
            .then(data => {
                setData(data.data);
                setError(null);
                setMessage(data.detail)
            })
            .catch(e => {
                setError(e.detail ? e.detail : e);
                setData([]);
                setMessage(null);
            }).finally(() => setLoading(false));
    }, []);

    return {data, loading, error, message};
}