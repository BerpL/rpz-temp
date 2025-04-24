/**
 *
 * ModalQuestionBank
 *
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IoMdArrowForward } from 'react-icons/io/index.esm';
import { rgba } from 'polished';
import { ContainerFlex, Row, Col } from 'components/ContainerFlex';
import TreeView from 'components/TreeViewMaterial';
import useTree from 'hooks/useTree';
import useOnClickOutside from 'hooks/useOnClickOutside';

const Overlay = styled.span`
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? 0 : '100vw')};
  top: 0;

  width: 100%;
  height: 100%;
  background-color: ${({ isOpen }) =>
    isOpen ? 'rgba(0,0,0,0.4)' : 'transparent'};
  transition: ${({ isOpen }) =>
    isOpen
      ? '0.2s left ease-in-out, 0.2s 0.2s background-color ease-in-out'
      : '0.2s left ease-in-out'};
  z-index: 100;
`;
const Panel = styled.div`
  background: ${({ theme }) => theme.colors.base};
  min-width: 550px;
  max-width: 650px;
  float: right;
  height: 100vh;
  position: relative;
  box-shadow: -4px 0 4px 0 rgba(0, 0, 0, 0.1);
`;

const InnerHeader = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.base};
  justify-content: flex-end;
  padding: 0 16px;
  align-items: center;
  height: 60px;
  left: 0;
  box-shadow: -4px 0px 5px 4px rgba(0, 0, 0, 0.1);
  display: flex;
`;

const BackIcon = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 45px;
  justify-content: center;
  background: transparent;
  transition: background 0.2s ease;
  color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
  &:hover {
    background: ${({ theme }) => rgba(theme.colors.primary, 0.4)};
  }
`;

function ModalQuestionBank({ open, onClose, treeData, onAdd }) {
  const [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    findNode,
    onOpenNode,
    addNode,
    removeNode,
  ] = useTree({
    data: treeData,
    openAll: true,
  });

  const ref = useRef();

  useOnClickOutside(ref, onClose);

  return (
    <div style={{ position: 'absolute' }}>
      <Overlay isOpen={open}>
        <Panel ref={ref}>
          <ContainerFlex height="100%">
            <Row flex="none" height="65px" width="100%" padding="0">
              <InnerHeader>
                <BackIcon onClick={onClose}>
                  <IoMdArrowForward />
                </BackIcon>
              </InnerHeader>
            </Row>
            <Row flexGrow="1" height="100%" overflow="auto">
              <Col
                flexShrink="0"
                flexGrow="1"
                padding="20px 16px"
                display="unset"
              >
                <TreeView
                  data={tree}
                  onToggleItem={onOpenNode}
                  onClickItem={onSelectNode}
                  findItem={findNode}
                  onAdd={onAdd}
                />
              </Col>
            </Row>
          </ContainerFlex>
        </Panel>
      </Overlay>
    </div>
  );
}

ModalQuestionBank.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  treeData: PropTypes.object,
};

export default ModalQuestionBank;
