import { Sex } from ".";

export interface IFormRequest {
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