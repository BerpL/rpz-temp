/**
 *
 * Pen
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Pen({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26.672"
      height="26.672"
      viewBox="0 0 26.672 26.672"
    >
      <g transform="translate(98.687 -319.612) rotate(45)">
        <path
          style={{ fill, transition: 'all 0.3s ease-out' }}
          d="M5.079,27.564h0L0,21.036H10.156L5.079,27.564ZM0,20.442H0V5.078H1.451V20.31H0Zm10.154-.132H8.706V5.078h1.45V20.309Zm-2.176,0h-5.8V5.078h5.8V20.309ZM10.1,4.352H.052a5.078,5.078,0,0,1,10.052,0Z"
          transform="translate(169.999 282)"
        />
      </g>
    </svg>
  );
}

Pen.propTypes = {
  fill: PropTypes.string,
};

export default Pen;
