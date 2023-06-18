import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./index.module.scss";
import { Button, Checkbox, Input, Radio, Select, TextArea } from "../../UI";
import { useNavigate } from "react-router-dom";

import DeleteIcon from '../../assets/delete.svg'
import { ChangeEvent, useState } from "react";
import { MessageModal } from "../MessageModal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { updateForm } from "../../redux/reducers/formSlice";

interface FormInput {
  about: string;
}

interface StepThreeProps {
  onStepChange: (index: number) => void;
}

export const StepThree: React.FC<StepThreeProps> = ({ onStepChange }) => {

  const dispatch = useDispatch();
  const { about } = useAppSelector(
    (state) => state.form
  );

  const [openedMessage, setOpenedMessage] = useState<boolean>(false)

  const schema = yup
  .object({
    about: yup.string().max(200, 'Максимальная длина 200 символов'),
  })
  .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      about,
    },
    resolver: yupResolver(schema)
  }); 

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    dispatch(updateForm(data))
    setOpenedMessage(true)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      
      <Controller
        name='about'
        control={control}
        render={({field}) => (
            <TextArea id="field-about" error={errors.about?.message} counter label="About" {...field}/>
        )}
      />

      <div className={styles.buttons}>
        <Button
          id="button-back"
          variant="outline"
          type="button"
          onClick={() => onStepChange(1)}
        >
          Назад
        </Button>
        <Button id="button-send" type="submit">
          Далее
        </Button>
      </div>
      <MessageModal isSuccess opened={openedMessage} onClose={() => setOpenedMessage(false)} />
    </form>
  );
};
