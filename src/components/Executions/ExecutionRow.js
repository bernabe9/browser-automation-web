import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'
import distanceInWords from 'date-fns/distance_in_words_to_now'

import StatusBadge from 'components/StatusBadge'
import Timer from 'components/Timer'

const ExecutionRow = props => {
  const [showData, setShowData] = useState(false)

  const onToggle = () => setShowData(!showData)
  const { id, test, url, status, errorMessage, createdAt, endedAt } = props

  return (
    <Fragment>
      <div className="mc-mb-3">
        <div className="mc-mb-4">
          <p>
            {`${distanceInWords(new Date(createdAt), {
              includeSeconds: true
            })} ago`}
          </p>
          <div>
            <span>status: </span>
            <StatusBadge status={status} small />
          </div>
          <Timer startDate={createdAt} endDate={endedAt}>
            {(minutes, seconds) => (
              <p>
                duration: {minutes}:{seconds}
              </p>
            )}
          </Timer>
        </div>
        <p>{`id: ${id}`}</p>
        <p>{`test: ${test}`}</p>
        <p>{`URL: ${url}`}</p>

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
  createdAt: PropTypes.number.isRequired,
  endedAt: PropTypes.number,
  errorMessage: PropTypes.string
}

export default ExecutionRow