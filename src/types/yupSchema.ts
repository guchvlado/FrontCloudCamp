import * as yup from "yup";

export const contactsSchema = yup
  .object({
    phone: yup
      .string()
      .min(18, "Телефон должен содержать 11 цифр")
      .max(18, "Телефон должен содержать 11 цифр")
      .required("Обязательное поле"),
    email: yup
      .string()
      .email("Некорректна указана почта")
      .required("Обязательное поле"),
  })
  .required();

export const stepOneSchema = yup
  .object({
    nickname: yup
      .string()
      .max(30, "Максимальная длина 30 символов")
      .matches(/^[a-zA-Z0-9а-яА-ЯёЁ]+$/, "только буквы и цифры")
      .required("Обязательное поле"),
    name: yup
      .string()
      .max(50, "Максимальная длина 50 символов")
      .matches(/^[a-zA-Zа-яА-ЯёЁ]+$/, "только буквы")
      .required("Обязательное поле"),
    sername: yup
      .string()
      .max(50, "Максимальная длина 50 символов")
      .matches(/^[a-zA-Zа-яА-ЯёЁ]+$/, "только буквы")
      .required("Обязательное поле"),
    sex: yup.string().required("Обязательное поле"),
  })
  .required();

export const stepTwoSchema = yup
  .object({
    advantages: yup
      .array()
      .of(yup.object({ title: yup.string().required("Поле не заполнено") }))
      .min(1, "Укажите хотя бы одно преимущество")
      .required(),
    checkbox: yup.array().of(yup.number()),
    radio: yup.number().required(),
  })
  .required();

export const stepThreeSchema = yup
  .object({
    about: yup.string().max(200, "Максимальная длина 200 символов"),
  })
  .required();

export const combinedSchema = contactsSchema
  .concat(stepOneSchema)
  .concat(stepTwoSchema)
  .concat(stepThreeSchema);
