import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FavoritesProvider } from '../src/components/FavoriteList/FavoriteList';
import { AddsProvider } from './components/AddList/AddList';
import { BooksProvider } from './components/BooksList/BooksList';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BooksProvider>
        <FavoritesProvider>
            <AddsProvider>
                <App />
            </AddsProvider>
        </FavoritesProvider>
    </BooksProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
