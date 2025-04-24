/**
 *
 * GroupNewOrEdit
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Form from 'components/Form';
import InputAdmin from 'components/InputAdmin';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import ContainerModal from 'components/ContainerModal';
import ButtonAdmin from 'components/ButtonAdmin';

function GroupNewOrEdit({ handleSubmit, edit }) {
  const title = edit ? 'Edit Group' : 'New Group';
  return (
    <ContainerModal>
      <TitleModuleAdmin title={title} />
      <Form onSubmit={handleSubmit}>
        <InputAdmin label="Name" type="text" name="nombre" required />
        <InputAdmin label="Description" type="text" name="nombre" required />
        <ButtonAdmin type="submit">Save</ButtonAdmin>
      </Form>
    </ContainerModal>
  );
}
GroupNewOrEdit.propTypes = {
  handleSubmit: PropTypes.func,
  edit: PropTypes.bool,
};

export default GroupNewOrEdit;
