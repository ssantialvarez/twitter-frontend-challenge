import React from "react";
import Feed from "./Feed";
import { useGetProfilePosts } from "../../hooks/useUser";

const ProfileFeed = () => {
  const { posts, loading } = useGetProfilePosts();

  return (
    <>
      <Feed posts={posts} loading={loading} fetchNextPage={() => {}} />
    </>
  );
};
export default ProfileFeed;
