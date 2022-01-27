import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3//discover/tv?api_key=${API_KEY}&with_network=123",
});
 
export default instance;
