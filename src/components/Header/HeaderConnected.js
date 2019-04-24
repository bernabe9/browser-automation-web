import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData } from 'state/schemas/user'
import UserSelector from 'state/selectors/userSelector'
import Header from './Header'

const userSelector = new UserSelector()

const mapState = state => {
  const { accessToken } = state.session.user
  const user = userSelector.getAll(state)
  return { accessToken, user, environment: state.environment }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: token =>
      dispatch(
        request(`/user?access_token=${token}`, {
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
