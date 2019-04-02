import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: solid 0.2rem ${({ theme }) => theme.mcColorGray400};
`

export default Wrapper
