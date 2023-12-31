import styled from "styled-components";

import Btn from "../components/common/button/Button";

export const HeaderMain = styled.header`
  max-width: 100%;
  min-height: 54px;
  padding: 0 15px;
  text-align: center;
  border-bottom: 2px solid #dddcdc8c;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  & h2 {
    font-size: 18px;
    font-weight: bold;
  }

  & .searchInput {
    margin: 10px;
    padding: 8px 18px;
    background-color: #f2f2f2;
    box-sizing: border-box;
    border-radius: 30px;
    font-family: "Pretendard", sans-serif;
    flex-grow: 1;

    &:focus {
      outline: none;
    }
  }
`;

export const BackBtn = styled.button`
  width: 22px;
  height: 22px;
`;

export const MenuBtn = styled.button`
  width: 22px;
  height: 22px;
`;

export const SearchBtn = styled.button`
  width: 22px;
  height: 22px;
`;

export const LogoImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const UploadBtn = styled(Btn)`
  width: 92px;
  padding: 7px 31px;
  font-size: 14px;
`;

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.6;
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
`;

export const HeaderMoreList = styled.article`
  width: 230px;
  height: auto;
  background-color: white;
  position: absolute;
  border: 1px solid #dbdbdb;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
  border-radius: 10px;

  & li {
    box-sizing: border-box;
    text-align: center;
    background-color: white;
    min-height: 24px;
    font-size: 15px;
    font-weight: 500;
    padding: 20px;

    cursor: pointer;

    & button {
      width: 100%;
      font: inherit;
      color: inherit;
      padding: 0;
    }
  }

  & li:first-child {
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #dbdbdb;
  }

  & li:nth-child(2) {
    border-radius: 0 0 10px 10px;
  }

  & li:hover,
  & li:active {
    transition: background-color 0.3s;
    background-color: #cdcdcda8;
  }

  & .btn-Close-list {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 3px;
    right: 15px;
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

export const ModalLogoutStyled = styled.article`
  width: 270px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;

  & .question {
    margin: 22px 50px;
    font-weight: bold;
  }

  & .btn-group {
    width: 100%;
    border-top: 1px solid #dbdbdb;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    & button {
      width: 50%;
      height: 46px;
      font: inherit;
    }

    & button:hover {
      color: var(--color-mainColor);
      font-weight: bold;
    }

    & button:first-child {
      border-right: 1px solid #dbdbdb;
    }
  }
`;
