import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    titleKey: string; // key for translation
    descriptionKey: string; // key for translation
}

export interface ProjectsState {
    projects: Project[];
}

const initialState: ProjectsState = {
    projects: [
        {
            title: 'Web Warehouse Management',
            description: 'A comprehensive web application for managing warehouse operations, including inventory tracking and order management.',
            image: 'img/warehouse.png',
            technologies: ['React', 'SCSS', 'Node.js', 'MySQL'],
            github: 'https://github.com/CHAUKIENLUONG/client-warehouse-management-web.git',
            titleKey: 'projects.warehouse.title',
            descriptionKey: 'projects.warehouse.description'
        },
        {
            title: 'Web Cinema ticket booking',
            description: 'A responsive web application for booking cinema tickets online.',
            image: 'img/cinema.png',
            technologies: ['HTML', 'CSS', 'JavaScript', 'SCSS', 'C#', 'ASP.NET Core', 'SQL Server'],
            github: 'https://github.com/CHAUKIENLUONG/B-talk.git',
            titleKey: 'projects.cinema.title',
            descriptionKey: 'projects.cinema.description'
        },
        {
            title: 'Web Game Online',
            description: 'An online platform for playing and purchasing video games, featuring user reviews and ratings.',
            image: 'img/webGame.png',
            technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'MySQL'],
            github: 'https://github.com/nkhoaa/laravel-web-game.git',
            titleKey: 'projects.game.title',
            descriptionKey: 'projects.game.description'
        },
    ],
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload);
        },
    },
});

export const { setProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
