const api = async (path, opt = {}) => {
  const response = await fetch(`${process.env.API_URL}${path}`, opt)
  const json = await response.json()
  return json
}

export default api
