import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Button, InputField } from 'mc-components'
import validate from 'validate.js'

const RepositoryForm = ({ submitting, handleSubmit, edit = false }) => (
  <form onSubmit={handleSubmit} noValidate>
    <Field
      className="mc-mb-6"
      component={InputField}
      name="owner"
      label="Repository Owner *"
      required
      placeholder="owner"
      disabled={edit}
    />

    <Field
      className="mc-mb-6"
      component={InputField}
      name="name"
      label="Repository Name *"
      required
      placeholder="repository"
      disabled={edit}
    />

    <Field
      className="mc-mb-6"
      component={InputField}
      name="defaultRef"
      label="Default git reference *"
      placeholder="master"
      required
    />

    <Field
      className="mc-mb-6"
      component={InputField}
      name="baseFolder"
      label="Browser automation base folder"
    />

    <Field
      className="mc-mb-6"
      component={InputField}
      name="defaultForceParams"
      label="Default force params"
      placeholder="disable_feature=true&disable_feature2=true"
    />

    <Button type="submit" loading={submitting} fullWidth className="mc-mt-3">
      SAVE CHANGES
    </Button>
  </form>
)

RepositoryForm.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  edit: PropTypes.bool
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
