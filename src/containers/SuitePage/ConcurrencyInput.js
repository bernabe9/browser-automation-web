import React from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup } from 'mc-components'

import Anchor from 'components/Anchor'

const ConcurrencyInput = ({ enabled, concurrency, onToggle, onChange }) => {
  return (
    <div className="row">
      <div className="col-3">
        <Anchor onClick={onToggle}>{`${
          enabled ? 'Disable' : 'Enable'
        } concurrency`}</Anchor>
        {enabled && (
          <div className="mc-mt-4">
            <FormGroup label="Concurrency" name="concurrency">
              <Input
                onChange={e => onChange(e.target.value)}
                value={concurrency}
                type="number"
                min={1}
                max={100}
              />
            </FormGroup>
          </div>
        )}
      </div>
    </div>
  )
}

ConcurrencyInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  concurrency: PropTypes.string
}

export default ConcurrencyInput
