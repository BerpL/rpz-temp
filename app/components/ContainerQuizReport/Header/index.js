import React from 'react';
import { FaQuestion, FaRocket, FaUsers } from 'react-icons/fa/index.esm';
import PropTypes from 'prop-types';
import {
  ContainerHeader,
  Name,
  Circle,
  CirclesContainer,
  Square,
} from './Styles';

const Header = ({ evaluation = {} }) => (
  <ContainerHeader>
    <Name>{evaluation.nombre || 'No Name'}</Name>
    <CirclesContainer>
      <Square>
        <Circle>
          <FaRocket />
          {evaluation.calificacion
            ? Math.round(evaluation.calificacion * 10) / 10
            : 0}
          %
        </Circle>
        <p>Average grade (%)</p>
      </Square>

      <Square>
        <Circle>
          <FaQuestion />
          {evaluation.numeroPreguntas || 0}
        </Circle>
        <p>Number of questions</p>
      </Square>

      <Square>
        <Circle>
          <FaUsers />
          {evaluation.participantes || 0}
        </Circle>
        <p>Number of participants</p>
      </Square>
    </CirclesContainer>
  </ContainerHeader>
);

Header.propTypes = {
  evaluation: PropTypes.shape({
    nombre: PropTypes.string,
    calificacion: PropTypes.number,
    numeroPreguntas: PropTypes.number,
    participantes: PropTypes.number,
  }).isRequired,
};

export default Header;
