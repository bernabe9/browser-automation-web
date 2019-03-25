import styled from 'styled-components'

const bgColor = ({ theme, status }) => {
  if (!status) {
    return 'inherit'
  }
  return theme.statusColors[status]
}

const Wrapper = styled.span`
  padding: 4px 12px;
  color: ${({ theme }) => theme.mcColorLight};
  background-color: ${bgColor};
`

export default Wrapper
