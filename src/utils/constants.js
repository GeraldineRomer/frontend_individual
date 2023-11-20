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
        USERS_COMPLETE: 'userscomplete'
    },
    JWT:{
        ACCESS: "access",
    }
};
