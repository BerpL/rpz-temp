/**
 *
 * ListAdminGrupoControl
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import GrupoControl from './GrupoControl';

function ListAdminGrupoControl({ grupos, ...props }) {
  return (
    <div>
      {grupos.map(grupo => (
        <GrupoControl
          {...props}
          key={grupo.idEnclavamientoAlarma}
          grupo={grupo}
        />
      ))}
    </div>
  );
}

ListAdminGrupoControl.propTypes = {
  grupos: PropTypes.array,
};

export default ListAdminGrupoControl;
