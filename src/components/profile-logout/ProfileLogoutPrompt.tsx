import LogoutPrompt from "../navbar/logout-prompt/LogoutPrompt";
import {
    StyledLogoutPrompt,
    StyledProfileLogoutPromptContainer
} from "./StyledProfileLogoutPromptContainer";
import React, {useEffect, useState} from "react";
import icon from "../../assets/icon.jpg";
import {StyledP} from "../common/text";
import {StyledContainer} from "../common/Container";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {User} from "../../service";
import { useGetMe } from "../../hooks/useUser";


interface ProfileLogoutPromptProps {
    margin: string
    direction: string
}

const ProfileLogoutPrompt = ({margin, direction}: ProfileLogoutPromptProps) => {
    const [logoutOpen, setLogoutOpen] = useState(false);
    const service = useHttpRequestService()
    const user = useGetMe()

    /*
    useEffect(() => {
        handleGetUser().then(r => setUser(r))
    }, []);

    const handleGetUser = async () => {
        return await service.me()
    }
    */

    const handleLogout = () => {
        setLogoutOpen(!logoutOpen);
    };

    const handleButtonClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    /*if(user.profilePicture)
        user.profilePicture = 'https://twitter-backend-demo-a617f6da-58a7-4888-b927-88eaae142243.s3.us-east-2.amazonaws.com/' + user.profilePicture;
    */
    console.log(user?.profilePicture)

    return (
        <StyledContainer
            maxHeight={"48px"}
            flexDirection={"row"}
            className={'profile-info'}
            alignItems={'center'}
            gap={'8px'}
            onClick={handleLogout}
            cursor={'pointer'}
        >
            <StyledProfileLogoutPromptContainer direction={direction}>
                <img src={user?.profilePicture ? 'https://twitter-backend-demo-a617f6da-58a7-4888-b927-88eaae142243.s3.us-east-2.amazonaws.com/' + user.profilePicture : icon} className="icon" alt="Icon"/>
                {logoutOpen &&
                    <StyledLogoutPrompt margin={margin} onClick={(event) => handleButtonClick(event)}>
                        <LogoutPrompt show={logoutOpen}/>
                    </StyledLogoutPrompt>
                }
            </StyledProfileLogoutPromptContainer>
            <StyledContainer padding={"4px 0"} gap={"4px"} className={'user-info'}>
                <StyledP primary>{user?.name}</StyledP>
                <StyledP primary={false}>{`@${user?.username}`}</StyledP>
            </StyledContainer>
        </StyledContainer>
    )
}

export default ProfileLogoutPrompt