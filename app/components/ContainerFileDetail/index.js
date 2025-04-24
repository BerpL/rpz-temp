/**
 *
 * ContainerFileDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { rgba } from 'polished';

import { FaFile, FaFolder } from 'react-icons/fa/index.esm';
import { MdLock } from 'react-icons/md/index.esm';
import Link from 'components/Link';
import CheckBox from 'components/CheckBox';

import FileTypes from 'utils/fileTypes';

const ContainerIcon = styled.div`
  padding: 0px 20px 20px;
  font-size: 60px;
  text-align: center;
  vertical-align: middle;
  color: ${({ theme: { text } }) => text};
  border-bottom: 1px solid ${({ theme: { primary } }) => rgba(primary, 0.2)};
`;

const ContainerItems = styled.div`
  padding: 20px;
`;

const ContainerAccess = styled.div`
  padding: 20px;
  border-top: 1px solid ${({ theme: { primary } }) => rgba(primary, 0.2)};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Col = styled.span`
  display: block;
  flex: ${({ title }) => (title ? 1 : 1)};
  padding-left: ${({ title }) => (title ? 0 : '10px')};
  color: ${({ title, theme: { textSubtitle, text } }) =>
    title ? text : textSubtitle};
  white-space: ${({ title }) => (title ? 'normal' : 'nowrap')};
  text-overflow: ellipsis;
  font-size: ${({ title }) => (title ? '10px' : '12px')};
  overflow: hidden;
`;

const ColFlex = styled.span`
  display: block;
  flex: ${({ flex }) => flex || 1};
  padding-left: ${({ title }) => (title ? 0 : '10px')};
  color: ${({ theme: { textSubtitle } }) => textSubtitle};
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 11px;
  overflow: hidden;
`;

const Title = styled.div`
  display: block;
  padding: 20px;
  flex: 1;
  color: ${({ theme: { textBold } }) => textBold};
  font-size: 14px;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  > svg {
    margin-right: 10px;
    flex: 0 0 14px;
    margin-top: 3px;
  }
`;

const getIcon = (type = '') => {
  switch (type) {
    case FileTypes.Folder:
      return <FaFolder />;
    case FileTypes.File:
      return <FaFile />;
    default:
      return null;
  }
};

function ContainerFileDetail({ file, groupsAccess }) {
  const isFolder = file.type === FileTypes.Folder;
  const isFile = file.type === FileTypes.File;

  const canRenderAccess = isFolder && groupsAccess;

  return (
    <div>
      <Title>
        <FaFolder /> {file.title}
      </Title>
      <ContainerIcon>{getIcon(file.type)}</ContainerIcon>
      <ContainerItems>
        <Row>
          <Col title="on">Tipo </Col>
          <Col>{file.type}</Col>
        </Row>
        <Row>
          <Col title="on">Ultima modificación </Col>
          <Col>{file.date}</Col>
        </Row>
        <Row>
          <Col title="on">Creado el </Col>
          <Col>{file.date}</Col>
        </Row>
        <Row>
          <Col title="on">Propietario </Col>
          <Col>{file.user}</Col>
        </Row>
        {isFile && (
          <div>
            <Row>
              <Col title="on">Fuente </Col>
              <Col>
                <Link size={12}>{file.source}</Link>
              </Col>
            </Row>
            <Row>
              <Col title="on">Archivo </Col>
              <Col>
                <Link size={12}>{file.origin}</Link>
              </Col>
            </Row>
            <Row>
              <Col title="on">Vizualizar </Col>
              <Col>
                <CheckBox selected onChange={() => { }} />
              </Col>
            </Row>
          </div>
        )}
      </ContainerItems>
      {canRenderAccess && (
        <Title>
          <MdLock /> Access
        </Title>
      )}
      {canRenderAccess && (
        <ContainerAccess>
          {groupsAccess.map(el => (
            <Row key={el.id}>
              <ColFlex flex={4} title="on">
                {el.title}
              </ColFlex>
              <ColFlex>
                <CheckBox selected={el.acceso} onChange={() => { }} />
              </ColFlex>
            </Row>
          ))}
        </ContainerAccess>
      )}
    </div>
  );
}

ContainerFileDetail.propTypes = {
  file: PropTypes.object,
  groupsAccess: PropTypes.array,
};

export default withTheme(ContainerFileDetail);
