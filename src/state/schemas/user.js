import { schema } from 'normalizr'
import normalize from './normalize'

export const user = new schema.Entity('user')

export const normalizeData = data => normalize(data, user)
