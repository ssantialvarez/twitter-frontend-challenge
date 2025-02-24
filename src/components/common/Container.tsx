import styled, { css } from "styled-components";
import { CSSProperties } from "react";

type ContainerProps = {
    hoverable?: boolean;
} & CSSProperties;

const ContainerBase = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    transition: 0.3s ease-in-out;
    position: relative;
    scrollbar-width: auto;
    border-radius: 0;
    min-height: auto;
    min-width: 0;
    width: 100%;
    -webkit-tap-highlight-color: transparent;
`;

export const StyledContainer = styled(ContainerBase).attrs<ContainerProps>(
    (props) => ({
        style: props,
    })
)<ContainerProps>`
  &:hover {
    ${(props) =>
    props.hoverable &&
    css`
        background-color: ${props.theme.colors.hover};
        cursor: pointer;
      `}
  }
`;
// TODO add hoverablecontainer

// Example usage:
// <StyledContainer
//   hoverable
//   maxWidth="600px"
//   justifyContent="center"
//   // Add more CSS properties as needed
// >
//   Content
// </StyledContainer>

export const StyledScrollableContainer = styled(StyledContainer)`
  scrollbar-width: auto;
    overflow-y: auto;
    max-height: 600px;
`;

export const StyledOverflowContainer = styled(StyledContainer)``;
