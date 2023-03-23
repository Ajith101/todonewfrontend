import React from "react";

const Loader = () => {
  return (
    <>
      <svg
        className="svgs"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke-width="2"
          stroke="red"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke-width="2"
          stroke="blue"
          stroke-dasharray="89, 200"
          stroke-dashoffset="0"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            values="0;-124.6"
            keyTimes="0;1"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </>
  );
};

export default Loader;
