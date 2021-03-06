import React from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup } from 'mc-components'

import Anchor from 'components/Anchor'

const WebhookInput = ({ enabled, webhook, onToggle, onChange }) => {
  return (
    <div className="row">
      <div className="col-3">
        <Anchor onClick={onToggle}>
          {enabled ? 'remove webhook' : 'add webhook'}
        </Anchor>
        {enabled && (
          <div className="mc-mt-4">
            <FormGroup label="Webhook" name="webhook">
              <Input
                onChange={e => onChange(e.target.value)}
                value={webhook}
                placeholder="https://webhook.masterclass.com"
              />
            </FormGroup>
          </div>
        )}
      </div>
    </div>
  )
}

WebhookInput.propTypes = {
  enabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  webhook: PropTypes.string
}

export default WebhookInput
