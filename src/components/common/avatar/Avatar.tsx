import React from "react";
import { StyledAvatarContainer } from "./AvatarContainer";
import NameImage from "./NameImage";
import { S3Url } from "../../../service/S3Service";

interface AvatarProps {
  src: string;
  alt: string;
  onClick?: () => void;
  width?: string;
  height?: string;
}

const Avatar = ({ src, alt, onClick, width, height }: AvatarProps) => {
  if(!src.startsWith('/static/')){
    src = S3Url + src
  }
  return (
    <StyledAvatarContainer onClick={onClick} width={width} height={height}>
      {src !== null ? <img src={src} alt={alt} /> : <NameImage name={alt} />}
    </StyledAvatarContainer>
  );
};
export default Avatar;
