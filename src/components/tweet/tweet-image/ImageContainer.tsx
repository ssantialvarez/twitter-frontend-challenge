import React from "react";
import TweetImage from "./TweetImage";
import {
  StyledContainer,
  StyledOverflowContainer,
} from "../../common/Container";
import { S3Url } from "../../../service/S3Service";

interface ImageContainerProps {
  images: string[];
  editable?: boolean;
  removeFunction?: (index: number) => void;
}
const ImageContainer = ({
  images,
  editable,
  removeFunction,
}: ImageContainerProps) => {

  const qtyImages = images.length
  return (
    <StyledContainer maxWidth={"100%"} alignItems={"flex-start"} gap={"4px"} marginLeft={"56px"}>
      <StyledOverflowContainer
        flexDirection={"row"}
        gap={"4px"}
        maxHeight={"460px"}
        maxWidth={"460px"}
      >
        {images.slice(0, 2).map((image, index) => (
          <TweetImage
            key={image}
            src={image.startsWith("blob") ? image : S3Url + image}
            alt={image}
            index={index}
            qtyImages={qtyImages}
            removable={editable}
            removeFunction={() =>
              removeFunction ? removeFunction(index) : console.log("")
            }
            

          />
        ))}
      </StyledOverflowContainer>
      {images && images!.length > 2 && (
        <StyledOverflowContainer
          flexDirection={"row"}
          gap={"4px"}
          maxHeight={"460px"}
          maxWidth={"460px"}
        >
          {images.slice(2, images.length).map((image, index) => (
            <TweetImage
              key={image}
              src={image.startsWith("blob") ? image : S3Url + image}
              alt={image}
              index={index + 2}
              qtyImages={qtyImages}
              removable={editable}
              removeFunction={() =>
                removeFunction ? removeFunction(index + 2) : console.log("")
              }
            />
          ))}
        </StyledOverflowContainer>
      )}
    </StyledContainer>
  );
};

export default ImageContainer;
