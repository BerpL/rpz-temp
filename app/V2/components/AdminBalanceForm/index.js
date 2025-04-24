import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from './DropDown';
import { BalanceService } from 'servicesV2';
import { Loader } from 'components/Loader';

import { Container } from './styles';

const Form = ({ onModify, onClose, idArbol }) => {
  const { register, handleSubmit, errors } = useForm();
  const [json, setJson] = useState([]);
  const [balanceService] = useState(new BalanceService());
  const [isLoading, setIsLoading] = useState(false);
  const [activeElement, setActiveElement] = useState(-1);

  const getJson = async () => {
    try {
      const flujo = await balanceService.getBalance();
      if (flujo.length > 0) setActiveElement(flujo[0].idTipoBalanceMasa);
      setJson(flujo);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getJson();
  }, []);

  const handdleClickDropDown = idTipoBalanceMasa => {
    if (activeElement === idTipoBalanceMasa) {
      setActiveElement(-1);
    } else {
      setActiveElement(idTipoBalanceMasa);
    }
  };

  const handdleSendRegistro = async values => {
    for (const key in values) {
      if (key.startsWith('valor')) {
        values[key] = values[key].replace(',', '.');
      }
    }
    setIsLoading(true);
    const balancesMasaGroup = json.map(group => group.balanceMasa);
    const balancesMasa = balancesMasaGroup.flat(1);

    const datosBalance = balancesMasa.map(balance => ({
      idBalanceMasa: values[`idBalanceMasa${balance.idBalanceMasa}`],
      valor: values[`valor${balance.idBalanceMasa}`],
    }));

    const data = {
      newFlujo: {
        Codigo: values.codigo,
        Nombre: values.nombre,
        IdArbolFlujo: idArbol,
      },
      datosBalance,
    };
    try {
      await balanceService.addBalance(data);
      onModify();
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading && <Loader />}

      <form
        className="form-balance"
        onSubmit={handleSubmit(handdleSendRegistro)}
      >
        <div className="header-balance">
          <label className="label-balance">Mass Balances</label>
          <br />
          <input
            className="form-control-balance"
            type="text"
            placeholder="Flow Name"
            name="nombre"
            ref={register({
              required: {
                value: true,
                message: 'Name is required',
              },
              pattern: {
                value: /^[a-zA-ZÀ-ÿ( )a-zA-ZÀ-ÿ]+$/i,
                message: 'Only enter letters',
              },
            })}
          />
          {errors.nombre && (
            <div className="error-message">{errors.nombre.message}</div>
          )}
          <input
            className="form-control-balance"
            type="text"
            placeholder="Flow Code"
            name="codigo"
            ref={register({
              required: {
                value: true,
                message: 'Code is required',
              },
              minLength: {
                value: 3,
                message: 'Enter at least 3 characters',
              },
              pattern: {
                value: /^[0-9]+$/i,
                message: 'Only enter numbers',
              },
            })}
          />
          {errors.codigo && (
            <div className="error-message">{errors.codigo.message}</div>
          )}
        </div>
        <label className="label-balance">Records</label>
        <div className="registros-balance" name="datosBalance">
          {json.map(element => (
            <Dropdown
              name={element.descripcion}
              key={element.idTipoBalanceMasa}
              json={element.balanceMasa}
              register={register}
              errors={errors}
              open={element.idTipoBalanceMasa === activeElement}
              clickDropDown={handdleClickDropDown}
            />
          ))}
        </div>
        <div className="footer-balance">
          <input className="submit-balance" type="submit" value="Save" />
        </div>
      </form>
    </Container>
  );
};

export default Form;
