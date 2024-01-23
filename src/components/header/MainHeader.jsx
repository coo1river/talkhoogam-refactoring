import React, { useEffect, useState } from "react";
import {
  BackBtn,
  ModalBackground,
  HeaderMain,
  LogoImg,
  MenuBtn,
  SearchBtn,
  HomeHeader,
} from "../../styles/HeaderStyled";
import MoreList from "./MoreList";
import iconArrow from "../../assets/icons/icon-arrow-left.svg";
import iconMore from "../../assets/icons/s-icon-more-vertical.svg";
import iconSearch from "../../assets/icons/icon-search.svg";
import logoImg from "../../assets/images/Logo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import tabstate from "../../recoil/tabState";

export default function MainHeader({ pageName }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [tabState, setTabState] = useRecoilState(tabstate);
  const location = useLocation();
  const navigate = useNavigate();

  // 뒤로가기
  function goBack(e) {
    e.preventDefault();
    window.history.back();
  }

  // 모달 띄우기
  function openMore() {
    moreOpen ? setMoreOpen(false) : setMoreOpen(true);
  }

  return (
    <>
      {moreOpen && (
        <ModalBackground open={moreOpen}>
          {moreOpen && <MoreList setMoreOpen={setMoreOpen} />}
        </ModalBackground>
      )}
      <HeaderMain>
        {location.pathname === "/home" ||
        location.pathname === "/gathering" ||
        location.pathname === "/chat" ? null : (
          <BackBtn className="btn-goBack" onClick={goBack}>
            <img src={iconArrow} alt="뒤로가기 버튼" />
          </BackBtn>
        )}

        <h1 className="a11y-hidden">톡후감</h1>
        {pageName && <h2>{pageName}</h2>}
        {location.pathname === "/home" ? (
          <>
            <h2
              className={`feed tab ${tabState === "feed" ? "active" : ""}`}
              onClick={() => {
                setTabState("feed");
              }}
            >
              피드
            </h2>
            <h2
              className={`product tab ${
                tabState === "product" ? "active" : ""
              }`}
              onClick={() => {
                setTabState("product");
              }}
            >
              상품
            </h2>
          </>
        ) : null}
        {location.pathname === "/home" ? (
          <HomeHeader>
            <div />
            <LogoImg src={logoImg} alt="로고" />
            <SearchBtn
              onClick={() => {
                navigate(`/search`);
              }}
            >
              <img src={iconSearch} alt="검색 아이콘" />
            </SearchBtn>
          </HomeHeader>
        ) : (
          <MenuBtn className="btn-openMore" onClick={openMore}>
            <img src={iconMore} alt="메뉴 더보기" />
          </MenuBtn>
        )}
      </HeaderMain>
    </>
  );
}
