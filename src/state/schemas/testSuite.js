import { schema } from 'normalizr'
import normalize from './normalize'

const testSuite = new schema.Entity('testSuites')

export const testSuites = new schema.Array(testSuite)

export const normalizeDataSuite = data => normalize(data, testSuite)
export const normalizeData = data => normalize(data, testSuites)
