import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import {useHttpRequestService} from "../../service/HttpRequestService";
import UserDataBox from "../user-data-box/UserDataBox";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../button/StyledButton";
import {Author, User} from "../../service";
import { useGetMe } from "../../hooks/useUser";
import { StyledBoxContainer } from "./BoxContainer";
import { useToast } from "../toast/ToastContext";
import { ToastType } from "../toast/Toast";

interface FollowUserBoxProps {
  profilePicture?: string;
  name?: string;
  username?: string;
  id: string;
}

const FollowUserBox = ({
                         profilePicture,
                         name,
                         username,
                         id,
                       }: FollowUserBoxProps) => {
  const {t} = useTranslation();
  const service = useHttpRequestService()
  const user = useGetMe()
  const { showToast } = useToast();
  
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    if (user?.following) {
      setIsFollowing(user.following.some((f: Author) => f.id === id));
    }
  }, [user.following, id]);
  
  const handleFollow = async () => {
    if (isFollowing) {
      showToast(`${t("toast.unfollow")} @${username}`, ToastType.ALERT);
      await service.unfollowUser(id);
    } else {
      showToast(`${t("toast.follow")} @${username}`, ToastType.SUCCESS);
      await service.followUser(id);
    }
    setIsFollowing(!isFollowing);
  };

  return (
      <StyledBoxContainer>
        <UserDataBox
            id={id}
            name={name!}
            profilePicture={profilePicture!}
            username={username!}
        />
        <Button
            text={isFollowing ? t("buttons.unfollow") : t("buttons.follow")}
            buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
            size={"SMALL"}
            onClick={handleFollow}
        />
      </StyledBoxContainer>
  );
};

export default FollowUserBox;
