import React from 'react';
import { PropTypes } from 'prop-types';

export const ViewportChanger = ({ viewportSize, onSizeChange }) => {
  const handleClick = updatedViewportSize => {
    onSizeChange(updatedViewportSize);
  };

  return (
    <div className="row justify-content-end mb-2">
      <div className="col-2 d-flex justify-content-end">
        <div className="btn-group" role="group">
          <button
            type="button"
            onClick={event => handleClick('desktop', event)}
            className={`btn btn-outline btn-secondary ${viewportSize ===
              'desktop' && 'active'}`}
          >
            <span className="oi oi-monitor" />
          </button>

          <button
            type="button"
            onClick={event => handleClick('tablet', event)}
            className={`btn btn-outline btn-secondary ${viewportSize ===
              'tablet' && 'active'}`}
          >
            <span className="oi oi-tablet" />
          </button>

          <button
            type="button"
            onClick={event => handleClick('phone', event)}
            className={`btn btn-outline btn-secondary ${viewportSize ===
              'phone' && 'active'}`}
          >
            <span className="oi oi-phone" />
          </button>
        </div>
      </div>
    </div>
  );
};

ViewportChanger.propTypes = {
  viewportSize: PropTypes.string,
  onSizeChange: PropTypes.func
};
