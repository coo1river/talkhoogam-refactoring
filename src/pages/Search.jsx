import React, { useEffect, useRef, useState } from "react";
import { LayoutInsideStyle, LayoutStyle } from "../styles/LayoutStyled";
import { BackBtn, HeaderMain } from "../styles/HeaderStyled";
import iconArrow from "../assets/icons/icon-arrow-left.svg";
import { useRecoilValue } from "recoil";
import loginToken from "../recoil/loginToken";
import SearchApi from "../api/SearchApi";
import { SearchInput, SearchList } from "../styles/SearchStyled";
import profile from "../assets/images/img-profile.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

export default function Search() {
  const [searchData, setSearchData] = useState([]);
  const [searchId, setSearchId] = useState("");
  const token = useRecoilValue(loginToken);
  const navigate = useNavigate();

  // 처음 헤더의 input에 focus가 오도록
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // searchInput의 value
  function searchValue(e) {
    setSearchId(e.target.value);
  }

  // 뒤로가기
  function goBack(e) {
    e.preventDefault();
    window.history.back();
  }

  // 딜레이 함수
  function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => clearTimeout(timer);
    }, [value]);

    return debouncedValue;
  }

  // 딜레이 함수를 searchResult라는 변수에 할당
  const searchResult = useDebounce(searchId);

  // useEffect를 통해 searchResult가 변경되는 경우
  useEffect(() => {
    const setResult = async () => {
      if (searchResult) {
        setSearchData(await SearchApi(token, searchId));
      } else {
        setSearchData([]);
      }
    };
    setResult();
  }, [searchResult]);

  const SearchResult = () => {
    return (
      <>
        <h1 className="a11y-hidden">유저 검색</h1>
        {searchData.map((item) => (
          <SearchList
            key={item._id}
            onClick={(e) => navigate(`/profile/${item.accountname}`)}
          >
            <img
              src={
                item.image === "http://146.56.183.55:5050/Ellipse.png"
                  ? profile
                  : item.image
              }
              alt="유저 프로필 이미지"
            />
            <div className="search-keyword">
              <p className="user-name">{item.username}</p>
              <p className="user-id">{"@ " + item.accountname}</p>
            </div>
          </SearchList>
        ))}
      </>
    );
  };

  return (
    <LayoutStyle>
      <HeaderMain>
        <SearchInput>
          <BackBtn onClick={goBack}>
            <img src={iconArrow} alt="뒤로가기 버튼" />
          </BackBtn>
          <label className="a11y-hidden" htmlFor="headerInp" />
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            onChange={searchValue}
            className="searchInput"
            id="headerInp"
            ref={inputRef}
          />
        </SearchInput>
      </HeaderMain>
      {searchId ? <SearchResult /> : null}
      <Footer />
    </LayoutStyle>
  );
}
