import styled from "styled-components";

interface StyledTweetContainerProps {
  hoverable?: boolean;
}

export const StyledTweetContainer = styled.div<StyledTweetContainerProps>`
  display: flex;
  width: 100%;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  gap: 16px;
  margin: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.containerLine};

  p {
    color: ${(props) => props.theme.colors.black};
    font-size: 15px;
    font-family: "Manrope", sans-serif;
    line-height: 110%;
    letter-spacing: -0.15px;
    margin-left: 56px;
    margin-bottom: 0;
    margin-top: 0;
  }

  ${({ hoverable, theme }) =>
    hoverable &&
    `
    &:hover {
      background-color: ${theme.colors.hover};
      cursor: pointer;
    }
  `}
`;
