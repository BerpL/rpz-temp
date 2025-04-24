import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Motion, spring, presets } from 'react-motion';

import useHorizontalScroll from 'hooks/useHorizontalScroll';

import Area from './Area';

const HorizontalScrollContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
`;

const ChildWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 3% 0px 3%;
`;

const SliderBar = styled.div`
  background: rgba(255, 255, 255, 1);
  width: 100%;
  height: 1px;
  position: absolute;
  transform: translateX(-100%);
`;

const SliderContainer = styled.div`
  z-index: 3;
  left: 0;
  width: 100%;
  height: 1px;
  pointer-events: none;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: calc(50% - 1px);
`;

const ChildGroupContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  &:nth-child(2) {
    margin-left: 0px;
  }

  @media (min-height: 600px) and (min-width: 576px) {
    flex-direction: row;
  }

  @media (min-width: 576px) {
    &:nth-child(2) {
      margin-left: 3%;
    }
  }
  @media (min-width: 768px) {
    &:nth-child(2) {
      margin-left: 4%;
    }
  }
`;

const Slider = props => (
  <SliderContainer>
    <SliderBar style={props.style} />
  </SliderContainer>
);

Slider.propTypes = {
  style: PropTypes.object,
};

function AreasScrollContainer({ onClickArea, data }) {
  const container = useRef(null);
  const [areas, setAreas] = useState({
    area1: [],
    area2: [],
  });
  const { panWheelHandlers, x, getPercentSlider } = useHorizontalScroll({
    enableScroll: true,
    reverseScroll: false,
    container,
  });

  useEffect(() => {
    const index = data.length;
    const factor = index / 2;
    setAreas({
      area2: data.slice(factor, index),
      area1: data.slice(0, factor),
    });
  }, []);

  const handleClickArea = useCallback(id => {
    onClickArea(id);
  }, []);


  const getPercentSliderPerformance = useCallback((z) => {
    return `translateX(${getPercentSlider(z)}%)`;
  }, [])


  const renderFillOne = useMemo(() => {
    if (!areas) return;
    if (!areas.area1) return;
    return areas.area1.map(area => (
      <Area key={area.id} area={area} onClickArea={handleClickArea} />
    ))
  }, [areas, handleClickArea])

  const renderFillTwo = useMemo(() => {

    return areas.area2.map(area => (
      <Area key={area.id} area={area} onClickArea={handleClickArea} />
    ))
  }, [areas, handleClickArea])



  return (
    <HorizontalScrollContainer ref={container} {...panWheelHandlers}>
      <Motion style={{ z: spring(x, presets.noWobble) }}>
        {({ z }) => (
          <ChildWrapper style={{ transform: `translateX(${z}px)` }}>
            <ChildGroupContainer>
              {renderFillOne}
            </ChildGroupContainer>
            <ChildGroupContainer>
              {renderFillTwo}
            </ChildGroupContainer>
            <Slider
              style={{ transform: getPercentSliderPerformance(z) }}
            />
          </ChildWrapper>
        )}
      </Motion>
    </HorizontalScrollContainer>
  );
}

export default AreasScrollContainer;
