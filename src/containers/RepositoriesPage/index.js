import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Separator } from 'mc-components'

import api from 'api'
import Header from 'components/Header'
import routes from 'constants/routesPaths'
import Spinner from 'components/Spinner'
import Anchor from 'components/Anchor'
import RepositoryLink from './RepositoryLink'

const RepositoriesPage = () => {
  const [repositories, setRepositories] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api('/repositories').then(repositories => {
      setRepositories(repositories)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <Header showLinks={false} />
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <h5 className="mc-text-h5">Repositories</h5>
        <Separator />
        {loading && <Spinner />}
        {!loading && (
          <div className="row">
            <div className="col-6">
              {!repositories.length && (
                <p className="mc-my-5">
                  We didn&#39;t found any repository for your account
                </p>
              )}
              {!!repositories.length &&
                repositories.map(repository => (
                  <div key={repository.fullName} className="mc-my-3">
                    <Link
                      to={routes.dashboard({
                        repositoryName: repository.name,
                        repositoryOwner: repository.owner,
                        repositoryRef: repository.defaultRef
                      })}
                    >
                      <RepositoryLink className="mc-text-h6 mc-mb-2">
                        {repository.fullName}
                      </RepositoryLink>
                    </Link>
                    <p>Default ref: {repository.defaultRef}</p>
                    {repository.baseFolder && (
                      <p>Base folder: {repository.baseFolder}</p>
                    )}
                    <Link
                      to={{
                        pathname: routes.editRepository({
                          repositoryName: repository.name,
                          repositoryOwner: repository.owner,
                          repositoryRef: repository.defaultRef
                        })
                      }}
                    >
                      <Anchor className="mc-mt-2">SETTINGS</Anchor>
                    </Link>
                    <Separator />
                  </div>
                ))}
            </div>
            <div className="col-6">
              <Link to={routes.createRepository}>
                <Anchor className="mc-my-3 mc-text--right">
                  + ADD REPOSITORY
                </Anchor>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RepositoriesPage
