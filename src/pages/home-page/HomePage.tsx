import React, { useEffect, useState } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { StyledUserSuggestionContainer } from "./UserSuggestionContainer";
import ChatPortal from "../../components/chat/ChatPortal";
import Button from "../../components/button/Button";
import { ButtonType } from "../../components/button/StyledButton";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ContentContainer />
      <StyledUserSuggestionContainer>
        <SearchBar />
        <SuggestionBox />
      </StyledUserSuggestionContainer>

      
      <ChatPortal isOpen={isOpen} onClose={() => setIsOpen(false)}  />    
    </>
  );
};

export default HomePage;
//
        

//