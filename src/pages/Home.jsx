import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IconMessage from "../assets/icons/icon-message-circle.svg";
import IconDot from "../assets/icons/s-icon-more-vertical.svg";
import { LayoutStyle, LayoutInsideStyle } from "../styles/LayoutStyled";
import Footer from "../components/footer/Footer";
import GetFollowerFeedListAPI from "../api/post/GetFollowerFeedListAPI";
import Empty from "../components/empty/Empty";
import LogoImg from "../assets/images/Logo.png";
import CommonModal from "../components/modal/CommonModal";
import { useLocation, useNavigate } from "react-router-dom";
import timeFormat from "../utils/timeFormat";
import BasicHeader from "../components/header/BasicHeader";
import LikeHeart from "../components/common/LikeHeart";
import ProductList from "./product/ProductList";
import { useRecoilValue } from "recoil";
import tabState from "../recoil/tabState";
import ProductListAPI from "../api/product/ProductListAPI";
import accountname from "../recoil/accountname";
import Rating from "../components/common/Rating";

export function HomeContents({ feedData, setFeedData, showModal }) {
  const navigate = useNavigate();
  const { getFeedListAPI } = GetFollowerFeedListAPI();
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeedListAPI(); // 데이터 가져오기
        setFeedData(data); // 데이터를 상태에 저장
        setLoding(true);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData(); // 데이터 가져오는 함수를 호출
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 호출

  function moveProfile(accountname) {
    navigate(`/profile/${accountname}`);
  }

  return (
    <>
      <FeedWrap>
        {loding && feedData.posts.length === 0 ? (
          <>
            <h1 className="a11y-hidden">팔로우가 존재하지 않습니다.</h1>
            <Empty image={LogoImg} alt={"404페이지"}>
              유저를 검색해 팔로우 해보세요!
            </Empty>
          </>
        ) : (
          loding && (
            <>
              {feedData.posts.map((item, index) => {
                const bookData = {
                  bookTitle: "",
                  bookAuthor: "",
                  bookContent: "",
                  bookRating: 0,
                };

                // item.content를 JSON 문자열에서 객체로 변환
                const contentObj = JSON.parse(item.content);

                // 해당 객체의 아이템을 각각 제목, 저자, 내용에 할당
                bookData.bookTitle = contentObj.bookTitle;
                bookData.bookAuthor = contentObj.bookAuthor;
                bookData.bookContent = contentObj.inputContent;
                bookData.bookRating = contentObj.rating;

                return (
                  <div key={index} className="user-timeline">
                    <img
                      className="user-profileimg"
                      onClick={() => {
                        moveProfile(item.author.accountname);
                      }}
                      src={item.author.image}
                      alt="프로필이미지"
                    />
                    <div className="user-contents">
                      <div className="timeline-title-wrap">
                        <p className="timeline-title">{item.author.username}</p>
                        <img
                          className="img-dot"
                          src={IconDot}
                          alt="도트이미지"
                          onClick={showModal}
                        />
                      </div>
                      <p className="timeline-id">@ {item.author.accountname}</p>
                      <MoreButton
                        onClick={() => navigate(`/post/detail/${item.id}`)}
                      >
                        <img
                          className="timelin-img"
                          src={item.image}
                          alt="피드이미지"
                        />
                      </MoreButton>

                      <strong className="book-title">
                        {bookData.bookTitle}
                      </strong>
                      <p className="book-author">{bookData.bookAuthor}</p>
                      <Rating rating={bookData.bookRating} />
                      <p className="timeline-main-text">
                        {bookData.bookContent}
                      </p>
                      <div className="social-wrap">
                        <div>
                          <LikeHeart />
                        </div>
                        <div>
                          <img
                            className="social-icon"
                            onClick={() => navigate(`/post/detail/${item.id}`)}
                            src={IconMessage}
                            alt="댓글아이콘"
                          />
                          <p>{item.comments.length}</p>
                        </div>
                      </div>
                      <p className="wr-date">{timeFormat(item.updatedAt)}</p>
                    </div>
                  </div>
                );
              })}
            </>
          )
        )}
      </FeedWrap>
    </>
  );
}

export default function Home() {
  const [feedData, setFeedData] = useState(() => {});
  const [modalOpen, setModalOpen] = useState(false);
  const tabstate = useRecoilValue(tabState);

  const showModal = () => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
  };

  const location = useLocation();
  const loginAccountname = useRecoilValue(accountname);
  const { getProductList } = ProductListAPI(loginAccountname);
  const [productData, setProductData] = useState([]);

  return (
    <LayoutStyle>
      <BasicHeader />
      <LayoutInsideStyle>
        {tabstate === "feed" ? (
          <>
            <HomeContents
              feedData={feedData}
              setFeedData={setFeedData}
              showModal={showModal}
            />
          </>
        ) : (
          <>
            <ProductList
              location={location}
              loginAccountname={loginAccountname}
              getProductList={getProductList}
              productData={productData}
              setProductData={setProductData}
            />
          </>
        )}
      </LayoutInsideStyle>
      {modalOpen && <CommonModal setModalOpen={setModalOpen} />}
      <Footer />
    </LayoutStyle>
  );
}

export const FeedWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  @media screen and (min-width: 768px) {
    margin: 0 50px;
  }

  & .symbol-logo {
    margin-top: 220px;
  }

  & .home-text {
    font-size: 14px;
    color: #767676;
    margin: 20px 0;
  }

  & .user-timeline {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--color-trans-grey);
  }

  .user-profileimg {
    border-radius: 42px;
    width: 42px;
    height: 42px;
    cursor: pointer;
  }

  .user-contents {
    width: 100%;

    @media screen and (min-width: 390px) {
      width: 300px;
    }

    @media screen and (min-width: 768px) {
      width: 500px;
    }
  }

  .timeline-title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .img-dot {
    margin-top: 5px;
    cursor: pointer;
  }

  .timeline-title {
    font-size: 15px;
    font-weight: bold;
  }

  .timeline-id {
    color: #767676;
    font-size: 13px;
  }

  .book-title {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;

    @media screen and (min-width: 768px) {
      font-size: 20px;
    }
  }

  .book-author {
    font-size: 14px;
    margin-bottom: 10px;
    color: #474646;

    @media screen and (min-width: 768px) {
      font-size: 16px;
    }
  }

  .timeline-main-text {
    font-size: 15px;
    line-height: normal;
    margin: 16px 0;

    // 3줄 이상 시 말줄임표 처리
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media screen and (min-width: 768px) {
      font-size: 17px;
    }
  }

  .timelin-img {
    width: 100%;
    height: 228px;
    border-radius: 10px;
    object-fit: contain;

    @media screen and (min-width: 768px) {
      max-width: 400px;
    }
  }

  .social-wrap {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--color-darkgrey);
    font-size: 12px;
    line-height: 12px;
    margin: 10px 0;

    .social-icon {
      cursor: pointer;
      width: 25px;
      height: 25px;
      object-fit: cover;
      margin-right: 6px;
    }
  }

  .social-wrap div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wr-date {
    color: #767676;
    font-size: 11px;
    font-weight: 400;
    line-height: 12px;
    margin-top: 16px;
    margin-bottom: 5px;

    @media screen and (min-width: 768px) {
      font-size: 13px;
    }
  }
`;

const MoreButton = styled.div`
  cursor: pointer;
  border: none;
  margin-top: 15px;
`;
