import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Separator } from 'mc-components'

import api from 'api'
import Header from 'components/Header'
import routes from 'constants/routesPaths'

const RepositoriesPage = () => {
  const [repositories, setRepositories] = useState()

  useEffect(() => {
    api('/repositories').then(setRepositories)
  }, [])

  return (
    <div>
      <Header showLinks={false} />
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <h5 className="mc-text-h5">Repositories</h5>
        <Separator />
        <div className="row">
          <div className="col-6">
            {!!repositories &&
              repositories.map(repository => (
                <div key={repository.fullName} className="mc-my-3">
                  <Link
                    to={routes.dashboard({
                      repositoryName: repository.name,
                      repositoryOwner: repository.owner,
                      repositoryRef: repository.defaultRef
                    })}
                  >
                    <h6 className="mc-text-h6 mc-mb-2">
                      {repository.fullName}
                    </h6>
                  </Link>
                  <p>Default ref: {repository.defaultRef}</p>
                  <Separator />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepositoriesPage
