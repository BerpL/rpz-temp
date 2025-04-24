/**
 *
 * TreeAdminContextMenu
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
} from 'components/ContextMenu';

import {
  FiFolderPlus,
  FiArchive,
  FiEdit3,
  FiTrash,
  FiTag,
  FiSettings,
} from 'react-icons/fi/index.esm';

function collect(props) {
  return { identifier: props.identifier, level: props.level };
}

function TreeAdminContextMenu({ id, children, isDragging, selector, level }) {
  return (
    <ContextMenuTrigger
      disable={isDragging}
      id={selector}
      identifier={id}
      collect={collect}
      level={level}
    >
      {children}
    </ContextMenuTrigger>
  );
}

function ContextMenuModalFolder({ onClickItem, identifier }) {
  const [open, setOpen] = useState(false);

  const handleHide = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <ContextMenu
      open={open}
      onShow={handleShow}
      onHide={handleHide}
      id={identifier || 'menu_folder'}
    >
      <MenuItem data={{ type: CONSTANTS.NEW_FOLDER }} onClick={onClickItem}>
        <FiFolderPlus /> New Folder
      </MenuItem>
      <MenuItem
        data={{ type: CONSTANTS.EDIT_NAME_FOLDER }}
        onClick={onClickItem}
      >
        <FiEdit3 /> Rename
      </MenuItem>
      <MenuItem data={{ type: CONSTANTS.DELETE_FOLDER }} onClick={onClickItem}>
        <FiTrash /> Delete
      </MenuItem>
    </ContextMenu>
  );
}

ContextMenuModalFolder.propTypes = {
  onClickItem: PropTypes.func.isRequired,
  identifier: PropTypes.string,
};

function CMFolderWithImage({ onClickItem, identifier }) {
  const [open, setOpen] = useState(false);

  const handleHide = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <ContextMenu
      open={open}
      onShow={handleShow}
      onHide={handleHide}
      id="menu_folder_image"
    >
      <MenuItem
        data={{ type: CONSTANTS.NEW_FOLDER_IMAGE }}
        onClick={onClickItem}
      >
        <FiFolderPlus /> New Folder
      </MenuItem>
      <MenuItem
        data={{ type: CONSTANTS.EDIT_FOLDER_IMAGE }}
        onClick={onClickItem}
      >
        <FiEdit3 /> Edit Folder
      </MenuItem>
      <MenuItem data={{ type: CONSTANTS.DELETE_FOLDER }} onClick={onClickItem}>
        <FiTrash /> Delete
      </MenuItem>
    </ContextMenu>
  );
}

CMFolderWithImage.propTypes = {
  onClickItem: PropTypes.func.isRequired,
  identifier: PropTypes.string,
};

function ContextMenuModalFolderList({ onClickItem }) {
  const [open, setOpen] = useState(false);

  const handleHide = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <ContextMenu
      open={open}
      onShow={handleShow}
      onHide={handleHide}
      id="menu_folder_list"
    >
      <MenuItem
        data={{ type: CONSTANTS.EDIT_NAME_FOLDER }}
        onClick={onClickItem}
      >
        <FiEdit3 /> Cambiar nombre
      </MenuItem>
      <MenuItem data={{ type: CONSTANTS.DELETE_FOLDER }} onClick={onClickItem}>
        <FiTrash /> Eliminar
      </MenuItem>
    </ContextMenu>
  );
}

ContextMenuModalFolderList.propTypes = {
  onClickItem: PropTypes.func.isRequired,
};

function ContextMenuModalFile({ onClickItem }) {
  const [open, setOpen] = useState(false);

  const handleHide = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <ContextMenu
      open={open}
      onShow={handleShow}
      onHide={handleHide}
      id="menu_file"
    >
      <MenuItem data={{ type: CONSTANTS.LOAD_MEDIA }} onClick={onClickItem}>
        <FiArchive /> Load Media
      </MenuItem>
      <MenuItem data={{ type: CONSTANTS.EDIT_FILE }} onClick={onClickItem}>
        <FiEdit3 /> Edit
      </MenuItem>
      <MenuItem data={{ type: CONSTANTS.DELETE_FILE }} onClick={onClickItem}>
        <FiTrash /> Delete
      </MenuItem>
    </ContextMenu>
  );
}

ContextMenuModalFile.propTypes = {
  onClickItem: PropTypes.func.isRequired,
};

function ContextMenuModalFolderGroup({ onClickItem }) {
  const [open, setOpen] = useState(false);

  const handleHide = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <ContextMenu
      open={open}
      onShow={handleShow}
      onHide={handleHide}
      id="menu_folder_group"
    >
      <MenuItem data={{ type: CONSTANTS.NEW_GROUP }} onClick={onClickItem}>
        <FiSettings /> New Group
      </MenuItem>
    </ContextMenu>
  );
}

ContextMenuModalFolderGroup.propTypes = {
  onClickItem: PropTypes.func.isRequired,
};

function ContextMenuModalGroup({ onClickItem }) {
  const [open, setOpen] = useState(false);

  const handleHide = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <ContextMenu
      open={open}
      onShow={handleShow}
      onHide={handleHide}
      id="menu_group"
    >
      <MenuItem data={{ type: CONSTANTS.NEW_GROUP }} onClick={onClickItem}>
        <FiSettings /> New Group
      </MenuItem>
      <MenuItem data={{ type: CONSTANTS.EDIT_GROUP }} onClick={onClickItem}>
        <FiEdit3 /> Edit
      </MenuItem>
      <MenuItem data={{ type: CONSTANTS.DELETE_GROUP }} onClick={onClickItem}>
        <FiTrash /> Delete
      </MenuItem>
    </ContextMenu>
  );
}

ContextMenuModalGroup.propTypes = {
  onClickItem: PropTypes.func.isRequired,
};

function ContextMenuModalAlarmInterloackInterface({ onClickItem }) {
  const [open, setOpen] = useState(false);

  const handleHide = () => {
    setOpen(false);
  };

  const handleShow = () => {
    setOpen(true);
  };

  return (
    <ContextMenu
      open={open}
      onShow={handleShow}
      onHide={handleHide}
      id="menu_interlock_alarm_interface"
    >
      <MenuItem
        data={{ type: CONSTANTS.TAGS_INTERLOCK_ALARM_INTERFACE }}
        onClick={onClickItem}
      >
        <FiTag /> Tags
      </MenuItem>
      <MenuItem
        data={{ type: CONSTANTS.EDIT_INTERLOCK_ALARM_INTERFACE }}
        onClick={onClickItem}
      >
        <FiEdit3 /> Edit
      </MenuItem>
      <MenuItem
        data={{ type: CONSTANTS.DELETE_INTERLOCK_ALARM_INTERFACE }}
        onClick={onClickItem}
      >
        <FiTrash /> Delete
      </MenuItem>
    </ContextMenu>
  );
}

ContextMenuModalAlarmInterloackInterface.propTypes = {
  onClickItem: PropTypes.func.isRequired,
};

TreeAdminContextMenu.propTypes = {
  id: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  isDragging: PropTypes.any,
  selector: PropTypes.string.isRequired,
  level: PropTypes.number,
};

const CONSTANTS = {
  NEW_FOLDER: 'NEW FOLDER',
  EDIT_NAME_FOLDER: 'EDIT NAME FOLDER',
  NEW_FOLDER_IMAGE: 'NEW FOLDER IMAGE',
  EDIT_FOLDER_IMAGE: 'EDIT FOLDER IMAGE',
  DELETE_FOLDER: 'DELETE FOLDER',
  LOAD_MEDIA: 'LOAD MEDIA',
  EDIT_FILE: 'EDIT FILE',
  DELETE_FILE: 'DELETE FILE',
  NEW_GROUP: 'NEW GROUP',
  EDIT_GROUP: 'EDIT GROUP',
  DELETE_GROUP: 'DELETE GROUP',
  EDIT_INTERLOCK_ALARM_INTERFACE: 'EDIT_INTERLOCK_ALARM_INTERFACE',
  DELETE_INTERLOCK_ALARM_INTERFACE: 'DELETE_INTERLOCK_ALARM_INTERFACE',
  TAGS_INTERLOCK_ALARM_INTERFACE: 'TAGS_INTERLOCK_ALARM_INTERFACE',
};

export {
  ContextMenuModalAlarmInterloackInterface,
  ContextMenuModalFolder,
  ContextMenuModalFile,
  ContextMenuModalFolderList,
  ContextMenuModalFolderGroup,
  ContextMenuModalGroup,
  CMFolderWithImage,
  CONSTANTS,
};

export default TreeAdminContextMenu;
