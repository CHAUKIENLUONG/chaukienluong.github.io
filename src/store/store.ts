import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './slices/contactReducer'
import experienceReducer from './slices/experienceReducer'
import languageReducer from './slices/languageSlice'
import navbarReducer from './slices/navbarReducer'
import projectsReducer from './slices/projectsReducer'

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    experience: experienceReducer,
    projects: projectsReducer,
    navbar: navbarReducer,
    language: languageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
