import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100vh; */

  .form-balance {
    width: 500px;
    max-height: 800px;
    background-color: #ebedec;
    overflow: hidden;
    border-radius: 10px;
    /* margin: auto; */
    padding: 20px;
    text-align: left;
  }

  .header-balance {
    /* display: block; */
    margin-bottom: 1rem;
    /* text-align: left; */
  }

  .label-balance {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: #47525e;
  }

  .form-control-balance {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ebedec;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-control-balance:focus {
    color: #4f85bb;
    background-color: #fff;
    border-color: #495057;
    outline: 0;
    box-shadow: 0 0 0 0.1rem #97989b;
  }

  .registros-balance {
    overflow-y: auto;
    max-height: 500px;
  }

  .footer-balance {
    display: flex;
    background-color: #c4c4c4;
    width: 100%;
    margin: 20px auto;
    align-items: center;
    justify-content: center;
  }
  .submit-balance {
    margin: 10px;
    padding: 5px;
    width: 50%;
    font-weight: bold;
    border-radius: 0.25rem;
    border: 1px solid #495057;
    cursor: pointer;
    background-color: #495057;
    color: #fff;
    transition: color 0.25s ease-in-out, background-color 0.25s ease-in-out;
  }

  .submit-balance:hover {
    color: #495057;
    background-color: #fff;
  }

  .error-message{
    margin-bottom: .7rem;
    color: #e03e3e;
    background-color: #f7d9d9;
    padding-left: 10px;
    margin-top: -8px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`;

const ContainerDropdown = styled.div`
  overflow-y: hidden;

  .title-dropdown {
    width: 100%;
    background-color: #fff;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    color: #495057;
  }

  .title-dropdown svg {
    transition: transform 0.3s ease-in-out;
  }

  .title-dropdown:hover {
    /* background-color: rgb(199, 198, 198); */
    background-color: #495057;
    color: #fff;
  }

  .title-dropdown:hover label {
    color: #fff;
  }

  /* .container-dropdown:hover .content-dropdown{
        visibility: visible;
        height: 200px;
    } */

  .content-dropdown {
    max-height: 0;
    overflow-y: auto;
    visibility: hidden;
    transition: max-height 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }

  .form-group-dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  label {
    max-width: 100%;
    margin: 5px;
    font-weight: 700;
    width: 50%;
  }

  .form-control-dropdown {
    width: 50%;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ebedec;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-control-dropdown:focus {
    color: #4f85bb;
    background-color: #fff;
    border-color: #495057;
    outline: 0;
    box-shadow: 0 0 0 0.1rem #97989b;
  }
`;

export { Container, ContainerDropdown };
