import React from "react";
import styled from "styled-components";

function Button(props) {
    const StyledButton = styled.button`
    background: ${(props) => props.background};
    color: ${(props) => props.textColor};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: none;
    border-radius: ${(props) => props.radius};
    margin: 20px;
    padding: 10px;
    font-size: 15px;
    text-align: center;
    transition: all 0.3s;
    box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);
    cursor: pointer;
    &:hover {
    scale: 1.05;
    }
    `;

    return (
        <StyledButton
        background={props.background}
        color={props.color}
        width={props.width}
        height={props.height}
        radius={props.radius}
        >
         {props.title}
    </StyledButton>
     );
}
export default Button;