import React from 'react';
import PropTypes from 'prop-types';
import { ItemRow, CellRow } from './Styles';

const Item = ({ item, onClickItem }) => (
  <ItemRow onClick={() => onClickItem(item.idEvaluacionUsuario)}>
    <CellRow>{item.nombre}</CellRow>
    <CellRow flexBasis="140px" flexShrink="0">
      {item.correctas} Correct
    </CellRow>
    <CellRow flexBasis="150px" flexShrink="0">
      {item.incorrectas} Incorrect
    </CellRow>
  </ItemRow>
);

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClickItem: PropTypes.func,
};

export default Item;
