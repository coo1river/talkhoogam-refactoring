import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SearchList } from "../../styles/SearchStyled";
import { LayoutStyle } from "../../styles/LayoutStyled";
import { BackBtn, HeaderMain } from "../../styles/HeaderStyled";
import iconArrow from "../../assets/icons/icon-arrow-left.svg";
import SearchBookApi from "../../api/post/SearchBookApi";
import { useRecoilState } from "recoil";
import { author, link, thumbnail, title } from "../../recoil/bookInfo";
import Footer from "../../components/footer/Footer";

export default function SearchBook() {
  const [bookData, setBookData] = useState([]);
  const [keyword, setKeyword] = useState("");

  // 책 정보 저장
  const [bookTitle, setBookTitle] = useRecoilState(title);
  const [bookAuthor, setBookAuthor] = useRecoilState(author);
  const [bookThumb, setBookThumb] = useRecoilState(thumbnail);
  const [bookLink, setBookLink] = useRecoilState(link);

  // 처음 헤더의 input에 focus가 오도록
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // searchInput의 value
  function searchValue(e) {
    setKeyword(e.target.value);
  }

  // 뒤로가기
  function goBack(e) {
    e.preventDefault();
    window.history.back();
  }

  // 검색 값이 있을 때마다 useEffect를 통해 책 검색 api 실행
  useEffect(() => {
    const fetchSearch = async () => {
      const searchRes = await SearchBookApi(keyword);
      setBookData(searchRes);
    };
    if (keyword) {
      fetchSearch();
    }
  }, [keyword]);

  const SearchResult = () => {
    if (bookData && bookData.documents) {
      return (
        <>
          <h1 className="a11y-hidden">책 검색</h1>
          {bookData.documents.map((item, index) => (
            <BookList
              key={index}
              onClick={(e) => {
                setBookTitle(item.title);
                setBookAuthor(item.authors);
                setBookThumb(item.thumbnail);
                setBookLink(item.url);

                window.history.back();
              }}
            >
              <img src={item.thumbnail} alt="책 표지" />
              <div className="search-keyword">
                <p className="book-title">{item.title}</p>
                <p className="book-author">
                  {item.authors.map((item) => ` ${item}`)}
                </p>
              </div>
            </BookList>
          ))}
        </>
      );
    } else {
      return;
    }
  };

  return (
    <div>
      <LayoutStyle>
        <HeaderMain>
          <BackBtn onClick={goBack}>
            <img src={iconArrow} alt="뒤로가기 버튼" />
          </BackBtn>
          <label className="a11y-hidden" htmlFor="headerInp" />
          <input
            type="text"
            placeholder="책 제목 또는 저자를 입력해 주세요."
            onChange={searchValue}
            className="searchInput"
            id="headerInp"
            ref={inputRef}
          />
        </HeaderMain>
        {bookData ? <SearchResult /> : null}
        <Footer />
      </LayoutStyle>
    </div>
  );
}

const BookList = styled(SearchList)`
  & .book-title {
    font-weight: bold;
    font-size: 17px;
  }

  & .book-author {
    font-size: 14px;
  }

  & img {
    width: 100px;
    height: 150px;
    border-radius: 0;
  }
`;
