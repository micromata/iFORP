import React from 'react';
import {PropTypes} from 'prop-types';
import {View} from './whiteboards.view';

export const Views = ({views}) => {
	return (
		<div className="row justify-content-md-center text-center">
			{views &&
				views.map((view, index) => <View
					key={view.id}
					view={view}
					isTheOnlyView={views.length === 1}
					isLast={index === views.length - 1} />)
			}
		</div>
	);
};

Views.propTypes = {
	views: PropTypes.array
};
