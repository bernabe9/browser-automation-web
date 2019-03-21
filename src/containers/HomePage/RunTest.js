import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, FormGroup, Button } from 'mc-components';

import { applyQueryParams } from 'utils/helpers';

const RunTest = ({ onSuccess }) => {
  const [url, setUrl] = useState('');
  const [test, setTest] = useState('');
  const [urlError, setUrlError] = useState('');
  const [testError, setTestError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (!url) {
      setUrlError("URL can't be empty ");
    }
    if (!test) {
      setTestError("Test can't be empty ");
    }
    if (!url || !test) {
      return;
    }
    setLoading(true);
    const path = applyQueryParams(
      `${process.env.API_URL}/trigger`,
      { test, url }
    );
    fetch(path)
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          onSuccess();
        }
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="container mc-p-5 mc-invert mc-background--color-light">
      <h5 className="mc-text-h5">Run test</h5>
      <div className="mc-my-4">
        <FormGroup
          label="URL"
          name="url"
          error={urlError}
          touched={!!urlError}
        >
          <Input
            onChange={e => setUrl(e.target.value)}
            value={url}
            placeholder="https://masterclass.com"
            error={urlError}
            touched={!!urlError}
          />
        </FormGroup>
        <FormGroup
          help="Try: simple-example"
          label="Test Name"
          name="test"
          error={testError}
          touched={!!testError}
        >
          <Input
            onChange={e => setTest(e.target.value)}
            value={test}
            placeholder="simple-example"
            error={testError}
            touched={!!testError}
          />
        </FormGroup>
        <Button onClick={onSubmit} loading={loading}>RUN</Button>
      </div>
    </div>
  );
};

RunTest.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

export default RunTest;
