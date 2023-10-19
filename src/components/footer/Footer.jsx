import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation ,useNavigate } from 'react-router-dom';
import { ReactComponent as IconHome} from "../../assets/icons/home.svg";
import { ReactComponent as IconHand} from "../../assets/icons/handshake.svg";
import { ReactComponent as IconEdit} from "../../assets/icons/edit.svg";
import { ReactComponent as IconusersAlt} from "../../assets/icons/users-alt.svg"
import { ReactComponent as IconUser} from "../../assets/icons/user.svg";



function Footer() {

    const navigate = useNavigate();
    const uselocation = useLocation();
    const [svgColor, setSvgColor] = useState(uselocation.pathname.toLowerCase());
    
    
    const handleClickState = (pageName) => {
        navigate(`/${pageName}`);
        console.log(uselocation.pathname.toLowerCase())
        if(uselocation.pathname === "/home"){
            setSvgColor("/home")
        }
    };
    return (
    <>
    <FooterLayout>
        <FooterIconWrap onClick={() => {
            handleClickState("home");
        }}>
            <IconHome className="footer-icon" fill={svgColor === "/home" ? "#56b778" : "#767676"} />
            <p style={{color:svgColor === "/home" ? "#56b778" : "#767676"}}>홈</p>
        </FooterIconWrap>

        <FooterIconWrap onClick={() => {
            handleClickState("transacion");
        }}>
            <IconHand className="footer-icon" fill={svgColor === "/transacion" ? "#56b778" : "#767676"}/>
            <p style={{color:svgColor === "/transacion" ? "#56b778" : "#767676"}}>거래</p>
        </FooterIconWrap>

        <FooterIconWrap onClick={() => {
            handleClickState("edit");
        }}>
            <IconEdit className="footer-icon" fill={svgColor === "/edit" ? "#56b778" : "#767676"}/>
            <p style={{color:svgColor === "/edit" ? "#56b778" : "#767676"}}>게시물 작성</p>
        </FooterIconWrap>

        <FooterIconWrap onClick={() => {
            handleClickState("gathering");
        }}>
            <IconusersAlt className="footer-icon" fill={svgColor === "/gathering" ? "#56b778" : "#767676"}/>
            <p style={{color:svgColor === "/gathering" ? "#56b778" : "#767676"}}>독서모임</p>
        </FooterIconWrap>
        
        <FooterIconWrap onClick={() => {
            handleClickState("profile");
        }}>
            <IconUser className="footer-icon" fill={svgColor === "/profile" ? "#56b778" : "#767676"}/>
            <p style={{color:svgColor === "/profile" ? "#56b778" : "#767676"}}>프로필</p>
        </FooterIconWrap>
    </FooterLayout>
    </>
    )
}

export default Footer

const FooterLayout = styled.footer`
    border-top: 1px solid #dbdbdb;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const FooterIconWrap = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    cursor: pointer;
    width: 84px;
    height: 60px;

    & p {
        margin-top: 4px;
        text-align: center;
        font-size: 10px;
        /* color: #767676; */
    }

    & .footer-icon{
        width: 18px;
        height: 18px;
    }
`