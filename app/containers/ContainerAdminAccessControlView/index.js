/**
 *
 * ContainerAdminAccessControlView
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdAccessTime } from 'react-icons/md/index.esm';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import Modal from 'components/Modal';

/* components */
import ContainerAdminAccessControlDetail from 'containers/ContainerAdminAccessControlDetail';
import ContainerModal from 'components/ContainerModal';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import Paragraph from 'components/Paragraph';
import Button from 'components/Link';
import Loader from 'components/LoaderForm';

/* services */
import { getReportIncomesByUser } from 'services/UserServices';

ReactChartkick.addAdapter(Chart);

const HORA_MIN = 60;


const rendondearADosDecimales = num => Math.round(num * 100) / 100;

const convertirMinutosAHoras = (minutos) => rendondearADosDecimales(minutos / 60);

function ContainerAdminAccessControlView({ income }) {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tieneHoras, setTieneHoras] = useState(false);

  const getIncomesPerUser = async () => {
    try {
      const response = await getReportIncomesByUser(income.idUsuario);
      const incomes = response.data.data;
      let dataIncomes = [];
      if (incomes && incomes.length) {
        const esMayorAUnaHora = incomes.some(element => element.tiempo > HORA_MIN);

        setTieneHoras(esMayorAUnaHora);
        dataIncomes = incomes.map(element => {
          if(esMayorAUnaHora){
            const tiempo = convertirMinutosAHoras(element.tiempo);
            const dataIncomeItem = [element.fecha, tiempo];
            return dataIncomeItem;
          }
          const dataIncomeItem = [element.fecha, element.tiempo];
          return dataIncomeItem;
        });
      }
      setData(dataIncomes);
    } catch (e) {
      //  console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getIncomesPerUser();
  }, []);
  return (
    <ContainerModal>
      <TitleModuleAdmin title="Login Details" />
      <Paragraph>
        <MdAccessTime /> {income.tiempoTotalEntrenamiento} Total Training Time (HH:MM){' '}
       {/*  <Button onClick={() => setOpenModal(true)}>Login Details</Button> */}
      </Paragraph>
      {!isLoading && (
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <LineChart
            xtitle="Dates"
            ytitle="Time"
            width="800px"
            height="500px"
            data={data}
            curve={false}
            suffix={`${tieneHoras ? 'h' : 'min'}`}
            discrete
          />
        </div>
      )}
      {isLoading && <Loader />}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ContainerAdminAccessControlDetail id={income.idUsuario} />
      </Modal>
    </ContainerModal>
  );
}

ContainerAdminAccessControlView.propTypes = {
  income: PropTypes.object,
};

export default ContainerAdminAccessControlView;
