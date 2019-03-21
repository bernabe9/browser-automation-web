import React from 'react';
import { Separator } from 'mc-components';

import ExecutionRow from './ExecutionRow';

const Executions = ({ executions }) => {
  const sortedExecutions = [...executions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container mc-p-5 mc-invert mc-background--color-light">
      <h5 className="mc-text-h5">Executions</h5>
      <Separator />
      <div>
        {sortedExecutions.map(props =>
          <ExecutionRow key={props.id} {...props} />)}
      </div>
    </div>
  );
};

export default Executions;
