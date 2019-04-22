import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  align-items: ${({ alignItems = 'center' }) => alignItems};
  justify-content: ${({ justifyContent = 'flex-start' }) => justifyContent};
`

export default Flex
