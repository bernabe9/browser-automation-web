import { normalize, schema } from 'normalizr'

const execution = new schema.Entity('executions')

export const executions = new schema.Array(execution)

export const normalizeData = data => normalize(data, executions)
