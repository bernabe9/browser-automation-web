import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'
import distanceInWords from 'date-fns/distance_in_words_to_now'

import Anchor from 'components/Anchor'
import ExecutionRow from './ExecutionRow'

const StressExecutionRow = ({
  id,
  successCount,
  errorCount,
  test,
  times,
  createdAt,
  executions
}) => {
  const [showData, setShowData] = useState(false)

  const getDistance = () =>
    distanceInWords(new Date(createdAt), {
      includeSeconds: true
    })

  const [distance, setDistance] = useState(getDistance())

  useEffect(() => {
    const interval = setInterval(() => setDistance(getDistance()), 60000)
    return () => clearInterval(interval)
  })

  const onToggle = () => setShowData(!showData)

  return (
    <Fragment>
      <div className="mc-mb-3">
        <div className="mc-mb-4">
          <p>{`${distance} ago`}</p>
        </div>
        <p>{`id: ${id}`}</p>
        <p>{`test: ${test}`}</p>
        <p>{`times: ${times}`}</p>
        <p>{`success count: ${successCount}`}</p>
        <p>{`error count: ${errorCount}`}</p>
      </div>
      <Fragment>
        <Anchor onClick={onToggle}>Toggle test executions</Anchor>
        {showData &&
          executions.map(({ id, ...props }) => (
            <div key={id} className="mc-m-4">
              <ExecutionRow id={id} {...props} />
            </div>
          ))}
      </Fragment>
      <Separator />
    </Fragment>
  )
}

StressExecutionRow.propTypes = {
  id: PropTypes.string.isRequired,
  successCount: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  times: PropTypes.number.isRequired,
  test: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  executions: PropTypes.array.isRequired
}

export default StressExecutionRow
