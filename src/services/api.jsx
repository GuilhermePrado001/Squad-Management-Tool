import axios from "axios";

const api = axios.create({
    baseURL: "https://api-football-v1.p.rapidapi.com",
    headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": 86400,
        "X-RapidAPI-Key" : "eb4b70d08cmsh08f503658553b8cp1bb522jsnbf94a831d1d1",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "useQueryString": true
    }
});



export default api;