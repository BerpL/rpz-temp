/**
 *
 * FlowDiagrams
 *
 */

import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// components V2
import InterfaceActions from 'V2/components/InterfaceActions';
import Grid from 'V2/components/GridLayout';

import History from 'utils/history';
import { getAllDiagrams } from 'services/DiagramasService';
import { ContainerFlex, Title } from './Styles';
import { List } from './ListFlowDiagrams';
import { Loader } from 'components/Loader';

function FlowDiagrams() {
  const [isLoading, setIsLoading] = useState(false);
  const [stateFlowDiagrams, setStateFlowDiagrams] = useState({
    flowDiagrams: [],
    loading: true,
    error: false,
  });

  async function loadAllDiagrams() {
    setIsLoading(true);
    try {
      const response = await getAllDiagrams();
      const filter = response.data.data.filter(flowDiagrams => flowDiagrams.habilitado === true);
      setStateFlowDiagrams(e => ({
        ...e,
        flowDiagrams: filter,
        loading: false,
      }));
      // console.log(filter);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAllDiagrams();
  }, []);

  const { flowDiagrams } = stateFlowDiagrams;

  const openDiagram = id => History.push(`/flowdiagram/${id}`);
  const goBack = () => History.goBack();

  return (
    <ContainerFlex>
      <InterfaceActions
        hasBack
        backMessage="Back to Home"
        onClickBack={goBack}
      />
      <Title>Interactive Flowcharts</Title>
      <Grid>
        {isLoading && <Loader />}
        <List flowDiagrams={flowDiagrams} openDiagram={openDiagram} />
      </Grid>
    </ContainerFlex>
  );
}

FlowDiagrams.propTypes = {};

export default FlowDiagrams;
