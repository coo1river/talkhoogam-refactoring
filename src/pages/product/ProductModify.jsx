import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { LayoutStyle, LayoutInsideStyle } from "../../styles/LayoutStyled";
import UploadHeader from "../../components/header/UploadHeader";
import Input from "../../components/common/input/Input";
import { LabelStyle } from "../../styles/InputStyled";
import defaultImg from "../../assets/images/addproduct.png";
import addproductIcon from "../../assets/icons/addproduct-icon.svg";
import ImageUploadAPI from "../../api/upload/ImageUploadAPI";
import { validateImage } from "../../utils/imageValidate";
import ProductModifyAPI from "../../api/product/ProductModifyAPI";
import { useParams } from "react-router-dom";
import ProductDetailAPI from "../../api/product/ProductDetailAPI";

export default function ProductModify() {
  const [productDetail, setProductDetail] = useState(() => {});
  const params = useParams();
  const id = params.id;
  const getProductDetail = ProductDetailAPI(params.id);
  const [imgSrc, setImgSrc] = useState("");
  const [itemImage, setItemImage] = useState("");
  const textareaRef = useRef();

  const { productModify } = ProductModifyAPI(productDetail, itemImage, id);
  const onClickHandler = async (e) => {
    e.preventDefault();
    await productModify();
  };

  const hendleResizeHeight = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  useEffect(() => {
    const detailList = async () => {
      const list = await getProductDetail();

      setProductDetail(list.product);
    };
    detailList();
  }, [getProductDetail]);

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
    console.log(imageURL);

    setImgSrc(imageURL);
    setItemImage(imageURL);
  };

  return (
    <LayoutStyle>
      <h1 className="a11y-hidden">상품 등록 페이지</h1>
      <UploadHeader onClickHandler={onClickHandler}>저장</UploadHeader>
      <ReLayoutInsideStyle>
        {productDetail ? (
          <main>
            <form>
              <LabelStyle htmlFor="file-upload">
                이미지 등록
                <ProductImgWrap>
                  <img
                    className="addproduct-img"
                    src={imgSrc ? imgSrc : productDetail.itemImage}
                    alt="상품 이미지"
                  />
                  <img
                    className="inside-icon"
                    src={addproductIcon}
                    alt="상품 이미지 아이콘"
                  />
                </ProductImgWrap>
              </LabelStyle>
              <input
                id="file-upload"
                onChange={handleChangeImage}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              />
              <Input
                labelText="상품명"
                maxLength={15}
                placeholder={"2~15자 이내여야 합니다."}
                onChangeHandler={(event) => {
                  setProductDetail({
                    ...productDetail,
                    itemName: event.target.value,
                  });
                }}
                value={productDetail.itemName}
              />
              <Input
                labelText="가격"
                maxLength={15}
                placeholder={"숫자만 입력 가능합니다."}
                onChangeHandler={(event) => {
                  setProductDetail({
                    ...productDetail,
                    price: event.target.value,
                  });
                }}
                value={productDetail.price}
              />
              <label className="label-desc">판매 설명</label>
              <TextArea
                className="book-report"
                placeholder="판매 내용을 입력해주세요."
                ref={textareaRef}
                onChange={(event) => {
                  hendleResizeHeight();
                  setProductDetail({
                    ...productDetail,
                    link: event.target.value,
                  });
                }}
                value={productDetail.link}
              />
            </form>
          </main>
        ) : (
          <p>로딩 중..</p>
        )}
      </ReLayoutInsideStyle>
    </LayoutStyle>
  );
}

const ReLayoutInsideStyle = styled(LayoutInsideStyle)`
  padding: 30px 34px 25px 34px;

  .label-desc {
    font-size: 12px;
    color: var(--color-darkgrey);
  }
`;

const ProductImgWrap = styled.div`
  max-width: 322px;
  cursor: pointer;
  position: relative;
  margin-top: 18px;
  margin-bottom: 30px;
  & .addproduct-img {
    width: 322px;
    height: 204px;
    object-fit: cover;
  }

  & .inside-icon {
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: inline-block;
  }
`;

const TextArea = styled.textarea`
  padding: 0;
  width: 100%;
  border: none;
  resize: none;
  caret-color: var(--color-mainColor);
  font-family: "Pretendard", sans-serif;
  padding-top: 10px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 14px;
    color: var(--color-lightgrey);
  }
`;
