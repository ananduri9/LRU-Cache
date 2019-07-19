import React from 'react';

interface PropsType {
  isFull: boolean;
}

const IsFull: React.FC<PropsType> = ({ isFull }) => (
  <div>
    The Cache is Now Full: {isFull.toString()}
  </div>
);


export default IsFull;