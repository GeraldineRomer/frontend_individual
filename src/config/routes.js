import { Flexbox } from "../pages/Flexbox/Flexbox";
import { Contact } from "../pages/Contact/Contact";
import { Products } from "../pages/Products/Products";
import { Home } from "../pages/Home/Home";
import {Privacy} from "../pages/Privacy/Privacy";
import { Login } from "../pages/Login/Login"; 

const GeneralRoutes = [
    { path: "/", component: Home},
    { path: "/flexbox", component: Flexbox},
    { path: "/contact", component: Contact},
    { path: "/products", component: Products},
    {path: "/privacy", component: Privacy},
    {path: "/login", component: Login}
]

const allRoutes = [...GeneralRoutes];
export default allRoutes;
