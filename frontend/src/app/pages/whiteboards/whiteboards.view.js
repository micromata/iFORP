import React from 'react';
import {PropTypes} from 'prop-types';

export const View = ({view, isLast, isTheOnlyView, onDeleteView, onAddView, onEditView}) => {
	const handleDeleteClick = (viewId) => {
		console.log('handleDeleteClick', viewId);
		return onDeleteView(viewId);
	};

	const handleAddClick = () => {
		console.log('handleAddClick');
		return onAddView();
	};

	const handleEditClick = (viewId) => {
		console.log('handleEditClick', viewId);
		return onEditView(viewId);
	};

	return (
		<React.Fragment>
			<div className="card">
				<div className="card-header">
					<h5 className="card-title mb-0">{view.name}</h5>
				</div>
				<div className="card-body">
					<div className="btn-group" role="group">
						{isTheOnlyView === false && <button type="button" onClick={(event) => handleDeleteClick(view.id, event)} className="btn btn-secondary"><span className="oi oi-trash"></span></button>}
						<button type="button" onClick={handleAddClick} className="btn btn-secondary"><span className="oi oi-plus"></span></button>
						<button type="button" onClick={(event) => handleEditClick(view.id, event)} className="btn btn-secondary"><span className="oi oi-pencil"></span></button>
					</div>
				</div>
			</div>
			{isLast === false ? <span className="card-divider-horizontal align-self-center">&nbsp;</span> : null}
		</React.Fragment>
	);
};

View.propTypes = {
	view: PropTypes.object,
	isLast: PropTypes.bool,
	isTheOnlyView: PropTypes.bool,
	onAddView: PropTypes.func,
	onDeleteView: PropTypes.func,
	onEditView: PropTypes.func
};
