import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import jwt_decode from 'jwt-decode';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { state, dispatch } = useContext(AuthContext);
  // const { auth } = state;

  useEffect(() => {
    if ( props.location.search !== "" && props.location.search.includes('?token=') ) {
      localStorage.setItem('token', props.location.search.split('=')[1])
      localStorage.setItem('id', jwt_decode(localStorage.getItem('token')).user.id)
      localStorage.setItem('email', jwt_decode(localStorage.getItem('token')).user.email)
      localStorage.setItem('user_name', jwt_decode(localStorage.getItem('token')).user.user_name)
      localStorage.setItem('user_info_id', jwt_decode(localStorage.getItem('token')).user.user_info_id)
      props.history.push('/medicine')
    }
  }, [props.history, props.location.search]);

  const socialLogin = ( supplier ) => {
    window.open(`https://api.twoyak.com/api/users/auth/${supplier}`, '_self')
  };

  const signinDataHandler = (key, event) => {
    if (key === "email") {
      setEmail(event.target.value)
    } else if (key === "password") {
      setPassword(event.target.value)
    }
  };

  // const signinHandler = () => {
  //   dispatch( email, password );
  // }

  const signout = () => {
    localStorage.clear()
  }

  return (
    <div>
      {/* <input onChange={(event) => signinDataHandler('email', event)} />
      <input onChange={(event) => signinDataHandler('password', event)} />
      <button onClick={() => signinHandler()} /> */}
      <button onClick={() => socialLogin('google_oauth2')}>구글 로그인</button>
      {/* <button onClick={() => socialLogin('facebook')}>페이스북 로그인</button>
      <button onClick={() => socialLogin('naver')}>네이버 로그인</button> */}
      <button onClick={() => signout()}>로그아웃</button>
    </div>
  )
};

export default Login;