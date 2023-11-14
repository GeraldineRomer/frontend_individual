import { Flexbox } from "../pages/Flexbox/Flexbox";
import { Contact } from "../pages/Contact/Contact";
import { Products } from "../pages/Products/Products";
import { Home } from "../pages/Home/Home";
import {Privacy} from "../pages/Privacy/Privacy";
import { Login } from "../pages/Login/Login"; 
import { Register } from "../pages/Register/Register";
import { Verify } from "../pages/Verify/Verify";
import { NoVerify } from "../pages/NoVerify/NoVerify";
import { User } from "../pages/User/User";
import { Dashboard } from "../pages/Admin/Dashboard/Dashboard";
import { Users } from "../pages/Admin/Users/Users";

export const GeneralRoutes = [
    { path: "/", component: Home},
    { path: "/privacy", component: Privacy},
    { path: "/login", component: Login},
    { path: "/register", component: Register},
    { path: "/verify", component: Verify},
    { path: "/noverify", component: NoVerify},
    { path: "/user", component: User},
];

export const AdminRoutes = [
    { 
        path: "/admin", 
        component: Dashboard, // La ruta principal del dashboard del admin 
        /* children: [
            { path: "/users", component: Users },
        ] */
    },
    { 
        path: "/admin/users", 
        component: Users, // La ruta principal del dashboard del admin 
        /* children: [
            { path: "/users", component: Users },
        ] */
    },
];

/* const allRoutes = [...GeneralRoutes, ...AdminRoutes];
export default allRoutes;
 */
