import React from 'react'
import PropTypes from 'prop-types'

import CheckIcon from './CheckIcon'
import ErrorIcon from './ErrorIcon'
import ResultTitle from './ResultTitle'

const Result = ({ status, title }) => (
  <div>
    <ResultTitle status={status}>{title}</ResultTitle>
    {status === 'passed' ? <CheckIcon /> : <ErrorIcon />}
  </div>
)

Result.propTypes = {
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Result
