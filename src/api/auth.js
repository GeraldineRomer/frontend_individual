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

    createCategory = async (data, accessToken) => {
        const url = `${BASE_PATH}/${API_ROUTES.CREATE_CATEGORY}`;
        console.log(url);
        const accessTokenString = accessToken; 
        console.log("el accesstokenstring en createCategory", accessTokenString);
        console.log("data en createCategory", data);
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessTokenString}`,
                },
            });
            console.log("response desde auth createCategory -> ", response);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getCategories = async (accessToken) => {
        const url = `${BASE_PATH}/${API_ROUTES.CATEGORIES}`;
        console.log(url);
        const accessTokenString = accessToken; 
        console.log("el accesstokenstring en getCategories", accessTokenString);
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessTokenString}`,
                },
            });
            console.log("response desde auth getCategories -> ", response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    createBook = async (data, accessToken) => {
        const url = `${BASE_PATH}/${API_ROUTES.CREATE_BOOK}`;
        console.log(url);
        const accessTokenString = accessToken; 
        console.log("el accesstokenstring en createBook", accessTokenString);
        console.log("data en createBook", data);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('author', data.author);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('status', data.status);
        formData.append('images', data.images);
        formData.append('active', data.active);
        console.log("formdata en createBook", formData.category);
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessTokenString}`,
                },
            });
            console.log("response desde auth createBook -> ", response);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    GetBooks = async (page = 1, limit = 10, accessToken) => {
        const url = `${BASE_PATH}/${API_ROUTES.BOOKS_PAGINATION}?page=${page}&limit=${limit}`;
        console.log("url get users -> " + url);
        const accessTokenString = accessToken; 
        console.log("el accesstokenstring en getBooks", accessTokenString);
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessTokenString}`,
                },
            });
            console.log('respuesta de libros', response.data);
            return {
                results: response.data.results,
                next: response.data.next
            };
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    GetBooksComplete = async (accessToken) => {
        const url = `${BASE_PATH}/${API_ROUTES.BOOKS}`;
        console.log("url get users -> " + url);
        const accessTokenString = accessToken; 
        console.log("el accesstokenstring en getBooksComplete ", accessTokenString);
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessTokenString}`,
                },
            });
            console.log('respuesta de libros completos', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    ActiveBooks = async (bookId, newStatus, accessToken) => {
        const accessTokenString = accessToken;
        console.log("accessTokenString en active books en auth -> " + accessTokenString);
        console.log("newStatus en activebooks ", newStatus);
        const status = newStatus.active;
        try {
            const url = `${BASE_PATH}/${API_ROUTES.BOOKS_UPDATE}${bookId}`;
            console.log("url patch users -> " + url);
            // Enviar solo la información necesaria para la actualización (en este caso, el estado activo)
            const response = await axios.patch(
                url,
                { active: status }, // Invertir el estado de activación/desactivación
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${accessTokenString}`,
                    },
                }
            );
            console.log("Respuesta después del PATCH -> ", response.data);
            if (response.status !== 200) {
                throw new Error('Error al activar el libro en el servidor');
            }
            return response.data;
        } catch (error) {
            console.error('error al cambiar de estado del libro',error);
        }
    };
    
    ActiveCategories = async (categoryId, newStatus, accessToken) => {
        const accessTokenString = accessToken;
        console.log("accessTokenString en active books en auth -> " + accessTokenString);
        console.log("newStatus en activebooks ", newStatus);
        const status = newStatus.active;
        try {
            const url = `${BASE_PATH}/${API_ROUTES.CATEGORIES_UPDATE}${categoryId}`;
            console.log("url patch users -> " + url);
            // Enviar solo la información necesaria para la actualización (en este caso, el estado activo)
            const response = await axios.patch(
                url,
                { active: status }, // Invertir el estado de activación/desactivación
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${accessTokenString}`,
                    },
                }
            );
            console.log("Respuesta después del PATCH -> ", response.data);
            if (response.status !== 200) {
                throw new Error('Error al activar el libro en el servidor');
            }
            return response.data;
        } catch (error) {
            console.error('error al cambiar de estado del libro',error);
        }
    };

    StatusBooks = async (bookId, newStatus, accessToken) => {
        const accessTokenString = accessToken;
        console.log("accessTokenString en active books en auth -> " + accessTokenString);
        console.log("newStatus en activebooks ", newStatus);
        const status = newStatus.status;
        try {
            const url = `${BASE_PATH}/${API_ROUTES.BOOKS_UPDATE}${bookId}`;
            console.log("url patch users -> " + url);
            // Enviar solo la información necesaria para la actualización (en este caso, el estado activo)
            const response = await axios.patch(
                url,
                { status: status }, 
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${accessTokenString}`,
                    },
                }
            );
            console.log("Respuesta después del PATCH -> ", response.data);
            if (response.status !== 200) {
                throw new Error('Error al activar el libro en el servidor');
            }
            return response.data;
        } catch (error) {
            console.error('error al cambiar de estado del libro',error);
        }
    };
}
