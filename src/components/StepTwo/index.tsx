import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./index.module.scss";
import { Button, Checkbox, Input, Radio } from "../../UI";

import DeleteIcon from "../../assets/delete.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { updateForm } from "../../redux/reducers/formSlice";
import { Fragment } from "react";
import { stepTwoSchema } from "../../types";

interface FormInput {
  advantages: { title: string }[];
  checkbox: number[];
  radio: number;
}

interface StepTwoProps {
  onStepChange: (index: number) => void;
}


export const StepTwo: React.FC<StepTwoProps> = ({ onStepChange }) => {
  const dispatch = useDispatch();
  const { advantages, checkbox, radio } = useAppSelector((state) => state.form);

  const checkboxOptions: number[] = [1, 2, 3];
  const radioOptions: number[] = [1, 2, 3];

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      advantages: advantages.map((item) => ({ title: item })),
      checkbox,
      radio,
    },
    resolver: yupResolver(stepTwoSchema),
  });

  const {
    fields: advantagesFields,
    append: advantagesAppend,
    remove: advantagesRemove,
  } = useFieldArray({
    name: "advantages",
    control,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const oldValue = getValues("checkbox");

    if (checked) {
      setValue("checkbox", [...oldValue, +value]);
    } else {
      setValue(
        "checkbox",
        oldValue.filter((item) => item !== +value)
      );
    }
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    dispatch(
      updateForm({
        ...data,
        advantages: data.advantages.map((item) => item.title),
      })
    );
    onStepChange(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.advantages}>
        <div className={styles.advantages__label}>Advantages</div>
        {advantagesFields.map((item, index) => (
          <Fragment key={item.id}>
            <div className={styles.advantages__item}>
              <Controller
                name={`advantages.${index}.title`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Placeholder"
                    id={`field-advatages-${index + 1}`}
                  />
                )}
              />
              <div
                id={`button-remove-${index + 1}`}
                onClick={() => advantagesRemove(index)}
                className={styles.advantages__delete}
              >
                <img src={DeleteIcon} alt="delete" />
              </div>
            </div>
            {errors.advantages?.[index] ? (
              <div className={styles.error}>
                {errors.advantages?.[index]?.title?.message}
              </div>
            ) : null}
          </Fragment>
        ))}
        {errors.advantages?.message ? (
          <div className={styles.error}>{errors.advantages.message}</div>
        ) : null}
        <div
          id="button-add"
          onClick={() => advantagesAppend({ title: "" })}
          className={styles.advantages__add}
        ></div>
      </div>
      <div id="CheckboxGroup" className={styles.CheckboxGroup}>
        <div className={styles.label}>Checkbox group</div>
        {checkboxOptions.map((item, index) => (
          <Controller
            key={index}
            name="checkbox"
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                id={`field-checkbox-group-option-${index + 1}`}
                onChange={handleCheckboxChange}
                defaultChecked={checkbox.includes(item)}
                label={item.toString()}
                value={item}
              />
            )}
          />
        ))}
        {errors.checkbox?.message ? (
          <div className={styles.error}>{errors.checkbox.message}</div>
        ) : null}
      </div>

      <div className={styles.RadioGroup}>
        <div className={styles.label}>Radio group</div>
        {radioOptions.map((item) => (
          <Controller
            key={item}
            name="radio"
            control={control}
            render={({ field }) => (
              <Radio
                {...field}
                defaultChecked={item === 1}
                id={`field-radio-group-option-${item}`}
                label={item.toString()}
                onChange={(value) => field.onChange(+value.target.value)}
                value={item}
              />
            )}
          />
        ))}
        {errors.radio?.message ? (
          <div className={styles.error}>{errors.radio.message}</div>
        ) : null}
      </div>
      <div className={styles.buttons}>
        <Button
          id="button-back"
          variant="outline"
          type="button"
          onClick={() => onStepChange(0)}
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
