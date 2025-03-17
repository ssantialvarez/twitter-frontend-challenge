import { Bubble, BubbleContainer } from "./ChatBubbleContainer";

interface ChatBubbleProps {
  isSender: boolean; 
  message: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  isSender,
  message,
}) => {
  return (
    <BubbleContainer isSender={isSender}>
      <Bubble isSender={isSender}>
        {message}
      </Bubble>
    </BubbleContainer>
  );
};
