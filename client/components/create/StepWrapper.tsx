import React from 'react';
import {Card, Container, Step, StepLabel, Stepper} from "@mui/material";
import {Grid} from "@mui/system";
import styles from '../../styles/StepWrapper.module.scss'

interface StepWrapperProps {
    activeStep: number;
}

const steps = ['Main information', 'Cover upload', 'Audio upload']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step key={index} completed={activeStep > index}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid className={styles.StepWrapper__container} container>
                <Card className={styles.StepWrapper__card}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;