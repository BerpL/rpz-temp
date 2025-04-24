/**
 *
 * Evaluations
 *
 */

import React, { useState } from 'react';

// components V2
import InterfaceActions from 'V2/components/InterfaceActions';
import InterfaceContent from 'V2/components/InterfaceContent';

import Modal from 'components/ModalDark';
import History from 'utils/history';
import { ContainerFlex } from './Styles';
import { ListFinishedEvaluations } from './ListFinishedEvaluations';
import { ListScheduledEvaluations } from './ListScheduledEvaluations';
import { ModalStartEvaluation } from './ModalStartEvaluation';

const Evaluations = () => {
  const [modalStarEvaluation, setModalStartEvaluation] = useState({
    isOpen: false,
    idEvaluation: -1,
  });

  const closeModalStartEvaluation = () => {
    setModalStartEvaluation(m => ({
      ...m,
      isOpen: false,
    }));
  };

  const handleOpenEvaluation = idEvaluation => {
    setModalStartEvaluation(m => ({
      ...m,
      isOpen: true,
      idEvaluation,
    }));
  };

  const handleStartEvaluation = () => {
    closeModalStartEvaluation();
    History.replace(`/evaluation/${modalStarEvaluation.idEvaluation}`);
    // window.close();
  };

  const goBack = () => History.goBack();

  return (
    <ContainerFlex>
      <InterfaceActions
        hasBack
        backMessage="Back to Home"
        onClickBack={goBack}
      />
      <InterfaceContent>
        <ListScheduledEvaluations onOpen={handleOpenEvaluation} />
        <br />
        <ListFinishedEvaluations />
      </InterfaceContent>

      <Modal
        open={modalStarEvaluation.isOpen}
        onClose={closeModalStartEvaluation}
      >
        <ModalStartEvaluation
          id={modalStarEvaluation.idEvaluation}
          onStartEvaluation={handleStartEvaluation}
          onClose={closeModalStartEvaluation}
        />
      </Modal>
    </ContainerFlex>
  );
};

Evaluations.propTypes = {};

export default Evaluations;
