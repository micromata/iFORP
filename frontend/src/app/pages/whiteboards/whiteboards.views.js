import React from 'react';
import {PropTypes} from 'prop-types';
import {View} from './whiteboards.view';

export const Views = ({views, onDeleteView, onAddView, onEditView}) => {
	const handleDeleteView = (viewId) => {
		console.log('handleDeleteView', viewId);
		return onDeleteView(viewId);
	};

	const handleAddView = () => {
		console.log('handleAddView');
		return onAddView();
	};

	const handleEditView = (viewId) => {
		console.log('handleEditView', viewId);
		return onEditView(viewId);
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
					onEditView={handleEditView}
				/>)
			}
		</div>
	);
};

Views.propTypes = {
	views: PropTypes.array,
	onDeleteView: PropTypes.func,
	onAddView: PropTypes.func,
	onEditView: PropTypes.func
};
