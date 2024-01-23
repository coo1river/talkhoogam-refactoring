import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LayoutStyle, LayoutInsideStyle } from "../../styles/LayoutStyled";
import UploadHeader from "../../components/header/UploadHeader";
import PostModifyAPI from "../../api/post/PostModifyAPI";
import ImageUploadAPI from "../../api/upload/ImageUploadAPI";
import { validateImage } from "../../utils/imageValidate";
import PostDetailAPI from "../../api/post/PostDetailAPI";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { Rating } from "./PostUpload";
import { FaStar } from "react-icons/fa";
import Loading from "../../components/loading/Loading";
import { ClipLoader } from "react-spinners";

export default function PostModify() {
  const [postDetail, setPostDetail] = useState(() => {});
  const params = useParams();
  const id = params.id;
  const getPostDetail = PostDetailAPI(params.id);
  const [imgSrc, setImgSrc] = useState("");
  const [itemImage, setItemImage] = useState("");
  const textareaRef = useRef();
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookContent, setBookContent] = useState("");

  // 별점 상태, 별점 array
  const [onStar, setOnStar] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];

  // 별점 값 뽑아 내기
  let score = onStar.filter(Boolean).length;

  const hendleResizeHeight = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const content = {
    bookTitle: bookTitle,
    bookAuthor: bookAuthor,
    inputContent: bookContent,
    rating: score,
  };

  // 별점 클릭 함수
  const handleStar = (index) => {
    let clickStates = [...onStar];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setOnStar(clickStates);
  };

  const { postModify } = PostModifyAPI(content, itemImage, id);
  const onClickHandler = async (e) => {
    e.preventDefault();
    await postModify(content);
  };

  const handleChangeImage = async (e) => {
    // 파일 가져오기
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
  };

  useEffect(() => {
    const detailList = async () => {
      try {
        const list = await getPostDetail();
        const data = JSON.parse(list.post.content);
        console.log(data);
        setBookTitle(data.bookTitle);
        setBookAuthor(data.bookAuthor);
        setBookContent(data.inputContent);
        setPostDetail(list.post);

        // score 값을 이용하여 onStar 설정
        let clickStates = [...onStar];
        for (let i = 0; i < 5; i++) {
          clickStates[i] = i < data.rating ? true : false;
        }
        setOnStar(clickStates);
      } catch (error) {
        console.error("에러", error);
      }
    };
    detailList();
  }, [params.id]);

  return (
    <LayoutStyle>
      <h1 className="a11y-hidden">피드 수정 페이지</h1>
      <UploadHeader onClickHandler={onClickHandler}>저장</UploadHeader>
      <LayoutInsideStyle>
        <PositionWrap>
          <ContentWrap>
            {postDetail ? (
              <>
                <img
                  className="profile-img"
                  src={postDetail.author.image}
                  alt="프로필이미지"
                />
                <InputWrap>
                  <img
                    onClick={handleChangeImage}
                    src={imgSrc ? imgSrc : postDetail.image}
                    alt="업로드 이미지"
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
                  <TextArea
                    placeholder="책 후기를 남겨주세요."
                    ref={textareaRef}
                    onChange={(event) => {
                      hendleResizeHeight();
                      setBookContent(event.target.value);
                    }}
                    value={bookContent}
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
        <Footer />
      </LayoutInsideStyle>
    </LayoutStyle>
  );
}

const PositionWrap = styled.div`
  position: relative;
  min-height: 500px;
  width: 100%;
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  .profile-img {
    width: 42px;
    height: 42px;
    border-radius: 42px;
    object-fit: cover;
  }
`;

const InputWrap = styled.div`
  width: 100%;
  line-height: 1.3rem;

  img {
    width: 100%;
    height: 228px;
    border-radius: 10px;
    object-fit: contain;
    margin-bottom: 16px;

    @media screen and (min-width: 768px) {
      height: 300px;
    }
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
`;

const TextArea = styled.textarea`
  font-size: 15px;
  width: 100%;
  height: 300px;
  border: none;
  resize: none;
  font-family: var(--font-mainFont);

  @media screen and (min-width: 768px) {
    font-size: 17px;
  }

  &:focus {
    outline: none;
  }
`;
