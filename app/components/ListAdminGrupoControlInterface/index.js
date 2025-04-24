/**
 *
 * ListAdminGrupoControlInterface
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Inter from './Inter';

function ListAdminGrupoControlInterface({ interfaces, ...props }) {
  return (
    <div>
      {interfaces.map(inter => (
        <Inter {...props} key={inter.idEtiquetaModulo} inter={inter} />
      ))}
    </div>
  );
}

ListAdminGrupoControlInterface.propTypes = {
  interfaces: PropTypes.array,
};

export default ListAdminGrupoControlInterface;
