import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { getFinishedEvaluations } from 'services/EvaluacionesService';
import { Container, Title, BeforeTitle } from './Styles';
import Item from './Item';

const getFinishedEvaluationsData = async () => {
  try {
    const { data } = await getFinishedEvaluations();
    return data.data;
  } catch {
    return [];
  }
};

const ListFinishedEvaluations = () => {
  const [state, setState] = useState({
    finishedEvaluations: [],
    isLoading: false,
    hasError: false,
  });

  const loadDataFinishedEvaluations = async () => {
    const data = await getFinishedEvaluationsData();
    setState(e => ({
      ...e,
      finishedEvaluations: data,
    }));
  };

  useEffect(() => {
    loadDataFinishedEvaluations();
    return () => {};
  }, []);

  return (
    <Container>
      <BeforeTitle>Evaluations</BeforeTitle>
      <Title>Finished</Title>
      <div>
        {state.finishedEvaluations.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </Container>
  );
};

ListFinishedEvaluations.propTypes = {};

export default ListFinishedEvaluations;
