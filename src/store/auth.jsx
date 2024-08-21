import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const API = "http://localhost:5000";
    
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    }
    let isLoggedIn = !!token;
    //Tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token');
    };

    // JWT Authentication - to get the currently loggedIn user data
    const userAuthentication = async ()=>{
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            if(response.ok){
                const data =  await response.json();
                setUser(data.userData);
                setIsLoading(false);
            }
            else{
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Error fetching the user data: ", error);
        }
    }

    // to fetch the services data from database
    const getServices = async ()=>{
        try {
            const response = await fetch(`${API}/api/data/service`, {
                method: "GET",
            })
            if(response.ok){
                const data = await response.json();
                setServices(data.msg);
            }
        } catch (error) {
            toast.error(`Server Error: ${error}`)
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    },[])
    


    return <AuthContext.Provider value={{storeTokenInLS, LogoutUser, isLoggedIn, user, services, authorizationToken, isLoading, API, token}}>
        {children}
    </AuthContext.Provider>
}


export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}