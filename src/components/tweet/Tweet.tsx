import React, {useEffect, useState} from "react";
import {StyledTweetContainer} from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import type {Post, User} from "../../service";
import {StyledReactionsContainer} from "./ReactionsContainer";
import Reaction from "./reaction/Reaction";
import {useHttpRequestService} from "../../service/HttpRequestService";
import {IconType} from "../icon/Icon";
import {StyledContainer} from "../common/Container";
import ThreeDots from "../common/ThreeDots";
import DeletePostModal from "./delete-post-modal/DeletePostModal";
import ImageContainer from "./tweet-image/ImageContainer";
import CommentModal from "../comment/comment-modal/CommentModal";
import {useNavigate} from "react-router-dom";
import { useGetMe } from "../../hooks/useUser";

interface TweetProps {
  post: Post;
  hoverable?: boolean;
}

const Tweet = ({post, hoverable=false}: TweetProps) => {
  const [actualPost, setActualPost] = useState<Post>(post);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const service = useHttpRequestService();
  const navigate = useNavigate();
  const user = useGetMe()
  
  const getCountByType = (type: string): number => {
    
    return actualPost?.reactions?.filter((r) => r.reaction === type).length ?? 0;
  };

  const handleReaction = async (type: string) => {
    const reacted = actualPost.reactions.find(
        (r) => r.reaction === type && r.userId === user?.id
    );
    if (reacted) {
      await service.deleteReaction(reacted.id);
    } else {
      await service.createReaction(actualPost.id, type);
    }
    const newPost = await service.getPostById(post.id);
    setActualPost(newPost);
  };

  const hasReactedByType = (type: string): boolean => {
    return actualPost.reactions.some(
        (r) => r.reaction === type && r.userId === user?.id
    );
  };

  return (
      <StyledTweetContainer hoverable={hoverable} >
        <StyledContainer
            style={{width: "100%"}}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            maxHeight={"48px"}
            onClick={() => navigate(`/profile/${post.author.id}`)}
        >
          <AuthorData
              id={post.author.id}
              name={post.author.name ?? "Name"}
              username={post.author.username}
              createdAt={post.createdAt}
              profilePicture={post.author.profilePicture}
          />
          {post.authorId === user?.id && (
              <>
                <DeletePostModal
                    show={showDeleteModal}
                    id={post.id}
                    onClose={() => {
                      setShowDeleteModal(false);
                    }}
                />
                <ThreeDots
                    onClick={() => {
                      setShowDeleteModal(!showDeleteModal);
                    }}
                />
              </>
          )}
        </StyledContainer>
        <StyledContainer onClick={() => navigate(`/post/${post.id}`)}>
          <p>{post.content}</p>
          {post.images && post.images!.length > 0 && (
            <StyledContainer paddingTop={"4px"} marginLeft={"56px"}>

              <ImageContainer images={post.images} />

            </StyledContainer>
          )}
        </StyledContainer>
        
        <StyledReactionsContainer>
          <Reaction
              img={IconType.CHAT}
              count={actualPost?.comments?.length}
              reactionFunction={() =>
                  window.innerWidth > 600
                      ? setShowCommentModal(true)
                      : navigate(`/compose/comment/${post.id}`)
              }
              increment={0}
              reacted={false}
          />
          <Reaction
              img={IconType.RETWEET}
              count={getCountByType("RETWEET")}
              reactionFunction={() => handleReaction("RETWEET")}
              increment={1}
              reacted={hasReactedByType("RETWEET")}
          />
          <Reaction
              img={IconType.LIKE}
              count={getCountByType("LIKE")}
              reactionFunction={() => handleReaction("LIKE")}
              increment={1}
              reacted={hasReactedByType("LIKE")}
          />
        </StyledReactionsContainer>
        <CommentModal
            show={showCommentModal}
            post={post}
            onClose={() => setShowCommentModal(false)}
        />
      </StyledTweetContainer>
  );
};

export default Tweet;
