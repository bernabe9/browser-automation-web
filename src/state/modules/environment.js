// ACTION TYPES
const SET_ENVIRONMENT = 'SET_ENVIRONMENT'

export const setEnvironment = payload => ({
  payload,
  type: SET_ENVIRONMENT
})

// INITIAL STATE
const initialState = {
  repositoryName: undefined,
  repositoryOwner: undefined,
  repositoryRef: undefined
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENT:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default reducer
