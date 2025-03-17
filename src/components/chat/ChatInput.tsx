import styled from "styled-components";

export const ChatBarContainer = styled.div`
  position: absolute; 
  bottom: 0;
  left: 0;
  right: 0; 
  background: ${(props) => props.theme.background};
  padding: 12px 16px;  
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);

`;

export const StyledChatBarInput = styled.input`
  width: 100%;  
  padding: 16px;
  box-sizing: border-box;
  border-radius: 30px;
  background: ${(props) => props.theme.colors.inactiveBackground};
  color: ${(props) => props.theme.colors.text};
  border: none;

  transition: 0.07s;
  font-size: 15px;
  font-family: ${(props) => props.theme.font.default};
  line-height: 110%;
  letter-spacing: -0.15px;

  &:focus {
    outline: 1px solid ${(props) => props.theme.colors.main};
    background: ${(props) => props.theme.background};
  }
`;
