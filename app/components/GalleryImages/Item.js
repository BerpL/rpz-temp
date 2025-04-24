import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Image, ImageContainer } from './styles';

function Item({ src, onClick }) {
  return (
    <ImageContainer onClick={onClick}>
      <Image src={src} />
    </ImageContainer>
  );
}

Item.propTypes = {
  src: PropTypes.string,
  onClick: PropTypes.func,
};

export default Item;
