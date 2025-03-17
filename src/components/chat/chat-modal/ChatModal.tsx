import { useEffect, useRef, useState } from "react";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import { useTranslation } from "react-i18next";
import { Author } from "../../../service";
import { StyledScrollableContainer } from "../../common/Container";
import ChatUserBox from "../ChatUserBox";
import { createPortal } from "react-dom";
import { StyledBlurredBackground } from "../../common/BlurredBackground";
import { StyledModalContainer } from "../../modal/ModalContainer";
import { StyledH5 } from "../../common/text";


interface ChatModalProps {
  show: boolean;
  onClose: () => void;
  
}

export const ChatModal = ({
  show,
  
  onClose,
}: ChatModalProps) => {
  const [possibleChats, setPossibleChats] = useState<Author[]>([]) 
  const service = useHttpRequestService();
  const { t } = useTranslation();

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
  
  
  

  useEffect(() => {
      const fetchPossibleChats = async () => {
        try {
          const chats = await service.getPossibleChats();
          setPossibleChats(chats);
        } catch (error) {
          console.error("Error fetching active chats:", error);
        }
      };
  
      fetchPossibleChats();
    }, []); 
  



  return (
      <>
      {show && createPortal(
        <StyledBlurredBackground >
          <StyledModalContainer ref={modalRef} > 
            <StyledH5 style={{textAlign: "center"}}>{t("placeholder.send")}</StyledH5>
          <StyledScrollableContainer maxHeight={"180px"}  padding={"8px"} gap={"4px"}>
              {possibleChats.map((user: any, index: any) => (
                <ChatUserBox
                  key={index}
                  name={user.name}
                  username={user.username}
                  profilePicture={user.profilePicture}
                  id={user.id}
                />
              ))}
            </StyledScrollableContainer>
            </StyledModalContainer>
        </StyledBlurredBackground>,
        document.body
      )}
      </>
  );
};

export default ChatModal;



