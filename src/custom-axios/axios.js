import axios from "axios";

const instance = axios.create({
    baseURL: "https://e-library-springboot.herokuapp.com/api",
    headers:{
        "Access-Control-Allow-Origin" : "*"
    }
})
export default instance;