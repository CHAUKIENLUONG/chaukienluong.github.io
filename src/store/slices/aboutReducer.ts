import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Skill {
    name: string;
    level: string;
    nameKey?: string; // key for translation
}

interface Experience {
    title: string;
    company: string;
    description: string;
    titleKey: string; // key for translation
    companyKey: string; // key for translation
    descriptionKey: string; // key for translation
}

interface AboutState {
    skills: Skill[];
    experiences: Experience[];
}

const initialState: AboutState = {
    skills: [
        { name: 'React', level: '90%', nameKey: 'about.skillList.react' },
        { name: 'TypeScript', level: '85%', nameKey: 'about.skillList.typescript' },
        { name: 'Node.js', level: '80%', nameKey: 'about.skillList.nodejs' },
        { name: 'Tailwind CSS', level: '90%', nameKey: 'about.skillList.tailwind' },
    ],
    experiences: [
        {
            title: "Front-End Mastery with React.js – 10+ Real-World Projects",
            company: "Cybersoft – in collaboration with Hutech University",
            description: `Completed 10+ real-world web development projects from basic to advanced using React.js, JavaScript ES6, HTML5, and CSS3.

Gained proficiency in component-based architecture, state management with React Hooks, and API integration.

Applied popular libraries such as React Router, Axios, Bootstrap/Tailwind CSS.

Developed skills in requirement analysis, UI optimization, and project deployment.`,
            titleKey: 'about.experience.frontend.title',
            companyKey: 'about.experience.frontend.company',
            descriptionKey: 'about.experience.frontend.description'
        }
    ]
};

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        setSkills: (state, action: PayloadAction<Skill[]>) => {
            state.skills = action.payload;
        },
        addSkill: (state, action: PayloadAction<Skill>) => {
            state.skills.push(action.payload);
        },
    },
});

export const { setSkills, addSkill } = aboutSlice.actions;
export default aboutSlice.reducer;
