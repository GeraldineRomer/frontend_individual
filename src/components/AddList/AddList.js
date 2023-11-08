import React from 'react';
import './AddList.scss';
import { createContext, useContext, useState } from 'react';

const AddContext = createContext();

export function AddsProvider({ children }) {
    const [adds, setAdds] = useState([]);

    const addAdd = (add) => {
        setAdds([...adds, add]);
    };

    return (
        <AddContext.Provider value={{ adds, addAdd }}>
            {children}
        </AddContext.Provider>
    );
}

export function useAdds() {
    return useContext(AddContext);
}
