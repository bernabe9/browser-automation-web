import styled from 'styled-components'

const Avatar = styled.img`
  width: ${({ width = '30px' }) => width};
  height: ${({ height = '30px' }) => height};
  border-radius: 50%;
`

export default Avatar
