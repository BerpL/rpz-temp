/**
 *
 * ContainerAdminAccessControlDetail
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
/* components */
import ListAdminAccessControlDetail from 'components/ListAdminAccessControlDetail';
import ContainerModal from 'components/ContainerModal';
import ContainerScroll from 'components/ContainerScroll';
import Loader from 'components/LoaderForm';

/* services */
import { getIncomesByUser } from 'services/UserServices';

function ContainerAdminAccessControlDetail({ id }) {
  const [incomes, setIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getIncomes = async () => {
    try {
      const response = await getIncomesByUser(id);
      setIncomes(response.data.data);
      setTimeout(() => setIsLoading(false), 1500);
    } catch (e) {
      // console.log(e);
    }
  };
  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <ContainerModal minWidth={600} paddingLeft={1}>
      <ContainerScroll maxHeight={85} metric="vh" padding="0px 16px">
        {!isLoading && (
          <ListAdminAccessControlDetail accessControlDetail={incomes} />
        )}
        {isLoading && <Loader />}
      </ContainerScroll>
    </ContainerModal>
  );
}

ContainerAdminAccessControlDetail.propTypes = {
  id: PropTypes.any,
};

export default ContainerAdminAccessControlDetail;
