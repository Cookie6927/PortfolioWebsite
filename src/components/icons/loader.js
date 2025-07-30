import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>Loader Logo</title>
    <g>
      {/* Replacing "B" with custom "O" text */}
      <g id="B">
        <text
          x="46"
          y="58"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontFamily="'Aguafina Script', cursive"
          fontSize="54">
          O
        </text>
      </g>

      {/* Hexagon border remains unchanged */}
      <path
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 50, 5
           L 11, 27
           L 11, 72
           L 50, 95
           L 89, 73
           L 89, 28 z"
      />
    </g>
  </svg>
);

export default IconLoader;
