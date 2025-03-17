import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../util/SocketInterfaces";
import ReactDOM from "react-dom";
import { Author } from "../../service";
import { useHttpRequestService } from "../../service/HttpRequestService";
import styled from "styled-components";
import { t } from "i18next";
import { S3Url } from "../../service/S3Service";
import icon from "../../assets/icon.jpg";
import { StyledScrollableContainer } from "../common/Container";
import { ChatBubble } from "./chat-bubble/ChatBubble";
import { useGetMe } from "../../hooks/useUser";
import { BackArrowIcon } from "../icon/Icon";
import { ChatBarContainer, StyledChatBarInput } from "./ChatInput";

interface ChatPortalProps {
    isOpen: boolean;
    onClose: () => void;
  }


  const MenuToggle = styled.div`
  position: fixed;
  bottom: 0px;
  right: 10px;
  width: 320px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0px 0px;
  border: 1px solid;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;


  const MenuContainer = styled.div`
  position: fixed;
  bottom: 0px;
  right: 10px;
  width: 320px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
`;

const MenuContent = styled.div`
  max-height: 384px;
  padding: 16px;
  text-align: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const UserItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-weight: 500;
`;


const ChatPortal = ({ isOpen, onClose }: ChatPortalProps) => {
    const portalRef = useRef<HTMLDivElement>(null);
    const httpService = useHttpRequestService();
    const [chatHistory, setChatHistory] = useState<{ message: string; idSender: string; serverOffset: number }[]>([]);
    const [open, setOpen] = useState<boolean>(isOpen)
    const [messageInput, setMessageInput] = useState<string>(""); 
    const user = useGetMe()
    const [activeChats, setActiveChats] = useState<Author[]>([]) 
    const [receiver, setReceiver] = useState<Author | undefined>(undefined)
    useEffect(() => {
        const fetchActiveChats = async () => {
          try {
            const chats = await httpService.getActiveChats();
            setActiveChats(chats);
          } catch (error) {
            console.error("Error fetching active chats:", error);
          }
        };
    
        fetchActiveChats();
      }, []); 
      
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
            if (portalRef.current && !portalRef.current.contains(event.target as Node)) {
              setOpen(false)  
              onClose()
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [open]);
    


      useEffect(() => {
        if (receiver) { 
          socket.emit("joinRoom", receiver.id, user.id);
          socket.emit("bringRoom", receiver.id, user.id);
          socket.on("chatHistory", (messages) => {
            
            setChatHistory(
              messages.map((msg) => ({
                message: msg.content,
                idSender: msg.senderId,
                serverOffset: Number(msg.createdAt),
              }))
            );
          });
    
          socket.on("chatMessage", (message, idSender, serverOffset) => {
            setChatHistory((prev) => [...prev, { message, idSender, serverOffset }]);
          });
    
          return () => {
            
            socket.off("chatHistory");
            socket.off("chatMessage");
          };
        }
      }, [receiver]);

      const handleSendMessage = () => {
          if (messageInput.trim() && receiver?.id && user.id) {
            socket.emit("chatMessage", messageInput, receiver?.id, user.id);
            setMessageInput(""); 
          }
        };

  return ReactDOM.createPortal(
    <>
    
    {open && <MenuContainer ref={portalRef}>
      <MenuContent >
        <Title> <BackArrowIcon onClick={() => {setReceiver(undefined); setChatHistory([])}}/> {receiver ? `${receiver.username}` :t("header.messages")}</Title>
        {receiver && <>
        <StyledScrollableContainer maxHeight={"250px"} padding={"2px"} gap={"8px"}>
          {receiver && chatHistory.map((chat, index) => (
            <ChatBubble key={index} message={chat.message} isSender={receiver?.id !== chat.idSender}  />
          ))}
        </StyledScrollableContainer>
        <ChatBarContainer style={{position: "sticky"}}>
          <StyledChatBarInput
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={t("chat.placeholder")}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
         </ChatBarContainer>        
                
         </>                
        }
        {!receiver && 
        <UserList>
          {activeChats.map((user, index) => (
            <UserItem key={index}>
              <Avatar src={user.profilePicture ? S3Url + user.profilePicture : icon} alt={user.name} />
              <UserInfo>
                <UserName onClick={() => setReceiver(user)}>{user.name}</UserName>
                
              </UserInfo>
            </UserItem>
          ))}
        </UserList>
        }
      </MenuContent>
    </MenuContainer>}

    {!open && <MenuToggle   onClick={ () => setOpen(!open)}>
    <Title>{t("header.messages")}</Title>
    </MenuToggle>}

    </>
    ,
    document.body
  );
};


export default ChatPortal;

//<UserMessage>{user.message}</UserMessage>