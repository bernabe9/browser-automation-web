import routesPaths from 'constants/routesPaths'
import HomePage from 'containers/HomePage2'
import CreateTestSuite from 'containers/CreateTestSuite'
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
    component: NotFoundPage
  }
]

export default routes
