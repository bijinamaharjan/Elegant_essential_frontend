import React from "react";
import { PulseLoader } from "react-spinners";

const ThePulseLoader: React.FC<{color: string}> = ({color}) => {
  return (
    <PulseLoader
      color={color}
      
      //   cssOverride={override}
      size={12}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default ThePulseLoader;
