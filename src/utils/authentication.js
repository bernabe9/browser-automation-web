export const getUserData = () => JSON.parse(window.localStorage.getItem('user'))

export const storeUserData = user =>
  window.localStorage.setItem('user', JSON.stringify(user))
