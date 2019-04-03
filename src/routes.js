import routesPaths from 'constants/routesPaths'
import HomePage from 'containers/HomePage'
import TestPage from 'containers/TestPage'
import NotFoundPage from 'containers/NotFoundPage'

const routes = [
  {
    path: routesPaths.index,
    component: HomePage,
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
