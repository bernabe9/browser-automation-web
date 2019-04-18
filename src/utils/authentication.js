const USER_DATA = 'USER_DATA'

export const getUserData = () =>
  JSON.parse(window.localStorage.getItem(USER_DATA))

export const storeUserData = data =>
  window.localStorage.setItem(USER_DATA, JSON.stringify(data))

export const deleteUserData = () => window.localStorage.removeItem(USER_DATA)
