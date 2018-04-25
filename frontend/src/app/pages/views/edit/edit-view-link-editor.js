import React from 'react';

export const LinkEditor = () => {

	return (
		<div className="row">
			<div className="col">
				<h4>Verlinkungen</h4>

				<form>
					<div className="form-group row">
						<label className="col-sm-4 col-form-label text-truncate form-control-sm">Feedback</label>
						<div className="col-sm-8">
							<select className="form-control form-control-sm">
								<option selected>Choose …</option>
								<option>…</option>
							</select>
						</div>
					</div>
				</form>

			</div>
		</div>
	);
};
