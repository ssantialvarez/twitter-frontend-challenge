import React from "react";
import { StyledAvatarContainer } from "./AvatarContainer";
import NameImage from "./NameImage";

interface AvatarProps {
  src: string;
  alt: string;
  onClick?: () => void;
  width?: string;
  height?: string;
}

const Avatar = ({ src, alt, onClick, width, height }: AvatarProps) => {
  if(!src.startsWith('/static/')){
    src = 'https://twitter-backend-demo-a617f6da-58a7-4888-b927-88eaae142243.s3.us-east-2.amazonaws.com/' + src
  }
  return (
    <StyledAvatarContainer onClick={onClick} width={width} height={height}>
      {src !== null ? <img src={src} alt={alt} /> : <NameImage name={alt} />}
    </StyledAvatarContainer>
  );
};
export default Avatar;
