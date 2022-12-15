import React, { useState } from "react";
import styled from "styled-components";
import LeftNav from "./LeftNav";

const StyledBurger = styled.div`
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1;
    /* display: none; */
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    background-color: #ffff;
}

/* 햄버거 메뉴 아이콘 */


div {
    width: 1.7rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "#080707;" : "#060303;")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    



    &:nth-child(1) {
        transform: ${({ open }) => (open ? "rotate(55deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
        transform: ${({ open }) =>
          open ? "translateX(100%)" : "translateX(0)"};
        opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
        width: ${({ open }) => (open ? `1.7rem` : `1.2rem`)};
        transform: ${({ open }) => (open ? "rotate(-55deg)" : "rotate(0)")};
    }
}
`;

const Burger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <LeftNav open={open} />
    </>
  );
};

export default Burger;
