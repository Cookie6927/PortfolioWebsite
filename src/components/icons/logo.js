import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        {/* Hexagon Border */}
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />

        {/* Custom "O" Text Using Aguafina Script */}
        <text
          x="35"
          y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontFamily="'Aguafina Script', cursive"
          fontSize="56">
          O
        </text>
      </g>
    </g>
  </svg>
);

export default IconLogo;
