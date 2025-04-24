/**
 *
 * ContainerQuizzesReport
 *
 */
import React, { useEffect, useState } from 'react';

import { getQuizzesReport } from 'services/EvaluacionesService';
import History from 'utils/history';
import { List } from './ListQuizzes';

function ContainerQuizzesReport() {
  const [stateReport, setStateReport] = useState({
    report: [],
    loading: true,
    error: false,
  });

  const loadReport = async () => {
    const response = await getQuizzesReport();
    setStateReport(s => ({
      ...s,
      report: response.data.data,
    }));
  };

  useEffect(() => {
    loadReport();
  }, []);

  const handleClickItem = id => {
    History.push(`/admin/quiz/${id}/report`);
  };

  return (
    <>
      {stateReport.report && (
        <List data={stateReport.report} onClickItem={handleClickItem} />
      )}
    </>
  );
}

ContainerQuizzesReport.propTypes = {};

export default ContainerQuizzesReport;
