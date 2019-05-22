import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'mc-components'
import queryString from 'query-string'

import SlackLogo from './SlackLogo'

const RepositoryIntegrations = ({ slackWebhook, onIntegrateWithSlack }) => {
  const [loading, setLoading] = useState()

  useEffect(() => {
    const { code } = queryString.parse(window.location.search)
    if (!slackWebhook && code && !loading) {
      setLoading(true)
      onIntegrateWithSlack(code).then(() => setLoading(false))
    }
  }, [])

  return (
    <div>
      {slackWebhook && (
        <Button kind="tertiary" loading={loading}>
          <SlackLogo width="40px" height="40px" />
          Connected to Slack
        </Button>
      )}
      {!slackWebhook && (
        <a
          href={`https://slack.com/oauth/authorize?client_id=350653128275.630602422642&scope=incoming-webhook&redirect_uri=${
            window.location.href
          }`}
        >
          <Button kind="tertiary" loading={loading}>
            <SlackLogo width="40px" height="40px" />
            Add to Slack
          </Button>
        </a>
      )}
    </div>
  )
}

RepositoryIntegrations.propTypes = {
  slackWebhook: PropTypes.string,
  onIntegrateWithSlack: PropTypes.func.isRequired
}

export default RepositoryIntegrations
