import React from 'react';

export const Card: React.FC = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg">{children}</div>
);

export const CardContent: React.FC = ({ children }) => (
  <div className="p-4">{children}</div>
); 