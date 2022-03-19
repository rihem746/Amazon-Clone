import axios from "./axios";

const instance= axios.create({
    baseURL: 'http://localhost:5001/challenge-bdc8f/us-central1/api' 
    //THE API (CLOUD FUNCTION) url
});
export default instance;