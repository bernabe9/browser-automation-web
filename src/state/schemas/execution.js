import { schema } from 'normalizr'
import normalize from './normalize'

export const execution = new schema.Entity('executions')

export const executions = new schema.Array(execution)

export const normalizeDataExecution = data => normalize(data, execution)
export const normalizeData = data => normalize(data, executions)
