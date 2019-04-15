import React from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup } from 'mc-components'

import Anchor from 'components/Anchor'

const URLInput = ({ enabled, url, onToggle, onChange }) => {
  return (
    <div className="row">
      <div className="col-3">
        <Anchor onClick={onToggle}>
          {enabled ? 'use default URL' : 'change url'}
        </Anchor>
        {enabled && (
          <div className="mc-mt-4">
            <FormGroup label="URL" name="url">
              <Input
                onChange={e => onChange(e.target.value)}
                value={url}
                placeholder="https://beta.masterclass.com"
              />
            </FormGroup>
          </div>
        )}
      </div>
    </div>
  )
}

URLInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  url: PropTypes.string
}

export default URLInput
