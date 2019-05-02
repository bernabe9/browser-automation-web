import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import api from 'api'
import Header from 'components/Header'
import routes from 'constants/routesPaths'
import RepositoryForm from '../../components/RepositoryForm'

const EditRepositoryPage = ({ history, match }) => {
  const { repositoryName, repositoryOwner, repositoryRef } = match.params

  const [error, setError] = useState()

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

  return (
    <div>
      <Header showLinks={false} />
      <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
        <h5 className="mc-text-h5">Edit Repository</h5>
        <Separator />
        <div className="row">
          <div className="col-6">
            <div className="mc-my-5">
              <RepositoryForm
                initialValues={{
                  owner: repositoryOwner,
                  name: repositoryName,
                  defaultRef: repositoryRef
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
        </div>
      </div>
    </div>
  )
}

EditRepositoryPage.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default EditRepositoryPage
