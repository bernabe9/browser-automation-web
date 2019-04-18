import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Separator, FormGroup, Input, Button } from 'mc-components'

import api from 'api'
import Header from 'components/Header'

const RegisterPage = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
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
    if (password !== confirmPassword) {
      setConfirmPasswordError('passwords not match')
      return
    }

    setLoading(true)
    api('/register', {
      method: 'POST',
      body: { username, password }
    })
      .then(() => {
        setLoading(false)
        history.push('/')
      })
      .catch(err => {
        setLoading(false)
        setUsernameError(err.message)
      })
  }

  return (
    <div>
      <Header />
      <div className="container mc-mt-5 mc-p-5 mc-invert mc-background--color-light">
        <div className="mc-mb-4">
          <div>
            <h5 className="mc-text-h5">Register New User</h5>
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
              <FormGroup
                label="CONFIRM PASSWORD"
                name="confirmPassword"
                error={confirmPasswordError}
                touched={!!confirmPasswordError}
              >
                <Input
                  type="password"
                  onChange={e => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="confirm password"
                  error={confirmPasswordError}
                  touched={!!confirmPasswordError}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-4">
              <Button fullWidth onClick={onSubmit} loading={loading}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

RegisterPage.propTypes = {
  history: PropTypes.object
}

export default RegisterPage
