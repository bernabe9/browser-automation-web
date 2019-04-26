import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  pointer-events: none;
  display: block;
  width: ${({ width = '3em' }) => width};
  height: ${({ height = '3em' }) => height};
  margin: auto;
`

export default Wrapper
