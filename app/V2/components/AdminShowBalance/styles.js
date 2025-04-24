import styled from 'styled-components';

const ContainerVisor = styled.div`
  width: 100%;
  padding: 20px;
  .title-general-visor {
    display: flex;
    align-items: center;
    max-width: 300px;

    h1,
    h3 {
      color: white;
      margin-top: auto;
      margin-bottom: auto;
    }

    h1 {
      font-size: 50px;
      margin-right: 15px;
    }
  }
  .content-visor {
    width: 100%;
    min-height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    margin-bottom: 10px;
    padding: 5px;
  }

  .title-visor {
    background-color: #303443;
    width: 50%;
    border-radius: 5px;
    color: #fff;
    padding: 3px 3px 3px 10px;
  }

  .registros-visor{
    margin-top: 10px;
  }

  .registro-visor {
    padding: 0 10px;
    display: flex;
  }

  label:first-child {
    text-align: left;
    flex: start;
  }

  label:last-child {
    text-align: right;
    flex: end;
  }

  label {
    margin: 5px;
    width: 50%;
    display: inline-block;
    margin-bottom: 0.5rem;
    color: white;
  }
`;

export default ContainerVisor;
