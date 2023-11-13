import { ENV } from "../utils/constants";


const USER_ME_ROUTE = ENV.API_ROUTES.USER_ME;
const CONTENT_TYPE_JSON = "application/json";


export class User {
    baseApi = ENV.BASE_PATH;

    async getMe(accessToken) {
        console.log(typeof accessToken);
        const accessTokenString= accessToken.access_token; // Convertir el objeto a una cadena de texto
        console.log(typeof accessTokenString);
        console.log(accessTokenString);
        try {
        const response = await fetch(`${ENV.BASE_PATH}/${USER_ME_ROUTE}`, {
            headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessTokenString}`, // Usar la cadena de texto convertida
            },
        });
        return response.data;
        } catch (error) {
        console.log(error);
        throw error;
        }
    }
}
