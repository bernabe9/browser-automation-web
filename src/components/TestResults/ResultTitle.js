import styled from 'styled-components'

const ResultTitle = styled.span`
  color: ${({ theme, status }) =>
    status === 'passed'
      ? theme.statusColors.success
      : theme.statusColors.error};
  font-weight: bold;
`

export default ResultTitle
