import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import {useHttpRequestService} from "../../service/HttpRequestService";
import UserDataBox from "../user-data-box/UserDataBox";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../button/StyledButton";
import {Author, User} from "../../service";
import { useGetMe } from "../../hooks/useGetMe";
import { StyledBoxContainer } from "./BoxContainer";

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

  /*
  useEffect(() => {
    handleGetUser().then(r => {
      setUser(r)
      setIsFollowing(r?.following.some((f: Author) => f.id === id))
    })
  }, []);
  
  const handleGetUser = async () => {
    return await service.me()
  }
  */
  const [isFollowing, setIsFollowing] = useState(false);
  setIsFollowing(user.following.some((f: Author) => f.id === id))
  const handleFollow = async () => {
    if (isFollowing) {
      await service.unfollowUser(id);
    } else {
      await service.followUser(id);
    }
    setIsFollowing(!isFollowing);
  };

  return (
      //className=box-container
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
