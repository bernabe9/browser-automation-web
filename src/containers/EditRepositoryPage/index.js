import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import api from 'api'
import routes from 'constants/routesPaths'
import Header from 'components/Header'
import Spinner from 'components/Spinner'
import RepositoryForm from 'components/RepositoryForm'
import RepositoryIntegrations from './RepositoryIntegrations'

const EditRepositoryPage = ({ history, match }) => {
  const [loading, setLoading] = useState(true)
  const [repository, setRepository] = useState()
  const [error, setError] = useState()
  const { repositoryName, repositoryOwner } = match.params

  const getRepository = () => {
    api(`/repository?repository=${repositoryOwner}/${repositoryName}`).then(
      repository => {
        setRepository(repository)
        setLoading(false)
      }
    )
  }

  useEffect(getRepository, [])

  const onSubmit = repository => {
    return api('/repository', {
      method: 'put',
      body: repository
    })
      .then(() => {
        history.push(routes.index)
      })
      .catch(err => {
        setError(err.message || 'Something bad happened')
      })
  }

  const onIntegrateWithSlack = code => {
    const redirectUri = window.location.href.split('?')[0]
    return api('/repository', {
      method: 'put',
      body: {
        name: repositoryName,
        owner: repositoryOwner,
        slackCode: code,
        redirectUri
      }
    }).then(getRepository)
  }

  return (
    <div>
      <Header showLinks={false} />
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <h5 className="mc-text-h5">Edit Repository</h5>
        <Separator />
        {loading && <Spinner />}
        {!loading && (
          <div className="row">
            <div className="col-6">
              <div className="mc-my-5">
                <RepositoryForm
                  initialValues={{
                    owner: repository.owner,
                    name: repository.name,
                    defaultRef: repository.defaultRef,
                    baseFolder: repository.baseFolder
                  }}
                  onSubmit={onSubmit}
                  edit
                />
                {error && (
                  <p className="mc-my-3 mc-text--center mc-text--error">
                    {error}
                  </p>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="mc-ml-5">
                <h6 className="mc-text-h6 mc-my-5">Integrations</h6>
                <RepositoryIntegrations
                  onIntegrateWithSlack={onIntegrateWithSlack}
                  slackWebhook={repository.slackWebhook}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

EditRepositoryPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default EditRepositoryPage
