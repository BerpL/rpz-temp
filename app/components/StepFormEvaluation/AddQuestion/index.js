/**
 *
 * AddQuestion
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

/* hooks */
import useTree from 'hooks/useTree';

/* components */
import NewTreeView from 'components/NewTreeView';
import Modal from 'components/Modal';
import ContainerModal from 'components/ContainerModal';
import ListSelectedAreas from './ListSelectedAreas';
import ListQuestions from './ListQuestions';

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`;

const Title = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-align: center;
  margin: 0;
  padding: 24px 0px 23px 0px;
`;

const ContainerChildren = styled.div`
  height: calc(100% - 71px);
  width: 100%;
  padding: 0 20px 25px;
  display: flex;
`;

const ContainerTree = styled.div`
  height: 100%;
  width: 300px;
  flex: 0 0 300px;
  overflow: auto;
  padding: 0px 20px;
`;

const ContainerList = styled.div`
  height: 100%;
  flex: 1;
  overflow: auto;
  padding: 0px 20px;
`;

function AddQuestion() {
  const [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    findNode,
    onOpenNode,
    addNode,
    removeNode,
  ] = useTree({ data: treeData });
  const [isOpenModal, setOpenModal] = useState(false);

  const handleChangeBaseQuestions = (idArea, name, value) => {
    // console.log(idArea, name, value);
  };
  const handleChangeIntermediateQuestions = (idArea, name, value) => {
    // console.log(idArea, name, value);
  };
  const handleChangeAdvancedQuestions = (idArea, name, value) => {
    // console.log(idArea, name, value);
  };

  return (
    <Container>
      <Title>PREGUNTAS</Title>
      <ContainerChildren>
        <ContainerTree>
          <NewTreeView
            data={tree}
            onToggleItem={onOpenNode}
            onClickItem={onSelectNode}
            findItem={findNode}
          />
        </ContainerTree>
        <ContainerList>
          <ListSelectedAreas
            items={dataSelected}
            onChangeBaseQuestions={handleChangeBaseQuestions}
            onChangeIntermediateQuestions={handleChangeIntermediateQuestions}
            onChangeAdvancedQuestions={handleChangeAdvancedQuestions}
            onOpenSetQuestions={() => setOpenModal(true)}
          />
        </ContainerList>
      </ContainerChildren>
      <Modal
        open={isOpenModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <ContainerModal>
          <Title style={{ textAlign: 'left' }}>
            CHANCADO PRIMARIO Y SECUNDARIO
          </Title>
          <ListQuestions items={questions} />
        </ContainerModal>
      </Modal>
    </Container>
  );
}

AddQuestion.propTypes = {};

export default AddQuestion;

const questions = [
  {
    id: 1,
    number: 1,
    question: '¿Qué es ganga?',
    level: 'Intermedio',
  },
  {
    id: 2,
    number: 2,
    question:
      '¿Qué produce la adición de reactivos en el proceso de flotación?',
    level: 'Intermedio',
  },
  {
    id: 3,
    number: 3,
    question: '¿Cuál es el número de celdas en flotación primaria de cobre?',
    level: 'Intermedio',
  },

  {
    id: 4,
    number: 4,
    question: '¿Cuál es el número de celdas en flotación primaria de cobre?',
    level: 'Intermedio',
  },
  {
    id: 5,
    number: 5,
    question: '¿Cuál es el número de celdas en flotación primaria de cobre?',
    level: 'Avanzado',
  },
  {
    id: 6,
    number: 6,
    question: '¿Cuál es el número de celdas en flotación primaria de cobre?',
    level: 'Avanzado',
  },
];

const dataSelected = [
  {
    idArea: 1,
    nombre: 'Area 1',
    basicas: '16',
    intermedias: '10',
    avanzadas: '5',
  },
  {
    idArea: 2,
    nombre: 'Area 2',
    basicas: '16',
    intermedias: '10',
    avanzadas: '5',
  },
  {
    idArea: 3,
    nombre: 'Area 3',
    basicas: '16',
    intermedias: '10',
    avanzadas: '5',
  },
  {
    idArea: 4,
    nombre: 'Area 4',
    basicas: '16',
    intermedias: '10',
    avanzadas: '5',
  },
  {
    idArea: 5,
    nombre: 'Area 5',
    basicas: '16',
    intermedias: '10',
    avanzadas: '5',
  },
  {
    idArea: 6,
    nombre: 'Area 6',
    basicas: '16',
    intermedias: '10',
    avanzadas: '5',
  },
  {
    idArea: 7,
    nombre: 'Area 7',
    basicas: '16',
    intermedias: '10',
    avanzadas: '5',
  },
];

const treeData = {
  id: 1,
  title: 'Tecsup',
  date: '12 abr. 2019',
  user: 'Pedro Diaz',
  type: 'Folder',
  hasQuestions: false,
  children: [
    {
      id: 2,
      title: 'Chancado Secundario y Terciario',
      date: '12 abr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      hasQuestions: false,
      children: [
        {
          id: 100,
          title: 'Procesos',
          date: '12 abr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
          hasQuestions: true,
        },
      ],
    },
    {
      id: 3,
      title: 'Molienda',
      date: '12 abr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      children: [],
      hasQuestions: true,
    },
    {
      id: 4,
      title: 'Flotación Colectiva y Remolienda',
      date: '12 abr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      hasQuestions: false,
      children: [
        {
          id: 5,
          title: 'Procesos',
          date: '12 abr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
          hasQuestions: true,
        },
        {
          id: 6,
          title: 'Equipos',
          date: '12 abr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
          hasQuestions: true,
        },
        {
          id: 10,
          title: 'Equipos 2',
          date: '12 abr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
          hasQuestions: true,
        },
      ],
    },
  ],
};
