import React from 'react';

export default ({ color = '#000' }) => (
  <svg width="18" height="24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 24a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v20c0 1.1.9 2 2 2h14zM2 21V3h14v18H2zm6.5 1.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0z"
      fill={ color }
      fillRule="nonzero"
    />
  </svg>
);
