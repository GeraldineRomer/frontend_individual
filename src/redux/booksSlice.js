import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    totalPages: 0,
    booksComplete: [],
}

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks(state, action){
            state.books = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setBooksComplete(state, action) {
            state.booksComplete = action.payload;
        },
    },
})

export const { setBooks, setTotalPages, setBooksComplete  } = booksSlice.actions;

export default booksSlice.reducer;
