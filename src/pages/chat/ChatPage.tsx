import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetFollowers } from "../../hooks/useUser";
import {
  StyledContainer,
  StyledScrollableContainer,
} from "../../components/common/Container";
import ChatUserBox from "../../components/chat/ChatUserBox";
import { StyledH5, StyledP } from "../../components/common/text";
import { ChatBarContainer, StyledChatBarInput } from "../../components/chat/ChatInput";
import { useParams } from "react-router-dom";
import icon from "../../assets/icon.jpg";
import Avatar from "../../components/common/avatar/Avatar";
import { socket } from "../../util/SocketInterfaces";
import { ChatBubble } from "../../components/chat/chat-bubble/ChatBubble";
import { Author } from "../../service";
import { useHttpRequestService } from "../../service/HttpRequestService";
import ChatModal from "../../components/chat/chat-modal/ChatModal";
import Button from "../../components/button/Button";
import { ButtonType } from "../../components/button/StyledButton";
import { MessagesSquare } from "lucide-react";

const ChatPage = () => {
  const [showChatModal, setChatModal] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<{ message: string; idSender: string; serverOffset: number }[]>([]);
  const [messageInput, setMessageInput] = useState<string>(""); 
  const [receiver, setReceiver] = useState<Author | undefined> (undefined);
  const httpService = useHttpRequestService();
  const [activeChats, setActiveChats] = useState<Author[]>([]) 
  const { t } = useTranslation();
  const id = useParams().id as string;
  let idReceiver: string | undefined;
  let idSender: string | undefined;
  if (id) {
    const ids = id.split("_");
    idReceiver = ids[1];
    idSender = ids[0];
  }

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
    const fetchReceiver = async (idReceiver: string | undefined) => {
      
        if(idReceiver)
          setReceiver(await httpService.getProfile(idReceiver));
        else 
          setReceiver(undefined)
    };
    if(idReceiver){
      socket.emit("joinRoom", idReceiver, idSender);
      socket.emit("bringRoom", idReceiver, idSender);
    }
    

    fetchReceiver(idReceiver ?? '');
  }, [idReceiver]); 




  useEffect(() => {
    if (receiver) {
      
      
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
  });

  
  const handleSendMessage = () => {
    if (messageInput.trim() && idReceiver && idSender) {
      socket.emit("chatMessage", messageInput, idReceiver, idSender);
      setMessageInput(""); 
    }
  };

  return (
    <>
      <StyledContainer maxWidth={"600px"} borderRight={"1px solid var(--grayscale-container-line, #f0f3f4)"}>
        <StyledContainer padding={"16px"} maxHeight={"53px"}>
          <StyledH5>{t("header.messages")}</StyledH5>
        </StyledContainer>

        <StyledScrollableContainer padding={"8px"} gap={"16px"}>
          {activeChats.map((user: any, index: any) => (
            <ChatUserBox
              key={index}
              name={user.name}
              username={user.username}
              profilePicture={user.profilePicture}
              id={user.id}
            />
          ))}
        </StyledScrollableContainer>
      </StyledContainer>

      <StyledContainer position="relative" borderRight={"1px solid var(--grayscale-container-line, #f0f3f4)"}>
        {receiver && (
          <StyledContainer padding={"8px"} maxHeight={"70px"} flex={"true"} flexDirection="row" alignItems="center">
            <Avatar
              width={"48px"}
              height={"48px"}
              src={receiver.profilePicture ?? icon}
              onClick={() => {}}
              alt={receiver.name ?? "Name"}
            />
            <StyledH5>{receiver.name}</StyledH5>
          </StyledContainer>
        )}

        {!receiver && (
          <>
          <StyledContainer alignContent="center"     justifyContent="center" alignItems="center" height={"100vh"}  padding={"8px"} gap={"16px"}>
              <StyledH5>{t("placeholder.new-chat")}</StyledH5>
              <Button buttonType={ButtonType.DEFAULT} type="button" text={t("placeholder.send")} size={"200px"} onClick={() => setChatModal(true)}/>
          </StyledContainer>
          <ChatModal
            show={showChatModal}
            onClose={() => {
              setChatModal(false);
            }}
          />
          </>
        )}

        <StyledScrollableContainer maxHeight={"100vh"} padding={"8px"} gap={"8px"}>
          {receiver && chatHistory.map((chat, index) => (
            <ChatBubble key={index} message={chat.message} isSender={receiver?.id !== chat.idSender}  />
          ))}
        </StyledScrollableContainer>

        <ChatBarContainer>
          <StyledChatBarInput
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={t("chat.placeholder")}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
        </ChatBarContainer>
      </StyledContainer>
    </>
  );
};

export default ChatPage;
