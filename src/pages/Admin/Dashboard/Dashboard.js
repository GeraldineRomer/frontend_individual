import React, { useState } from 'react';
import './Dashboard.scss';
import CategoryIcon from '@mui/icons-material/Category';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReadOutlined,
    UserOutlined,
    } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Users } from '../Users/Users';
import { Books } from '../Books/Books';
import { Categorias } from '../Categorias/Categorias';
import { Alert, AlertTitle } from '@mui/material';
import { Auth } from '../../../api';
const { Header, Sider, Content } = Layout;

export const Dashboard = () => {
    const authController = new Auth();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedSection, setSelectedSection] = useState('1'); 
    const [showAlertLogout, setshowAlertLogout] = useState(false); 
    const handleMenuClick = (key) => {
        setSelectedSection(key); // Actualizar la sección activa al hacer clic en el menú
    };
    const renderSelectedSection = () => {
        switch (selectedSection) {
            case '1':
                return <Users />;
            case '2':
                return <Books/>;
            case '3.1':
                return <Categorias/>;
            default:
                return <Users />; // Componente predeterminado si no se selecciona nada
        }
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //mostrar la alerta para salir de la cuenta
    const handleLogout = () => {
        setshowAlertLogout(true);
    };
    // Cerrar el Alert al hacer clic en "Cancelar"  de salir de la cuenta
    const handleAlertCloseCancelLogout = () => {
        setshowAlertLogout(false); 
    };

    const handleAlertCloseLogout = async () => {
        // Cerrar sesión: eliminar los tokens del caché
        try {
            await authController.logout(); // Método para cerrar sesión y eliminar los tokens del caché
            setshowAlertLogout(true); // Muestra la alerta de cierre de sesión
            window.location.href = '/login'; // Redirección al login después de cerrar sesión
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };
    return (
        <div className='dashboard'>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} className='side'>
                    <div className="demo-logo-vertical" />
                    <Menu
                        className='menu-side'
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        selectedKeys={[selectedSection]}
                        onClick={({ key }) => handleMenuClick(key)}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Usuarios',
                            },
                            {
                                key: '2',
                                icon: <ReadOutlined />,
                                label: 'Libros',
                            },
                            {
                                key: '3',
                                icon: <CategoryIcon />,
                                label: 'Categorías',
                                children: [
                                            {
                                            key: '3.1',
                                            label: 'Crear Categorías',
                                            },
                                            {
                                            key: '3.2',
                                            label: 'Listar Categorías',
                                            },
                                        ],
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        className='header'
                    >
                        <Button
                            className='btn-toggle'
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <label className='label-logout' onClick={handleLogout}>Cerrar Sesión</label>
                    </Header>
                    <Content>{renderSelectedSection()}</Content>
                </Layout>
            </Layout>
            {showAlertLogout && (
                <div className="center-alert">
                    <Alert severity="warning" className="custom-alert">
                        <AlertTitle>Vas a cerrar sesión</AlertTitle>
                        Acepta para salir <strong>¿Estás seguro?</strong>
                        <div className='btn-alert'>
                            <Button variant="outlined" onClick={handleAlertCloseLogout} className='btn'>Aceptar</Button>
                            <Button variant="outlined" onClick={handleAlertCloseCancelLogout} className='btn'>Cancelar</Button>
                        </div>
                    </Alert>
                </div>
            )}
        </div>
    )
}
