import { Avatar, Button, Input, InputMasked } from "../../UI";
import styles from "./index.module.scss";

import { ContactItem } from "../../components";
import { IContact, contactsSchema } from "../../types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { updateForm } from "../../redux/reducers/formSlice";
import { getInitialsFromName } from "../../utils/getInitialsFromName";

import Resume from '../../assets/Guchenko.pdf'

interface FormInput {
  phone: string;
  email: string;
}

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { phone, email } = useAppSelector((state) => state.form);
  const fullName = 'Гученко Владислав'

  const contacts: IContact[] = [
    { id: 1, title: "Telegram", link: "https://t.me/guchvlado" },
    { id: 2, title: "GitHub", link: "https://github.com/guchvlado" },
    { id: 3, title: "Resume", link: Resume },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      phone,
      email,
    },
    resolver: yupResolver(contactsSchema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(updateForm(data));
    navigate("/create");
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Avatar>{getInitialsFromName(fullName)}</Avatar>
        <div className={styles.info}>
          <div>{fullName}</div>
          <div className={styles.socials}>
            {contacts.map((item) => (
              <ContactItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__item}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputMasked
                {...field}
                id="field-phone"
                mask="+{7} (000) 000-00-00"
                placeholder="+7 (___) ___-__-__"
                variant="filled"
                label="Номер телефона"
                error={errors.phone?.message}
              />
            )}
          />
        </div>

        <div className={styles.form__item}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="field-email"
                variant="filled"
                placeholder="guchvlado324@gmail.com"
                label="Email"
                error={errors.email?.message}
              />
            )}
          />
        </div>

        <Button className={styles.button}>Начать</Button>
      </form>
    </div>
  );
};
