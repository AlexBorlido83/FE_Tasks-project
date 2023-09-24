import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    console.log('equestConfig', requestConfig)
    console.log('applyData', applyData)

    try {
        const response = await fetch(
            requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
        );

        console.log('RESPONSE', response)
        if (!response.ok) {
        throw new Error('Request failed!');
        }

        if (requestConfig.method === 'DELETE' && response.status !== 204) {
            throw new Error('Deletion failed!');
        }

        const data = await response.json();
        applyData(data);
    } catch (err) {
        setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
    }, []);
    return {isLoading, error, sendRequest}
};



export default useHttp;