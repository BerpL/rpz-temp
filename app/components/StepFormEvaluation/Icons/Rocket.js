/**
 *
 * Rocket
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Rocket({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27.705"
      height="27.705"
      viewBox="0 0 27.705 27.705"
    >
      <path
        style={{ fill, transition: 'all 0.3s ease-out' }}
        d="M-3902.575,23.7v-.78a.247.247,0,0,1-.247.247.247.247,0,0,1-.247-.247v.78a.248.248,0,0,1-.248.247.247.247,0,0,1-.247-.247V22.141a.247.247,0,0,1-.247.247.247.247,0,0,1-.247-.247v.779a.247.247,0,0,1-.248.247.247.247,0,0,1-.247-.247v.78a.247.247,0,0,1-.247.247.247.247,0,0,1-.247-.247h0V17.63h-1.238v.08c0,2.153-.831,3.9-1.856,3.9s-1.857-1.745-1.857-3.9c0-1.771.563-3.267,1.335-3.741-.1-.552-.189-1.136-.277-1.728-.382-2.578-.708-5.878-.1-6.962a24.169,24.169,0,0,1,1.87-3.14C-3906.146.708-3904.611-1-3903.093-1s3.019,1.766,4.009,3.248a24.348,24.348,0,0,1,1.8,3.249c.617,1.152.232,4.389-.2,6.9-.084.486-.172.964-.261,1.421a.883.883,0,0,1,.114-.008c1.025,0,1.857,1.745,1.857,3.9s-.831,3.9-1.857,3.9-1.856-1.745-1.856-3.9v-.08h-1.115v5.29a.247.247,0,0,1-.247.247.247.247,0,0,1-.248-.247v-.779a.247.247,0,0,1-.247.247.248.248,0,0,1-.248-.247v.779a.247.247,0,0,1-.247.247.248.248,0,0,1-.248-.247v.78a.247.247,0,0,1-.247.247A.248.248,0,0,1-3902.575,23.7Zm-2.474-16.514a2.5,2.5,0,0,0,2.166,2.728,2.5,2.5,0,0,0,2.166-2.728,2.5,2.5,0,0,0-2.166-2.729A2.5,2.5,0,0,0-3905.049,7.186Z"
        transform="translate(2781.721 2765.495) rotate(45)"
      />
    </svg>
  );
}

Rocket.propTypes = {
  fill: PropTypes.string,
};

export default Rocket;
