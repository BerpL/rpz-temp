import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaPlay } from 'react-icons/fa/index.esm';
import {
  ItemContainer,
  ItemName,
  ItemImage,
  ItemContainerImage,
  ItemWrapper,
  IconPlay,
} from './Styles';
import { getImage } from 'services/VideosService';

function Item({ virtualWalk, onClick }) {
  const [urlImage, setUrlImage] = useState();

  async function getPreview() {
    try {
      const response_video = await getImage(virtualWalk.imagenPrevia);
      const variable = URL.createObjectURL(response_video.data);
      setUrlImage(variable);
    } catch (e) {
      console.log('error');
    }
  }

  useEffect(() => {
    getPreview();
  },[]);

  return (
    <ItemContainer>
      <ItemWrapper onClick={() => onClick(virtualWalk.id, urlImage)}>
        <ItemContainerImage>
          <ItemImage height={150} src={urlImage} alt="" />
        </ItemContainerImage>
        <ItemName>{virtualWalk.nombre}</ItemName>
        <IconPlay>
          <FaPlay />
        </IconPlay>
      </ItemWrapper>
    </ItemContainer>
  );
}

Item.propTypes = {
  virtualWalk: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Item;
