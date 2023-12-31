import axios from 'axios';
import { ENV } from "../utils/constants";
import { useEffect, useState } from 'react';

const USER_ME_ROUTE = ENV.API_ROUTES.USER_ME;
const CONTENT_TYPE_JSON = "application/json";
const USERS_COMPLETE = ENV.API_ROUTES.USERS_COMPLETE;
const UPDATE = ENV.API_ROUTES.UPDATE;

export class User {
    baseApi = ENV.BASE_PATH;

    async getMe(accessToken) {
        console.log("estoy en getme api/user.js -> ",  accessToken);
        const accessTokenString = accessToken.access; // Convertir el objeto a una cadena de texto
        console.log(typeof accessTokenString);
        console.log("el accesstokenstring", accessTokenString);

        try {
            const response = await axios.get(`${ENV.BASE_PATH}/${USER_ME_ROUTE}`, {
                headers: {
                "Content-Type": CONTENT_TYPE_JSON,
                Authorization: `Bearer ${accessTokenString}`,
                },
            });

            console.log("respuesta despues del getMe", response.data);
            return response.data; // Devuelve solo los datos de la respuesta, ya que axios devuelve un objeto con la propiedad 'data'
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getMeId(accessToken) {
        console.log("estoy en getme api/user.js -> ",  accessToken);
        const accessTokenString = accessToken; // Convertir el objeto a una cadena de texto
        console.log(typeof accessTokenString);
        console.log("el accesstokenstring", accessTokenString);

        try {
            const response = await axios.get(`${ENV.BASE_PATH}/${USER_ME_ROUTE}`, {
                headers: {
                "Content-Type": CONTENT_TYPE_JSON,
                Authorization: `Bearer ${accessTokenString}`,
                },
            });

            console.log("respuesta despues del getMe", response.data);
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    
    
}

export const GetUsersComplete = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${ENV.BASE_PATH}/${USERS_COMPLETE}`;
                console.log("url get users -> " + url);
                const response = await axios.get(url);
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
}

export const changePassword = async (userId,  newPassword, accessToken) => {
    const accessTokenString = accessToken;
    console.log("accessTokenString en changePassword -> " + accessTokenString);
    try {
        const url = `${ENV.BASE_PATH}/${UPDATE}${userId}`;
        console.log("url patch users -> " + url);

        const response = await axios.patch(
            url, 
            { password: newPassword },
            {
                headers: {
                    "Content-Type": CONTENT_TYPE_JSON,
                    Authorization: `Bearer ${accessTokenString}`,
                },
            }
        );
        console.log("response changePassword en user -> ", response.status);
        if (response.status !== 200) {
            throw new Error('Error al actualizar la contraseña'); 
        }

        // Si la actualización es exitosa, podrías retornar la respuesta del servidor
        return response;
    } catch (error) {
        console.error(error);
    }
}; 
