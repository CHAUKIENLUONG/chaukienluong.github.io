import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
    isMenuOpen: boolean;
    darkMode: boolean;
}

const initialState: NavbarState = {
    isMenuOpen: false,
    darkMode: false,
};

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        setMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMenuOpen = action.payload;
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        },
    },
});

export const { toggleMenu, setMenuOpen, toggleDarkMode, setDarkMode } = navbarSlice.actions;
export default navbarSlice.reducer;
