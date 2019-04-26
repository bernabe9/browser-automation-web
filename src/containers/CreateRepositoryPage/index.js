import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import api from 'api'
import Header from 'components/Header'
import routes from 'constants/routesPaths'
import RepositoryForm from './RepositoryForm'

const CreateRepositoryPage = ({ history }) => {
  const [error, setError] = useState()

  const onSubmit = repository => {
    return api('/repository', {
      method: 'post',
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
        <h5 className="mc-text-h5">New Repository</h5>
        <Separator />
        <div className="row">
          <div className="col-6">
            <div className="mc-my-5">
              <RepositoryForm onSubmit={onSubmit} />
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

CreateRepositoryPage.propTypes = {
  history: PropTypes.object.isRequired
}

export default CreateRepositoryPage
