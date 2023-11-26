import {ENV} from '../utils/constants';
import axios from "axios";
import { useEffect, useState } from "react";
const { BASE_PATH, API_ROUTES } = ENV;
const CONTENT_TYPE_JSON = "application/json";

export const GetAdmin = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const url = `${BASE_PATH}/${API_ROUTES.ADMIN}/me`;
        console.log(url);
        const response = await axios.get(url);
        setData(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    return data;
};

export const AdminName = () => {

    const adminData = GetAdmin(); 

    const admin = adminData.length > 0 ? adminData[0] : "";

    const fullName = admin.name + admin.lastname
    return fullName;
}

export const GetUsers = async (page = 1, limit = 5) => {
    try {
        const url = `${BASE_PATH}/${API_ROUTES.USERS}?page=${page}&limit=${limit}`;
        console.log("url get users -> " + url);
        const response = await axios.get(url);
        console.log('respuesta de usuarios', response.data);
        return {
            results: response.data.results,
            next: response.data.next
        };
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const toggleUserRole = async (userId, currentActiveStatus, accessToken, users) => {
    const accessTokenString = accessToken;
    console.log("accessTokenString en admin -> " + accessTokenString);
    try {
        const url = `${BASE_PATH}/${API_ROUTES.UPDATE}${userId}`;
        console.log("url patch users -> " + url);

        // Enviar solo la información necesaria para la actualización (en este caso, el estado activo)
        const response = await axios.patch(
            url,
            { active: !currentActiveStatus }, // Invertir el estado de activación/desactivación
            {
                headers: {
                    "Content-Type": CONTENT_TYPE_JSON,
                    Authorization: `Bearer ${accessTokenString}`,
                },
            }
        );

        console.log("Respuesta del toggle después del PATCH -> ", response.data);

        // Actualizar el estado local solo del usuario que ha cambiado
        users.map(user =>
                user._id === userId ? { ...user, active: !currentActiveStatus } : user
            
        );
    } catch (error) {
        console.error(error);
    }
};    


