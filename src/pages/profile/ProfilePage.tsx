import React, {useEffect, useState} from "react";
import ProfileInfo from "./ProfileInfo";
import {useNavigate, useParams} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../../components/button/StyledButton";
import {useHttpRequestService} from "../../service/HttpRequestService";
import Button from "../../components/button/Button";
import ProfileFeed from "../../components/feed/ProfileFeed";
import {StyledContainer} from "../../components/common/Container";
import {StyledH5} from "../../components/common/text";
import { useGetMe, useGetProfile } from "../../hooks/useUser";

const ProfilePage = () => {
  const [following, setFollowing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalValues, setModalValues] = useState({
    text: "",
    title: "",
    type: ButtonType.DEFAULT,
    buttonText: "",
  });
  const service = useHttpRequestService()
  const user = useGetMe()
  const id = useParams().id as string;
  const profile = useGetProfile(id)
  const navigate = useNavigate();

  const {t} = useTranslation();

  

  const handleButtonType = (): { component: ButtonType; text: string } => {
    if (profile?.id === user?.id)
      return {component: ButtonType.DELETE, text: t("buttons.delete")};
    if (following)
      return {component: ButtonType.OUTLINED, text: t("buttons.unfollow")};
    else return {component: ButtonType.FOLLOW, text: t("buttons.follow")};
  };

  const handleSubmit = () => {
    if (profile?.id === user?.id) {
      service.deleteProfile().then(() => {
        localStorage.removeItem("token");
        navigate("/sign-in");
      });
    } else {
      service.unfollowUser(profile!.id).then(async () => {
        setFollowing(false);
        setShowModal(false);
      });
    }
  };
  
  useEffect(() => {
    if(profile.id === user.id)
      setFollowing(true)
    else{
      setFollowing(
        profile
            ? profile?.followers.some((follower: string) => follower === user?.id)
            : false
    );
    }
  }, [id]);
  
  if (!id) return null;

  const handleButtonAction = async () => {
    if (profile?.id === user?.id) {
      setShowModal(true);
      setModalValues({
        title: t("modal-title.delete-account"),
        text: t("modal-content.delete-account"),
        type: ButtonType.DELETE,
        buttonText: t("buttons.delete"),
      });
    } else {
      if (following) {
        setShowModal(true);
        setModalValues({
          text: t("modal-content.unfollow"),
          title: `${t("modal-title.unfollow")} @${profile?.username}?`,
          type: ButtonType.FOLLOW,
          buttonText: t("buttons.unfollow"),
        });
      } else {
        await service.followUser(id);
        setFollowing(true);
        
      }
    }
  };
  
  return (
      <>
        <StyledContainer
            maxHeight={"100vh"}
            borderRight={"1px solid #ebeef0"}
            maxWidth={'600px'}
        >
          {profile && (
              <>
                <StyledContainer
                    borderBottom={"1px solid #ebeef0"}
                    maxHeight={"212px"}
                    padding={"16px"}
                >
                  <StyledContainer
                      alignItems={"center"}
                      padding={"24px 0 0 0"}
                      flexDirection={"row"}
                  >
                    <ProfileInfo
                        name={profile!.name!}
                        username={profile!.username}
                        profilePicture={profile!.profilePicture}
                    />
                    <Button
                        buttonType={handleButtonType().component}
                        size={"100px"}
                        onClick={handleButtonAction}
                        text={handleButtonType().text}
                    />
                  </StyledContainer>
                </StyledContainer>
                <StyledContainer width={"100%"}>
                  {(following || profile.public) ? (
                      <ProfileFeed/>
                  ) : (
                      <StyledH5>{t("title.private")}</StyledH5>
                  )}
                </StyledContainer>
                <Modal
                    show={showModal}
                    text={modalValues.text}
                    title={modalValues.title}
                    acceptButton={
                      <Button
                          buttonType={modalValues.type}
                          text={modalValues.buttonText}
                          size={"MEDIUM"}
                          onClick={handleSubmit}
                      />
                    }
                    onClose={() => {
                      setShowModal(false);
                    }}
                />
              </>
          )}
        </StyledContainer>
      </>
  );
};

export default ProfilePage;
