import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.mcColorGray200};
  color: ${({ theme }) => theme.mcColorLight};
  max-height: 900px;
  overflow: auto;
`

export default Wrapper
