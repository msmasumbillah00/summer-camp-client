import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContextProvider';
import { useNavigate } from 'react-router-dom';

const useAxios = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { logOut } = useContext(UserContext);
    const navigate = useNavigate();

    const baseUrl = 'https://summer-camp-school-server-plum.vercel.app';
    const accessToken = localStorage.getItem('car-access-token');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const headers = {};
            if (accessToken) {
                headers.Authorization = `Bearer ${accessToken}`;
            }
            const url = `${baseUrl}/${endpoint}`;
            const response = await axios.get(url, { headers });

            // Check for unauthorized access
            if (response.status === 401) {
                // Log out user and navigate to login page
                localStorage.removeItem('car-access-token');
                navigate("/login");
                logOut();
                return;
            }

            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [baseUrl, accessToken, endpoint, navigate, logOut]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();

        return () => {
            // Cleanup function
        };
    }, [fetchData]);

    return { data, loading, error, refetch };
};

export default useAxios;
