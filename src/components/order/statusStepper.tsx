import React, { useState } from "react";
import "../styling/stepper.css";
import { CheckCircle } from "lucide-react";
interface Step {
  label: string;
}

interface StatusStepperProps {
  steps: Step[]; // Array of steps, each with a label
  currentStep: number; // The current step as a string
}

const StatusStepper: React.FC<StatusStepperProps> = ({
  steps,
  currentStep,
}) => {
  //   const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
  //   const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  return (
    <>
      <div className="flex justify-between font-sans">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? (
                <CheckCircle size={24} />
              ) : (
                i + 1
              )}
            </div>
            <p className="text-gray-600">{step.label}</p>
          </div>
        ))}
      </div>
      {/* {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )} */}
    </>
  );
};

export default StatusStepper;
