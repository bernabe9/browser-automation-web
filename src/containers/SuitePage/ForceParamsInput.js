import React from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup } from 'mc-components'

import Anchor from 'components/Anchor'

const ForceParamsInput = ({ enabled, forceParams, onToggle, onChange }) => {
  return (
    <div className="row">
      <div className="col-3">
        <Anchor className="mc-mb-4" onClick={onToggle}>
          {enabled ? 'remove force params' : 'set force params'}
        </Anchor>
        {enabled && (
          <div className="mc-my-4">
            <FormGroup label="Force Params" name="forceParams">
              <Input
                onChange={e => onChange(e.target.value)}
                value={forceParams}
                placeholder="experiment_a=variation&experiment_b=control"
              />
            </FormGroup>
          </div>
        )}
      </div>
    </div>
  )
}

ForceParamsInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  forceParams: PropTypes.string
}

export default ForceParamsInput
