/**
 *
 * ContainerQuizReport
 *
 */

import React, { useState, useEffect } from 'react';
import History from 'utils/history';
import { getQuizzesReportByQuiz, getQuizzesReportFilter } from 'services/EvaluacionesService';
import { Dropdown } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import * as ExcelJS from 'exceljs';

import ActionsContainer from 'V2/components/AdminActions';

import ModalDetailReport from './ModalDetailReport';

import Header from './Header';

import ListUsers from './LIstUsers';
function ContainerQuizReport({ match }) {
  const [stateModal, setStateModal] = useState({
    open: false,
    idEvaluacionUsuario: -1,
  });

  const [stateReport, setStateReport] = useState({
    evaluation: {},
    users: [],
    loading: true,
    error: false,
  });

  const [groupId, setGroupId] = useState("12");

  const loadReport = async () => {
    const response = await getQuizzesReportFilter(match.params.id, groupId);
    console.log(response)
    setStateReport(s => ({
      ...s,
      evaluation: response.data.data.evaluacion,
      users: response.data.data.usuarios,
    }));
  };

  useEffect(() => {
    loadReport();
  }, [groupId]);

  const returnToReports = () => {
    History.goBack();
  };

  const handleCloseModal = () => {
    setStateModal(s => ({
      ...s,
      open: false,
    }));
  };

  const handleClickItem = idEvaluacionUsuarioTmp => {
    setStateModal(s => ({
      ...s,
      open: true,
      idEvaluacionUsuario: idEvaluacionUsuarioTmp,
    }));
  };

  const handleDropdownChange = (selectedGroupId) => {
    setGroupId(selectedGroupId.currentKey);
    loadReport();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };


  const generateExcelReport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    // Column widths configuration
    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 35;
    worksheet.getColumn(5).width = 30;
    for (let i = 6; i <= 10; i++) {
      worksheet.getColumn(i).width = 20;
    }

    // Rows 1 and 2
    worksheet.mergeCells('B1:E2');
    const titleCell = worksheet.getCell('B1');
    titleCell.value = stateReport.evaluation.nombre;
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '000080' }, // Blue background color
    };
    titleCell.font = { color: { argb: 'ffffff' } }; // White font color

    // Row 4
    worksheet.mergeCells('B4:C4');
    worksheet.getCell('B4').value = 'Average Rating (%)';
    worksheet.getCell('B4:C4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '000080' }, // Blue background color
    };
    worksheet.getCell('B4:C4').font = { color: { argb: 'ffffff' } }; // White font color

    worksheet.getCell('D4').value = 'Number of Participants';
    worksheet.getCell('D4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '000080' }, // Blue background color
    };
    worksheet.getCell('D4').font = { color: { argb: 'ffffff' } }; // White font color

    worksheet.getCell('E4').value = 'Number of Questions';
    worksheet.getCell('E4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '000080' }, // Blue background color
    };
    worksheet.getCell('E4').font = { color: { argb: 'ffffff' } }; // White font color

    const cellsToCenterRow4 = ['B4', 'C4', 'D4', 'E4'];
    cellsToCenterRow4.forEach((cellAddress) => {
      const cell = worksheet.getCell(cellAddress);
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // Row 5
    worksheet.mergeCells('B5:C5');
    worksheet.getCell('B5:C5').value = `${stateReport.evaluation.calificacion.toFixed(2)} %`;
    worksheet.getCell('D5').value = stateReport.evaluation.participantes;
    worksheet.getCell('E5').value = stateReport.evaluation.numeroPreguntas;

    // Row 7
    const titles = [
      'No.',
      'First Name',
      'Last Name',
      'Email',
      'User',
      'Group',
      'Evaluation Date',
      'Correct Questions',
      'Incorrect Questions',
      'Rating (%)',
    ];

    titles.forEach((title, index) => {
      const cell = worksheet.getCell(getExcelColumnName(index + 1) + '7');
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    titles.forEach((title, index) => {
      const cell = worksheet.getCell(getExcelColumnName(index + 1) + '7');
      cell.value = title;
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '000080' }, // Blue background color
      };
      cell.font = { color: { argb: 'ffffff' } }; // White font color
    });

    const cellsToCenterRow5 = ['B5', 'C5', 'D5', 'E5'];
    cellsToCenterRow5.forEach((cellAddress) => {
      const cell = worksheet.getCell(cellAddress);
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // Main table content
    let data = [];

    stateReport.users.map((user, index) => {
      const tempUser = {
        No: index + 1,
        FirstName: user.nombres,
        LastName: user.apellidos,
        Email: user.correo,
        User: user.usuario,
        Group: user.grupo,
        EvaluationDate: formatDate(user.fechaEvaluacion),
        CorrectQuestions: user.correctas,
        IncorrectQuestions: user.incorrectas,
        Rating: user.calificacion
      };
      data.push(tempUser);
    });

    // Add data starting from row 8
    let rowNumber = 8;
    data.forEach((rowData) => {
      const row = worksheet.getRow(rowNumber);

      // Iterate over specific fields and add them to the row
      Object.keys(rowData).forEach((fieldName, index) => {
        const cell = row.getCell(getExcelColumnName(index + 1));
        cell.value = rowData[fieldName];
        cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Center alignment
      });

      rowNumber++;
    });

    // "Report generated"
    const generatedReportCell = worksheet.getCell('B' + (rowNumber + 1));
    generatedReportCell.value = 'Report generated';
    generatedReportCell.alignment = { horizontal: 'center', vertical: 'middle' };

    const dateCell = worksheet.getCell('C' + (rowNumber + 1));
    dateCell.value = formatDate(stateReport.evaluation.fecha);
    dateCell.alignment = { horizontal: 'center', vertical: 'middle' };

    // Generate a Blob with the workbook content
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Create an URL object for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> link to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.xlsx';

      // Simulate a click on the link to start the download
      a.click();

      // Release resources
      window.URL.revokeObjectURL(url);
    });
  };

  const getExcelColumnName = (columnNumber) => {
    let dividend = columnNumber;
    let columnName = '';
    let modulo;

    while (dividend > 0) {
      modulo = (dividend - 1) % 26;
      columnName = String.fromCharCode(65 + modulo) + columnName;
      dividend = parseInt((dividend - modulo) / 26);
    }

    return columnName;
  };

  return (
    <>
      <ActionsContainer
        hasBack
        backMessage="Back to Reports"
        onClickBack={returnToReports}
      />

      <Header evaluation={stateReport.evaluation} />

      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
      <div></div>
      <Button color="secondary" auto onClick={generateExcelReport}>
          Export Report
      </Button>
      </div>
      <ListUsers data={stateReport.users} onClickItem={handleClickItem} />

      <Modal open={stateModal.open} onClose={handleCloseModal}>
        <ModalDetailReport id={stateModal.idEvaluacionUsuario} />
      </Modal>
    </>
  );
}

ContainerQuizReport.propTypes = {
  // match: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ContainerQuizReport;
