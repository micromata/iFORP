import React from 'react';
import {PropTypes} from 'prop-types';
import {View} from './whiteboards.view';

export const Views = ({views, onDeleteView, onAddView, projectId, whiteboardId}) => {
	const handleDeleteView = (viewId) => {
		return onDeleteView(viewId);
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
	onAddView: PropTypes.func,
	projectId: PropTypes.number,
	whiteboardId: PropTypes.number
};
