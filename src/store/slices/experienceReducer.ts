import { createSlice } from '@reduxjs/toolkit'

export interface ExperienceEntry {
  companyKey: string
  periodKey: string
  roleKey: string
  bulletKeys: string[]
}

export interface ExperienceState {
  experiences: ExperienceEntry[]
}

const initialState: ExperienceState = {
  experiences: [
    {
      companyKey: 'experience.jobs.mebisoft.company',
      periodKey: 'experience.jobs.mebisoft.period',
      roleKey: 'experience.jobs.mebisoft.role',
      bulletKeys: [
        'experience.jobs.mebisoft.bullets.0',
        'experience.jobs.mebisoft.bullets.1',
        'experience.jobs.mebisoft.bullets.2',
        'experience.jobs.mebisoft.bullets.3',
        'experience.jobs.mebisoft.bullets.4',
      ],
    },
    {
      companyKey: 'experience.jobs.freelancer.company',
      periodKey: 'experience.jobs.freelancer.period',
      roleKey: 'experience.jobs.freelancer.role',
      bulletKeys: [
        'experience.jobs.freelancer.bullets.0',
        'experience.jobs.freelancer.bullets.1',
        'experience.jobs.freelancer.bullets.2',
      ],
    },
  ],
}

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
})

export default experienceSlice.reducer
