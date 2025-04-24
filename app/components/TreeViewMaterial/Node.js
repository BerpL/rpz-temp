import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/* components */
import { MdAdd } from 'react-icons/md/index.esm';
import Button from 'components/Button';
import { rgba } from 'polished';
import { IoIosArrowDown } from 'react-icons/io/index.esm';
import Tree from './Tree';

/* utils */

const Li = styled.div`
  padding: 0;
  margin: 0;
  border-width: 0;
  display: block;
`;

const ArrowIcon = styled.div`
  transition: transform 0.4s;
  color: ${({ coItem }) => coItem};
  transform: rotate(${({ collapsed }) => (collapsed ? '0deg' : '-90deg')});
  vertical-align: middle;
  margin-right: 10px;
`;

const Container = styled.div`
  font-size: 14px;
  display: flex;
  width: 100%;
  align-items: center;
  height: 40px;
  padding-right: 10px;
  padding-left: ${({ paLeItem }) => `${paLeItem}px`};
  &:hover {
    background: ${({ theme }) => rgba(theme.colors.text, 0.1)};
  }
`;

const Add = styled(Button)`
  cursor: pointer;
  margin-left: auto;
  font-weight: 500;
  height: 25px;
  flex-shrink: 0;
  font-size: 14px;
  padding: 0 12px;
  svg {
    margin-right: 0;
    font-size: 14px;
  }
`;

const Span = styled.span`
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 10px;
  white-space: nowrap;
`;

const Item = ({
  onClickItem,
  item: { id, nombre, nodos, open, tienePreguntas },
  move,
  find,
  level,
  onToggleItem,
  control,
  onAdd,
}) => {
  const paLeItem = (level + 1) * 13;

  const handleClickItem = identifier => {
    onClickItem(identifier);
  };

  return (
    <Li>
      <Container paLeItem={paLeItem}>
        <ArrowIcon collapsed={open} onClick={() => onToggleItem(id)}>
          <IoIosArrowDown />
        </ArrowIcon>
        <Span onClick={() => handleClickItem(id)}>{nombre}</Span>
        {tienePreguntas && (
          <Add onClick={() => onAdd(id)}>
            <MdAdd /> Add
          </Add>
        )}
      </Container>
      <Tree
        level={level + 1}
        collapsed={open}
        onToggleItem={onToggleItem}
        parent={id}
        onClickItem={onClickItem}
        nombre={nombre}
        items={nodos}
        move={move}
        control={control}
        find={find}
        onAdd={onAdd}
      />
    </Li>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  move: PropTypes.func,
  find: PropTypes.func,
  onClickItem: PropTypes.func,
  level: PropTypes.number,
  onToggleItem: PropTypes.func,
  control: PropTypes.bool,
};

export default Item;
