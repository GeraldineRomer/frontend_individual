import { Flexbox } from "../pages/Flexbox/Flexbox";
import { Contact } from "../pages/Contact/Contact";
import { Products } from "../pages/Products/Products";
import { Home } from "../pages/Home/Home";
import {Privacy} from "../pages/Privacy/Privacy";
import { Login } from "../pages/Login/Login"; 
import { Register } from "../pages/Register/Register";
import { Admin } from "../pages/Admin/Admin";

const GeneralRoutes = [
    { path: "/", component: Home},
    { path: "/flexbox", component: Flexbox},
    { path: "/contact", component: Contact},
    { path: "/products", component: Products},
    {path: "/privacy", component: Privacy},
    {path: "/login", component: Login},
    {path: "/register", component: Register},
    {path: "/admin", component: Admin}
]

const allRoutes = [...GeneralRoutes];
export default allRoutes;
