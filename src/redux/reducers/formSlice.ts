import { createSlice } from "@reduxjs/toolkit";
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
    phone: '',
    email: '',
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
        
    }
})