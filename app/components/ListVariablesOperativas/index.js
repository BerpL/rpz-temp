import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import GrupoControl from './GrupoControl';

function ListVariablesOperativas({ grupos, ...props }) {
  return (
    <div>
      {grupos.map(grupo => (
        <GrupoControl
          {...props}
          key={grupo.idListaInstrumento}
          grupo={grupo}
        />
      ))}
    </div>
  );
}

ListVariablesOperativas.propTypes = {
  grupos: PropTypes.array,
};

export default ListVariablesOperativas;

