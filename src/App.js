import './App.scss';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import allRoutes from './config/routes';

function App() {
  return (
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
    
  );
}

export default App;

