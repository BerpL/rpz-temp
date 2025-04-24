import React from 'react';
import PropTypes from 'prop-types';
import { hostUrlBase } from 'services/Api';
import {
  ItemContainer,
  ItemName,
  ItemImage,
  ItemContainerImage,
  ItemWrapper,
} from './Styles';
function Item({ flowDiagram, onClick }) {
  return (
    <ItemContainer>
      <ItemWrapper onClick={() => onClick(flowDiagram.id)}>
        <ItemContainerImage>
          <ItemImage
            height={150}
            src={`${hostUrlBase}/${flowDiagram.imagenPrevia}`}
            alt=""
          />
        </ItemContainerImage>
        <ItemName>{flowDiagram.nombre}</ItemName>
      </ItemWrapper>
    </ItemContainer>
  );
}

Item.propTypes = {
  flowDiagram: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Item;
