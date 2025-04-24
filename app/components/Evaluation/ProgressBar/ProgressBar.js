import React from 'react';
import PropTypes from 'prop-types';

import { Container, Bar, BarComplete, Text } from './Styles';

function ProgressBar({ progress }) {
  return (
    <Container>
      <Text>{Math.round(parseFloat(progress) * 100) / 100}% completed</Text>
      <BarComplete>
        <Bar width={progress} />
      </BarComplete>
    </Container>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.string.isRequired,
};

export default ProgressBar;
