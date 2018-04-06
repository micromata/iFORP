import React from 'react';
import {Link} from 'react-router-dom';

export const NewProject = () => (
	<section className="jumbotron text-center">
		<div className="container">
			<h1 className="jumbotron-heading mb-5">Start prototyping with a</h1>
			<p>
				<Link className="btn btn-primary btn-lg" to="/whiteboard">New Project</Link>
			</p>
			<p>
				or
			</p>
		</div>
	</section>
);
