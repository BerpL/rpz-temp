import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { MdCheck, MdClose } from 'react-icons/md/index.esm';
import { Answer, Name, ItemContainer } from './Styles';

const Item = ({ item, index }) => (
  <ItemContainer>
    <Name>
      <span>{`${index + 1}.-`}</span> {parse(item.preguntas)}
    </Name>

    <Answer style={{ color: item.esCorrecta ? 'green' : 'red' }}>
      <i>
        {item.esCorrecta ? <MdCheck /> : <MdClose />} {parse(item.respuesta)}
      </i>
    </Answer>
  </ItemContainer>
);

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
