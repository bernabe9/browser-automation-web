import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, FormGroup, Button, Separator } from 'mc-components'

import api from 'api'
import { storeUserData } from 'utils/authentication'

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    if (!username) {
      setUsernameError("username can't be empty ")
      return
    }
    if (!password) {
      setPasswordError("password can't be empty")
      return
    }

    setLoading(true)
    api('/authenticate', {
      method: 'POST',
      body: { username, password }
    })
      .then(user => {
        setLoading(false)
        if (user.data) {
          // store token on localstorage
          storeUserData(user.data)
          history.push('/')
        } else {
          setPasswordError('wrong user or password')
        }
      })
      .catch(err => {
        setLoading(false)
        setPasswordError('internal error')
        console.log(err)
      })
  }

  return (
    <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
      <div className="mc-mb-4">
        <div>
          <h5 className="mc-text-h5">Login</h5>
          <Separator />
        </div>
        <div className="mc-p-4 row flex-column">
          <div className="col-12 col-sm-4">
            <FormGroup
              label="USERNAME"
              name="username"
              error={usernameError}
              touched={!!usernameError}
            >
              <Input
                onChange={e => setUsername(e.target.value)}
                value={username}
                placeholder="username"
                error={usernameError}
                touched={!!usernameError}
              />
            </FormGroup>
          </div>
          <div className="col-12 col-sm-4">
            <FormGroup
              label="PASSWORD"
              name="password"
              error={passwordError}
              touched={!!passwordError}
            >
              <Input
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="password"
                error={passwordError}
                touched={!!passwordError}
              />
            </FormGroup>
          </div>
          <div className="col-12 col-sm-4">
            <Button fullWidth onClick={onSubmit} loading={loading}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

LoginPage.propTypes = {
  history: PropTypes.object
}

export default LoginPage
