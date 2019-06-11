import variables from 'styles/styles.scss'
import status from 'constants/status'

const theme = {
  statusColors: {
    [status.ready]: '#777777',
    [status.pending]: '#777777',
    [status.running]: '#61b5f4',
    [status.success]: '#049b4a',
    [status.error]: '#f24646',
    [status.cancelled]: '#777777',
    [status.queued]: '#777777',
    [status.queuedForReTry]: '#777777',
    [status.skipped]: variables.mcColorGray500
  },
  // fonts
  fontWeights: {
    normal: '400',
    bold: '700'
  },
  // mc-components variables
  ...variables
}

export default theme
