/**
 *
 * GalleryImages
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Modal from 'components/ModalGallery';
import { hostUrlBase } from 'services/Api';
import Item from './Item';
import { Container, Image, Title, Title2 } from './styles';

function GalleryImages({ images, title, type }) {
  const [state, setState] = useState({
    open: false,
    src: '',
  });
  const handleClickImage = id => {
    setState({
      open: true,
      src: `${hostUrlBase}/${images[id].url}`,
    });
  };

  const handleClose = () => {
    setState(s => ({
      open: false,
      src: '',
    }));
  };

  return (
    <>
      {
        type === 1 ? 
          <Title>{title}</Title>
          : 
          <Title2>{title}</Title2>
      }
      <Container>
        {images.map((img, idx) => (
          <Item
            key={img.idMedio}
            src={`${hostUrlBase}/${img.url}`}
            onClick={() => handleClickImage(idx)}
          />
        ))}
      </Container>
      <Modal open={state.open} onClose={handleClose}>
        <Image src={state.src} />
      </Modal>
    </>
  );
}

GalleryImages.propTypes = {};

export default GalleryImages;
