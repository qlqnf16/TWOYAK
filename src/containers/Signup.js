import React, { useState, useContext } from "react";
import axios from "../apis";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthStore";
import styled from "styled-components";

import Terms from "./Terms";
import {
  Container,
  BasicButton,
  BasicInput
} from "../components/UI/SharedStyles";
import FacebookIcon from "../assets/images/facebook.svg";
import NaverIcon from "../assets/images/naver.svg";
import GoogleIcon from "../assets/images/google-signin.svg";
import "@fortawesome/fontawesome-free/css/all.css";

const SignupArea = styled(Container)`
  padding-top: 6rem;
  margin-left: 9.375px;
  margin-right: 9.375px;
  margin-top: 0;
  overflow: auto;
`;

const CustomButton = styled(BasicButton)`
  width: 8.5rem;
  height: 3rem;
  margin-bottom: 1.3125rem;
  text-align: center;
  margin-top: 1.3125rem;
`;

const SignupInput = styled(BasicInput)`
  margin-bottom: 1.3125rem;
`;

const GoLoginMark = styled.div`
  font-size: 0.75rem;
  opacity: 0.39;
  margin-bottom: 1.3125rem;
`;

const SignupError = styled.div`
  color: red;
`;

const TermsContainer = styled.div`
  width: 20.1875rem;
`;

const CheckWrapper = styled.div`
  width: 6.5625rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CustomForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WatchAgree = styled.div`
  text-align: center;
  color: red;
`;

const TermsWrapper = styled.div`
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 5rem;
  opacity: 0.7;
  padding-left: 2.5rem;
  padding-right: 1.5rem;
  margin-top: 0.5rem;
`;

const EachTerm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialSignupArea = styled.div`
  width: 15rem;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const SignupByWhichContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const NotPressedButton = styled(BasicButton)`
  color: var(--twoyak-blue);
  background-color: white;
  box-shadow: 1px 2px 7px 1px rgba(212, 212, 212, 0.5);
`;

function Signup(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [userName, setUserName] = useState(null);
  const [byWhom, setByWhom] = useState(null);
  const [agreeAllTerms, setAgreeAllTerms] = useState(false);
  const { state, dispatch } = useContext(AuthContext);

  const goLoginPage = () => {
    props.history.push("/login");
  };

  const signupScheme = [
    {
      type: "email",
      placeholder: "이메일",
      key: "email"
    },
    {
      type: "password",
      placeholder: "비밀번호",
      key: "password"
    },
    {
      type: "password",
      placeholder: "비밀번호 확인",
      key: "password-confirmation"
    },
    {
      type: "text",
      placeholder: "닉네임",
      key: "user-name"
    }
  ];

  const fillInSignupForm = (key, event) => {
    switch (key) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "password-confirmation":
        setConfirmPassword(event.target.value);
        break;
      case "user-name":
        setUserName(event.target.value);
        break;
      default:
    }
  };

  const storeUserDataForAutoLogin = (key, value) => {
    localStorage.setItem(key, value);
  };

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const signupActionHandler = () => {
    if (
      validateEmail(email) &&
      password &&
      password === confirmPassword &&
      userName &&
      agreeAllTerms
    ) {
      dispatch({
        type: "SIGNUP_START"
      });
      const signupData = {
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        user_name: userName,
        birth_date: null,
        drink: null,
        smoke: null,
        caffeine: null,
        sex: null
      };
      axios
        .post("/api/users", signupData)
        .then(response => {
          const payload = response.data.auth_token;
          dispatch({
            type: "SIGNUP_SUCCESS",
            token: payload
          });
          storeUserDataForAutoLogin("jwt_token", payload);
        })
        .catch(error => {
          dispatch({
            type: "SIGNUP_FAIL",
            error: error.response.data.errors
          });
          alert(error.response.data.errors);
        });
    } else {
      if (!validateEmail(email)) {
        alert("이메일 형식을 확인해주세요");
      } else if (!password || !confirmPassword) {
        alert("비밀번호와 비밀번호 확인을 모두 입력해주세요");
      } else if (password !== confirmPassword) {
        alert("비밀번호와 비밀번호 확인을 일치시켜주세요");
      } else if (!userName) {
        alert("닉네임을 입력해주세요");
      } else if (!agreeAllTerms) {
        alert("약관에 동의해주세요");
      }
    }
  };

  const signupBySocialAccount = supplier => {
    if (agreeAllTerms) {
      if (supplier === "naver") {
        alert("네이버 로그인은 현재 준비중입니다");
      } else {
        window.open(
          `http://api.twoyak.com/api/users/auth/${supplier}`,
          "_self"
        );
      }
    } else {
      alert("약관에 동의하셔야 회원가입이 가능합니다");
    }
  };

  const signupByWhich = (
    <SignupByWhichContainer>
      {byWhom === true ? (
        <BasicButton>이메일로 가입</BasicButton>
      ) : (
        <NotPressedButton onClick={() => setByWhom(true)}>
          이메일로 가입
        </NotPressedButton>
      )}
      {byWhom === false ? (
        <BasicButton>소셜계정으로 가입</BasicButton>
      ) : (
        <NotPressedButton onClick={() => setByWhom(false)}>
          소셜계정으로 가입
        </NotPressedButton>
      )}
    </SignupByWhichContainer>
  );

  const form = (
    <CustomForm>
      {signupScheme.map((i, k) => (
        <form key={k} onSubmit={() => signupActionHandler()}>
          <SignupInput
            key={k}
            type={i.type}
            placeholder={i.placeholder}
            onChange={event => fillInSignupForm(i.key, event)}
          />
        </form>
      ))}
      <CustomButton onClick={() => signupActionHandler()}>
        회원가입
      </CustomButton>
    </CustomForm>
  );

  const terms = (
    <TermsContainer>
      <CheckWrapper onClick={() => setAgreeAllTerms(!agreeAllTerms)}>
        <i
          className="far fa-check-circle fa-2x"
          style={{
            color: agreeAllTerms ? "var(--twoyak-blue)" : "#757575",
            opacity: agreeAllTerms ? "1" : "0.7"
          }}
        />
        <div>전체 동의</div>
      </CheckWrapper>
      <TermsWrapper>
        <EachTerm onClick={() => props.history.push("/terms/use")}>
          <div>투약 이용약관</div>
          <i
            className="fas fa-chevron-right"
            style={{ color: "#757575", opacity: "0.7" }}
          />
        </EachTerm>
        <EachTerm onClick={() => props.history.push("/terms/info")}>
          <div>개인정보 수집 이용</div>
          <i
            className="fas fa-chevron-right"
            style={{ color: "#757575", opacity: "0.7" }}
          />
        </EachTerm>
      </TermsWrapper>
      {!agreeAllTerms ? (
        <WatchAgree>약관에 동의하셔야 회원가입이 가능합니다</WatchAgree>
      ) : null}
    </TermsContainer>
  );

  const socialSignupForm = (
    <SocialSignupArea>
      <img
        src={FacebookIcon}
        alt="facebook-signin"
        onClick={() => signupBySocialAccount("facebook")}
      />
      <img
        src={NaverIcon}
        alt="naver-signin"
        onClick={() => signupBySocialAccount("naver")}
      />
      <img
        src={GoogleIcon}
        alt="google-signin"
        onClick={() => signupBySocialAccount("google_oauth2")}
      />
    </SocialSignupArea>
  );

  return (
    <SignupArea>
      <GoLoginMark onClick={() => goLoginPage()}>
        이미 아이디가 있으신가요? 로그인하러가기
      </GoLoginMark>
      {terms}
      {agreeAllTerms ? signupByWhich : null}
      {byWhom !== false ? (byWhom === true ? form : null) : socialSignupForm}
      {state.token ? <Redirect to="/add-info" /> : null}
    </SignupArea>
  );
}

export default Signup;
