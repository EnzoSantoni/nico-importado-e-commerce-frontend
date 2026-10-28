import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_SERVER_URL;

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({children}) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );
    const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token") || null )
    );
    const navigate = useNavigate()

    useEffect(() => {
        user ? localStorage.setItem("user", JSON.stringify(user)) :localStorage.removeItem("user")
        user ? localStorage.setItem("token", JSON.stringify(token)) :localStorage.removeItem("token")


    }, [user, token])
    

    async function login(data) {
        try {
            const response = await axios.post(`${URL}/login`, data);

            setUser(response.data.user)
            setToken(response.data.token)

            Swal.fire({
                title: response.data.message,
                text: "El login se realizo correctamente, sera redirigido en un instante",
                icon: "success",
                timer: 1500
            }).then(() => {
                navigate('/')
                // window.location.href = "/"
            })

        } catch (error) {
            console.log(error);
            Swal.fire("Error", "No se pudo hacer login", "error");
        }
    }

    function logout (){
        setUser('');
        setToken('');
        navigate('/')
    }


    return (
        <UserContext.Provider value={{user, token, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}
