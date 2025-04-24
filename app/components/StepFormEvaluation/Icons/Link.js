/**
 *
 * Link
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

function Link({ fill }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26.332"
      height="26.332"
      viewBox="0 0 26.332 26.332"
    >
      <path
        style={{ fill, transition: 'all 0.3s ease-out' }}
        d="M-3907,25.608a3,3,0,0,1-3-3V12.643a3,3,0,0,1,2.658-2.98V2a3,3,0,0,1,3-3h1.972a3,3,0,0,1,3,3v9.965a3,3,0,0,1-2.658,2.981v7.662a3,3,0,0,1-3,3Z"
        transform="translate(2782.895 2765.495) rotate(45)"
      />
    </svg>
  );
}

Link.propTypes = {
  fill: PropTypes.string,
};

export default Link;
