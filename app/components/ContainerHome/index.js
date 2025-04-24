/**
 *
 * ContainerHome
 *
 */

import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import styled from 'styled-components';
import Header from 'components/HeaderHome';
import Footer from 'components/FooterHome';
import History from 'utils/history';
import { getAllAreas } from 'services/ArbolPrincipalService';
import Area from './Area';

import AreasScrollContainer from './AreasScrollContainer';
import MobileArea from './MobileArea';

import { ContainerFlex } from './Styles';

const ChildGroupContainer = styled.div`
  display: grid;
  column-gap: 30px;
  justify-content: center;
  margin: auto;
  grid-template-columns: auto auto;

  @media (min-width: 576px) {
    column-gap: 10px;
  }
`;

const Container = styled.div`
  display: none;
  width: 100%;
  height: 100%;

  @media (min-height: 600px) and (min-width: 576px) {
    display: block;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 40%;
  height: 500px;
  background: #fff;
`;

function ContainerHome() {
  const [areas, setAreas] = useState([]);

  const getAreas = async () => {
    const response = await getAllAreas();
    //console.log(response.data.data)
    setAreas(response.data.data.filter(area => area.habilitado === true));
  };

  const handleClickArea = useCallback(
    id => {
      History.push(`/area/${id}`);
    },
    [],
  );

  useEffect(() => {
    getAreas();
  }, []);

  const renderAreaScrollable = useMemo(() => {
    if (areas.length > 4) {
      return <AreasScrollContainer onClickArea={handleClickArea} data={areas} />
    }
    return <ChildGroupContainer>
      {areas.map(area => (
        <Area key={area.id} area={area} onClickArea={handleClickArea} />
      ))}
    </ChildGroupContainer>;
  }, [areas])


  return (
    <ContainerFlex>
        <Header />
        <Container>
          {renderAreaScrollable}
        </Container>
        <MobileArea data={areas} onClickArea={handleClickArea} />
        <Footer />
    </ContainerFlex>
  );
}

ContainerHome.propTypes = {};

export default memo(ContainerHome);
