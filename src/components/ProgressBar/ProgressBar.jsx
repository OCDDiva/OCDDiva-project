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
        <Stepper activeStep={currentStep} alternativeLabel sx={{ maxWidth: 25, fontSize: '50%', }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      );
    }
    

export default ProgressBar; 