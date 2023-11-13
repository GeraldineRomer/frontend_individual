import './App.scss';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import allRoutes from './config/routes';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {allRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.component/>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;

