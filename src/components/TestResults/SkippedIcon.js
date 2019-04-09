import React from 'react'

import theme from 'constants/theme'

const SkippedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke={theme.statusColors.skipped}
  >
    <path d="M6.5,13 C6.22385763,13 6,12.7761424 6,12.5 C6,12.2238576 6.22385763,12 6.5,12 L17.5,12 C17.7761424,12 18,12.2238576 18,12.5 C18,12.7761424 17.7761424,13 17.5,13 L6.5,13 Z" />
  </svg>
)

export default SkippedIcon
