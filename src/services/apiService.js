import axios from "axios";

const options = {
    method: 'GET',
    url: process.env.REACT_APP_API_SERVICE_URL,
    params: { times: 'yearly', date: '02-04-2022', method: '5', location: 'İstanbul' },
    headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};


const API_SERVICE = axios.create({
    baseURL: process.env.REACT_APP_API_SERVICE_URL,
    method: options.method,
    headers: options.headers,
    params: options.params,
    url: options.url
});

export default API_SERVICE;