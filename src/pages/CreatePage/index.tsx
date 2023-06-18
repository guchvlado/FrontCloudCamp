import styles from "./index.module.scss";
import { Stepper } from "../../UI";
import { StepOne, StepThree, StepTwo } from "../../components";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changeActiveStep } from "../../redux/reducers/formSlice";

export const CreatePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector((state) => state.form.activeStep);

  const onStepChange = (index: number) => {
    if (index >= 0 && index < 3) dispatch(changeActiveStep(index));
  };

  return (
    <div className={styles.root}>
      <Stepper
        active={activeStep}
        onStepChange={onStepChange}
        allowNextStepsSelect={false}
      >
        <Stepper.Step>
          <StepOne onStepChange={onStepChange} />
        </Stepper.Step>
        <Stepper.Step>
          <StepTwo onStepChange={onStepChange} />
        </Stepper.Step>
        <Stepper.Step>
          <StepThree onStepChange={onStepChange} />
        </Stepper.Step>
      </Stepper>
    </div>
  );
};
