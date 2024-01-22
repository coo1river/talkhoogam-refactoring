import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImgVertical from "../../assets/icons/s-icon-more-vertical.svg";
import IconHeart from "../../assets/icons/heart.svg";
import IconHeartActive from "../../assets/icons/heart-avtive.svg";
import IconMessage from "../../assets/icons/icon-message-circle.svg";
import MyFeedListAPI from "../../api/post/MyFeedListAPI.jsx";
import accountName from "../../recoil/accountname";
import LogoImg from "../../assets/images/Logo.png";
import CommonModal from "../../components/modal/CommonModal";
import { useRecoilValue } from "recoil";
import timeFormat from "../../utils/timeFormat.js";
import LikeHeart from "../../components/common/LikeHeart";
import { Rating } from "../post/PostUpload.jsx";
import { FaStar } from "react-icons/fa";

export default function ListFeed(accountname) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { getMyFeedListAPI } = MyFeedListAPI(accountname);
  const [myFeedData, setMyFeedData] = useState(() => {});
  const [modalOpen, setModalOpen] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const loginName = useRecoilValue(accountName);
  const [postId, setPostId] = useState("");

  // 별점 상태, 별점 array
  const [onStar, setOnStar] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getMyFeedListAPI();
        setMyFeedData(list);
        setLoading(true);

        console.log(list);

        // score 값을 이용하여 onStar 설정
        let clickStates = [...onStar];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i < list.rating ? true : false;
        }
        setOnStar(clickStates);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [accountname]);

  //더보기 버튼
  const showModal = (name, id) => {
    modalOpen ? setModalOpen(false) : setModalOpen(true);
    setPostId(id);
    if (name === loginName) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  };

  //하트 색칠하기
  const [iconColor, setIconColor] = useState(IconHeart);

  const colorChangeHandler = () => {
    if (iconColor === IconHeart) {
      setIconColor(IconHeartActive);
    } else {
      setIconColor(IconHeart);
    }
  };

  return (
    <UlStyled>
      {loading && myFeedData.post.length === 0 ? (
        <>
          <h1 className="a11y-hidden">게시글이 존재하지 않습니다.</h1>
          <div className="noneFeed">
            <img src={LogoImg}></img>
            게시글이 존재하지 않습니다.
          </div>
        </>
      ) : (
        loading &&
        myFeedData.post.map((item, index) => {
          const bookData = {
            bookTitle: "",
            bookAuthor: "",
            bookContent: "",
          };

          const contentObj = JSON.parse(item.content);

          // 해당 객체의 아이템을 각각 제목, 저자, 내용에 할당
          bookData.bookTitle = contentObj.bookTitle;
          bookData.bookAuthor = contentObj.bookAuthor;
          bookData.bookContent = contentObj.inputContent;

          return (
            <List key={item.id}>
              <img
                className="list-profileimg"
                src={item.author.image}
                alt="프로필이미지"
              />
              <div className="feedlist">
                <div>
                  <img
                    onClick={() => {
                      showModal(item.author.accountname, item.id);
                    }}
                    className="list-vertical"
                    src={ImgVertical}
                    alt="vertical 탭"
                  />
                  <p className="list-name">{item.author.username}</p>
                  <p className="list-id">@ {item.author.accountname}</p>
                </div>
                <MoreButton onClick={() => navigate(`/post/detail/${item.id}`)}>
                  <img className="list-img" src={item.image} alt="피드 사진" />
                </MoreButton>
                <strong className="book-title">{bookData.bookTitle}</strong>
                <p className="book-author">{bookData.bookAuthor}</p>
                <Rating>
                  {array.map((el, idx) => {
                    return (
                      <FaStar
                        key={idx}
                        size="25"
                        className={onStar[el] && "rating"}
                      />
                    );
                  })}
                </Rating>
                <p className="list-text">{bookData.bookContent}</p>
                <div className="list-icon">
                  <LikeHeart />
                  <img src={IconMessage} alt="댓글" />
                  <p>{item.commentCount}</p>
                </div>
                <div className="list-date">
                  <p>{timeFormat(item.updatedAt)}</p>
                </div>
              </div>
            </List>
          );
        })
      )}
      {modalOpen && (
        <CommonModal
          isMine={isMine}
          id={postId}
          setModalOpen={setModalOpen}
          isLocation={`post`}
        />
      )}
    </UlStyled>
  );
}
const MoreButton = styled.div`
  cursor: pointer;
  border: none;
`;
const List = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background-color: white;
  max-width: 390px;
  margin: 4px auto;
  font-size: 14px;
  padding: 16px 21px;

  @media screen and (min-width: 768px) {
    max-width: 500px;
    box-sizing: border-box;
  }

  .list-profileimg {
    width: 42px;
    height: 42px;
    border: 0.5px solid #dbdbdb;
    border-radius: 30px;
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

  .feedlist {
    line-height: 1.1;
    margin-top: 4px;
    margin-left: 12px;
    flex-grow: 1;
  }
  .list-name {
    font-size: 17px;
    font-weight: 600;
    max-width: 300px;

    @media screen and (min-width: 768px) {
      font-size: 19px;
    }
  }

  .list-id {
    color: #767676;
    margin-top: 4px;
  }
  .list-img {
    width: 100px;
    height: 150px;
    border-radius: 10px;
    margin: 10px auto;

    @media screen and (min-width: 768px) {
      width: 120px;
      height: 170px;
    }
  }
  .list-text {
    font-size: 14px;

    @media screen and (min-width: 768px) {
      font-size: 16px;
    }
  }

  .list-icon {
    display: flex;
    margin: 12px auto;
    gap: 5px;
  }
  .list-icon img {
    width: 20px;
    height: 20px;
  }
  .list-icon img:hover {
    cursor: pointer;
  }
  .list-icon p {
    margin: 4px 6px;
  }
  .list-date {
    display: block;
    color: #767676;
  }
  .list-vertical {
    float: right;
  }
  .list-vertical:hover {
    cursor: pointer;
  }
`;
const UlStyled = styled.ul`
  margin-bottom: 50px;
  position: relative;
  min-height: 300px;
  width: 100%;

  .noneFeed {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-bottom: 90px;
    transform: translate(-50%, -50%);
  }
  .noneFeed img {
    width: 110px;
    display: block;
    margin-bottom: 20px;
  }
`;
