import { useEffect, useState } from "react";
import { StyledContainer } from "../../components/common/Container";
import Tweet from "../../components/tweet/Tweet";
import Loader from "../../components/loader/Loader";
import { useHttpRequestService } from "../../service/HttpRequestService";
import TweetBox from "../../components/tweet-box/TweetBox";
import { StyledH5 } from "../../components/common/text";
import { StyledFeedContainer } from "../home-page/components/contentContainer/FeedContainer";
import CommentFeed from "../../components/feed/CommentFeed";
import { Link, useLocation } from "react-router-dom";
import { Post } from "../../service";
import { StyledIconContainer } from "../../components/navbar/IconContainer";
import { BackArrowIcon, LogoIcon } from "../../components/icon/Icon";
import { StyledNavItemContainer } from "../../components/navbar/navItem/NavItemContainer";

const PostPage = () => {
    const [post, setPost] = useState<Post | undefined>(undefined);
    const postId = useLocation().pathname.split("/")[2];
    const service = useHttpRequestService()

    useEffect(() => {
        service
        .getPostById(postId)
        .then((res) => {
            setPost(res);
        })
        .catch((e) => {
            console.log(e);
        });
    }, [postId])

  
    return (
      <StyledContainer maxWidth={"600px"} borderRight={"1px solid #ebeef0"}>
        <StyledContainer
          padding={"8px"}
          borderBottom={"1px solid #ebeef0"}
          maxHeight={"53px"}
          flexDirection="row"
          alignItems="start"
        >
          <StyledContainer 
            width={"30px"} 
            height={"30px"} 
            paddingRight={"4px"} 
            borderRadius={"50%"} 
            alignItems={"center"} 
            justifyContent={"center"} 
            hoverable>
            <Link  to={'/'}>
              <BackArrowIcon />
            </Link>
          </StyledContainer>
          <StyledH5>Tweet</StyledH5>
        </StyledContainer>
        <StyledFeedContainer>
          {post ? (
            <>
              <Tweet post={post} />
              <StyledContainer
                borderBottom={"1px solid #ebeef0"}
                padding={"16px"}
              >
                <TweetBox parentId={postId} />
              </StyledContainer>

              <StyledContainer minHeight={"53.5vh"}>
                <CommentFeed postId={postId} />
              </StyledContainer>
            </>
          ) : (
            <StyledContainer justifyContent={"center"} alignItems={"center"}>
              <Loader />
            </StyledContainer>
          )}
        </StyledFeedContainer>
      </StyledContainer>
    );
  
}

export default PostPage;
