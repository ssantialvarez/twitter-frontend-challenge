import styled from "styled-components";

export const StyledBoxContainer = styled.div`
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch; 
  border-radius: 8px;
  max-height: 60px;
  gap: 8px;

  &.active-div {
    border: 1px solid ${(props) => props.theme.colors.main};
  }

  &.error {
    border: 1px solid ${(props) => props.theme.colors.error};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.hover}; 
    cursor: pointer;
  }
`;
