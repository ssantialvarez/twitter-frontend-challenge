import {useHttpRequestService} from "../../service/HttpRequestService";
import UserDataBox from "../user-data-box/UserDataBox";
import {useTranslation} from "react-i18next";
import { useGetMe } from "../../hooks/useUser";
import { StyledBoxContainer } from "./ChatBoxContainer";
import { useNavigate } from "react-router-dom";

interface ChatUserBoxProps {
  profilePicture?: string;
  name?: string;
  username?: string;
  id: string;
}

const ChatUserBox = ({
                         profilePicture,
                         name,
                         username,
                         id,
                       }: ChatUserBoxProps) => {
  const {t} = useTranslation();
  const service = useHttpRequestService()
  const user = useGetMe()
  const navigate = useNavigate();
  

  return (
      <StyledBoxContainer onClick={() => navigate(`/chat/${user.id}_${id}`)}>
        <UserDataBox
            id={id}
            name={name!}
            profilePicture={profilePicture!}
            username={username!}
        />
      </StyledBoxContainer>
  );
};

export default ChatUserBox;
