import React, { useEffect, useState } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { updateFeed } from "../../redux/user";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSuggestionContainer";
import { ChartPieIcon } from "lucide-react";
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
      
    </>
  );
};

export default HomePage;
//<Button  buttonType={ButtonType.DEFAULT} size={"50px"} text="Toggle Mensajes"  onClick={() => setIsOpen(!isOpen)} />
        

//<ChatPortal isOpen={isOpen} onClose={() => setIsOpen(false)}  />