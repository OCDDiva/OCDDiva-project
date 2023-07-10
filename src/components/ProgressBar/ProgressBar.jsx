import { Stepper, Step, StepLabel } from '@mui/material';
import './ProgressBar.css';

const steps = [
  '',
  '',
  '',
  '',
  '',
  '',
];

function ProgressBar({ currentStep }) {
  return (
      <Stepper 
      activeStep={currentStep} 
      alternativeLabel 
      className="progress-bar"
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