import axios from "axios";

import {
    GNEWS_API_KEY,
    LOCAL_STORAGE_NAME_FOR_CACHE_DATE,
    LOCAL_STORAGE_NAME_FOR_NEWS_API,
    REQUEST_QUERY
} from "./constants";
/*
* Commented out code in this file were code used for news api, currently we're using gnews api
* */

// const getDateFromAMonthAgo = () => {
//     const date = new Date(new Date() - 31 * 24 * 60 * 60 * 1000); // getting the date one month ago
//     const year = date.getFullYear(); // getYear() returns currentYear - 1900 e.g 120 while getFullYear gives us exact year
//     const month = date.getMonth() + 1; // getDate() returns 1 less than the equivalent for month in number
//     const day = date.getDate();
//
//     return `${year}-${month}-${day}`;
// };

// This tries as much as possible to return saved value else returns null and shows warning alert to the user
const getAllNews = async () => {
    const cacheDate = localStorage.getItem(LOCAL_STORAGE_NAME_FOR_CACHE_DATE) ? new Date(JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME_FOR_CACHE_DATE))) : new Date() - 60 * 60 * 24;
    const currentDate = new Date();

    //const date = getDateFromAMonthAgo();
    const axiosInstance = axios.create({
        baseURL: `https://gnews.io/api/v3/`,
        //baseURL: `https://newsapi.org/v2/top-headlines/?q=${REQUEST_QUERY}&from=${date}`,
        timeout: 3000,
        // headers: {'Authorization': `Bearer ${process.env.REACT_APP_NEWS_API_KEY}`}
    });

    // Check if cache time is 24hrs or more less than current time before sending request
    if (currentDate - cacheDate >= 60 * 60 * 24) {
        return axiosInstance.get(`search?q=${REQUEST_QUERY}&image=required&token=${GNEWS_API_KEY}`).then((res) => {
            if (res.data != null && res.status === 200) {
                localStorage.setItem(LOCAL_STORAGE_NAME_FOR_NEWS_API, JSON.stringify(res.data));
                localStorage.setItem(LOCAL_STORAGE_NAME_FOR_CACHE_DATE, JSON.stringify(new Date()));
                return res.data;
            } else {
                if (!localStorage.getItem(LOCAL_STORAGE_NAME_FOR_NEWS_API)) {
                    alert("Server Error \n Try again tomorrow");
                    return null;
                }

                return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME_FOR_NEWS_API));
            }
        }).catch(() => {
            if (!localStorage.getItem(LOCAL_STORAGE_NAME_FOR_NEWS_API)) {
                alert("Server Error \n Try again tomorrow");
                return null;
            }
            return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME_FOR_NEWS_API));
        });
    } else {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME_FOR_NEWS_API));
    }

};

export default getAllNews;
