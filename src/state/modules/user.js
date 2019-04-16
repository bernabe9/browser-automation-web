const AUTHENTICATE = 'AUTHENTICATE'

const initialState = {
  user: {}
}

// ACTIONS
export const authenticate = object => ({
  type: AUTHENTICATE,
  object
})

export default (state = initialState, action) => {
  if (action.type === AUTHENTICATE) {
    return {
      ...state,
      user: action.object
    }
  }

  return state
}
