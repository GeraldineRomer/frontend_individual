import axios from 'axios';
import { ENV } from '../utils/constants';

const { BASE_PATH, API_ROUTES, JWT } = ENV;

export class Auth {
    baseapi = BASE_PATH;

    register = async (data) => {
        const url = `${BASE_PATH}/${API_ROUTES.REGISTER}`;
        console.log(url);

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("response desde auth register -> ", response);

            return response.data;
        } catch (error) {
            console.log("error linea 24 auth -> " + error);
            console.error(error);
            throw error;
        }
    };

    login = async (data) => {
        const url = `${BASE_PATH}/${API_ROUTES.LOGIN}`;
        console.log(url);
        const noActive = {
            active: false
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("retorno el json en auto login", response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return noActive;
        }
    };

    verifyCode = async (code) => {
        const url = `${BASE_PATH}/${API_ROUTES.VERIFY_CODE}`;
        console.log("la url en verifycode -> " + url);
        console.log("code en auth -> " + { code });
        try {
            const response = await axios.post(url,  code , {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("response desde auth verifyCode -> ", response.data);

            return response.data;
        } catch (error) {
            console.log("error en auth verifyCode -> ", error);
            console.error(error);
            throw error;
        }
    };

    getAccessToken = async () => {
        const response = await localStorage.getItem(JWT.ACCESS);
        return response;
    };

    setAccessToken = (token) => {
        localStorage.setItem(JWT.ACCESS, token);
    };

    logout = async () => {
        try {
            localStorage.removeItem(JWT.ACCESS);
            localStorage.removeItem(JWT.REFRESH);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw error;
        }
    };

    /* EMAIL_CHANGE_PASSWORD */
    changePassword = async () => {
        const url = `${BASE_PATH}/${API_ROUTES.EMAIL_CHANGE_PASSWORD}`;
        console.log("la url en verifycode -> " + url);
        try {
            const response = await axios.post(url);
            console.log("response desde auth changePassword -> ", response.data);
            return response.data;
        } catch (error) {
            console.log("error en auth changePassword -> ", error);
            console.error(error);
            throw error;
        }
    };

    verifyCurrentPassword = async (newPassword, userId) => {
        const url = `${BASE_PATH}/${API_ROUTES.VERIFY_CURRENT_PASSWORD}`;
        console.log("url verifyCurrentPassword -> ", url);
        console.log("id auth verify -> ", userId);
        try {
            const response = await axios.post(url, { newPassword, userId });
            if (response.status === 200) {
                console.log('La contraseña actual coincide');
                return true;
            }
        } catch (error) {
            console.error('Error al verificar la contraseña actual:', error);
            throw error;
        }
    };
}
