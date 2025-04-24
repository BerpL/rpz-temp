/**
 *
 * ListAdminArchives
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Procedure from './Procedure';

function ListAdminProcedures({ procedures, ...props }) {
  return (
    <div>
      {procedures.map(procedure => (
        <Procedure
          {...props}
          key={`${procedure.id}+${procedure.nombre}`}
          procedure={procedure}
        />
      ))}
    </div>
  );
}

ListAdminProcedures.propTypes = {
  procedures: PropTypes.array,
};

export default ListAdminProcedures;
