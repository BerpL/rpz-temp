/**
 *
 * BreadcrumbsAdmin
 *
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import ClickOutside from 'react-click-outside';
import {
  MdChevronRight,
  MdMoreHoriz,
  MdFolder,
  MdPlayArrow,
} from 'react-icons/md/index.esm';

const Item = styled.span`
  font-size: 13px;
  height: 31px;
  cursor: ${({ isLastItem }) => (isLastItem ? 'default' : 'pointer')};
  border-radius: 6px;
  display: flex;
  width: 100%;
  min-width: 40px;
  align-items: center;
  &:hover {
    color: ${({ theme }) => rgba(theme.colors.primary, 0.8)};
  }
  > svg {
    vertical-align: middle;
  }
  ${({ isThreePoints }) =>
    !isThreePoints &&
    `&:last-child {
    > svg {
      color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
      font-size: 13px;
      flex: 0 0 13px;
      margin-left: 3px;
      transform: rotate(90deg);
    }
  }`};
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 0 10 auto;
  overflow: hidden;
  height: 100%;
  color: ${({ isLastItem, theme }) =>
    rgba(theme.colors.text, isLastItem ? 1 : 0.5)};
  position: relative;
  padding-right: 26px;
  user-select: none;
`;

const IconSpace = styled.span`
  bottom: 0;
  right: 0;
  top: 0;
  width: 26px;
  font-size: 13px;
  padding: 6px 0px;
  position: absolute;
  display: table-cell;

  vertical-align: middle;
  text-align: center;
  svg {
    transform: rotate(${({ rotate = 0 }) => `${rotate}deg`});
    font-size: ${({ fontSizeIcon = 13 }) => `${fontSizeIcon}px`};
  }
`;

const TextSpan = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`;

const ItemsContainer = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
`;

const C01 = styled.div`
  height: 100%;
  max-width: 100%;
  min-width: 1px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  overflow: visible;
`;

const C02 = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
`;

const C03 = styled.div`
  height: 100%;
  max-width: 100%;
  min-width: 1px;
  position: relative;
`;

const C04 = styled.div`
  align-items: flex-start;
  flex: 1 1 auto;
  display: flex;
  height: 100%;
  position: relative;
`;

const C05 = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-right: 6px;
  white-space: nowrap;
  width: 100%;
`;

const Modal = styled.div`
  max-height: ${({ open }) => (open ? '400px' : '0px')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  position: absolute;
  top: 30px;
  left: 0px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.base};
  text-align: left;
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  z-index: 2;
  min-width: 250px;
  border-radius: 10px;
  box-shadow: 0 0px 20px 0px ${({ theme }) => rgba(theme.colors.text, 0.2)};
`;

const ItemModal = styled.div`
  cursor: pointer;
  padding: 10px 26px;
  white-space: nowrap;
  outline: none;
  font-size: 13px;
  display: flex;
  align-items: center;
  color: ${({ theme: { text } }) => text};

  &:hover {
    background: ${({ theme }) => rgba(theme.colors.text, 0.05)};
  }

  > svg {
    margin-right: 10px;
    flex: 0 0 15px;
    font-size: 15px;
  }
`;

function BreadcrumbsAdmin({ tree, onClickItem, date }) {
  const [open, setOpen] = useState(false);
  const [positionModal, setPositionModal] = useState(false);

  const hasRender = tree;
  const lastItem = hasRender && tree.length - 1;
  const lastPrevItem = hasRender && lastItem - 1;
  const prevLastPrevItem = hasRender && lastPrevItem - 1;

  const firstItem = hasRender && 0;
  const isOutRange = hasRender && lastItem >= 3;
  const firstItemRef = useRef(null);

  const handleClickThreeDots = () => {
    const { offsetWidth, offsetHeight } = firstItemRef.current;
    setPositionModal({ top: offsetHeight, left: offsetWidth });
    setOpen(!open);
  };

  const NormalRender = () =>
    tree.map((node, index) => {
      const isLastItem = lastItem === index;
      return (
        <ItemContainer key={node.id} isLastItem={isLastItem}>
          <Item
            isLastItem={isLastItem}
            onClick={isLastItem ? () => { } : () => onClickItem(node.id)}
          >
            <TextSpan>{node.title}</TextSpan>
          </Item>
          {isLastItem && (
            <IconSpace rotate={90} fontSizeIcon={11}>
              <MdPlayArrow />
            </IconSpace>
          )}
          {!isLastItem && (
            <IconSpace>
              <MdChevronRight />
            </IconSpace>
          )}
        </ItemContainer>
      );
    });

  const renderModal = () =>
    tree.map((subNode, indexSubNode) => {
      if (indexSubNode > firstItem && indexSubNode < lastPrevItem) {
        return (
          <ItemModal key={subNode.id} onClick={() => onClickItem(subNode.id)}>
            <MdFolder /> {subNode.title}
          </ItemModal>
        );
      }
      return null;
    });

  const CompressRender = () => {
    const firstNode = tree[firstItem];
    const lastNode = tree[lastItem];
    const prevLastNode = tree[lastPrevItem];
    const prevPrevLastNode = tree[prevLastPrevItem];
    return (
      <ItemsContainer>
        <ItemContainer ref={firstItemRef} key={firstNode.id}>
          <Item onClick={() => onClickItem(firstNode.id)}>
            <TextSpan>{firstNode.title}</TextSpan>
          </Item>
          <IconSpace>
            <MdChevronRight />
          </IconSpace>
        </ItemContainer>
        <ItemContainer key="tree_dots">
          <Item style={{ minWidth: 11 }} onClick={handleClickThreeDots}>
            <MdMoreHoriz />
          </Item>
          <IconSpace>
            <MdChevronRight />
          </IconSpace>
        </ItemContainer>
        <ItemContainer key={prevPrevLastNode.id}>
          <Item onClick={() => onClickItem(prevPrevLastNode.id)}>
            <TextSpan>{prevPrevLastNode.title}</TextSpan>
          </Item>
          <IconSpace>
            <MdChevronRight />
          </IconSpace>
        </ItemContainer>
        <ItemContainer key={prevLastNode.id}>
          <Item onClick={() => onClickItem(prevLastNode.id)}>
            <TextSpan>{prevLastNode.title}</TextSpan>
          </Item>
          <IconSpace>
            <MdChevronRight />
          </IconSpace>
        </ItemContainer>
        <ItemContainer key={lastNode.id} isLastItem>
          <Item onClick={() => { }} isLastItem>
            <TextSpan>{lastNode.title}</TextSpan>
          </Item>
          <IconSpace rotate={90} fontSizeIcon={11}>
            <MdPlayArrow />
          </IconSpace>
        </ItemContainer>
      </ItemsContainer>
    );
  };

  const renderView = () =>
    !isOutRange ? <NormalRender /> : <CompressRender />;
  return (
    <C01>
      <C02>
        <C03>
          <C04>
            <C05> {hasRender ? renderView() : null}</C05>
          </C04>
        </C03>
      </C02>
      {hasRender && (
        <ClickOutside onClickOutside={() => setOpen(false)}>
          <Modal style={{ ...positionModal }} key={date} open={open}>
            {renderModal()}
          </Modal>
        </ClickOutside>
      )}
    </C01>
  );
}

BreadcrumbsAdmin.propTypes = {
  tree: PropTypes.array,
  onClickItem: PropTypes.func,
  date: PropTypes.any,
};

export default BreadcrumbsAdmin;
