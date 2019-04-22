import React, { memo, useEffect, useState } from 'react'
import queryString from 'query-string'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import api from 'api'
import { applyQueryParams } from 'utils/helpers'

const Code = ({ test, onCodeLoaded }) => {
  const [code, setCode] = useState()

  useEffect(() => {
    const queryPath = queryString.parse(window.location.search)
    api(applyQueryParams('/file', { ...queryPath, path: test }), {
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

export default memo(Code)
