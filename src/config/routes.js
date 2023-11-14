import { Flexbox } from "../pages/Flexbox/Flexbox";
import { Contact } from "../pages/Contact/Contact";
import { Products } from "../pages/Products/Products";
import { Home } from "../pages/Home/Home";
import {Privacy} from "../pages/Privacy/Privacy";
import { Login } from "../pages/Login/Login"; 
import { Register } from "../pages/Register/Register";
import { Admin } from "../pages/Admin/Admin";
import { Verify } from "../pages/Verify/Verify";
import { NoVerify } from "../pages/NoVerify/NoVerify";

const GeneralRoutes = [
    { path: "/", component: Home},
    {path: "/privacy", component: Privacy},
    {path: "/login", component: Login},
    {path: "/register", component: Register},
    {path: "/admin", component: Admin},
    {path: "/verify", component: Verify},
    {path: "/noverify", component: NoVerify}
]

const allRoutes = [...GeneralRoutes];
export default allRoutes;
