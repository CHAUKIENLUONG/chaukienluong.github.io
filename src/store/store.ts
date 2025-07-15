import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactReducer';
import projectsReducer from './slices/projectsReducer';
import navbarReducer from './slices/navbarReducer';
import aboutReducer from './slices/aboutReducer';

export const store = configureStore({
    reducer: {
        contact: contactReducer,
        projects: projectsReducer,
        navbar: navbarReducer,
        about: aboutReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
