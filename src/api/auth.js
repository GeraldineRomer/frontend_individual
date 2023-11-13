import {ENV} from '../utils/constants';

const { BASE_PATH, API_ROUTES, JWT } = ENV;

export class Auth {
    baseapi = BASE_PATH;

    register = async (data) => {
        const url = `${BASE_PATH}/${API_ROUTES.REGISTER}`;
        console.log(url);
        const params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log("Mensaje ",params);

        try{
            const response = await fetch(url, params);
            if (!response.ok){
                throw new Error("Error en la solicitud: " + response.status);
            }
            const result = await response.json();
            console.log("soy json " + result);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    login = async (data) => {
        const url = `${BASE_PATH}/${API_ROUTES.LOGIN}`;
        console.log(url);
        const params = {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type": "application/json",
            },
        };
        console.log(params);
        try{
            const response = await fetch(url, params);
            if (!response.ok){
                throw new Error("Error en la solicitud: " + response.status);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getAccessToken = async () => {
        const response = await localStorage.getItem(JWT.ACCESS);
        return response;
    };

    setAccessToken = (token) => {
        localStorage.setItem(JWT.ACCESS, token);
    };
}
