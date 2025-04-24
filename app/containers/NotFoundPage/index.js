/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { Container } from './styles';
// import DOMPurify from 'dompurify';

/* eslint-disable react/prefer-stateless-function */
export default class NotFound extends React.PureComponent {

  render() {

    return (
      <Container>
        <div className="header-notfound">
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </div>
        <div className="content-notfound">
          <h3>
            <FormattedMessage {...messages.body} />
          </h3>
        </div>
        <div className="footer-notfound">
          <label>
            <FormattedMessage {...messages.footer} />
          </label>
          <br />
          <a href="/roshpinahzinc">Back to home</a>
        </div>
      </Container>
    );
  }
}
