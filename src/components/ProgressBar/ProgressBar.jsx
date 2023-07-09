import { Stepper, Step, StepLabel } from '@mui/material';
import './ProgressBar.css';

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
    <div className="progress-bar-container">
      <Stepper activeStep={currentStep} alternativeLabel className="progress-bar">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel className="step-label">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default ProgressBar;