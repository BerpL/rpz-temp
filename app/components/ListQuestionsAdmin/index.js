/**
 *
 * ListQuestionsAdmin
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import QuestionItem from './QuestionItem';
import Message from './Message';

// const SortableItem = SortableElement(
//   ({ value, idx, onClickMove, isCollapsed, onEdit, onDelete }) => (
//     <QuestionItem
//       key={value.id}
//       pregunta={value}
//       idx={idx}
//       onEdit={onEdit}
//       index={idx}
//       onClickMove={onClickMove}
//       isCollapsed={isCollapsed}
//       onDelete={onDelete}
//     />
//   ),
// );

// const SortableList = SortableContainer(
//   ({ items, isCollapsed, onClickMove, onEdit, onDelete }) => (
//     <div style={{ position: 'relative' }}>
//       {items.map((pregunta, index) => (
//         <SortableItem
//           key={pregunta.id}
//           index={index}
//           value={pregunta}
//           idx={index}
//           onEdit={onEdit}
//           disabled={!isCollapsed}
//           onClickMove={onClickMove}
//           isCollapsed={isCollapsed}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   ),
// );

function ListQuestionsAdmin({
  questions,
  onEdit,
  onDone,
  onRevert,
  onSortEnd,
  onDelete,
}) {
  // const [isCollapsed, setCollapsed] = useState(false);
  // // const [items, setItems] = useState(questions);

  // const handleClickMove = () => {
  //   setCollapsed(true);
  // };

  // const handleClickDone = async () => {
  //   setCollapsed(false);
  //   onDone();
  // };

  // const handleClickRevert = () => {
  //   setCollapsed(false);
  //   onRevert();
  // };

  // const opacityTransition = isCollapsed ? 0.5 : 0;
  // const maxHeightTransition = isCollapsed ? 0.3 : 0;

  return (
    <div>
      {/* <Message
        style={{
          opacity: isCollapsed ? 1 : 0,
          transition: `opacity ${opacityTransition}s, max-height ${maxHeightTransition}s`,
          minHeight: isCollapsed ? 38 : 0,
          maxHeight: isCollapsed ? 500 : 0,
          overflow: 'hidden',
        }}
        message="Arrastre las preguntas para ordenar"
        actions={[
          {
            index: 1,
            title: 'REVERTIR',
            color: '#F14D76',
            onClick: handleClickRevert,
          },
          {
            index: 2,
            title: 'HECHO',
            color: '#3ce35f',
            onClick: handleClickDone,
          },
        ]}
      /> */}
      {/* <SortableList
        items={questions}
        lockToContainerEdges
        isCollapsed={isCollapsed}
        lockAxis="y"
        onEdit={onEdit}
        transitionDuration={400}
        useDragHandle
        onClickMove={handleClickMove}
        onSortEnd={onSortEnd}
        onDelete={onDelete}
      /> */}
      {questions.map((question, idx) => (
        <QuestionItem
          key={question.id}
          pregunta={question}
          idx={idx}
          onEdit={onEdit}
          index={idx}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

ListQuestionsAdmin.propTypes = {
  questions: PropTypes.array,
  onEdit: PropTypes.func,
  onSortEnd: PropTypes.func,
  onDone: PropTypes.func,
  onRevert: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ListQuestionsAdmin;
