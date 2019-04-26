import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Button, InputField } from 'mc-components'
import validate from 'validate.js'

const RepositoryForm = ({ submitting, handleSubmit }) => (
  <form onSubmit={handleSubmit} noValidate>
    <Field
      component={InputField}
      name="owner"
      label="Repository Owner *"
      required
      placeholder="owner"
    />

    <Field
      component={InputField}
      name="name"
      label="Repository Name *"
      required
      placeholder="repository"
    />

    <Field
      component={InputField}
      name="defaultRef"
      label="Default git reference *"
      placeholder="master"
      required
    />

    <Field
      component={InputField}
      name="baseFolder"
      label="Browser automation base folder"
    />

    <Button type="submit" loading={submitting} fullWidth className="mc-mt-3">
      SAVE CHANGES
    </Button>
  </form>
)

RepositoryForm.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired
}

const constraints = {
  owner: {
    presence: { message: 'Repository owner is required' }
  },
  name: {
    presence: { message: 'Repository name is required' }
  },
  defaultRef: {
    presence: { message: 'Default reference is required' }
  }
}

export default reduxForm({
  form: 'repository',
  validate: data => validate(data, constraints, { fullMessages: false })
})(RepositoryForm)
