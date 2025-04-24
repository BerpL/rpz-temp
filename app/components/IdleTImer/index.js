import React, { useState } from 'react';
import Modal from 'react-responsive-modal';
import Button from 'components/Button';
import Storage from 'Storage';
import history from 'utils/history';
import { AuthService } from 'servicesV2';
import { useIdleTimer } from 'react-idle-timer';

export default function ({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [isTimedOut, setIsTimeOut] = useState(false);
  const [auth] = useState(new AuthService());

  const handleOnIdle = () => {
    if (isTimedOut) {
      auth.signOut();
      history.replace('/login');
    } else {
      setShowModal(true);
      reset();
      setIsTimeOut(true);
    }
  };

  const handleOnActive = () => {
    console.log('User is active');
    setIsTimeOut(false);
  };

  const handleOnAction = () => {
    console.log('User did something');
    setIsTimeOut(false);

    var now = new Date();
    var utc_timestamp = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    );
    Storage.saveLastTimeSession(utc_timestamp);
  };

  const { reset } = useIdleTimer({
    timeout: 300000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
  });

  const handleClose = () => {
    auth.signOut();
    history.replace('/login');
  };

  const handleGoBack = () => {
    setShowModal(false);
  };

  return (
    <div>
      {children}
      <Modal open={showModal} onClose={() => {}} showCloseIcon={false}>
        <div>
          <strong>
            <p style={{ marginBottom: 10, textAlign: 'center' }}>Do you want to continue browsing?</p>
          </strong>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ marginRight: 5 }}>
              <Button onClick={handleGoBack}>Continue</Button>
            </div>
            <div style={{ marginLeft: 5 }}>
              <Button onClick={handleClose}>Log Out</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
