import styled from "styled-components";

export const SearchList = styled.article`
  margin: 10px 20px;
  display: flex;
  gap: 10px;
  cursor: pointer;
  align-self: start;

  & .search-keyword {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
  }

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  & .user-name {
    font-weight: bold;
    font-size: 16px;
  }

  & .user-id {
    font-size: 12px;
    color: var(--color-darkgrey);
  }
`;

export const SearchInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
