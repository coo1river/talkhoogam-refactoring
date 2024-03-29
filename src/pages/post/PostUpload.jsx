import React, { useEffect, useRef, useState } from "react";
import { LayoutStyle, LayoutInsideStyle } from "../../styles/LayoutStyled";
import UploadHeader from "../../components/header/UploadHeader";
import PostUploadAPI from "../../api/post/PostUploadAPI";
import ProfileInfoAPI from "../../api/profile/ProfileInfoAPI";
import styled from "styled-components";
import ImageUploadAPI from "../../api/upload/ImageUploadAPI";
import { validateImage } from "../../utils/imageValidate";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { author, link, thumbnail, title } from "../../recoil/bookInfo";
import bookImg from "../../assets/images/book.png";
import UploadModal from "../../components/modal/UploadModal";
import Footer from "../../components/footer/Footer";
import { FaStar } from "react-icons/fa";
import Loading from "../../components/loading/Loading";
import { ClipLoader } from "react-spinners";

export default function PostUpload() {
  const [imgSrc, setImgSrc] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [profileInfo, setProfileInfo] = useState(() => {});
  const [inputContent, setInputContent] = useState("");
  const inputImage = useRef(null);
  const textareaRef = useRef();

  // 책 정보 recoil에서 가져오기
  const [bookTitle, setBookTitle] = useRecoilState(title);
  const [bookAuthor, setBookAuthor] = useRecoilState(author);
  const [bookThumb, setBookThumb] = useRecoilState(thumbnail);

  // 책 정보 값 상태 확인
  const [bookInfo, setBookInfo] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  // 별점 상태, 별점 array
  const [onStar, setOnStar] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];

  // 별점 클릭 함수
  const handleStar = (index) => {
    let clickStates = [...onStar];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setOnStar(clickStates);
  };

  // 별점 값 뽑아 내기
  let score = onStar.filter(Boolean).length;

  const inputValue = {
    bookTitle: bookTitle,
    bookAuthor: bookAuthor,
    inputContent: inputContent,
    rating: score,
  };

  const { postUpload } = PostUploadAPI({ inputValue, itemImage });

  const navigate = useNavigate();

  const hendleResizeHeight = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  // 게시물 업로드
  const onClickHandler = async (e) => {
    e.preventDefault();
    await postUpload();
    setBookTitle("");
    setBookAuthor("");
    setBookThumb("");
  };

  // 이미지 파일 가져오기
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("파일 선택이 취소 되었습니다.");
      return null;
    }
    if (file.size > 10 * 1024 * 1024) {
      console.log("이미지 용량은 10MB를 넘을 수 없습니다.");
      return null;
    }

    if (!validateImage(file.name)) {
      console.log("파일 확장자를 확인해 주세요.");
      return null;
    }

    const imageURL = await ImageUploadAPI(file);

    setImgSrc(imageURL);
    setItemImage(imageURL);
    setOpenModal(false);
  };

  const handleUpload = () => {
    // 클릭 시 파일 입력(input) 엘리먼트를 트리거합니다.
    if (inputImage.current) {
      inputImage.current.click();
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const info = await ProfileInfoAPI();
        setProfileInfo(info);
      } catch (error) {
        console.error("API 호출 중 오류 발생", error);
      }
    };
    fetchUserData();
  }, []);

  // 책 제목, 저자, 썸네일이 전부 있는 경우 책 정보 상태 값 true로 변경
  useEffect(() => {
    if (bookTitle && bookAuthor && bookThumb) {
      setBookInfo(true);
      setItemImage(bookThumb);
    }
  }, []);

  // 모달 창 닫기
  const handleModalClose = (action) => {
    if (action === "imageUpload") {
      handleChangeImage();
    } else if (action === "searchBook") {
      navigate("/searchbook");
    }
    setOpenModal(false);
  };

  // 책 정보 게시물에 등록
  const BookInfo = () => {
    return (
      <Book>
        <img
          onClick={(e) => setOpenModal(true)}
          src={bookThumb || itemImage}
          alt="책 표지"
        />
        <strong className="book-title">{bookTitle}</strong>
        <p className="book-author">{bookAuthor}</p>
        <Rating>
          {array.map((el, idx) => {
            return (
              <FaStar
                key={idx}
                size="25"
                onClick={() => handleStar(el)}
                className={onStar[el] && "rating"}
              />
            );
          })}
        </Rating>
      </Book>
    );
  };

  return (
    <>
      <ModalBackground open={openModal}>
        {/* 이미지 클릭 시 모달 창 */}
        {openModal && (
          <UploadModal onClickHandler={handleModalClose}>
            <li onClick={() => handleModalClose("searchBook")}>책 검색</li>
            <li onClick={handleUpload}>
              이미지 업로드
              <input
                id="file-upload"
                onChange={(e) => handleChangeImage(e)}
                type="file"
                accept="image/*"
                ref={inputImage}
                style={{ display: openModal ? "none" : "block" }}
              />
            </li>
          </UploadModal>
        )}
      </ModalBackground>
      <LayoutStyle>
        <h1 className="a11y-hidden">피드 등록 페이지</h1>
        <UploadHeader onClickHandler={onClickHandler}>저장</UploadHeader>
        <LayoutInsideStyle>
          <PositionWrap>
            <ContentWrap>
              {profileInfo ? (
                <>
                  <img
                    className="profile-img"
                    src={profileInfo.image}
                    alt="프로필이미지"
                  />
                  <InputWrap>
                    {imgSrc && !bookThumb && (
                      <img
                        src={imgSrc}
                        alt="업로드 이미지"
                        onClick={(e) => navigate("/searchbook")}
                      />
                    )}
                    {/* 책 정보 */}
                    {bookThumb ? <BookInfo /> : null}
                    {itemImage || bookThumb ? null : (
                      <SearchBook onClick={(e) => setOpenModal(true)} />
                    )}
                    <TextArea
                      className="book-report"
                      placeholder="책 후기를 남겨주세요."
                      ref={textareaRef}
                      onChange={(event) => {
                        hendleResizeHeight();
                        setInputContent(event.target.value);
                      }}
                    />
                  </InputWrap>
                </>
              ) : (
                <Loading>
                  <ClipLoader color="#56b778" size={20} speedMultiplier={0.7} />
                </Loading>
              )}
            </ContentWrap>
          </PositionWrap>
        </LayoutInsideStyle>
        <Footer />
      </LayoutStyle>
    </>
  );
}

// 모달 창 열렸을 때 배경 어둡게
const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  display: ${({ open }) => (open ? "flex" : "none")};
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const PositionWrap = styled.div`
  position: relative;
  min-height: 500px;
  width: 100%;
`;

const ContentWrap = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 20px;
  justify-content: center;

  .profile-img {
    width: 42px;
    height: 42px;
    border-radius: 42px;
    object-fit: cover;
    @media screen and (min-width: 768px) {
      width: 50px;
      height: 50px;
    }
  }

  .book-report {
    font-size: 15px;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;

    @media screen and (min-width: 768px) {
      font-size: 17px;
    }
  }
`;

const SearchBook = styled.div`
  width: 250px;
  height: 150px;
  border-radius: 20px;
  background-color: var(--color-trans-grey);
  border: 2px solid #e7e7e7;
  cursor: pointer;
  background-image: url(${bookImg});
  background-size: 60px;
  background-repeat: no-repeat;
  background-position: center center;

  @media screen and (min-width: 768px) {
    width: 400px;
    height: 250px;
  }
`;

export const Rating = styled.div`
  display: flex;
  margin: 10px 0;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .rating {
    color: #fcc419;
  }
`;

const InputWrap = styled.div`
  width: 100%;
  img {
    display: block;
    margin: 0 auto;
    width: fit-content;
    height: 200px;
    border-radius: 5px;
    object-fit: contain;
    cursor: pointer;

    @media screen and (min-width: 768px) {
      height: 300px;
    }
  }
`;

const Book = styled.div`
  line-height: 1.3rem;

  & .book-title {
    margin: 10px 0;
    display: block;
    font-size: 18px;
    font-weight: bold;

    @media screen and (min-width: 768px) {
      font-size: 20px;
    }
  }

  & .book-author {
    color: #474646;
    font-size: 14px;
    margin-bottom: 5px;

    @media screen and (min-width: 768px) {
      font-size: 16px;
    }
  }
`;

const TextArea = styled.textarea`
  margin-top: 10px;
  padding: 0;
  width: 100%;
  border: none;
  resize: none;
  caret-color: var(--color-mainColor);

  &:focus {
    outline: none;
  }
`;

const UploadButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;
