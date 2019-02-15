import React from 'react';

export default ({ color = '#000' }) => (
  <svg width="30" height="24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28.8 23.8a1.2 1.2 0 0 0 1.2-1.3V1.2A1.2 1.2 0 0 0 28.7 0H1.4A1.2 1.2 0 0 0 0 1.3v21.2a1.2 1.2 0 0 0 1.3 1.3h27.4zM15 19.4a1.3 1.3 0 1 1 0 2.5 1.3 1.3 0 0 1 0-2.5zm12.5-17h-25v15h25v-15z"
      fill={ color }
      fillRule="evenodd"/>
  </svg>
);
