import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { getScheduledEvaluations } from 'services/EvaluacionesService';
import { Container, Title, BeforeTitle } from './Styles';
import Item from './Item';

const getScheduledEvaluationsData = async () => {
  try {
    const { data } = await getScheduledEvaluations();
    return data.data;
  } catch {
    return [];
  }
};

const ListScheduledEvaluations = props => {
  const [state, setState] = useState({
    scheduledEvaluations: [],
    isLoading: false,
    hasError: false,
  });

  const loadDataScheduledEvaluations = async () => {
    const data = await getScheduledEvaluationsData();
    setState(e => ({
      ...e,
      scheduledEvaluations: data,
    }));
  };

  useEffect(() => {
    loadDataScheduledEvaluations();
    return () => {};
  }, []);

  return (
    <Container>
      <BeforeTitle>Evaluations</BeforeTitle>
      <Title>Scheduled</Title>
      <div>
        {state.scheduledEvaluations.map(item => (
          <Item item={item} key={item.id} {...props} />
        ))}
      </div>
    </Container>
  );
};

ListScheduledEvaluations.propTypes = {};

export default ListScheduledEvaluations;
