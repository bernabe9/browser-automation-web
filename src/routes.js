import routesPaths from 'constants/routesPaths'
import HomePage from 'containers/HomePage'
import CreateTestSuite from 'containers/CreateTestSuite'
import TestPage from 'containers/TestPage'
import SuitePage from 'containers/SuitePage'
import NotFoundPage from 'containers/NotFoundPage'
import SuiteExecutionPage from 'containers/SuiteExecutionPage'
import LoginPage from 'containers/LoginPage'
import RepositoriesPage from 'containers/RepositoriesPage'
import CreateRepositoryPage from 'containers/CreateRepositoryPage'
import EditRepositoryPage from 'containers/EditRepositoryPage'

const routes = [
  {
    path: routesPaths.index,
    component: RepositoriesPage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.dashboard(),
    component: HomePage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.createTestSuite(),
    component: CreateTestSuite,
    exact: true,
    private: true
  },
  {
    path: routesPaths.test(),
    component: TestPage,
    private: true
  },
  {
    path: routesPaths.suite(),
    component: SuitePage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.suiteExecution(),
    component: SuiteExecutionPage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.createRepository,
    component: CreateRepositoryPage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.editRepository(),
    component: EditRepositoryPage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.login,
    component: LoginPage,
    exact: true
  },
  {
    component: NotFoundPage
  }
]

export default routes
