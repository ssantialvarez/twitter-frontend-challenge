import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Author } from "../../service";
import { useHttpRequestService } from "../../service/HttpRequestService";
import styled from "styled-components";

interface ChatPortalProps {
    isOpen: boolean;
    onClose: () => void;
  }


  const MenuContainer = styled.div`
  position: fixed;
  top: 64px;
  right: 20px;
  width: 320px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const MenuContent = styled.div`
  max-height: 384px;
  overflow-y: auto;
  padding: 16px;
`;

const Title = styled.h3`
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

const UserMessage = styled.p`
  font-size: 14px;
  color: gray;
`;


const ChatPortal = ({ isOpen, onClose }: ChatPortalProps) => {
    const portalRef = useRef<HTMLDivElement>(null);
    const httpService = useHttpRequestService();
    const [activeChats, setActiveChats] = useState<Author[]>([]) 
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
                onClose()
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [isOpen]);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <MenuContainer>
      <MenuContent ref={portalRef}>
        <Title>Mensajes</Title>
        <UserList>
          {activeChats.map((user, index) => (
            <UserItem key={index}>
              <Avatar src={user.profilePicture} alt={user.name} />
              <UserInfo>
                <UserName>{user.name}</UserName>
                
              </UserInfo>
            </UserItem>
          ))}
        </UserList>
      </MenuContent>
    </MenuContainer>,
    document.body
  );
};


export default ChatPortal;

//<UserMessage>{user.message}</UserMessage>