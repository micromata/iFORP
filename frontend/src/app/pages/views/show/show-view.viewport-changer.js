import React from 'react';

export const ViewportChanger = () => (
	<div className="row justify-content-end mb-2">
		<div className="col-2 d-flex justify-content-end">
			<div className="btn-group" role="group">
				<button type="button" className="btn btn-outline btn-secondary"><span className="oi oi-monitor"></span></button>
				<button type="button" className="btn btn-outline btn-secondary"><span className="oi oi-tablet"></span></button>
				<button type="button" className="btn btn-outline btn-secondary"><span className="oi oi-phone"></span></button>
			</div>
		</div>
	</div>
);
