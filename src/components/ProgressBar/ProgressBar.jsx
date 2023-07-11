import { Stepper, Step, StepLabel } from '@mui/material';
import '../App/App.css';

const steps = [
  'Contact',
  'Clean',
  'Move',
  'Organize',
  'Declutter',
  'Review',
];

function ProgressBar({ currentStep }) {
  return (
      <Stepper 
      activeStep={currentStep} 
      alternativeLabel 
      className="progress-bar"
      
      >
        {steps.map((label) => (
          <Step key={label} sx={{ maxWidth: '14%',}}>
            <StepLabel className="step-label">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}

export default ProgressBar;