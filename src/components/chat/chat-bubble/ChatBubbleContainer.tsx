import styled from "styled-components";



export const BubbleContainer = styled.div<{ isSender: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  margin: 8px 0;
`;

export const Bubble = styled.div<{ isSender: boolean }>`
  max-width: 70%; 
  background: ${(props) =>
    props.isSender
      ? "var(--twitter-blue, #1DA1F2)" 
      : "var(--grayscale-background, #E1E8ED)"}; 
  color: ${(props) => (props.isSender ? "#fff" : "#14171A")}; 
  padding: 12px 16px;
  border-radius: ${(props) => props.isSender ? "18px 18px 0px 18px" :  "18px 18px 18px 0px"};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  position: relative; 
`;

