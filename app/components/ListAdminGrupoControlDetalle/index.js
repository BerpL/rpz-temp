/**
 *
 * ListAdminGrupoControlDetalle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Detalle from './Detalle';

function ListAdminGrupoControlDetalle({ detalle, ...props }) {
  return (
    <div>
      {detalle.map(item => (
        <Detalle {...props} key={item.idDetalleEnclavamiento} inter={item} />
      ))}
    </div>
  );
}

ListAdminGrupoControlDetalle.propTypes = {
  detalle: PropTypes.array,
};

export default ListAdminGrupoControlDetalle;
