import { SpinWheel } from "spin-wheel-game";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import "./Spin.css";
import { useState } from "react";
import CategorySelect from "../../components/Select/CategorySelect";

const Spin = () => {
  const segments = [
    { segmentText: "Meditation", segColor: "#2CA02C" },
    { segmentText: "Friends", segColor: "#98DF8A" },
    { segmentText: "Sport", segColor: "#1F77B4" },
    { segmentText: "Family", segColor: "#AEC7E8" },
    { segmentText: "Nature", segColor: "#FF7F0E" },
    { segmentText: "Arts and Craft", segColor: "#ffbb78" },
    // Add more segments as needed
  ];

  const [spinItems, setSpinItems] = useState(segments);

  const [showInstruction, setShowInstruction] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleSpinFinish = (result) => {
    console.log(`Spun to: ${result}`);
    // Handle the result as needed
    setShowInstruction(false);
    setSelectedResult(result);
  };

  const spinWheelProps = {
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "#fff",
    buttonText: "Spin",
    isOnlyOnce: false,
    size: 290,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "'Poppins', sans-serif",
    arrowLocation: "bottom",
    showTextOnSpin: false,
    isSpinSound: false,
  };
  return (
    <div>
      {/* top part */}
      <div className="flex items-center justify-between">
        <SectionHeading>Spin Wheel</SectionHeading>

        {/* task category selection */}
        <div>
          <p className="text-headingColor text-base font-semibold leading-5 pb-3 ">
            Select Task Category
          </p>
          <div className="w-[305px]">
            <CategorySelect />
          </div>
        </div>
      </div>

      {/* spinner */}
      <div className="w-[500px] mx-auto">
        <SpinWheel
          key={spinItems.length}
          {...spinWheelProps}
          segments={spinItems}
        />
      </div>

      {/* selected text */}
      {selectedResult && (
        <p className="text-center py-6 text-2xl font-semibold text-primaryColor">
          {selectedResult}
        </p>
      )}

      {/* instruction text */}
      {showInstruction && (
        <p className="text-center text-headingColor font-semibold leading-5 text-base py-3">
          Spin Wheel to pick your task
        </p>
      )}
    </div>
  );
};

export default Spin;
