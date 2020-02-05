import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData } from 'state/schemas/user'
import UserSelector from 'state/selectors/userSelector'
import Header from './Header'

const userSelector = new UserSelector()

const mapState = state => {
  const user = userSelector.getAll(state)
  return { user, environment: state.environment }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: () =>
      dispatch(
        request('/user', {
          normalizer: normalizeData,
          url: 'github'
        })
      )
  }
}

export default connect(
  mapState,
  mapDispatch
)(Header)
