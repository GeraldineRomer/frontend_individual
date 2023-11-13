import {ENV} from '../utils/constants';
import axios from "axios";
import { useEffect, useState } from "react";
const { BASE_PATH, API_ROUTES } = ENV;

export const GetAdmin = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const url = `${BASE_PATH}/${API_ROUTES.ADMIN}/me`;
        console.log(url);
        const response = await axios.get(url);
        setData(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    return data;
};

export const AdminName = () => {

    const adminData = GetAdmin(); 

    const admin = adminData.length > 0 ? adminData[0] : "";

    const fullName = admin.name + admin.lastname
    return fullName;
}
