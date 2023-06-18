import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./index.module.scss";
import { Sex, stepOneSchema } from "../../types";
import { Button, Input, Select } from "../../UI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { updateForm } from "../../redux/reducers/formSlice";

interface FormInput {
  nickname: string;
  name: string;
  sername: string;
  sex: Sex;
}

interface StepOneProps {
  onStepChange: (index: number) => void;
}

export const StepOne: React.FC<StepOneProps> = ({ onStepChange }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { nickname, name, sername, sex } = useAppSelector(
    (state) => state.form
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      nickname,
      name,
      sername,
      sex,
    },
    resolver: yupResolver(stepOneSchema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(updateForm(data));
    onStepChange(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputs}>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Nickname"
              placeholder="Placeholder"
              id="field-nickname"
              error={errors.nickname?.message}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Name"
              placeholder="Placeholder"
              id="field-name"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          name="sername"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Sername"
              placeholder="Placeholder"
              id="field-sername"
              error={errors.sername?.message}
            />
          )}
        />

        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Sex"
              placeholder="Не выбрано"
              id="field-sex"
              error={errors.sex?.message}
              data={[
                { id: "field-sex-option-man", label: "man", value: Sex.Man },
                {
                  id: "field-sex-option-woman",
                  label: "woman",
                  value: Sex.Woman,
                },
              ]}
            />
          )}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          id="button-back"
          variant="outline"
          type="button"
          onClick={() => navigate("/")}
        >
          Назад
        </Button>
        <Button id="button-next" type="submit">
          Далее
        </Button>
      </div>
    </form>
  );
};
