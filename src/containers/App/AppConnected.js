import { connect } from 'react-redux'
import { authenticate } from 'state/modules/user'
import App from './App'

const mapState = state => ({
  user: state.user.user
})

const mapDispatch = dispatch => ({
  authenticate: data => dispatch(authenticate(data))
})

export default connect(
  mapState,
  mapDispatch
)(App)
