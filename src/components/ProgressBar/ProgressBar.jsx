import { Stepper, Step, StepLabel } from '@mui/material';

const steps = [
    'Contact',
    'Cleaning',
    'Moving',
    'Organization',
    'Declutter',
    'Review',
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