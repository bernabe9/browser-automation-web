import React, { useState } from 'react'
import { Input, FormGroup, Button } from 'mc-components'

import api from 'api'
import { storeUserData } from '../../utils/authentication'

const LoginPage = ({ authenticate, user, history }) => {
  if (user.token) {
    history.push('/')
  }

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
          // store token on redux
          authenticate(user.data)
          // store token on localstorage
          storeUserData(user.data)
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
    <div>
      <FormGroup
        label="URL"
        name="url"
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
      <FormGroup
        label="URL"
        name="url"
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
      <Button onClick={onSubmit} loading={loading}>
        LOGIN
      </Button>
    </div>
  )
}

export default LoginPage
