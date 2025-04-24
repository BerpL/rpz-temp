import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {};

const defaultProps = {};

const CloseIcon = styled(Link)`
    position: absolute;
    right: 0;
    top: 0;
    align-items: center;
    display: flex;
    padding: 0px 20px;
    cursor: pointer;
    height: 100px;
`;

const Backdrop = styled.div`
  background: ${({ theme: { bgU } }) => bgU};
  height: 100%;
  width: 100%;
  z-index: 100;
  position: absolute;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 18px;
  color: #fff;
  padding: 0% 4% 0% 4%;
  height: 100px;
  letter-spacing: 4px;
  width: 100%;
  align-items: center;
  display: flex;
`;

const DiagramsContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
`;

const DiagramsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const DiagramsWrapperContainer = styled.div`
  display: block;
  max-width: 1280px;
  margin: 0 auto;
`;

const DiagramItemContainer = styled(Link)`
  height: 200px;
  margin: 10px;
  display: block;
  cursor: pointer;
  border-radius: 10px;
  text-decoration: none;
  overflow: hidden;
  width: 100%;
  @media only screen and (min-width: 576px) {
    max-width: calc(33.333% - 20px);
  }
`;

const DiagramItemTitle = styled.span`
  color: white;
  padding: 10%;
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  transition: all 0.4s ease-in;
`;

const DiagramItemImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),
    url(${props => props.image});
  background-position: center center;
  filter: contrast(${props => props.contrast})
    saturate(${props => props.saturate});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  transition: background-image 0.4s ease-in-out 1s;
`;

const Diagrams = [
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name:
      'Area 292300 - Intermediate Stockpile / Area 292400 - Secondary Crushing and Classification',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name: 'Area 292500 - Tertiary Crushing',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name: 'Area 292500 - Tertiary Classification',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name: 'Area 293200 - Milling (Line 1)',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name: 'Area 293200 - Milling (Line 2)',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name:
      'Area 293300 - 1st, 2nd Cleaning Flotation / Scavenger Flotation (Line 1)',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name:
      'Area 293300 - 1st, 2nd Cleaning Flotation / Scavenger Flotation (Line 2)',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name: 'Area 293300 - Primary Flotation and Regrinding (Line 1)',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name:
      'Area 293300 - 1st, 2nd Cleaning Flotation / Scavenger Flotation (Line 1)',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name:
      'Area 293300 - 1st, 2nd Cleaning Flotation / Scavenger Flotation (Line 2)',
  },
  {
    source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:
      'http://www.tecsup-aqp.edu.pe/pgc4/public/diagramasF/ImagenPrevia/86.png',
    name: 'Area 293300 - Primary Flotation and Regrinding (Line 1)',
  },
];

const DiagramItem = ({ image, title, id }) => {
  const idTmp = id ? id : 1;
  const saturate = Math.random() * (1.5 - 1) + 1;
  const contrast = Math.random() * (1.5 - 1) + 1;
  return (
    <DiagramItemContainer to={`/flowdiagram/${idTmp}`}>
      <DiagramItemImage saturate={saturate} contrast={contrast} image={image}>
        <DiagramItemTitle>{title}</DiagramItemTitle>
      </DiagramItemImage>
    </DiagramItemContainer>
  );
};

const DiagramsList = ({ Diagrams }) =>
  Diagrams.map((Diagram, index) => {
    return (
      <DiagramItem key={index} title={Diagram.name} image={Diagram.poster} />
    );
  });

export default class FlowDiagrams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Backdrop>
        <CloseIcon to="/">
          {/* <FontAwesomeIcon
            icon={['fas', 'times']}
            style={{ color: '#ffffff' }}
            size="1x"
          /> */}
        </CloseIcon>
        <Title>Interactive Flowcharts</Title>
        <ScrollContainer>
          <DiagramsContainer>
            <DiagramsWrapperContainer>
              <DiagramsWrapper>
                <DiagramsList Diagrams={Diagrams} />
              </DiagramsWrapper>
            </DiagramsWrapperContainer>
          </DiagramsContainer>
        </ScrollContainer>
      </Backdrop>
    );
  }
}

FlowDiagrams.propTypes = propTypes;
FlowDiagrams.defaultProps = defaultProps;
