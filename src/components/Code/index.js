import React, { memo, useEffect, useState } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import api from 'api'
import { applyQueryParams } from 'utils/helpers'

const Code = ({ test }) => {
  const [code, setCode] = useState()

  useEffect(() => {
    api(applyQueryParams('/file', { path: test })).then(({ content }) =>
      setCode(content)
    )
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
