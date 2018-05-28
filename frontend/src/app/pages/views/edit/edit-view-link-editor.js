import React from 'react';
import { PropTypes } from 'prop-types';

export const LinkEditor = ({
  interactionElements,
  availableViews,
  onChangeTargetView
}) => {
  const handleChangeTargetView = (event, interactionElementId) => {
    onChangeTargetView(
      interactionElementId,
      Number(event.target.value) || null
    );
  };

  return (
    <div className="row">
      <div className="col">
        <h4>Verlinkungen</h4>

        <form>
          {interactionElements.map((interactionElement, index) => {
            return (
              <div key={index} className="form-group row">
                <label className="col-sm-4 col-form-label text-truncate form-control-sm">
                  {interactionElement.name}
                </label>
                <div className="col-sm-8">
                  <select
                    value={interactionElement.targetViewId || ''}
                    onChange={event =>
                      handleChangeTargetView(event, interactionElement.id)
                    }
                    className="form-control form-control-sm"
                  >
                    <option value="">Choose …</option>
                    {availableViews
                      .filter(view => view.hasFile)
                      .map((view, index) => {
                        return (
                          <option value={view.id} key={index}>
                            {view.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
};

LinkEditor.propTypes = {
  interactionElements: PropTypes.array,
  availableViews: PropTypes.array,
  onChangeTargetView: PropTypes.func
};
