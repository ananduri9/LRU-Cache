import React from 'react';
import { items, metrics } from '../Stitch/mongodb';

const resetCollection = () => {
  items.deleteMany({});
  metrics.deleteMany({});
}

const Reset: React.FC<{}> = () => (
  <div>
    <h3>Delete:</h3>
    <input type="submit" onClick={resetCollection} value="Reset Collection" />
  </div>
);

export default Reset;