import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import SuiteExecution from './SuiteExecution'

const SuiteExecutionPage = ({ suiteExecution, fetchSuiteExecution }) => {
  useEffect(() => {
    fetchSuiteExecution()
  }, [])

  return (
    <div>
      <Header />
      {suiteExecution && (
        <SuiteExecution
          {...suiteExecution}
          onRerunSuccess={fetchSuiteExecution}
        />
      )}
    </div>
  )
}

SuiteExecutionPage.propTypes = {
  suiteExecution: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    suiteId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    execution: PropTypes.array.isRequired
  }),
  fetchSuiteExecution: PropTypes.func.isRequired
}

export default SuiteExecutionPage