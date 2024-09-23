import { COOKIE_TOKEN } from "@/utils/constants";
import axios from "axios";
import Cookies from "js-cookie";
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI as string,
    withCredentials: true,
});
apiClient.interceptors.request.use(
    function (config) {
        const token = Cookies.get(COOKIE_TOKEN);

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            delete config.headers["Authorization"];
        }
        return config;
    },
    function (error) {
        // handle your error;
        return Promise.reject(error);
    }
);

export default apiClient;
