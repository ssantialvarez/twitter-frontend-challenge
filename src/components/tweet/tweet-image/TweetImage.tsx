import React, { useState } from "react";
import { StyledTweetImage } from "./StyledTweetImage";
import ImageModal from "./ImageModal";
import { RemoveIcon } from "../../icon/Icon";
import {
  StyledContainer,
  StyledOverflowContainer,
} from "../../common/Container";
import { StyledRemoveIconContainer } from "./RemoveIconContainer";

interface TweetImageProps {
  src: string;
  alt: string;
  index: number;
  qtyImages: number;
  removable?: boolean;
  removeFunction?: () => void;
}
const TweetImage = ({
  src,
  alt,
  removable,
  index,
  qtyImages = 1,
  removeFunction,
}: TweetImageProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const borderRadius = "12px"

  const borderRadiusMat = [
    [`${borderRadius} ${borderRadius} ${borderRadius} ${borderRadius}`],
    [`${borderRadius} 0% 0% ${borderRadius}`, `0% ${borderRadius} ${borderRadius} 0%`],
    [`${borderRadius} 0% 0% 0%`, `0% ${borderRadius} 0% 0%`, `0% 0% ${borderRadius} ${borderRadius}`],
    [`${borderRadius} 0% 0% 0%`, `0% ${borderRadius} 0% 0%`, `0% 0% 0% ${borderRadius}", "0% 0% ${borderRadius} 0%`]
  ];

  return (
    <>
      <StyledOverflowContainer maxWidth={"100%"} alignItems={"flex-end"}>
        {removable && (
          <StyledRemoveIconContainer>
            <RemoveIcon onClick={removeFunction} />
          </StyledRemoveIconContainer>
        )}
        <StyledTweetImage
          src={src}
          alt={alt}
          style={{ borderRadius: borderRadiusMat[qtyImages-1][index] || "0%" }}
          onClick={() => setShowModal(true)}
        />
      </StyledOverflowContainer>
      <ImageModal
        show={showModal}
        src={src}
        alt={alt}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default TweetImage;
