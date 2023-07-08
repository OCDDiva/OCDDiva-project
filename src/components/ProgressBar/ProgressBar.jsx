import { Stepper, Step, StepLabel } from '@mui/material';

const steps = [
    'Default Questions',
    'Cleaning Services',
    'Moving Services',
    'Organization',
    'Declutter',
    'Review Page',
];

function ProgressBar({ currentStep }) {
  
    return (
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      );
    }
    

export default ProgressBar; 