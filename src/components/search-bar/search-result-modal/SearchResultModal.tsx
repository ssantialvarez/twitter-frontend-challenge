import React, { useEffect, useRef, useState } from "react";
import { Author } from "../../../service";
import UserDataBox from "../../user-data-box/UserDataBox";
import { StyledContainer } from "../../common/Container";
import { StyledSearchResultModalContainer } from "./SearchResultModalContainer";

interface SearchResultModalProps {
  onClose: () => void;
  show: boolean;
  results: Author[];
}
export const SearchResultModal = ({
  show,
  onClose,
  results,
}: SearchResultModalProps) => {
  
  const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        };
        if (show) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [show]);



  return (
    <>
      {show && (
        <StyledContainer style={{ width: "100%" }} ref={modalRef}>
          <StyledSearchResultModalContainer>
            {(results.length === 0 && <div>No results</div>) ||
              results.map((author) => {
                return (
                  <UserDataBox
                    key={"search-result-" + author.id}
                    username={author.username}
                    name={author.name!}
                    id={author.id}
                    profilePicture={author.profilePicture!}
                  />
                );
              })}
          </StyledSearchResultModalContainer>
        </StyledContainer>
      )}
    </>
  );
};

export default SearchResultModal;
