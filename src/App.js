import './App.scss';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context';
import { MenuAdmin } from './components/MenuAdmin/MenuAdmin';
import { GeneralRoutes, AdminRoutes } from './config/routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas generales */}
          {GeneralRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {AdminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {/* <Route path="/admin/*" element={<AdminRoutesWithMenu />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;

