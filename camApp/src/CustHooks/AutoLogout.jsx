import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useIdelLogout = () => {

    const navigate = useNavigate();
    useEffect(() => {

        let timer;


        const logout = () => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("ServiceAccessToken")
            localStorage.removeItem("User")
            navigate("/")
        }

        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(logout, 5 * 60 * 1000)
        }
        window.addEventListener("mousemove", resetTimer)
        window.addEventListener("keydown", resetTimer)
        window.addEventListener("click", resetTimer)

        resetTimer()
        return () => {
            clearTimeout(timer);
            window.removeEventListener("mousemove", resetTimer)
            window.removeEventListener("keydown", resetTimer)
            window.removeEventListener("click", resetTimer)
        }

    }, [])

}

export default useIdelLogout