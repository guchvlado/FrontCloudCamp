

import { Children, PropsWithChildren, cloneElement, Fragment } from 'react';
import cn from 'classnames'
import styles from './index.module.scss'

import completedStepImage from '../../assets/completedStep.svg'

interface StepperProps {
    active: number;
    onStepChange: (index: number) => void;
    allowNextStepsSelect?: boolean;
}

export const Stepper: React.FC<PropsWithChildren<StepperProps>> & {Step: typeof Step} = ({children, active, onStepChange, allowNextStepsSelect = true}) => {

    const _children = Children.toArray(children) as React.ReactElement[];

    return (
        <div>
            <div>
                <div className={styles.progress}>
                    {_children.map((item, index) => {
                        const activeStep = index === active;
                        const completedStep = index < active;
                        const dotClass = cn(styles.progress__dot, {
                            [styles.active]: activeStep,
                            [styles.completed]: completedStep
                        })
                        const dividerClass = cn(styles.progress__divider, {
                            [styles.completed]: completedStep
                        })

                        const onDotClick = () => {
                            if (index < active || allowNextStepsSelect) {
                                onStepChange(index)
                            }
                        }

                        return (
                            <Fragment key={index}> 
                                <div className={dotClass} onClick={onDotClick} id={`step-${index}`}>
                                    {completedStep ? <img src={completedStepImage} /> : null}
                                </div>
                                {index !== _children.length-1 ? <div className={dividerClass}></div> : null}
                            </Fragment>
                        )
                    })}
                </div>
                <div className={styles.indexSteps}>
                    {_children.map((_, index) => <div key={index} className={index <= active ? styles.index_active : '' }>{index+1}</div>)}
                </div>
            </div>
            {_children[active]}
        </div>
    )
}

const Step: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.content}>
            {children}
        </div>
    )
}

Stepper.Step = Step;