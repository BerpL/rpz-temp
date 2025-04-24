import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Dropdown from './DropDownUpdate';
import { BalanceService } from 'servicesV2';
import { Loader } from 'components/Loader';

import { Container } from './styles';

const Form = ({ id, onModify, onClose, idArbol }) => {
  const { register, handleSubmit, errors } = useForm();
  const [json, setJson] = useState();
  const [balanceService] = useState(new BalanceService());
  const [isLoading, setIsLoading] = useState(false);
  const [activeElement, setActiveElement] = useState(-1);

  const getJson = async id => {
    try {
      const flujo = await balanceService.getBalanceById(id);
      if (flujo.length > 0) setActiveElement(flujo[0].idTipoBalanceMasa);
      validateJson(flujo);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateJson = json => {
    json.tiposBalanceForm.map(element => {
      element.flujosBalanceMasaForm.map(item => {
        var temp = item.valor;
        if (temp != null) {
          temp = temp + '';
          item.valor = temp.replace('.', ',');
        }
      });
    });
    setJson(json);
  };

  useEffect(() => {
    setIsLoading(true);
    getJson(id);
  }, []);

  const handdleClickDropDown = idTipoBalanceMasa => {
    if (activeElement === idTipoBalanceMasa) {
      setActiveElement(-1);
    } else {
      setActiveElement(idTipoBalanceMasa);
    }
  };

  const handdleSendRegistro = async values => {
    setIsLoading(true);
    // e.preventDefault();
    const balancesMasaGroup = json.tiposBalanceForm.map(
      group => group.flujosBalanceMasaForm,
    );
    const balancesMasa = balancesMasaGroup.flat(1);

    const DatosBalance = balancesMasa.map(balance => ({
      idFlujoBalanceMasa:
        values[`idFlujoBalanceMasa${balance.idFlujoBalanceMasa}`],
      idBalanceMasa: values[`idBalanceMasa${balance.idBalanceMasa}`],
      valor: values[`valor${balance.idBalanceMasa}`],
    }));

    const data = {
      NewFlujo: {
        IdFlujo: values.idFlujo,
        Codigo: values.codigo,
        Nombre: values.nombre,
        IdArbolFlujo: idArbol,
      },
      DatosBalance,
    };
    try {
      // console.log(data, 'data');
      await balanceService.updateBalance(data);
      onModify();
      onClose();
    } catch (error) {
      alert(error.message);
      // console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading && <Loader />}
      {json != undefined && (
        <form
          className="form-balance"
          onSubmit={handleSubmit(handdleSendRegistro)}
        >
          <div className="header-balance">
            <label className="label-balance">Mass Balances</label>
            <br />
            <input
              ref={register()}
              name="idFlujo"
              type="hidden"
              value={json.idFlujo}
            />
            <input
              className="form-control-balance"
              type="text"
              placeholder="Flow Name"
              name="nombre"
              defaultValue={json.nombre}
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
              defaultValue={json.codigo}
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
            {json.tiposBalanceForm.map(element => (
              <Dropdown
                name={element.descripcion}
                key={element.idTipoBalanceMasa}
                json={element}
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
      )}
    </Container>
  );
};

export default Form;
