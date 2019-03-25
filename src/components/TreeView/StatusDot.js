import styled from 'styled-components'

const bgColor = ({ theme, status }) => {
  if (!status) {
    return 'inherit'
  }
  return theme.statusColors[status]
}

const StatusDot = styled.span`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: ${bgColor};
`

export default StatusDot
