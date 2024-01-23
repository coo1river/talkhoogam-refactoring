import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

export default function Rating({ rating }) {
  const [onStar, setOnStar] = useState([false, false, false, false, false]);
  const array = [0, 1, 2, 3, 4];

  useEffect(() => {
    let clickStates = [...onStar];
    for (let i = 0; i < rating; i++) {
      clickStates[i] = i < rating ? true : false;
    }
    setOnStar(clickStates);
  }, []);

  return (
    <Stars>
      {array.map((el, idx) => (
        <FaStar key={idx} size="20" className={onStar[el] && "rating"} />
      ))}
    </Stars>
  );
}

const Stars = styled.div`
  display: flex;
  margin: 10px 0;

  & svg {
    color: #ddd;
  }

  .rating {
    color: #fcc419;
  }
`;
