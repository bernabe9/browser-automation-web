import styled from 'styled-components'

const bgColor = ({ theme, status }) => {
  if (!status) {
    return 'inherit'
  }
  return theme.statusColors[status]
}

const Wrapper = styled.span`
  background-color: ${bgColor};
  color: ${({ theme }) => theme.mcColorLight};
  padding: 4px 12px;
`

export default Wrapper
