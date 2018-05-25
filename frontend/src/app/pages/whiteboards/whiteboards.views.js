import React from 'react';
import {PropTypes} from 'prop-types';
import {ArcherContainer} from 'react-archer';

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
		/**
		 * FIXME: Archers don’t destroy themselves when switching whiteboards.
		 * So we got an error when going back from one whiteboard to another via the whiteboard switcher.
		 * It seems that this is something we dont have control over.
		 * See: https://github.com/pierpo/react-archer/blob/8bb53fc1d7c5b955db7b3f3cc41a246ee6ab47d4/src/ArcherContainer.js#L104
		 */
		<ArcherContainer strokeColor="grey">
			<div className="row justify-content-md-center text-center">
				{views &&
					views.map((view, index) => <View
						key={view.id}
						index={index}
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
		</ArcherContainer>
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
