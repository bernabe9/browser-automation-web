import React, { Fragment, useState } from 'react';
import { Separator } from 'mc-components';

const ExecutionRow = (props) => {
  const [showData, setShowData] = useState(false);

  const onToggle = () => setShowData(!showData);

  return (
    <Fragment>
      <div>
        <p>{`Id: ${props.id}`}</p>
        <p>{`Test: ${props.test}`}</p>
        <p>{`URL: ${props.url}`}</p>
        <p>{`Status: ${props.status}`}</p>
        {props.errorMessage &&
          <Fragment>
            <p>Error:</p>
            <p>{unescape(props.errorMessage)}</p>
          </Fragment>
        }
      </div>
      <a onClick={onToggle}>Toggle data</a>
      {showData &&
        <div>{JSON.stringify(props)}</div>
      }
      <Separator />
    </Fragment>
  );
};

export default ExecutionRow;
