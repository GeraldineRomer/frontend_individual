import { useState, useEffect, createContext } from "react";
import { Auth } from "../api/auth";
import { User } from "../api/user";

export const AuthContext = createContext();
const userController = new User();
const authController = new Auth();

export const AuthProvider = (props) => {
    const { children } = props;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        //comprobar si el usuario está logueado o no
        const checkUserSession = async () => {
            const accessToken = authController.getAccessToken(); 
            //const refreshToken = getRefreshToken();
            console.log(
            `accessToken = ${accessToken}`
            );
            //\nrefreshToken = ${refreshToken}
        }
        checkUserSession();
    }, []);
    
    const login = async (accessToken) => {
        try {
            const response = await userController.getMe(accessToken);
            console.log(response);
            //delete response.new_password;
            // Ya se tienen los datos del usuario para utilizarlos en cualquier vista del frontend
            setUser(response);
            setToken(accessToken);
            console.log("token", accessToken);
        } catch (error) {
            console.log(error);
        }
    };

    const data = {
        accessToken: token,
        user,
        login,
    };

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
