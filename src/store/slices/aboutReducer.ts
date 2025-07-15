import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Skill {
    name: string;
    level: string;
}

interface AboutState {
    skills: Skill[];
}

const initialState: AboutState = {
    skills: [
        { name: 'React', level: '90%' },
        { name: 'TypeScript', level: '85%' },
        { name: 'Node.js', level: '80%' },
        { name: 'Tailwind CSS', level: '90%' },
    ],
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
