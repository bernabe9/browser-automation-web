import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

const ExecutionRow = props => {
  const [showData, setShowData] = useState(false)

  const onToggle = () => setShowData(!showData)
  const { id, test, url, status, errorMessage } = props

  return (
    <Fragment>
      <div>
        <p>{`Id: ${id}`}</p>
        <p>{`Test: ${test}`}</p>
        <p>{`URL: ${url}`}</p>
        <p>{`Status: ${status}`}</p>
        {errorMessage && (
          <Fragment>
            <p>Error:</p>
            <p style={{ whiteSpace: 'pre' }}>{unescape(errorMessage)}</p>
          </Fragment>
        )}
      </div>
      <a onClick={onToggle}>Toggle data</a>
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
