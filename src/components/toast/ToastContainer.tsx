import styled from "styled-components";
import { ToastType } from "./Toast";
import { Theme } from "../../util/LightTheme";

interface ToastContainerProps {
  type: ToastType;
  theme: Theme;
}

export const StyledToastContainer = styled.div<ToastContainerProps>`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 16px;

  position: fixed;
  bottom: 16px;   
  left: 50%;       
  transform: translateX(-50%); 

  border-radius: 8px;
  border: 1px solid
    ${(props: ToastContainerProps) => {
      switch (props.type) {
        case ToastType.ALERT:
          return props.theme.colors.errorContainer;
        default:
          return props.theme.colors.main;
      }
    }};
  background: ${(props: ToastContainerProps) => props.theme.background};

  p {
    color: ${(props: ToastContainerProps) => {
      switch (props.type) {
        case ToastType.ALERT:
          return props.theme.colors.errorContainer;
        default:
          return props.theme.colors.main;
      }
    }};
    margin: 0;
    font-variant-numeric: lining-nums tabular-nums;
    font-family: ${({ theme }) => theme.font.default};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    letter-spacing: -0.12px;
  }

  transition: 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
`;
