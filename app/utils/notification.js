import { store } from 'react-notifications-component';

export const configuration = {
  container: 'bottom-right',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 3000,
  },
};

export const showNotification = (type, message) =>
  store.addNotification({
    message,
    type,
    ...configuration,
  });
