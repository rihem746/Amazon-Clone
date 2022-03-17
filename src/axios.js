import axios from "axios";

const instance= axios.create({
    baseURL: '...' //THE API (CLOUD FUNCTION) url
});
export default instance;