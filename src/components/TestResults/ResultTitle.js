import styled from 'styled-components'

const colors = theme => ({
  passed: theme.statusColors.success,
  failed: theme.statusColors.error,
  pending: theme.statusColors.skipped
})

const ResultTitle = styled.span`
  color: ${({ theme, status }) => colors(theme)[status]};
  font-weight: bold;
`

export default ResultTitle
