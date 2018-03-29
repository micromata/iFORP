import React from 'react';
import {Counter} from './counter';

export const ClassComponent = () => (
	<React.Fragment>
		<Counter />
		<Counter title="Start with 5" start={5} />
	</React.Fragment>
);
