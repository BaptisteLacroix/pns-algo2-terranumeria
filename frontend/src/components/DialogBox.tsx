import { Textarea, Button, ScrollShadow, Spinner } from "@heroui/react";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useLocation } from "react-router-dom";

type Message = {
    text: string;
    isUser: boolean;
};

// Créer une fonction pour réinitialiser la conversation qui peut être exportée
export const resetConversation = async () => {
    try {
        await fetch("http://127.0.0.1:5000/reset-memory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        return true;
    } catch (error) {
        console.error("Error resetting conversation:", error);
        return false;
    }
};

export const DialogBox = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const preprompt = "";
    // "Tu es un assistant conversationnel francophone. Tu t'appelles Terra NumerIA. Réponds toujours en français, de manière naturelle et fluide. Ne commence jamais ta réponse par 'Answer:' ni ne termine par '<s>'. Évite d'utiliser des marqueurs de fin de séquence non nécessaires. Réponds de manière complète et adaptée au contexte de la conversation lorsqu'on te pose une question. La conversation commence maintenant.\n\n";

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const conversationId = queryParams.get("conversation");
        
        if (conversationId) {
            loadConversation(conversationId);
        }
    }, [location.search]);

    const loadConversation = async (conversationId: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://127.0.0.1:5000/conversations/${conversationId}`);
            
            if (!response.ok) {
                throw new Error("Impossible de charger cette conversation");
            }
            
            const data = await response.json();
            setCurrentConversationId(conversationId);
            
            const convertedMessages: Message[] = [];
            
            data.messages.forEach((msg: any) => {
                if (msg.role !== "system") {
                    convertedMessages.push({
                        text: msg.content,
                        isUser: msg.role === "user"
                    });
                }
            });
            
            setMessages(convertedMessages);
        } catch (error) {
            console.error("Erreur lors du chargement de la conversation:", error);
        } finally {
            setIsLoading(false);
        }
    };

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

    const submitMessage = async () => {
        if (message.trim() === "") return;
        const enrichedMessage = preprompt + message;
        const userMessage: Message = { text: message, isUser: true };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setMessage("");
        setIsLoading(true);

        try {
            const requestBody: Record<string, any> = {
                prompt: enrichedMessage,
                model: "mistral"
            };
            
            if (currentConversationId) {
                requestBody.conversation_id = currentConversationId;
            }
            
            const response = await fetch("http://127.0.0.1:5000/responses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessage = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                botMessage += decoder.decode(value, { stream: true });
                botMessage = botMessage.replace(/<\/s>$/g, ""); // Remove </s> at the end of the message
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    if (
                        updatedMessages.length > 0 &&
                        !updatedMessages[updatedMessages.length - 1].isUser
                    ) {
                        updatedMessages[updatedMessages.length - 1].text =
                            botMessage;
                    } else {
                        updatedMessages.push({
                            text: botMessage,
                            isUser: false,
                        });
                    }
                    return [...updatedMessages];
                });
            }
            
            if (!currentConversationId) {
                const resetResponse = await fetch("http://127.0.0.1:5000/reset-memory", {
                    method: "GET",
                });
                if (resetResponse.ok) {
                    const data = await resetResponse.json();
                    setCurrentConversationId(data.conversation_id);
                }
            }
        } catch (error) {
            console.error("Stream error:", error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "Error fetching response.", isUser: false },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-2/3 justify-end content-around pt-4 pb-4 gap-2">
            {currentConversationId && (
                <div className="px-10 mb-2">
                    <div className="bg-blue-50 text-blue-700 py-2 px-3 rounded-md text-sm">
                        Conversation en cours: {currentConversationId}
                    </div>
                </div>
            )}
            <ScrollShadow className="w-full h-full flex flex-col items-center pl-10 pr-10 gap-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex w-full ${msg.isUser ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-xl p-3 rounded-lg break-words ${msg.isUser ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
                        >
                            {msg.isUser ? (
                                msg.text
                            ) : (
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm, remarkMath]}
                                        rehypePlugins={[rehypeRaw, rehypeKatex]}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex w-full justify-start">
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-200">
                            <Spinner size="sm" color="primary" />
                            <span className="text-sm text-gray-600">Terra NumerIA réfléchit...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </ScrollShadow>
            <div className="w-full h-2/10 flex justify-center">
                <div className="bottom-4 left-1/2 w-2/3">
                    <div className={"flex flex-row items-center gap-2"}>
                        <Textarea
                            className="w-full h-20"
                            placeholder="Entrez votre message..."
                            radius="none"
                            variant="flat"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={onEnterPress}
                            isDisabled={isLoading}
                        />
                        <Button
                            className="size-20 hover:bg-yellow"
                            color="primary"
                            radius="none"
                            onPress={submitMessage}
                            isDisabled={isLoading}
                            isLoading={isLoading}
                        >
                            Envoyer
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
