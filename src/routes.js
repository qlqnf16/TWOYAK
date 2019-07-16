import Home from "./containers/Home";
import Login from "./containers/Login";
import Medicine from "./containers/Medicine";
import LoginError from "./containers/LoginError";
import HealthRecord from "./containers/HealthRecord";
import Mypage from "./containers/Mypage";
import Signup from "./containers/Signup";
import AddUserInfo from "./containers/AddUserInfo";
import AddUser from "./containers/AddUser";

const routes = [
  {
    path: "/",
    name: "홈",
    component: Home,
    exact: true
  },

  {
    path: "/login-error",
    name: "로그인 에러",
    component: LoginError
  },
  {
    path: "/health-record",
    name: "복용 내역",
    component: HealthRecord
  },
  {
    path: "/medicine/:id?",
    name: "의약품 검색결과",
    component: Medicine,
    exact: true
  },
  {
    path: "/mypage",
    name: "마이페이지",
    component: Mypage
  },
  {
    path: "/login",
    name: "로그인",
    component: Login
  },
  {
    path: "/sign-up",
    name: "회원가입",
    component: Signup
  },
  {
    path: "/add-info",
    name: "추가정보입력",
    component: AddUserInfo
  },
  {
    path: "/add-user",
    name: "사용자 추가",
    component: AddUser
  }
];

export default routes;
