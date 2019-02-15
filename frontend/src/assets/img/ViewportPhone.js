import React from 'react';

export default ({ color = '#000' }) => (

  <svg width="14" height="24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v20c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V2zM5.5 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zM7 22a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5-3H2V5h10v14z"
      fill={ color }
      fillRule="nonzero"
    />
  </svg>
);
