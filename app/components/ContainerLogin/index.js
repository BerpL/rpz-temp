/**
 *
 * ContainerLogin
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Wrapper from 'components/Wrapper';
import Form from 'components/Form';
// import InputAdmin from 'components/InputAdmin';
import ButtonAdmin from 'components/ButtonAdmin';
import Input from 'components/Input';
import useForm from 'hooks/useForm';
import History from 'utils/history';

import BgImage from 'images/bg.jpg';
import LogoTecsup from 'images/Logo_Tecsup.png';

const LoginBox = styled.div`
  width: 350px;
  text-align: center;
  margin: auto;
  @media only screen and (max-width: 700px) and (orientation: portrait) {
    width: 90%;
  }
  @media only screen and (max-width: 700px) and (orientation: landscape) {
    width: 60%;
  }
`;

const Title = styled.h1`
  color: white;
  margin-top: 0;
  text-align: center;
  @media only screen and (max-width: 700px) and (orientation: landscape) {
    font-size: 18px;
  }
`;

const BackgroundImageStyle = {
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), url(${BgImage})`,

  display: 'flex',
};

const Img = styled.img.attrs(({ width }) => ({
  width: `${width}px`,
}))`
  margin-bottom: 20px;
`;

function ContainerLogin() {
  const { values, handleChange, handleSubmit } = useForm(login);

  function login() {
    History.push('/');
  }

  // const handleSubmit = () => {};
  return (
    <Wrapper style={{ Co01: BackgroundImageStyle }}>
      <LoginBox>
        <Img src={LogoTecsup} alt="" width={180} />
        <Title>Manual Interactivo de Operaciones</Title>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Input
            onChange={handleChange}
            placeholder="Usuario"
            name="usuario"
            type="text"
          />
          <Input
            onChange={handleChange}
            name="contrasenia"
            placeholder="Constraseña"
            type="password"
          />
          <ButtonAdmin>Login</ButtonAdmin>
        </Form>
        <Img src={LogoTecsup} alt="" width={70} />
      </LoginBox>
    </Wrapper>
  );
}

ContainerLogin.propTypes = {};

export default ContainerLogin;
