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
    advantages: [],
    radio: 0,
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
    }
})

export const {
    updateForm,
} = formSlice.actions