

import { useState } from 'react';
import styles from './index.module.scss'
import { Stepper } from '../../UI';
import { StepOne, StepThree, StepTwo } from '../../components';

export const CreatePage: React.FC = () => {

    const [active, setActive] = useState(0);

    const onStepChange = (index: number) => {
        if (index >= 0 && index < 3) 
            setActive(index);
    }

    return (
        <div className={styles.root} >
            <Stepper active={active} onStepChange={onStepChange}>
                <Stepper.Step>
                    <StepOne onStepChange={onStepChange}/>
                </Stepper.Step>
                <Stepper.Step>
                    <StepTwo onStepChange={onStepChange} />
                </Stepper.Step>
                <Stepper.Step>
                    <StepThree onStepChange={onStepChange} />
                </Stepper.Step>
            </Stepper>
        </div>
    )
}