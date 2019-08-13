import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Button, InputField, TextareaField, CheckboxField } from 'mc-components'
import validate from 'validate.js'

const TestSuiteForm = ({ submitting, handleSubmit }) => (
  <form onSubmit={handleSubmit} noValidate>
    <Field
      className="mc-mb-6"
      component={InputField}
      name="name"
      label="Name"
      required
      placeholder="Production suite"
    />

    <Field
      className="mc-mb-6"
      component={InputField}
      name="url"
      label="URL"
      placeholder="https://beta.masterclass.com"
      required
    />

    <Field
      className="mc-mb-6"
      component={TextareaField}
      name="description"
      label="Description"
      required
    />

    <Field
      className="mc-mb-4"
      component={CheckboxField}
      name="production"
      label="Only for production"
    />

    <Button type="submit" loading={submitting} fullWidth className="mc-mt-3">
      SAVE CHANGES
    </Button>
  </form>
)

TestSuiteForm.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired
}

const constraints = {
  name: {
    presence: { message: 'Name is required' }
  },
  url: {
    presence: { message: 'URL is required' }
  },
  description: {
    presence: { message: 'Description is required' }
  }
}

export default reduxForm({
  form: 'testSuite',
  validate: data => validate(data, constraints, { fullMessages: false })
})(TestSuiteForm)
