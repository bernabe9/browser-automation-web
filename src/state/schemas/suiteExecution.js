import { schema } from 'normalizr'
import normalize from './normalize'
import { execution } from './execution'

const suiteExecution = new schema.Entity('suiteExecutions', {
  executions: [execution]
})

export const suiteExecutions = new schema.Array(suiteExecution)

export const normalizeDataExecution = data => normalize(data, suiteExecution)

export const normalizeData = data => normalize(data, suiteExecutions)
