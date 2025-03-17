import { useEffect, useState } from "react";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import { useTranslation } from "react-i18next";
import { StyledChatModalContainer } from "./ChatModalContainer";
import Modal from "../../modal/Modal";
import Button from "../../button/Button";
import { ButtonType } from "../../button/StyledButton";
import { DeleteIcon } from "lucide-react";
import { Author } from "../../../service";
import { StyledScrollableContainer } from "../../common/Container";
import ChatUserBox from "../ChatUserBox";
import { createPortal } from "react-dom";
import { StyledBlurredBackground } from "../../common/BlurredBackground";
import { StyledModalContainer } from "../../modal/ModalContainer";


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

  const handleDelete = () => {
    alert('hola')
  };
  
 
  const handleClose = () => {
    
    onClose();
  };

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
        <StyledBlurredBackground>
          <StyledModalContainer>
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



