import React from 'react';
import {PropTypes} from 'prop-types';

export const LinkEditor = ({interactionElements}) => {
	console.log(interactionElements);
	return (
		<div className="row">
			<div className="col">
				<h4>Verlinkungen</h4>

				<form>
					{interactionElements.map((element, index) => {
						return (
							<div key={index} className="form-group row">
								<label className="col-sm-4 col-form-label text-truncate form-control-sm">{element.name}</label>
								<div className="col-sm-8">
									<select defaultValue="" className="form-control form-control-sm">
										<option value="">Choose …</option>
										<option>…</option>
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
	interactionElements: PropTypes.array
};
