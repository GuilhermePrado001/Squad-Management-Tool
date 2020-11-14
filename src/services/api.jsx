import axios from "axios";

const api = axios.create({
    baseURL: "https://api-football-v1.p.rapidapi.com/v2/players/search/Messi",
    headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": 86400,
        "x-rapidapi-key": "3116346c98msh933694b60985b3fp1c1bfdjsn4a92b141f86d",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "useQueryString": true
    }
});



export default api;