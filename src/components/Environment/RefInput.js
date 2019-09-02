import React from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup } from 'mc-components'

import Anchor from 'components/Anchor'

const RefInput = ({ defaultRef, enabled, repository, onToggle, onChange }) => {
  return (
    <div className="row">
      <div className="col-3">
        <Anchor onClick={onToggle}>
          {enabled ? 'use current reference' : 'change reference'}
        </Anchor>
        {enabled && (
          <div className="mc-my-4">
            <FormGroup label="Ref" name="ref">
              <Input
                onChange={e => onChange(e.target.value)}
                value={repository}
                placeholder={defaultRef}
              />
            </FormGroup>
          </div>
        )}
      </div>
    </div>
  )
}

RefInput.propTypes = {
  defaultRef: PropTypes.string,
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  repository: PropTypes.string
}

export default RefInput
