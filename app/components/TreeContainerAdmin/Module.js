import React, { useState } from 'react';
import styled from 'styled-components';
import SubModulesContainer from './SubModules';

const Item = styled.div`
  display: block;
  width: 100%;
  position: relative;
  margin: 0;
  padding: 0px 20px 4px;
  cursor: pointer;
`;

const Container = styled.div`
  display: block;
  padding: 12px 0;
`;

const selectColorItem = ({ theme }) => theme.admin.colors.textLight;

const Span = styled.span`
  color: ${selectColorItem};
  transition: all 0.4s;
  white-space: nowrap;
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  user-select: none;
  text-overflow: ellipsis;
  display: inline-block;
`;

function ModuleContainer({ module: module_, onSubModule, ...props }) {
  const { subModulos } = module_;

  const hasSubModules = subModulos && subModulos.length > 0;
  const [openSubModule, setOpenSubModule] = useState(false);

  // const isSelected = selected.module === module_.identificador;

  const handleItemModule = () => {
    setOpenSubModule(!openSubModule);
    // onModule(id, null, hasSubModules);
  };

  return (
    <Container>
      <Item onClick={handleItemModule}>
        <Span isSelected={false}>{module_.nombre}</Span>
      </Item>
      {hasSubModules && (
        <SubModulesContainer
          open
          subModules={module_.subModulos}
          hasSubModules={hasSubModules}
          onItem={onSubModule}
          {...props}
        />
      )}
    </Container>
  );
}

export default ModuleContainer;
