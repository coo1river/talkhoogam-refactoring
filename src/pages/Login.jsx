import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  LoginPage,
  EmailLoginForm,
  InputBox,
  LoginBtn,
  SnsLogin,
  SnsLoginText,
  SnsLoginBtn,
  ErrorText,
  InputWrap,
} from "../styles/LoginStyled";
import LogoImg from "../components/common/Logo";
import { Link, useNavigate } from "react-router-dom";
import LoginApi from "../api/LoginApi";
import loginCheck from "../recoil/loginCheck";
import loginToken from "../recoil/loginToken";
import accountname from "../recoil/accountname";

export default function Login() {
  // 이메일, 패스워드 상태 관리
  const [email, setEmail] = useState("talkhoogam@test.com");
  const [password, setPassword] = useState("test123");

  // 에러 메시지 상태 관리
  const [error, setError] = useState("");

  // recoil을 이용하여 token, login, account name 상태 관리
  const [token, setToken] = useRecoilState(loginToken);
  const [isLogin, setIsLogin] = useRecoilState(loginCheck);
  const [isAccountname, setIsAccountname] = useRecoilState(accountname);

  // useNavigate 사용
  const navigate = useNavigate();

  // email, password 값을 useState에 저장
  const EmailValue = (e) => {
    setEmail(e.target.value);
  };

  const PasswordValue = (e) => {
    setPassword(e.target.value);
  };

  // 로그인 유효성 검사
  const LoginValid = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      setError("이메일과 비밀번호를 입력해 주세요.");
    } else if (!email) {
      setError("이메일을 입력해 주세요.");
    } else if (!password) {
      setError("비밀번호를 입력해 주세요.");
    } else if (!email.includes("@")) {
      setError("이메일 형식이 올바르지 않습니다.");
    } else {
      setError("");

      // api 호출
      const loginRes = await LoginApi(email, password);
      if (loginRes.status !== 422) {
        const newToken = loginRes.user.token;
        const newAccountname = loginRes.user.accountname;
        setToken(newToken);
        setIsLogin(true);
        setIsAccountname(newAccountname);

        sessionStorage.setItem("userToken", newToken);
        navigate("/home");
      } else {
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <LoginPage>
      <h1 className="a11y-hidden">로그인 페이지</h1>
      <LogoImg />
      <EmailLoginForm>
        <InputWrap>
          <InputBox
            type="email"
            placeholder="이메일"
            onChange={EmailValue}
            className="email-input"
            value={email}
          />
          <InputBox
            type="password"
            placeholder="비밀번호"
            minLength="6"
            maxLength="20"
            onChange={PasswordValue}
            value={password}
          />
        </InputWrap>
        <ErrorText>{error}</ErrorText>
        <LoginBtn onClick={LoginValid}>로그인</LoginBtn>
      </EmailLoginForm>
      <SnsLoginText>SNS 로그인</SnsLoginText>

      <SnsLogin>
        <SnsLoginBtn className="btn-kakao" />
        <SnsLoginBtn className="btn-facebook" />
        <SnsLoginBtn className="btn-google" />
      </SnsLogin>
      <Link to="/join">회원가입</Link>
    </LoginPage>
  );
}
