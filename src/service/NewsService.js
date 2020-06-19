import axios from "axios";

import {LOCAL_STORAGE_NAME_FOR_NEWS_API, REQUEST_QUERY} from "./constants";


const getDateFromAMonthAgo = () => {
    const date = new Date(new Date() - 31 * 24 * 60 * 60 * 1000); // getting the date one month ago
    const year = date.getFullYear(); // getYear() returns currentYear - 1900 e.g 120 while getFullYear gives us exact year
    const month = date.getMonth() + 1; // getDate() returns 1 less than the equivalent for month in number
    const day = date.getDate();

    return `${year}-${month}-${day}`;
};

const getAllNews = async () => {
    const date = getDateFromAMonthAgo();
    const axiosInstance = axios.create({
        baseURL: `https://newsapi.org/v2/top-headlines/?q=${REQUEST_QUERY}&from=${date}`,
        timeout: 3000,
        headers: {'Authorization': `Bearer ${process.env.REACT_APP_NEWS_API_KEY}`}
    });

    return axiosInstance.get(`top-headlines/?q=${REQUEST_QUERY}&from=${date}`).then((res) => {
        if (res.data != null && res.status === 200) {
            localStorage.setItem(LOCAL_STORAGE_NAME_FOR_NEWS_API, JSON.stringify(res.data));
            return res.data;
        } else {
            return null;
        }
    }).catch(() => {
        return localStorage.getItem(LOCAL_STORAGE_NAME_FOR_NEWS_API) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME_FOR_NEWS_API)) : null;
    });

};

export default getAllNews;
