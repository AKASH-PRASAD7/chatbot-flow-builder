import React, { useState } from "react";
import { X } from "lucide-react";

const tutorialSteps = [
  {
    title: "Welcome to ChatTangle!",
    content:
      "This is a visual chatbot flow builder. Let's get you started with the basics.",
  },
  {
    title: "Adding Nodes",
    content:
      "To add a new node, simply drag it from the right-hand panel and drop it onto the canvas.",
  },
  {
    title: "Connecting Nodes",
    content:
      "To connect nodes, click and drag from the handle of one node to the handle of another.",
  },
  {
    title: "Editing Nodes",
    content:
      "To edit a node, simply click on it. The settings panel will appear on the right.",
  },
  {
    title: "Saving Your Flow",
    content:
      "Your flow is saved automatically. You can also use the header buttons to manage your flow.",
  },
];

interface TutorialProps {
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-100/65  flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{tutorialSteps[step].title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-700 mb-6">{tutorialSteps[step].content}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  step === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600"
          >
            {step === tutorialSteps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
