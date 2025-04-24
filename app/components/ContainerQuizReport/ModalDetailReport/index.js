import React, { useEffect, useState } from 'react';

import { getQuizzesReportDetail } from 'services/EvaluacionesService';
import PropTypes from 'prop-types';
import { Container } from './Styles';

import Item from './Item';
const Header = ({ id }) => {
  const [stateData, setStateData] = useState({
    data: [],
    loading: true,
    error: false,
  });
  const loadReportDetail = async () => {
    const response = await getQuizzesReportDetail(id);

    setStateData(y => ({
      ...y,
      data: response.data.data,
    }));
  };

  useEffect(() => {
    loadReportDetail();
  }, []);
  return (
    <Container>
      {stateData.data.map((i, index) => (
        <Item key={`i.questions${index}`} item={i} index={index} />
      ))}
    </Container>
  );
};

Header.propTypes = {
  id: PropTypes.any.isRequired,
};

export default Header;
