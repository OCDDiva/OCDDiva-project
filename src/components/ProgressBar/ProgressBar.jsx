import { Stepper, Step, StepLabel } from '@mui/material';
import '../App/App.css';

const steps = [
  'Step 1',
  'Step 2',
  'Step 3',
  'Step 4',
  'Step 5',
  'Review',
];

function ProgressBar({ currentStep }) {
  return (
      <Stepper 
      activeStep={currentStep} 
      alternativeLabel 
      className="progress-bar"
      sx={{ maxWidth: 'fit-content', }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className="step-label">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}

export default ProgressBar;