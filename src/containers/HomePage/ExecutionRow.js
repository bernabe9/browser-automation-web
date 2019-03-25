import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import StatusBadge from 'components/StatusBadge'

const ExecutionRow = props => {
  const [showData, setShowData] = useState(false)

  const onToggle = () => setShowData(!showData)
  const { id, test, url, status, errorMessage } = props

  return (
    <Fragment>
      <div className="mc-mb-3">
        <p>{`id: ${id}`}</p>
        <p>{`test: ${test}`}</p>
        <p>{`URL: ${url}`}</p>
        <div>
          <span>status: </span>
          <StatusBadge status={status} small />
        </div>

        {errorMessage && (
          <Fragment>
            <p>Error:</p>
            <p style={{ whiteSpace: 'pre' }}>{unescape(errorMessage)}</p>
          </Fragment>
        )}
      </div>
      <a
        className="mc-text-h8 mc-text--uppercase mc-text--muted"
        onClick={onToggle}
      >
        Toggle data
      </a>
      {showData && <div>{JSON.stringify(props)}</div>}
      <Separator />
    </Fragment>
  )
}

ExecutionRow.propTypes = {
  id: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
}

export default ExecutionRow
