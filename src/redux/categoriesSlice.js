import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    token: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action) {
        state.categories = action.payload;
        },
        setToken(state, action) {
        state.token = action.payload;
        },
    },
});

export const { setCategories, setToken } = categoriesSlice.actions;
export default categoriesSlice.reducer;
