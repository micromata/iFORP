import React from 'react';
import {PropTypes} from 'prop-types';
import {View} from './whiteboards.view';

export const Views = ({views, onDeleteView, onRenameView, onAddView, projectId, whiteboardId}) => {
	const handleDeleteView = (viewId) => {
		return onDeleteView(viewId);
	};

	const handleRenameView = (viewId, newName) => {
		return onRenameView(viewId, newName);
	};

	const handleAddView = () => {
		return onAddView();
	};

	return (
		<div className="row justify-content-md-center text-center">
			{views &&
				views.map((view, index) => <View
					key={view.id}
					view={view}
					isTheOnlyView={views.length === 1}
					isLast={index === views.length - 1}
					onDeleteView={handleDeleteView}
					onRenameView={handleRenameView}
					onAddView={handleAddView}
					projectId={projectId}
					whiteboardId={whiteboardId}
				/>)
			}
		</div>
	);
};

Views.propTypes = {
	views: PropTypes.array,
	onDeleteView: PropTypes.func,
	onRenameView: PropTypes.func,
	onAddView: PropTypes.func,
	projectId: PropTypes.number,
	whiteboardId: PropTypes.number
};
