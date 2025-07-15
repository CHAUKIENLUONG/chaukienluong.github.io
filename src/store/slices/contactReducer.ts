import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import emailjs from '@emailjs/browser';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface ContactState {
    formData: FormData;
    isSubmitting: boolean;
    submitStatus: 'success' | 'error' | null;
}

const initialState: ContactState = {
    formData: {
        name: '',
        email: '',
        message: '',
    },
    isSubmitting: false,
    submitStatus: null,
};

export const sendEmail = createAsyncThunk(
    'contact/sendEmail',
    async (formData: FormData) => {
        await emailjs.send(
            'service_3nmzb89',
            'template_i66mc8g',
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Chau Kien Luong',
                reply_to: formData.email,
            },
            'NKaEqYATtE-LtFLAr'
        );
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<{ name: string; value: string }>) => {
            const { name, value } = action.payload;
            state.formData = {
                ...state.formData,
                [name]: value,
            };
        },
        resetForm: (state) => {
            state.formData = initialState.formData;
            state.submitStatus = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendEmail.pending, (state) => {
                state.isSubmitting = true;
                state.submitStatus = null;
            })
            .addCase(sendEmail.fulfilled, (state) => {
                state.isSubmitting = false;
                state.submitStatus = 'success';
                state.formData = initialState.formData;
            })
            .addCase(sendEmail.rejected, (state) => {
                state.isSubmitting = false;
                state.submitStatus = 'error';
            });
    },
});

export const { updateFormData, resetForm } = contactSlice.actions;
export default contactSlice.reducer;
