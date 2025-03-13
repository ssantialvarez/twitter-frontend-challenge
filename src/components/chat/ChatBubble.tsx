import styled from "styled-components";

interface ChatBubbleProps {
  isSender: boolean; 
  message: string;
  timestamp?: string; 
}

const BubbleContainer = styled.div<{ isSender: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
  margin: 8px 0;
`;

const Bubble = styled.div<{ isSender: boolean }>`
  max-width: 70%; 
  background: ${(props) =>
    props.isSender
      ? "var(--twitter-blue, #1DA1F2)" 
      : "var(--grayscale-background, #E1E8ED)"}; 
  color: ${(props) => (props.isSender ? "#fff" : "#14171A")}; 
  padding: 12px 16px;
  border-radius: 18px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  position: relative; 
`;

const Timestamp = styled.span`
  position: absolute;
  bottom: -16px;
  right: 8px;
  font-size: 12px;
  color: #8899a6;
`;

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  isSender,
  message,
  timestamp,
}) => {
  return (
    <BubbleContainer isSender={isSender}>
      <Bubble isSender={isSender}>
        {message}
        {timestamp && <Timestamp>{timestamp}</Timestamp>}
      </Bubble>
    </BubbleContainer>
  );
};
