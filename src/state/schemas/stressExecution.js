import { normalize, schema } from 'normalizr'

const stressExecution = new schema.Entity('stressExecutions')

export const stressExecutions = new schema.Array(stressExecution)

export const normalizeData = data => normalize(data, stressExecutions)
