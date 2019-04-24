import React, { memo, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import api from 'api'
import { applyQueryParams } from 'utils/helpers'

const Code = ({ test, onCodeLoaded, match }) => {
  const [code, setCode] = useState()

  useEffect(() => {
    api(applyQueryParams('/file', { ...match.params, path: test }), {
      url: 'remote'
    }).then(({ content }) => {
      setCode(content)
      onCodeLoaded()
    })
  }, [test])

  return (
    code && (
      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {code}
      </SyntaxHighlighter>
    )
  )
}

export default withRouter(memo(Code))
