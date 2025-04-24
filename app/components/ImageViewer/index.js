/**
 *
 * ImageViewer
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LightBox from 'components/LightBox';

import { FaChevronRight, FaChevronLeft } from 'react-icons/fa/index.esm';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
`;

const Column = styled.div`
  flex: 50%;
  max-width: 50%;
  padding: 0 4px;

  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
  }
`;

const Img = styled.img`
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
  cursor: pointer;
`;

const ImgLightBox = styled.img`
  width: 100%;
`;

const Text = styled.div`
  color: ${({ theme: { base } }) => base};
  font-size: 15px;
  padding: 0 4px;
  width: 100%;
`;

const Prev = styled.div`
  position: fixed;
  color: white;
  left: 0px;
  top: calc(50% - 67px);
  padding: 15px;
  cursor: pointer;
  font-size: 25px;
  user-select: none;
  background: rgba(0, 0, 0, 0.5);
  @media screen and (min-width: 600px) {
    left: 20px;
  }
`;
const Next = styled.div`
  position: fixed;
  color: white;
  right: 0px;
  user-select: none;
  cursor: pointer;
  top: calc(50% - 67px);
  font-size: 25px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.5);
  @media screen and (min-width: 600px) {
    right: 20px;
  }
`;

function ImageViewer({ images, name }) {
  const half = Math.floor(images.length / 2);
  const start = images.slice(0, half);
  const end = images.slice(half);

  const [indexImage, setIndexImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const hasNext = indexImage > 0;
  const hasPrev = indexImage < images.length - 1;
  const onClickImage = imgTmp => {
    setIsOpen(true);
    setIndexImage(imgTmp);
  };

  return (
    <div>
      <Row>
        <Text>{name}</Text>
        <Column>
          {start.map((image, index) => (
            <Img
              key={image.id}
              onClick={() => onClickImage(index)}
              src={image.imageUrl}
              alt=""
            />
          ))}
        </Column>
        <Column>
          {end.map((image, index) => (
            <Img
              key={image.id}
              onClick={() => onClickImage(half + index)}
              src={image.imageUrl}
              alt=""
            />
          ))}
        </Column>
      </Row>
      <LightBox open={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          {isOpen && <ImgLightBox src={images[indexImage].imageUrl} alt="" />}
          {hasNext && (
            <Prev onClick={() => setIndexImage(indexImage - 1)}>
              <FaChevronLeft />
            </Prev>
          )}
          {hasPrev && (
            <Next onClick={() => setIndexImage(indexImage + 1)}>
              <FaChevronRight />
            </Next>
          )}
        </div>
      </LightBox>
    </div>
  );
}

ImageViewer.propTypes = {
  images: PropTypes.array,
  name: PropTypes.string,
};

export default ImageViewer;
