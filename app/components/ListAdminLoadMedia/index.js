/**
 *
 * ListAdminLoadMedia
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaFile } from 'react-icons/fa/index.esm';
import { Header, Column, Row, Text } from 'components/List';
import CheckBox from 'components/CheckBox';
import { rgba } from 'polished';

const EmptyView = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  > svg {
    font-size: 100px;
    color: ${({ theme: { primaryLight } }) => rgba(primaryLight, 0.23)};
  }

  > em {
    font-size: 15px;
    padding: 20px 0 0 0;
    color: ${({ theme: { primaryLight } }) => rgba(primaryLight, 0.5)};
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

function ListAdminLoadMedia({ media, onCheckedAll, checkAll, onCheckedItem }) {
  const isEmpty = media && media.length === 0;

  return (
    <Container>
      {isEmpty && (
        <EmptyView>
          <FaFile />
          <em>No Media Loaded</em>
        </EmptyView>
      )}
      {!isEmpty && (
        <div>
          <Header>
            <Column flex="none">
              <CheckBox
                selected={checkAll}
                onChange={(x, y, checked) => onCheckedAll(checked)}
              />
            </Column>
            <Column>Nombre</Column>
          </Header>
          {media.map(item => (
            <Row
              key={item.idMedio}
              onContextMenu={() => null}
              onClick={() => null}
              onDoubleClick={() => null}
            >
              <Column flex="none">
                <Text>
                  <CheckBox
                    selected={item.checked}
                    onChange={(x, y, checked) =>
                      onCheckedItem(checked, item.idMedio)
                    }
                  />
                </Text>
              </Column>
              <Column>
                <Text>{item.nombre}</Text>
              </Column>
            </Row>
          ))}
        </div>
      )}
    </Container>
  );
}

ListAdminLoadMedia.propTypes = {};

export default ListAdminLoadMedia;
