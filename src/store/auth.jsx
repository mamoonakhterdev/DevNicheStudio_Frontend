import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const storeTokenInLS = (serverToken) => {
        return localStorage.setItem('token', serverToken);
    }

    let isLoggedIn = !!token;
    console.log(isLoggedIn);
    //Tackling the logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token');
    };

    // JWT Authentication - to get the currently loggedIn user data
    const userAuthentication = async ()=>{
        try {
            console.log(token)
            const response = await fetch('http://localhost:5000/api/auth/user', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response.ok){
                const data =  await response.json();
                setUser(data.userData);
            }
            else{
                console.log("Internal Error: ");
            }
        } catch (error) {
            console.error("Error fetching the user data: ", error)
        }
    }
    useEffect(() => {
      userAuthentication();
    },[])
    


    return <AuthContext.Provider value={{storeTokenInLS, LogoutUser, isLoggedIn, user}}>
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