import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Area from './Area';

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

const MobileContainer = styled.div`
  height: 100%;
  overflow: auto;
  padding-bottom: 10px;
  padding-top: 100px;
  width: 100%;

  @media (min-height: 600px) and (min-width: 576px) {
    display: none;
  }

  ${ChildGroupContainer} {
    flex-wrap: wrap;
    flex-direction: row;

    @media (min-width: 576px) {
      .child {
        width: 50%;
        padding: 2%;
        .child-name {
          font-size: 12px;
        }
      }
    }

    @media (min-width: 768px) {
      .child {
        width: 33.3%;
        padding: 1%;
        font-size: 16px;
      }
    }

    @media (min-width: 992px) {
      .child {
        width: 25%;
        padding: 0.5%;
      }
    }

    @media (min-width: 1200px) {
    }
  }
`;

function MobileArea({ data, onClickArea }) {
  return (
    <MobileContainer>
      <ChildGroupContainer>
        {data.map(area => (
          <Area key={area.id} area={area} onClickArea={onClickArea} />
        ))}
      </ChildGroupContainer>
    </MobileContainer>
  );
}

MobileArea.propTypes = {
  data: PropTypes.array,
  onClickArea: PropTypes.func,
};

export default MobileArea;
