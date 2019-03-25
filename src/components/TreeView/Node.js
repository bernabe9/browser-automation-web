import styled from 'styled-components'

const fontWeight = ({ theme, isActive }) =>
  isActive ? theme.fontWeights.bold : theme.fontWeights.normal

const Node = styled.a`
  font-weight: ${fontWeight};
  display: flex;
  align-items: center;
`

export default Node
