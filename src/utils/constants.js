const SERVER_IP = 'localhost:3200';
const API_VERSION = 'v1';

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}/api/${API_VERSION}`,
    API_ROUTES: {
        REGISTER: 'register',
        LOGIN: 'auth/login',
        ADMIN: 'admins',
        USER_ME: "user/me",
        VERIFY_CODE: 'auth/verifycode',
        USERS: 'users',
        UPDATE: 'user/',
        USERS_COMPLETE: 'userscomplete',
        EMAIL_CHANGE_PASSWORD: 'auth/changepassword',
        VERIFY_CURRENT_PASSWORD: 'auth/verifypassword',
        CREATE_CATEGORY: 'category',
        CATEGORIES: 'categories/all',
        CREATE_BOOK: 'book',
        BOOKS_PAGINATION: 'books',
        BOOKS: 'bookscomplete',
        BOOKS_UPDATE: 'books/',
        CATEGORIES_UPDATE: 'categories/',
    },
    JWT:{
        ACCESS: "access",
    }
};
