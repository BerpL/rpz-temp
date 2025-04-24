import React from 'react';

import { LoaderAnim } from './Styles';

function Loader() {
  return (
    <LoaderAnim>
      <div className="loader-balance">
        <div className="spiner-balance" />
      </div>
    </LoaderAnim>
  );
}

Loader.propTypes = {};

export default Loader;
