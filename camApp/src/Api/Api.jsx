import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/camapp"
});

export default api;

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");


    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalReq = error.config;

        if (error.response?.status === 401 &&
            !originalReq._retry &&
            localStorage.getItem("refreshToken")) {
            originalReq._retry = true;
        

        try {
            const refreshToken = localStorage.getItem("refreshToken");
           
            const res = await axios.post(
                "http://localhost:5000/camapp/refresh-token",
                { token: refreshToken }
            );


            const newAccessToken = res.data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);

            originalReq.headers.Authorization = `Bearer ${newAccessToken}`;


            return api(originalReq);

        } catch (error) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/"
        }
    }
        return Promise.reject(error)
    }


)