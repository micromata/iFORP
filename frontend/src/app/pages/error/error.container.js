import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({ code, message }) => (
  <main className="container">
    <h2>
      Error: {code} – {message}
    </h2>
  </main>
);

Error.propTypes = {
  code: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
