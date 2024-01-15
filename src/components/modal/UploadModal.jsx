import React from "react";
import styled from "styled-components";
import exitImg from "../../assets/icons/x.svg";

export default function UploadModal({ children, onClickHandler, ...props }) {
  return (
    <ModalWrap>
      <ContentList>{children}</ContentList>
      <ExitIcon onClick={onClickHandler} />
    </ModalWrap>
  );
}

const ModalWrap = styled.article`
  margin: 0 auto;
  box-sizing: border-box;
  width: 180px;
  border-radius: 10px;
  background-color: white;
  position: absolute;
  top: 140px;
  margin-left: 50px;

  @media screen and (min-width: 768px) {
    top: 190px;
    margin-left: 210px;
  }
`;

const ContentList = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;

  & li {
    box-sizing: border-box;
    width: 180px;
    padding: 12px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
  }

  & li:first-child:hover {
    border-radius: 10px 10px 0 0;
    background-color: var(--color-lightgrey);
  }

  & li:nth-child(2):hover {
    border-radius: 0 0 10px 10px;
    transition: background-color 0.4s;
    background-color: var(--color-lightgrey);
  }

  & :first-child {
    border-bottom: 1px solid var(--color-lightgrey);
  }
`;

const ExitIcon = styled.button`
  position: absolute;
  top: 0;
  left: 85%;
  width: 20px;
  height: 20px;
  margin: 5px;
  background-image: url(${exitImg});
  background-size: cover;
`;
