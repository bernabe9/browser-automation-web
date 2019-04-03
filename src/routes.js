import routesPaths from 'constants/routesPaths'
import HomePage from 'containers/HomePage'
import CreateTestSuite from 'containers/CreateTestSuite'
import TestPage from 'containers/TestPage'
import NotFoundPage from 'containers/NotFoundPage'

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
    component: NotFoundPage
  }
]

export default routes
