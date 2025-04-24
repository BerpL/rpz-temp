import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemName,
  ListItemLeft,
  ListItemRight,
  ListItemNumbersQuestions,
  Button,
} from './Styles';

const Item = ({ item, onOpen }) => {
  const numberQuestions =
    item.numeroPreguntas === 1
      ? ` (${item.numeroPreguntas} question)`
      : ` (${item.numeroPreguntas} questions)`;

  return (
    <ListItem>
      <ListItemLeft>
        <ListItemName>
          {item.nombre}
          <ListItemNumbersQuestions>{numberQuestions}</ListItemNumbersQuestions>
        </ListItemName>
      </ListItemLeft>
      <ListItemRight>
        <Button onClick={() => onOpen(item.idEvaluacion, item.id)}>
          Start Evaluation
        </Button>
      </ListItemRight>
    </ListItem>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  onOpen: PropTypes.func,
};

export default Item;
