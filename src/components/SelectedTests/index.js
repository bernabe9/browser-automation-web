import React from 'react'
import PropTypes from 'prop-types'
import Flex from 'components/Flex'
import Anchor from 'components/Anchor'

const SelectedTests = ({ onRemoveTest, selectedTests, showError }) => (
  <div className="mc-mb-3">
    <p className="mc-text-h8 mc-mb-1">Selected tests</p>
    {selectedTests.size === 0 ? (
      <p>No tests selected yet</p>
    ) : (
      Array.from(selectedTests).map(test => (
        <Flex key={test}>
          <p className="mc-mr-2">{test}</p>
          <Anchor onClick={() => onRemoveTest(test)}>Remove</Anchor>
        </Flex>
      ))
    )}
    {showError && (
      <p className="mc-text--error">You must select at least one test</p>
    )}
  </div>
)

SelectedTests.propTypes = {
  onRemoveTest: PropTypes.func.isRequired,
  selectedTests: PropTypes.object.isRequired,
  showError: PropTypes.bool
}

export default SelectedTests
