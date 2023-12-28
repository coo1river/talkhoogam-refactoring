import React, { useState } from "react";
import styled from "styled-components";
import PostInsertModal from "../modal/PostInsertModal";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as IconHome } from "../../assets/icons/home.svg";
import { ReactComponent as IconChat } from "../../assets/icons/messages.svg";
import { ReactComponent as IconEdit } from "../../assets/icons/edit.svg";
import { ReactComponent as IconusersAlt } from "../../assets/icons/users-alt.svg";
import { ReactComponent as IconUser } from "../../assets/icons/user.svg";
import { ReactComponent as IconBotBar } from "../../assets/icons/minus.svg";
import { ReactComponent as IconSearch } from "../../assets/icons/search.svg";
import LogoImg from "../../assets/images/Logo.png";
import accountname from "../../recoil/accountname";
import { useRecoilValue } from "recoil";

function Footer() {
  const navigate = useNavigate();
  const uselocation = useLocation();
  const [svgColor, setSvgColor] = useState(uselocation.pathname.toLowerCase());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectMenu, setSelectMenu] = useState(
    uselocation.pathname.toLowerCase()
  );
  const accountName = useRecoilValue(accountname);

  const showModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  const handleClickState = (pageName) => {
    navigate(`/${pageName}`);
    setSelectMenu(`/${pageName}`);

    if (`/${pageName}` === "/home") {
      setSvgColor(`/${pageName}`);
    } else if (`/${pageName}` === `/profile/${accountName}`) {
      setSvgColor(`/${pageName}`);
    } else if (`/${pageName}` === "/chat") {
      setSvgColor(`/${pageName}`);
    } else if (`/${pageName}` === "/gathering") {
      setSvgColor(`/${pageName}`);
    }
  };

  return (
    <>
      <FooterLayout>
        <img src={LogoImg} alt="로고 이미지" className="img-logo" />
        <FooterIconWrap
          onClick={() => {
            handleClickState("home");
          }}
        >
          <IconHome
            className="footer-icon"
            fill={svgColor === "/home" ? "#56b778" : "#979797"}
          />
          <p style={{ color: svgColor === "/home" ? "#56b778" : "#767676" }}>
            홈
          </p>
          <IconBotBar
            className={selectMenu === "/home" ? "bot-bar" : "bot-bar-hidden"}
            fill="#56b778"
          />
        </FooterIconWrap>

        <FooterIconWrap
          className="search"
          onClick={() => {
            handleClickState("search");
          }}
        >
          <IconSearch
            className="footer-icon"
            fill={svgColor === `/search` ? "#56b778" : "#979797"}
          />
          <IconBotBar
            className={selectMenu === "/search" ? "bot-bar" : "bot-bar-hidden"}
            fill="#56b778"
          />
        </FooterIconWrap>

        <FooterIconWrap
          onClick={() => {
            handleClickState("gathering");
          }}
        >
          <IconusersAlt
            className="footer-icon"
            fill={svgColor === "/gathering" ? "#56b778" : "#979797"}
          />
          <p
            style={{ color: svgColor === "/gathering" ? "#56b778" : "#767676" }}
          >
            독서 모임
          </p>
          <IconBotBar
            className={
              selectMenu === "/gathering" ? "bot-bar" : "bot-bar-hidden"
            }
            fill="#56b778"
          />
        </FooterIconWrap>

        <FooterIconWrap onClick={showModal}>
          <IconEdit
            className="footer-icon edit-icon"
            fill={svgColor === "/productadd" ? "#56b778" : "#979797"}
          />
          <p
            style={{
              color: svgColor === "/productadd" ? "#56b778" : "#767676",
            }}
          >
            게시물 작성
          </p>
        </FooterIconWrap>

        <FooterIconWrap
          onClick={() => {
            handleClickState("chat");
          }}
        >
          <IconChat
            className="footer-icon"
            fill={svgColor === `/chat` ? "#56b778" : "#979797"}
          />
          <p style={{ color: svgColor === "/chat" ? "#56b778" : "#767676" }}>
            채팅
          </p>
          <IconBotBar
            className={selectMenu === "/chat" ? "bot-bar" : "bot-bar-hidden"}
            fill="#56b778"
          />
        </FooterIconWrap>

        <FooterIconWrap
          onClick={() => {
            handleClickState(`profile/${accountName}`);
          }}
        >
          <IconUser
            className="footer-icon"
            fill={
              svgColor === `/profile/${accountName}` ? "#56b778" : "#979797"
            }
          />
          <p
            style={{
              color:
                svgColor === `/profile/${accountName}` ? "#56b778" : "#767676",
            }}
          >
            프로필
          </p>
          <IconBotBar
            className={
              selectMenu === `/profile/${accountName}`
                ? "bot-bar"
                : "bot-bar-hidden"
            }
            fill="#56b778"
          />
        </FooterIconWrap>

        {modalOpen && (
          <PostInsertModal setModalOpen={setModalOpen}></PostInsertModal>
        )}
      </FooterLayout>
    </>
  );
}

export default Footer;

export const FooterLayout = styled.footer`
  border-top: 2px solid #dddcdc8c;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  z-index: 500;

  @media screen and (min-width: 768px) {
    border-top: none;
    border-right: 2px solid #dddcdc8c;

    left: 0px;
    width: 160px;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
    gap: 5px;
  }

  & .img-logo {
    display: none;

    @media screen and (min-width: 768px) {
      display: block;
      margin: 30px auto;
      width: 38px;
      height: 38px;
    }
  }

  & .search {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

export const FooterIconWrap = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  cursor: pointer;
  width: 100%;
  height: 60px;

  @media screen and (min-width: 768px) {
    margin-top: 20px;
  }

  & p {
    margin-top: 4px;
    text-align: center;
    font-size: 10px;
    font-family: "Pretendard", sans-serif;

    @media screen and (min-width: 768px) {
      display: none;
    }
  }

  & .footer-icon {
    width: 22px;
    height: 22px;
  }

  & .edit-icon {
    margin-bottom: 22px;

    @media screen and (max-width: 768px) {
      margin: 0;
    }
  }

  & .bot-bar {
    width: 22px;
    height: 22px;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  & .bot-bar-hidden {
    width: 22px;
    height: 22px;
    visibility: hidden;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;
