import React, { useState, useEffect } from 'react';
import {
  getQuizUsers,
  addUser,
  removeUser,
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

const Name = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.75)};
`;

const Group = styled.div`
  font-size: 14px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.55)};
`;

const User = ({ u, onChange }) => {
  const [checked, setChecked] = useState(u.estaAsignado);

  const handleChange = async () => {
    const canChange = await onChange(!checked, u.idUsuario);

    if (canChange) setChecked(!checked);
  };
  return (
    <Item>
      <CheckContainer>
        <Check
          name={u.idUsuario.toString()}
          checked={checked}
          onChange={handleChange}
        />
      </CheckContainer>
      <Info>
        <Name>
          {u.nombre} ({u.usuario})
        </Name>
        <Group>{u.grupo}</Group>
      </Info>
    </Item>
  );
};

User.propTypes = {
  u: PropTypes.object,
  onChange: PropTypes.func,
};

const ListUsers = ({ idEvaluacion }) => {
  const [usersState, setUsersState] = useState({
    users: [],
  });

  const getUsers = async () => {
    try {
      const response = await getQuizUsers(idEvaluacion);

      setUsersState(u => ({
        ...u,
        users: response.data.data,
      }));
    } catch {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = async (checked, idUsuario) => {
    const bodyFormData = new FormData();
    bodyFormData.set('idEvaluacion', idEvaluacion);
    bodyFormData.set('idUsuario', idUsuario);
    try {
      if (checked) {
        await addUser(idEvaluacion, bodyFormData);
      } else {
        await removeUser(idEvaluacion, bodyFormData);
      }

      return true;
    } catch (ex) {
      // console.log(ex);
      return false;
    }
  };

  return (
    <Container>
      {usersState.users.map(u => (
        <User u={u} key={u.idUsuario} onChange={handleChange} />
      ))}
    </Container>
  );
};

ListUsers.propTypes = {
  idEvaluacion: PropTypes.any,
};

export { ListUsers };
