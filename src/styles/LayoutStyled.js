import styled from "styled-components";

export const LayoutStyle = styled.section`
  margin: 0 auto;
  min-height: 800px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* 내부 스크롤 안보이게 처리 */
  /* overflow: scroll;
    &::-webkit-scrollbar{
        display: none;
    } */

  @media screen and (min-width: 768px) {
    margin-left: 160px;
  }
`;

export const LayoutInsideStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  margin: 20px 16px 50px 16px;
  /* 내부 콘텐츠가 높이가 작을 때  */
  /* height: 100%; */
  @media screen and (min-width: 390px) {
    width: 390px;
  }

  @media screen and (min-width: 768px) {
    width: 600px;
  }
`;
