import React from 'react';

interface PropsType {
  delay: number;
  handleChangeDelay: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const Delay: React.FC<PropsType> = ({delay, handleChangeDelay}) => (
  <div>
    <label>
      Delay:
      <input type="number" value={delay} onChange={handleChangeDelay} />
    </label>
  </div>
);

export default Delay;