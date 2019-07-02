import React, { useEffect } from 'react';

function Login(props) {
  useEffect(() => {
    if ( props.location.search !== "" && props.location.search.includes('?token=') ) {
      localStorage.setItem('token', props.location.search.split('=')[1])
      props.history.push('/')
    }
  }, [props.history, props.location.search]);

  const socialLogin = ( supplier ) => {
    window.open(`http://api.twoyak.com/api/users/auth/${supplier}`, '_self')
  };

  return (
    <div>
      <button onClick={() => socialLogin('google_oauth2')}>구글 로그인</button>
      <button onClick={() => socialLogin('facebook')}>페이스북 로그인</button>
      <button onClick={() => socialLogin('naver')}>네이버 로그인</button>
    </div>
  )
};

export default Login;