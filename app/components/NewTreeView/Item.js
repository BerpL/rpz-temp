import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';

/* components */
import { MdPlayArrow, MdAdd } from 'react-icons/md/index.esm';
import { rgba } from 'polished';
import Tree from './Tree';

/* utils */

const LiStyle = {
  padding: 0,
  margin: 0,
  borderWidth: 0,
  position: 'static',
  top: 'auto',
  display: 'block',
};

const ArrowIcon = styled.div`
  transition: transform 0.4s;
  color: ${({ coItem }) => coItem};
  transform: rotate(${({ collapsed }) => (collapsed ? '90deg' : '0deg')});
  vertical-align: middle;
  margin-right: 10px;
`;

const CircleAdd = styled.div`
  width: 25px;
  height: 25px;
  background: ${({ theme }) => theme.colors.base};
  border-radius: 50%;
  cursor: pointer;
  margin-left: auto;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const Container = styled.div`
  font-size: 13px;
  display: flex;
  width: 100%;
  align-items: center;
  height: 40px;
  padding-left: 20px;
  padding-right: 10px;
  border-radius: 10px;
  padding-left: ${({ paLeItem }) => `${paLeItem}px`};

  .circle {
    display: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.base};
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px 0 ${({ theme }) => rgba(theme.colors.primary, 0.8)};

    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  span {
    margin-top: 2px;
    max-width: 155px;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
  }
`;

const Span = styled.span``;

function Item({
  onClickItem,
  item: { id, title, children, open, hasQuestions },
  move,
  find,
  level,
  onToggleItem,
  control,
}) {
  /* const bgItem = selected ? theme.colors.primary : theme.colors.transparent;
  const bsItem = selected
    ? rgba(theme.colors.primary, 0.8)
    : theme.colors.transparent;
  const coItem = selected ? theme.colors.base : rgba(theme.colors.text, 0.9);
  const cuItem = selected ? 'default' : 'pointer'; */
  const paLeItem = (level + 1) * 20;

  const handleClickItem = identifier => {
    onClickItem(identifier);
  };

  return (
    <li style={LiStyle}>
      <Container paLeItem={paLeItem}>
        <ArrowIcon collapsed={open} onClick={() => onToggleItem(id)}>
          <MdPlayArrow />
        </ArrowIcon>
        <Span onClick={() => handleClickItem(id)}>{title}</Span>
        {hasQuestions && (
          <CircleAdd className="circle">
            <MdAdd />
          </CircleAdd>
        )}
      </Container>
      <Tree
        level={level + 1}
        collapsed={open}
        onToggleItem={onToggleItem}
        parent={id}
        onClickItem={onClickItem}
        title={title}
        items={children}
        move={move}
        control={control}
        find={find}
      />
    </li>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  move: PropTypes.func,
  find: PropTypes.func,
  onClickItem: PropTypes.func,
  level: PropTypes.number,
  onToggleItem: PropTypes.func,
  control: PropTypes.bool,
};

export default withTheme(Item);
