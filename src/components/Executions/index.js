import React from 'react'
import PropTypes from 'prop-types'

import ExecutionRow from './ExecutionRow'
import Wrapper from './Wrapper'

const Executions = ({ executions }) => {
  const sortedExecutions = [...executions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <Wrapper>
      {sortedExecutions.map(({ id, ...props }) => (
        <ExecutionRow key={id} id={id} {...props} />
      ))}
    </Wrapper>
  )
}

Executions.propTypes = {
  executions: PropTypes.array.isRequired
}

export default Executions
