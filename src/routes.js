import Home from "./containers/Home";
import Login from "./containers/Login";
import Medicine from "./containers/Medicine";
import LoginError from "./containers/LoginError";
import HealthRecord from "./containers/HealthRecord";
import Mypage from "./containers/Mypage";
import Signup from "./containers/Signup";
import AllReviews from "./containers/AllReviews";
import AddUserInfo from "./containers/AddUserInfo";
import Contents from "./containers/Contents";
import Terms from "./containers/Terms";
import FindPassword from "./containers/FindPassword";
import RecommendSupplements from "./containers/RecommendSupplments";
import AboutUs from "./containers/AboutUs";
import WebCamCapture from "./containers/WebCam";

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
    path: "/add-sub-user",
    name: "사용자 추가",
    component: AddUserInfo
  },
  {
    path: "/edit-info",
    name: "사용자 정보 변경",
    component: AddUserInfo
  },
  {
    path: "/all-reviews/:my?",
    name: "리뷰 모아보기",
    component: AllReviews
  },
  {
    path: "/content/:id?",
    name: "콘텐츠 보기",
    component: Contents
  },
  {
    path: "/terms/:id?",
    name: "약관",
    component: Terms
  },
  {
    path: "/find-password",
    name: "비밀번호 찾기",
    component: FindPassword
  },
  {
    path: "/reset-password",
    name: "비밀번호 재설정",
    component: FindPassword
  },
  {
    path: "/recommend-supplements",
    name: "건강기능식품 추천 페이지",
    component: RecommendSupplements
  },
  {
    path: "/about-us",
    name: "기업소개",
    component: AboutUs
  },
  {
    path: "/capture",
    name: "처방전 사진",
    component: WebCamCapture
  }
];

export default routes;
