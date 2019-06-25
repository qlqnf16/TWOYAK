import Home from './containers/Home';
import Login from './containers/Login';
import Medicine from './containers/medicine';

const routes = [
  {
    path: '/',
    name: '홈',
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    name: '로그인',
    component: Login,
    exact: true,
  },
  {
    path: '/medicine',
    name: '의약품 검색',
    component: Medicine,
    exact: true,
  },
]

export default routes;