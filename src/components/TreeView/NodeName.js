import styled from 'styled-components'

const color = ({ theme, status }) => {
  if (!status) {
    return 'inherit'
  }
  return theme.statusColors[status]
}

const NodeName = styled.span`
  color: ${color};
`

export default NodeName
