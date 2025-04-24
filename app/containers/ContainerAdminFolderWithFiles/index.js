/**
 *
 * ContainerAdminFolderWithFiles
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/** ******************** componentes ******************** */
import ListAdminFolderView from 'components/ListAdminFolderView';

const fileData = [
  {
    id: '1f',
    title: '1-2000-1-1 Descipcion Chancado Secundario y Terciario Rev.0',
    date: '12 abr. 2019',
    user: 'Pedro Diaz',
    type: 'File',
    source: '1-2000-1-1 Descipcion Chancado Secundario y Terciario Rev.0.docx',
    origin: '1-2000-1-1 Descipcion Chancado Secundario y Terciario Rev.0.pdf',
  },
  {
    id: '1fd',
    title: '2300-3-1 Filosofia de Control Rev.0',
    date: '12 abr. 2019',
    user: 'Pedro Diaz',
    type: 'File',
    source: '2300-3-1 Filosofia de Control Rev.0.docx',
    origin: '2300-3-1 Filosofia de Control Rev.0.pdf',
  },
  {
    id: '1fa',
    title: '2300-3-2 Estrategias y Lazos de Control Rev.0',
    date: '12 abr. 2019',
    user: 'Pedro Diaz',
    type: 'File',
    source: '2300-3-2 Estrategias y Lazos de Control Rev.0.docx',
    origin: '2300-3-2 Estrategias y Lazos de Control Rev.0.pdf',
  },
];

function ContainerAdminFolderWithFiles({
  folders,
  files,
  onSelect,
  onOpen,
  identifierContextMenu,
}) {
  return (
    <ListAdminFolderView
      folders={folders}
      files={files}
      onSelect={onSelect}
      onOpen={onOpen}
      identifierContextMenu={identifierContextMenu}
    />
  );
}

ContainerAdminFolderWithFiles.propTypes = {
  folders: PropTypes.array,
  files: PropTypes.array,
  onSelect: PropTypes.func,
  onOpen: PropTypes.func,
  identifierContextMenu: PropTypes.string,
};

ContainerAdminFolderWithFiles.defaultProps = {
  folders: [],
  files: fileData,
};

export default ContainerAdminFolderWithFiles;
