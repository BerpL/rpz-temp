import React from 'react';
import PropTypes from 'prop-types';
import { ContainerList } from './Styles';
import Item from './Item';

const ListUsers = ({ data = [], onClickItem }) => (
  <ContainerList>
    {data.map(i => (
      <Item key={i.idEvaluacionUsuario} item={i} onClickItem={onClickItem} />
    ))}
  </ContainerList>
);

ListUsers.propTypes = {
  data: PropTypes.array.isRequired,
  onClickItem: PropTypes.func,
};

export default ListUsers;
