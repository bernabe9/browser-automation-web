import React, { useState, useEffect } from 'react'
import queryString from 'query-string'

import api from 'api'

const Environment = () => {
  const [environment, setEnvironment] = useState()

  useEffect(() => {
    api('/environment', { remote: true }).then(setEnvironment)
  }, [])

  if (!environment) {
    return null
  }

  const queryPath = queryString.parse(window.location.search)
  const { repositoryName, repositoryOwner, repositoryRef } = {
    ...environment,
    ...queryPath
  }

  return (
    <div className="container mc-mt-5 mc-p-1">
      <p>Repository: {`${repositoryOwner}/${repositoryName}`}</p>
      <p>Ref: {repositoryRef}</p>
    </div>
  )
}

export default Environment
