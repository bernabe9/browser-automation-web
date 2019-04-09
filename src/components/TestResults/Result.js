import React from 'react'
import PropTypes from 'prop-types'

import CheckIcon from './CheckIcon'
import ErrorIcon from './ErrorIcon'
import ResultTitle from './ResultTitle'
import SkippedIcon from './SkippedIcon'

const Icons = {
  passed: CheckIcon,
  failed: ErrorIcon,
  pending: SkippedIcon
}

const messages = {
  passed: 'Passed',
  failed: 'Failed',
  pending: 'Skipped'
}

const Result = ({ status, title }) => {
  const Icon = Icons[status]
  return (
    <div>
      <ResultTitle status={status}>{`${title} - ${
        messages[status]
      }`}</ResultTitle>
      <Icon />
    </div>
  )
}

Result.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Result
