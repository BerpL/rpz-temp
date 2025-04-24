import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { hostUrlBase } from 'services/Api';
import { useTheme, Card } from '@nextui-org/react';

const CardContainer = styled(Card)`
  margin: -2rem auto 0 auto;
  width: 80%;
  z-index: 1;
  background-color: #17428B;
  radius: none !important;
`

export const Text = styled.div`
  color: #fff !important;
  font-weight: 600;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI','Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif;
  @media (min-width: 576px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 992px) {
  }

  @media (min-width: 1200px) {
  }
`

export const Child = styled.div`
  user-select: none;
  width: 100%;
  height: 250px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  height: 50vw;
  transition: transform 0.4s ease;
  padding: 10px 5%;

  @media (min-width: 576px) {
    width: 380px;
    height: 210px;
    padding: 10px 0.3%;
  }

  @media (min-width: 768px) {
    width: 400px;
    height: 230px;
  }

  @media (min-width: 992px) {
    width: 420px;
    height: 250px;
  }

  @media (min-width: 1200px) {
    padding: 15px 0.5%;
    width: 440px;
    height: 270px;
  }
`;

export const Container = styled.div`
  width: 100%;
  flex: 1;
  background: #02244f;
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: 0px 20px 0px 20px;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  border-radius: 15px;

`;

const ImageBackground = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: top left;
  background-size: cover;
  transition: all 0.6s ease;
`;

export const GlitchText = styled.span`
  margin: 0;
  color: #fff;
  width: 100%;
  text-transform: uppercase;
  font-size: 15px;
  z-index: 2;
  font-weight: bold;
  letter-spacing: -0.6px;
  transition: transform 0.3s ease-in-out;
  padding: 5%;
  @media only screen and (min-width: 500px) {
    font-size: 21px;
  }
`;

/* const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 500px;
  height: 400px;
  border-radius: 15px;
  background: rgba(0,0,0, .3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 2rem 0 0 0;
`; */

function Area({ area, onClickArea = () => {}, style }) {
  const { theme } = useTheme();

  const getUrl = useMemo(
    () => {
      if (!area) return '';
      if (!area.imagenArea) return '';
      return area.imagenArea.replace(/\\/g, '/');
    },
    [area.imagenArea],
  );

  const handleClickArea = useCallback(
    () => {
      onClickArea(area.id);
    },
    [area.id],
  );

  const cardStyle = {
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    marginTop: '380px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '724px',
    height: '125px',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: 'none',
    zIndex: '1',
  };

  return (
    <>
      <Child onClick={handleClickArea} className="child" style={style}>
        <Container>
          <ImageBackground image={`${hostUrlBase}/${getUrl}`} />
        </Container>
        <CardContainer
          onClick={handleClickArea}
          isPressable
          isHoverable
          variant="bordered"
        >
          <Card.Body>
            <Text>{area.nombre}</Text>
          </Card.Body>
        </CardContainer>

      </Child>
    </>
  );
}

Area.propTypes = {
  area: PropTypes.object,
  onClickArea: PropTypes.func,
  style: PropTypes.object,
};

export default React.memo(Area);
