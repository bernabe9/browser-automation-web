import { schema } from 'normalizr'
import normalize from './normalize'
import { execution } from './execution'

const stressExecution = new schema.Entity('stressExecutions', {
  executions: [execution]
})

export const stressExecutions = new schema.Array(stressExecution)

export const normalizeData = data => normalize(data, stressExecutions)
