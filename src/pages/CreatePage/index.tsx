

import { useState } from 'react';
import styles from './index.module.scss'
import { Stepper } from '../../UI';
import { StepOne } from '../../components';

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
                <Stepper.Step>2</Stepper.Step>
                <Stepper.Step>3</Stepper.Step>
            </Stepper>
        </div>
    )
}