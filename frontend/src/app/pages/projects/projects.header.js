import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <div className="row text-center mb-4">
    <div className="col-2 text-left align-self-center">
      <Link to="/">
        <span className="oi oi-chevron-left" />
      </Link>
    </div>
    <div className="col-10">
      <h1 className="h2">Projekte</h1>
    </div>
  </div>
);
