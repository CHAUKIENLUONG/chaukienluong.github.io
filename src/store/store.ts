import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './slices/contactReducer'
import experienceReducer from './slices/experienceReducer'
import languageReducer from './slices/languageSlice'
import projectsReducer from './slices/projectsReducer'

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    experience: experienceReducer,
    projects: projectsReducer,
    language: languageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
