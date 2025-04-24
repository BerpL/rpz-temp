import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemName,
  ListItemLeft,
  ListItemRight,
  ListItemDate,
  ListItemRatingLabel,
  ListItemRating,
  ListItemNumbersQuestions,
  ListItemRatingText,
} from './Styles';

const Item = ({ item }) => {
  const date = new Date(item.fecha);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const numberQuestions =
    item.numeroPreguntas === 1
      ? ` (${item.numeroPreguntas} question)`
      : ` (${item.numeroPreguntas} questions)`;
  const rating = `${item.calificacion}%`;

  return (
    <ListItem>
      <ListItemLeft>
        <ListItemName>
          {item.nombre}
          <ListItemNumbersQuestions>{numberQuestions}</ListItemNumbersQuestions>
        </ListItemName>
        <ListItemDate>{date.toLocaleDateString('en-US', options)}</ListItemDate>
      </ListItemLeft>
      <ListItemRight>
        <ListItemRating>
          <ListItemRatingLabel>Rating:</ListItemRatingLabel>
          <ListItemRatingText>{rating}</ListItemRatingText>
        </ListItemRating>
      </ListItemRight>
    </ListItem>
  );
};

Item.propTypes = {
  item: PropTypes.object,
};

export default Item;
