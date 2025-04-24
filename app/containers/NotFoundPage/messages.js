/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NotFoundPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Page not found!',
  },
  body: {
    id: `${scope}.body`,
    defaultMessage: 'Sorry, the page is not available!',
  },
  footer: {
    id: `${scope}.footer`,
    defaultMessage: 'Please return to the main view.',
  },
  dangerHtml: {
    id: `${scope}.dangerHtml`,
    defaultMessage: `<h2>Title</h2>
    <p>Paragraph</p>
    <p>
      <b>Goodbye</b>
    <p/>`
  }
});
