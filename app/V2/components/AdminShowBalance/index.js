import React, { useState, useEffect } from 'react';
import { BalanceService } from 'servicesV2';
import { Loader } from 'components/Loader';
import ContainerVisor from './styles';

const Visor = ({ id }) => {
  const [json, setJson] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [balanceService] = useState(new BalanceService());

  const getBalance = async id => {
    setIsLoading(true);
    try {
      const balance = await balanceService.getBalanceById(id);

      const tiposBalanceForm = balance.tiposBalanceForm.filter(
        t => t.flujosBalanceMasaForm.length > 0,
      );
      balance.tiposBalanceForm = tiposBalanceForm;
      // setJson(balance);
      hasItem(balance);
      // console.log(balance);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const hasItem = json => {
    // console.log(json)
    if (json == undefined) return;
    var json_temp = [];

    json.tiposBalanceForm.map(item => {
      var temp = 0;
      item.flujosBalanceMasaForm.map(element => {
        if (element.valor != null) {
          temp = temp + 1;
        }
      });
      if (temp >= 1) json_temp.push(item);
    });
    // console.log(json_temp);
    json.tiposBalanceForm = json_temp;
    setJson(json);
    // console.log(json);
  };

  useEffect(
    () => {
      getBalance(id);
    },
    [id],
  );

  return (
    <ContainerVisor>
      {isLoading && <Loader />}
      {json != undefined && (
        <>
          <div className="title-general-visor">
            <h1>{json.codigo}</h1>
            <h3>{json.nombre}</h3>
          </div>
          {json.tiposBalanceForm.map(item => {
            return (
              <div className="content-visor" key={item.idTipoBalanceMasa}>
                <div className="title-visor">{item.descripcion}</div>
                <div className="registros-visor">
                  {item.flujosBalanceMasaForm.map(
                    element =>
                      element.valor && (
                        <div
                          className="registro-visor"
                          key={element.idFlujoBalanceMasa}
                        >
                          <label>{element.descripcion}</label>
                          <label>
                            {element.valor} {element.uMedida}
                          </label>
                        </div>
                      ),
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}
    </ContainerVisor>
  );
};

export default Visor;
