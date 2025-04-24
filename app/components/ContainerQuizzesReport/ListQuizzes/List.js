import React from 'react';
import PropTypes from 'prop-types';
import { ContainerList } from './Styles';
import Header from './Header';
import Item from './Item';
const List = ({ data, onClickItem }) => (
  <ContainerList>
    <Header />
    {data.map(i => (
      <Item key={i.idEvaluacion} item={i} onClickItem={onClickItem} />
    ))}
  </ContainerList>
);

List.propTypes = {
  data: PropTypes.array.isRequired,
  onClickItem: PropTypes.func,
};

export default List;
