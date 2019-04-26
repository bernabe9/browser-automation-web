import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import routes from 'constants/routesPaths'
import Anchor from 'components/Anchor'

const TestList = ({ tests, ...props }) => {
  const [show, setShow] = useState(false)

  const onToggle = () => setShow(!show)

  return (
    <div className="mc-mb-5">
      <p className="mc-mb-2">{tests.length} tests</p>
      <Anchor className="mc-mb-4" onClick={onToggle}>{`${
        show ? 'Hide' : 'Show'
      } tests`}</Anchor>
      {show &&
        tests.map(test => (
          <div key={test}>
            <Link to={`${routes.test(props)}?path=${test}`}>{test}</Link>
          </div>
        ))}
    </div>
  )
}

TestList.propTypes = {
  tests: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TestList
