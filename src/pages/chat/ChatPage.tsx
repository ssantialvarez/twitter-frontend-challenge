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
import { ChatBubble } from "../../components/chat/ChatBubble";
import { Author } from "../../service";
import { maxHeaderSize } from "http";

const ChatPage = () => {
  const [chatHistory, setChatHistory] = useState<{ message: string; idSender: string; serverOffset: number }[]>([]);
  const [messageInput, setMessageInput] = useState<string>(""); // Nuevo estado para el input

  const followers: Author[] = useGetFollowers();

  const id = useParams().id as string;
  let idReceiver: string | undefined;
  let idSender: string | undefined;

  if (id) {
    const ids = id.split("_");
    idReceiver = ids[1];
    idSender = ids[0];
  }

  const receiver: Author | undefined = followers.find((user) => user.id === idReceiver);

  const { t } = useTranslation();

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (receiver) {
      socket.emit("joinRoom", idReceiver, idSender);
      socket.emit("bringRoom", idReceiver, idSender);

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

  // ✅ Enviar mensaje
  const handleSendMessage = () => {
    if (messageInput.trim() && idReceiver && idSender) {
      socket.emit("chatMessage", messageInput, idReceiver, idSender);
      setMessageInput(""); // Limpiar el input
    }
  };

  return (
    <>
      <StyledContainer maxWidth={"600px"} borderRight={"1px solid var(--grayscale-container-line, #f0f3f4)"}>
        <StyledContainer padding={"16px"} maxHeight={"53px"}>
          <StyledH5>{t("header.messages")}</StyledH5>
        </StyledContainer>

        <StyledScrollableContainer padding={"8px"} gap={"16px"}>
          {followers.map((user: any, index: any) => (
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
          <StyledContainer padding={"8px"} gap={"16px"}>
            <StyledH5>Select a message</StyledH5>
            <StyledP primary>
              Choose from your existing conversations, start a new one, or just keep swimming.
            </StyledP>
          </StyledContainer>
        )}

        <StyledScrollableContainer padding={"8px"} gap={"8px"}>
          {chatHistory.map((chat, index) => (
            <ChatBubble key={index} message={chat.message} isSender={receiver?.id !== chat.idSender} />
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
