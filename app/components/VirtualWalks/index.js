/**
 *
 * FlowDiagrams
 *
 */

import React, { useEffect, useState } from 'react';

import History from 'utils/history';
import { getAllVideos } from 'services/VideosService';

import { Loader } from 'components/Loader';

// components V2
import InterfaceActions from 'V2/components/InterfaceActions';
import Grid from 'V2/components/GridLayout';

import { ContainerFlex, Title } from './Styles';
import { List } from './ListVirtualWalks';

function FlowDiagrams() {
  const [isLoading, setIsLoading] = useState(false);
  const [stateVirtualWalks, setStateVirtualWalks] = useState({
    virtualWalks: [],
    loading: true,
    error: false,
  });

  async function loadAllDiagrams() {
    setIsLoading(true);
    try {
      const response = await getAllVideos();
      const filter = response.data.data.filter(virtualWalks => virtualWalks.habilitado === true);
      setStateVirtualWalks(e => ({
        ...e,
        virtualWalks: filter,
        loading: false,
      }));
      // console.log("filter", filter)
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAllDiagrams();
  }, []);

  const { virtualWalks } = stateVirtualWalks;

  const openVirtualWalk = (id, image) => History.push(`/virtualWalk/${id}`, { image: image });
  const goBack = () => History.goBack();

  return (
    <ContainerFlex>
      {isLoading && <Loader />}
      <InterfaceActions
        hasBack
        backMessage="Back to Home"
        onClickBack={goBack}
      />
      <Title>Videos 3D</Title>
      <Grid>
        <List virtualWalks={virtualWalks} openVirtualWalk={openVirtualWalk} />
      </Grid>
    </ContainerFlex>
  );
}

FlowDiagrams.propTypes = {};

export default FlowDiagrams;
