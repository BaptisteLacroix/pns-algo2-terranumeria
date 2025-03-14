import { Textarea, Button, ScrollShadow } from "@heroui/react";
import { useEffect, useState, useRef } from "react";

// Define the Message type
type Message = {
  text: string;
  isUser: boolean;
};

export const DialogBox = () => {
  // Initialize `message` as an empty message object
  const [message, setMessage] = useState<Message>({ text: "", isUser: true });
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onEnterPress = (e: {
    keyCode: number;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  const submitMessage = () => {
    // Only proceed if `message.text` has content
    if (message.text.trim() === "") return;

    // Simulate API Call on Enter key press
    const userMessage = message;

    // Update the messages state with the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage.text, isUser: true }, // User's message
    ]);

    // Simulate API response (using a fixed response for demonstration)
    const apiResponse = "This is a simulated response from the API!";

    // Update the messages state with the simulated API response
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: apiResponse, isUser: false }, // API's message
    ]);

    // Clear the message input after sending
    setMessage({ text: "", isUser: true });
  };

  useEffect(() => {
    // Scroll to the bottom of the message list when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-2/3 justify-end content-around pt-4 pb-4 gap-2">
      <ScrollShadow className="w-full h-full flex flex-col items-center pl-10 pr-10">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xl p-3 rounded-lg break-words ${msg.isUser ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollShadow>
      <div className="w-full h-2/10 flex justify-center">
        <div className="bottom-4 left-1/2 w-2/3">
          <div className={"flex flex-row items-center gap-2"}>
            <Textarea
              className="w-full h-20"
              label="Description"
              placeholder="Enter your message"
              radius="none"
              value={message.text}
              variant="flat"
              onChange={(e) =>
                setMessage({ text: e.target.value, isUser: true })
              }
              onKeyDown={onEnterPress}
            />
            <Button
              className="size-20 hover:bg-yellow"
              color="primary"
              radius="none"
              onPress={submitMessage}
            >
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
