import routesPaths from 'constants/routesPaths'
import HomePage from 'containers/HomePage'
import CreateTestSuite from 'containers/CreateTestSuite'
import TestPage from 'containers/TestPage'
import SuitePage from 'containers/SuitePage'
import NotFoundPage from 'containers/NotFoundPage'
import SuiteExecutionPage from 'containers/SuiteExecutionPage'

const routes = [
  {
    path: routesPaths.index,
    component: HomePage,
    exact: true
  },
  {
    path: routesPaths.createTestSuite,
    component: CreateTestSuite,
    exact: true
  },
  {
    path: routesPaths.test,
    component: TestPage,
    exact: true
  },
  {
    path: routesPaths.suite(),
    component: SuitePage,
    exact: true
  },
  {
    path: routesPaths.suiteExecution(),
    component: SuiteExecutionPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
]

export default routes
