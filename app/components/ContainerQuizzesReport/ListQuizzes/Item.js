import React from 'react';
import { formattedDate } from 'utils/DateUtils';
import PropTypes from 'prop-types';
import { ItemRow, CellRow, PercentBox } from './Styles';
const Item = ({ item, onClickItem }) => (
  <ItemRow onClick={() => onClickItem(item.idEvaluacion)}>
    <CellRow>{item.nombre}</CellRow>
    <CellRow flexBasis="130px" flexShrink="0">
      {formattedDate(new Date(item.fecha))}
    </CellRow>
    <CellRow flexBasis="150px" flexShrink="0">
      <PercentBox>
        {item.calificacion ? Math.round(item.calificacion * 100) / 100 : 0}%
      </PercentBox>
    </CellRow>
    <CellRow flexBasis="120px" flexShrink="0">
      {item.numeroPreguntas || 0}
    </CellRow>
  </ItemRow>
);

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onClickItem: PropTypes.func,
};

export default Item;
