import React from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import ExecutionRow from './ExecutionRow'

const Executions = ({ executions }) => {
  const sortedExecutions = [...executions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  return (
    <div className="container mc-p-5 mc-invert mc-background--color-light">
      <h5 className="mc-text-h5">All Executions</h5>
      <Separator />
      <div>
        {sortedExecutions.map(({ id, ...props }) => (
          <ExecutionRow key={id} id={id} {...props} />
        ))}
      </div>
    </div>
  )
}

Executions.propTypes = {
  executions: PropTypes.array.isRequired
}

export default Executions
