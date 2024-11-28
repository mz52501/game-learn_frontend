import {useState} from "react";
import {postDataToAPI} from "../services/ApiClient";

export const usePostData = (endpoint, data) => {
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async () => {
        setLoading(true);
        try {
            const result = await postDataToAPI(endpoint, data);
            setResponseData(result);  // Store the successful response data
        } catch (err) {
            setError(err);  // Handle any errors
        } finally {
            setLoading(false);
        }
    };

    return {responseData, loading, error, postData};
};
