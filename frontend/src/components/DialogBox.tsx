import { Textarea, Button, ScrollShadow } from "@heroui/react";
import { useState } from "react";

// Define the Message type
type Message = {
  text: string;
  isUser: boolean;
};

export const DialogBox = () => {
  // Initialize `message` as an empty message object
  const [message, setMessage] = useState<Message>({ text: "", isUser: true });
  const [messages, setMessages] = useState<Message[]>([]);

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

  return (
    <div className="flex flex-col w-full justify-end">
      {/* Display Messages */}
      <div className="w-full h-8/10 flex justify-center">
        <ScrollShadow className="w-2/3 h-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${msg.isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
        </ScrollShadow>
      </div>
      <div className="w-full h-2/10 flex justify-center">
        <div className="bottom-4 left-1/2 w-2/3">
          <div className={"flex flex-row items-center gap-2"}>
            <Textarea
              className="w-full h-20"
              radius="none" 
              label="Description"
              placeholder="Enter your message"
              value={message.text}
              variant="flat"
              onChange={(e) =>
                setMessage({ text: e.target.value, isUser: true })
              }
              onKeyDown={onEnterPress}
            />
            <Button className="size-20 hover:bg-yellow" radius="none" onPress={submitMessage} color="primary">
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
