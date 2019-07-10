import Home from "./containers/Home";
import Login from "./containers/Login";
import Medicine from "./containers/Medicine";
import AddUserInfo from "./containers/AddUserInfo";
import LoginError from "./containers/LoginError";
import HealthRecord from "./containers/HealthRecord";
import Mypage from "./containers/Mypage";
import Signup from "./containers/Signup";
import AddInfo from "./containers/AddInfo";

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
    path: "/add-user-info",
    name: "회원 상세정보 추가",
    component: AddUserInfo
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
    component: AddInfo
  }
];

export default routes;
