import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Separator } from 'mc-components'
import format from 'date-fns/format'

import StatusBadge from 'components/StatusBadge'

const SuiteExecutionRow = ({ id, createdAt, url, status }) => (
  <div className="mc-mb-3">
    <Link className="mc-text-h6 mc-mr-2" to={`/suite-execution/${id}`}>
      {id}
    </Link>
    <div>
      <span>status: </span>
      <StatusBadge status={status} small />
    </div>
    <p>
      URL:{' '}
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </p>
    <p>created at: {format(new Date(createdAt), 'MM/DD/YYYY HH:mm')}</p>
    <Separator />
  </div>
)

SuiteExecutionRow.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired
}

export default SuiteExecutionRow