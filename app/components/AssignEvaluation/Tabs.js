import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { lighten } from 'polished';
import { ListUsers } from './ListUsers';
import { ListGroups } from './ListGroups';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const bgButtonTab = ({ selected, theme }) =>
  selected ? lighten('0.15', theme.colors.primary) : 'transparent';

const colorButtonTab = ({ selected, theme }) =>
  selected ? theme.colors.base : lighten('0.15', theme.colors.primary);

const ButtonTab = styled(Button)`
  background: ${bgButtonTab};
  border: 2px solid ${({ theme }) => lighten('0.15', theme.colors.primary)};
  color: ${colorButtonTab};
  width: 120px;
  transition: all 0.2s;
  &:hover {
    background: ${bgButtonTab};
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  padding: 0px 16px;
`;

const TabViewer = ({
  children,
  onChangeTab,
  selected,
  idSelectedControlGroup,
  ...props
}) => {
  const changeTabHandler = tab => {
    onChangeTab(tab);
  };

  useEffect(() =>
    // console.log('montando');
     () => {
      // console.log('desmontando');
    }
  , []);

  return (
    <Container {...props}>
      <HeaderButtons>
        <ButtonTab
          style={{ marginRight: 2.5 }}
          onClick={() => changeTabHandler(1)}
          selected={selected === 1}
        >
          Users
        </ButtonTab>
        <ButtonTab
          style={{ marginLeft: 2.5 }}
          onClick={() => changeTabHandler(2)}
          selected={selected === 2}
        >
          Groups
        </ButtonTab>
      </HeaderButtons>
      {selected === 1 && <ListUsers {...props} />}
      {selected === 2 && <ListGroups {...props} />}
    </Container>
  );
};

export default TabViewer;
