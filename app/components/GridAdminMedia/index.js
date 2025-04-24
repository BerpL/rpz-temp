/**
 *
 * GridAdminMedia
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdFolder } from 'react-icons/md/index.esm';
import { rgba } from 'polished';

const FolderContainer = styled.div`
  width: 33.33333%;
  padding: 5px;
`;

const FolderInnerContainer = styled.div`
  padding: 10px 26px;
  background: ${({ theme: { base } }) => base};
  color: ${({ theme: { textSubtitle } }) => textSubtitle};
  width: 100%;
  font-size: 13px;
  user-select: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  > svg {
    flex: 0 0 20px;
    font-size: 20px;
    margin-right: 10px;
  }
  &:hover {
    box-shadow: 0px 2px 6px 0px
      ${({ theme: { primary } }) => rgba(primary, 0.3)};
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 26px 0px 36px 0px;
`;

function GridAdminMedia({ items }) {
  return (
    <Container>
      <Grid>
        {items.map(el => (
          <FolderContainer key={el.id}>
            <FolderInnerContainer>
              <MdFolder /> {el.title}
            </FolderInnerContainer>
          </FolderContainer>
        ))}
      </Grid>
    </Container>
  );
}

GridAdminMedia.propTypes = { items: PropTypes.array };

export default GridAdminMedia;
