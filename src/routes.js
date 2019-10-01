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
import RecommendSupplementIngrs from "./containers/RecommendSupplmentIngrs";
import RecommendSupplementProducts from "./containers/RecommendSupplementProducts";
import AboutUs from "./containers/AboutUs";
import WebCamCapture from "./containers/WebCam";
import ServiceTutorial from "./containers/ServiceTutorial";

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
    component: LoginError,
    exact: false
  },
  {
    path: "/health-record",
    name: "복용 내역",
    component: HealthRecord,
    exact: false
  },
  {
    path: "/medicine/:id?",
    name: "의약품 검색결과",
    component: Medicine,
    exact: false
  },
  {
    path: "/mypage",
    name: "마이페이지",
    component: Mypage,
    exact: false
  },
  {
    path: "/login",
    name: "로그인",
    component: Login,
    exact: false
  },
  {
    path: "/sign-up",
    name: "회원가입",
    component: Signup,
    exact: false
  },
  {
    path: "/add-info",
    name: "추가정보입력",
    component: AddUserInfo,
    exact: false
  },
  {
    path: "/add-sub-user",
    name: "사용자 추가",
    component: AddUserInfo,
    exact: false
  },
  {
    path: "/edit-info",
    name: "사용자 정보 변경",
    component: AddUserInfo,
    exact: false
  },
  {
    path: "/all-reviews/:my?",
    name: "리뷰 모아보기",
    component: AllReviews,
    exact: false
  },
  {
    path: "/content/:id?",
    name: "콘텐츠 보기",
    component: Contents,
    exact: false
  },
  {
    path: "/terms/:id?",
    name: "약관",
    component: Terms,
    exact: false
  },
  {
    path: "/find-password",
    name: "비밀번호 찾기",
    component: FindPassword,
    exact: false
  },
  {
    path: "/reset-password",
    name: "비밀번호 재설정",
    component: FindPassword,
    exact: false
  },
  {
    path: "/recommend-all-supplements/:type",
    name: "건강기능식품 성분 추천 페이지",
    component: RecommendSupplementProducts,
    exact: false
  },
  {
    path: "/recommend-supplement-products/:ingrs_ids/:ingr_names",
    name: "건강기능식품 추천 페이지",
    component: RecommendSupplementProducts,
    exact: false
  },
  {
    path: "/about-us",
    name: "기업소개",
    component: AboutUs,
    exact: false
  },
  {
    path: "/capture",
    name: "처방전 사진",
    component: WebCamCapture,
    exact: false
  },
  {
    path: "/service-tutorial",
    name: "튜토리얼",
    component: ServiceTutorial,
    exact: false
  }
];

export default routes;
