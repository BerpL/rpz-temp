/**
 *
 * ListAdminArchives
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Archive from './Archive';

function ListAdminArchives({ archives, ...props }) {
  return (
    <div>
      {archives.map(archive => (
        <Archive
          {...props}
          key={`${archive.id}+${archive.nombre}`}
          archive={archive}
        />
      ))}
    </div>
  );
}

ListAdminArchives.propTypes = {
  archives: PropTypes.array,
};

export default ListAdminArchives;
