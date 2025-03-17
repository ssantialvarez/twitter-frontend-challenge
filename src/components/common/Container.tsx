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

export const StyledScrollableContainer = styled(StyledContainer)`
  
  overflow-y: auto;  
`;

export const StyledOverflowContainer = styled(StyledContainer)``;
