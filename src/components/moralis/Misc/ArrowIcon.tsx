import React from "react";

interface ArrowIconProps {
  width: number | string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    fill="#000000"
    width={width}
  >
    <path
      d="M 41.414,22.586l-14-14c-0.781-0.781-2.047-0.781-2.828,0c-0.781,0.781-0.781,2.047,0,2.828L35.172,22H 8 c-1.104,0-2,0.896-2,2s0.896,2,2,2h27.172L24.586,36.586c-0.781,0.781-0.781,2.047,0,2.828C24.977,39.805,25.488,40,26,40 s1.023-0.195,1.414-0.586l14-14C42.195,24.633,42.195,23.367,41.414,22.586z"
      fill="#000000"
    />
  </svg>
);

export default ArrowIcon;
