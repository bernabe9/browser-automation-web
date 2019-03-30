import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import Executions from 'components/Executions'
import MainPanel from './MainPanel'
import Logo from './Logo'

const HomePage = ({
  fetchExecutions,
  fetchStressExecutions,
  executions,
  stressExecutions
}) => {
  useEffect(() => {
    fetchExecutions()
    fetchStressExecutions()
  }, [])

  if (!executions || !stressExecutions) {
    return null
  }

  return (
    <div>
      <Logo className="mc-mt-3" />
      <h2 className="mc-text-h2 mc-m-4 mc-text--center">Browser Automation</h2>
      <MainPanel executions={executions} stressExecutions={stressExecutions} />
      <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
        <h5 className="mc-text-h5">All Executions</h5>
        <Separator />
        <Executions executions={executions} />
      </div>
    </div>
  )
}

HomePage.propTypes = {
  fetchExecutions: PropTypes.func.isRequired,
  fetchStressExecutions: PropTypes.func.isRequired,
  executions: PropTypes.array,
  stressExecutions: PropTypes.array
}

export default HomePage
