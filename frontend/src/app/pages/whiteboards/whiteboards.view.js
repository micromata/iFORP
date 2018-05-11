import React from 'react';
import {PropTypes} from 'prop-types';
import {Link} from 'react-router-dom';
import {ArcherElement} from 'react-archer';

import {Editable} from './whiteboards.editable';

export const View = ({view, index, isLast, isTheOnlyView, onDeleteView, onRenameView, onAddView, projectId, whiteboardId}) => {
	const handleDeleteClick = (viewId) => {
		return onDeleteView(viewId);
	};

	const handleViewNameChange = (viewId, newName) => {
		return onRenameView(viewId, newName);
	};

	const handleAddClick = () => {
		return onAddView();
	};

	return (
		<div className="card">
			<ArcherElement
				id={String(index)}
				relations={isLast === true ? [] : [{
					from: {anchor: 'right'},
					to: {anchor: 'left', id: String(index + 1)}
				}]}
			>
				<div className="card-header">
					<h5 className="card-title mb-0"><Editable text={view.name} onChange={newName => handleViewNameChange(view.id, newName)} /></h5>
				</div>
				<div className="card-body">
					<div className="btn-group" role="group">
						{isTheOnlyView === false && <button type="button" onClick={(event) => handleDeleteClick(view.id, event)} className="btn btn-secondary"><span className="oi oi-trash"></span></button>}
						<button type="button" onClick={handleAddClick} className="btn btn-secondary"><span className="oi oi-plus"></span></button>
						{view.hasFile === true ?
							<Link className="btn btn-secondary" to={`/views/edit/project/${projectId}/whiteboard/${whiteboardId}/view/${view.id}`}><span className="oi oi-pencil"></span></Link> :
							<Link className="btn btn-secondary" to={`/library/project/${projectId}/whiteboard/${whiteboardId}/view/${view.id}`}><span className="oi oi-pencil"></span></Link>
						}
						{view.hasFile === true && <Link className="btn btn-primary" to={`/views/show/project/${projectId}/whiteboard/${whiteboardId}/view/${view.id}`}><span className="oi oi-eye"></span></Link>}
					</div>
				</div>
			</ArcherElement>
		</div>
	);
};

View.propTypes = {
	view: PropTypes.object,
	isLast: PropTypes.bool,
	isTheOnlyView: PropTypes.bool,
	onAddView: PropTypes.func,
	onDeleteView: PropTypes.func,
	onRenameView: PropTypes.func,
	projectId: PropTypes.number,
	whiteboardId: PropTypes.number
};
