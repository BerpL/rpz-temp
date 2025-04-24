/**
 *
 * ListAdminMedia
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Media from './Media';

function ListAdminMedia({ media, ...props }) {
  return (
    <div>
      {media.map(m => (
        <Media {...props} key={m.idMedio} media={m} />
      ))}
    </div>
  );
}

ListAdminMedia.propTypes = {
  archives: PropTypes.array,
};

export default ListAdminMedia;
