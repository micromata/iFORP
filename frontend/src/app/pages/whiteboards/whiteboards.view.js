import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';

export const View = ({view, isLast, isTheOnlyView, onDeleteView, onAddView, projectId, whiteboardId}) => {
	const handleDeleteClick = (viewId) => {
		return onDeleteView(viewId);
	};

	const handleAddClick = () => {
		return onAddView();
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
						{view.hasFile === true ?
							<Link className="btn btn-secondary" to={`/views/edit/project/${projectId}/whiteboard/${whiteboardId}/view/${view.id}`}><span className="oi oi-pencil"></span></Link> :
							<Link className="btn btn-secondary" to={`/library/view/${view.id}`}><span className="oi oi-pencil"></span></Link>
						}
						{view.hasFile === true && <Link className="btn btn-primary" to={`/views/show/project/${projectId}/whiteboard/${whiteboardId}/view/${view.id}`}><span className="oi oi-eye"></span></Link>}
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
	projectId: PropTypes.number,
	whiteboardId: PropTypes.number
};
