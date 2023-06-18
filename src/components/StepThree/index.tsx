import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./index.module.scss";
import { Button, TextArea } from "../../UI";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { MessageModal } from "../MessageModal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { clearForm, updateForm } from "../../redux/reducers/formSlice";
import { useSendFormDataMutation } from "../../api/apiSlice";
import { stepThreeSchema } from "../../types";

interface FormInput {
  about: string;
}

interface StepThreeProps {
  onStepChange: (index: number) => void;
}

export const StepThree: React.FC<StepThreeProps> = ({ onStepChange }) => {
  const dispatch = useDispatch();
  const form = useAppSelector((state) => state.form);

  const [sendFormData, { isError, isSuccess }] = useSendFormDataMutation();

  const [openedMessage, setOpenedMessage] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      about: form.about,
    },
    resolver: yupResolver(stepThreeSchema),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    dispatch(updateForm(data));
    try {
      const { activeStep, ...sendData } = form;
      const response = await sendFormData({...sendData, ...data});
      console.log(response);
    } catch (e) {
      console.log(e);
    }

    setOpenedMessage(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Controller
        name="about"
        control={control}
        render={({ field }) => (
          <TextArea
            id="field-about"
            error={errors.about?.message}
            counter
            label="About"
            {...field}
          />
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
      <MessageModal
        isSuccess={isSuccess}
        isError={isError}
        opened={openedMessage}
        onClose={() => setOpenedMessage(false)}
      />
    </form>
  );
};
