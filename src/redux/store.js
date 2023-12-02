import { configureStore  } from "@reduxjs/toolkit";
import booksReducer from './booksSlice';
import categoriesReducer from './categoriesSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        books: booksReducer,
        categories: categoriesReducer,
    },
    middleware: [thunk],
});

