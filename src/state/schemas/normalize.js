import { normalize } from 'normalizr'

export default (data, schema) => {
  if (Array.isArray(data) && !data.length) {
    return { entities: { [schema.schema._key]: [] } }
  }
  return normalize(data, schema)
}
