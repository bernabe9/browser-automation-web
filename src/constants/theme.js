import variables from 'styles/styles.scss'

const theme = {
  statusColors: {
    running: '#61b5f4',
    success: '#049b4a',
    error: '#f24646',
    skipped: variables.mcColorGray500
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
