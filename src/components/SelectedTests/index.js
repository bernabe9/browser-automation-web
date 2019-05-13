import React from 'react'
import PropTypes from 'prop-types'

const SelectedTests = ({ selectedTests, showError }) => (
  <div className="mc-mb-3">
    <p className="mc-text-h8 mc-mb-1">Selected tests</p>
    {selectedTests.size === 0 ? (
      <p>No tests selected yet</p>
    ) : (
      Array.from(selectedTests).map(test => <p key={test}>{test}</p>)
    )}
    {showError && (
      <p className="mc-text--error">You must select at least one test</p>
    )}
  </div>
)

SelectedTests.propTypes = {
  selectedTests: PropTypes.object.isRequired,
  showError: PropTypes.bool
}

export default SelectedTests
