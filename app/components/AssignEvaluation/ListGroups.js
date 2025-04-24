import React, { useState, useEffect } from 'react';
import {
  getQuizGroups,
  addGroup,
  removeGroup,
} from 'services/EvaluacionesService';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import Check from './Check';

const Container = styled.div`
  height: 560px;
  overflow: auto;
  padding: 16px;
`;

const Item = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.base};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const Info = styled.div`
  padding: 10px 16px;
`;
const CheckContainer = styled.div`
  padding: 10px 0 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Users = styled.div`
  font-size: 14px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.55)};
`;

const Name = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.75)};
`;

const Group = ({ g, onChange }) => {
  const [checked, setChecked] = useState(g.estaAsignado);

  const handleChange = async () => {
    const canChange = await onChange(!checked, g.idGrupo);

    if (canChange) setChecked(!checked);
  };

  const getTextNumeroUsuarios = n => {
    if (n === 1) {
      return `${n} usuario`;
    }

    return `${n} usuarios`;
  };

  return (
    <Item>
      <CheckContainer>
        <Check
          name={g.idGrupo.toString()}
          checked={checked}
          onChange={handleChange}
        />
      </CheckContainer>
      <Info>
        <Name>{g.nombre}</Name>
        <Users>{getTextNumeroUsuarios(g.numeroUsuarios)}</Users>
      </Info>
    </Item>
  );
};

Group.propTypes = {
  g: PropTypes.object,
  onChange: PropTypes.func,
};

const ListGroups = ({ idEvaluacion }) => {
  const [groupsState, setGroupsState] = useState({
    groups: [],
  });

  const getGroups = async () => {
    try {
      const response = await getQuizGroups(idEvaluacion);

      setGroupsState(u => ({
        ...u,
        groups: response.data.data,
      }));
    } catch {}
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleChange = async (checked, idGrupo) => {
    const bodyFormData = new FormData();
    bodyFormData.set('idEvaluacion', idEvaluacion);
    bodyFormData.set('idGrupo', idGrupo);
    try {
      if (checked) {
        await addGroup(idEvaluacion, bodyFormData);
      } else {
        await removeGroup(idEvaluacion, bodyFormData);
      }

      return true;
    } catch (ex) {
      // console.log(ex);
      return false;
    }
  };

  return (
    <Container>
      {groupsState.groups.map(g => (
        <Group key={g.idGrupo} g={g} onChange={handleChange} />
      ))}
    </Container>
  );
};

ListGroups.propTypes = {
  idEvaluacion: PropTypes.any,
};

export { ListGroups };
