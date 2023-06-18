import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Sex } from "../../types";

interface FormSliceState {
    activeStep: number;
    phone: string;
    email: string;
    nickname: string;
    name: string;
    sername: string;
    sex: Sex;
    advantages: string[];
    radio: number;
    checkbox: number[];
    about: string;
}

const initialState: FormSliceState = {
    activeStep: 0,
    phone: '+7 (916) 524-83-16',
    email: 'guchvlado324@gmail.com',
    nickname: '',
    name: '',
    sername: '',
    sex: Sex.Man,
    advantages: ['', '', ''],
    radio: 1,
    checkbox: [],
    about: '',
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateForm: (state, action: PayloadAction<Partial<FormSliceState>>) => {
            return {...state, ...action.payload}
        },
        changeActiveStep: (state, action: PayloadAction<number>) => {
            state.activeStep = action.payload
        },
        clearForm: () => {
            return initialState;
        }
    }
})

export const {
    updateForm,
    changeActiveStep,
    clearForm
} = formSlice.actions