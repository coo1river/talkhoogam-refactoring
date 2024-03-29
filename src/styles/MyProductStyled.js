import styled from "styled-components";

export const MyProductWrap = styled.article`
  box-sizing: border-box;
  width: 100%;
  max-width: 390px;
  margin: 6px auto;
  padding: 25px;
  position: relative;

  @media screen and (min-width: 768px) {
    max-width: 500px;
  }

  & .sub-title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    img {
      cursor: pointer;
      width: 18px;
      height: 18px;
    }
  }

  & .sub-title {
    display: inline-block;
    font-size: 17px;
    font-weight: bold;

    @media screen and (min-width: 768px) {
      font-size: 19px;
    }
  }

  & .error-list {
    margin: 30px;
    display: block;
    font-size: 15px;
    text-align: center;
  }

  & .product-ul-wrap {
    position: relative;
  }
`;

export const ScrollHandler = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 5px;

  background-color: black;
  opacity: 0.3;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.left {
    left: 0px;
  }

  &.right {
    right: 0px;
  }
`;

export const MyProductUl = styled.ul`
  height: 170px;

  @media screen and (min-width: 768px) {
    height: 190px;
  }

  display: flex;
  gap: 10px;

  overflow-x: auto;
  /* 가로 스크롤바 수정 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MyProductLi = styled.li`
  max-width: 140px;
  flex-shrink: 0;

  & button {
    font-family: inherit;
    text-align: left;
    border-radius: 8px;
    width: 100%;

    &:hover {
      transition: background-color 0.3s;
      background-color: var(--color-trans-grey);
    }
  }

  & .img-my-product {
    object-fit: cover;
    width: 80px;
    height: 110px;
    margin: 10px auto;
    display: block;
    border-radius: 5px;

    @media screen and (min-width: 768px) {
      width: 100px;
      height: 130px;
    }
  }

  & .product-tit {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 3px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    @media screen and (min-width: 768px) {
      font-size: 17px;
    }
  }

  & .product-price {
    font-size: 13px;
    color: var(--color-mainColor);

    @media screen and (min-width: 768px) {
      font-size: 15px;
    }
  }
`;
