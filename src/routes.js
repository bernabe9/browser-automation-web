import routesPaths from 'constants/routesPaths'
import HomePage from 'containers/HomePage'
import LoginPage from 'containers/LoginPage'
import RegisterPage from 'containers/RegisterPage'
import CreateTestSuite from 'containers/CreateTestSuite'
import TestPage from 'containers/TestPage'
import SuitePage from 'containers/SuitePage'
import NotFoundPage from 'containers/NotFoundPage'

export const publicRoutes = [
  {
    path: routesPaths.login,
    component: LoginPage,
    exact: true
  }
]

export const privateRoutes = [
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
    path: routesPaths.suite,
    component: SuitePage,
    exact: true
  },
  {
    path: routesPaths.register,
    component: RegisterPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
]
