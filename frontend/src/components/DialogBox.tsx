import {useEffect, useState, useRef} from "react";
import {
    Textarea,
    Button,
    ScrollShadow,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Table,
    TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@heroui/react";

type TokenData = {
    token: string;
    probabilities: { token: string; probability: number }[];
};

type Message = {
    tokens: TokenData[];
    isUser: boolean;
};

const TokenWithPopover = ({tokenData}: { tokenData: TokenData }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover isOpen={isOpen} onOpenChange={setIsOpen} className={'w-1/2'}>
            <PopoverTrigger>
                <span className="cursor-pointer p-0.5 border-blue border-solid border-1" onClick={() => setIsOpen(true)}>
                    {tokenData.token}
                </span>
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">Token Probabilities</h3>
                    <Table aria-label="Token Probabilities">
                        <TableHeader>
                            <TableColumn>Token</TableColumn>
                            <TableColumn>Probability</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {tokenData.probabilities.map((prob, index) => (
                                <TableRow key={index}>
                                    <TableCell>{prob.token}</TableCell>
                                    <TableCell>{(prob.probability * 100).toFixed(2)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <p className="mt-2 text-sm text-gray-600">
                        The AI selects tokens based on probability distributions calculated from the
                        context and training data. Higher probability tokens are more likely to be chosen.
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export const DialogBox = () => {
    const [message, setMessage] = useState("");
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

    const submitMessage = async () => {
        if (message.trim() === "") return;

        const userMessage: Message = {tokens: [{token: message, probabilities: []}], isUser: true};
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setMessage("");

        try {
            const response = await fetch("http://127.0.0.1:5000/responses", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({prompt: message, model: "mistral"}),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botTokens: TokenData[] = [];

            while (true) {
                const {done, value} = await reader.read();
                if (done) break;

                let chunk = decoder.decode(value, {stream: true});
                chunk = chunk.replace(/<\/s>$/g, ""); // Remove </s> at the end of the message
                chunk.split("\n\n").forEach((event) => {
                    if (event.startsWith("data: ")) {
                        const jsonData = JSON.parse(event.replace("data: ", "").trim());
                        if (jsonData.error) throw new Error(jsonData.error);

                        botTokens.push({token: jsonData.token, probabilities: jsonData.probabilities});

                        setMessages((prevMessages) => {
                            const updatedMessages = [...prevMessages];
                            if (updatedMessages.length > 0 && !updatedMessages[updatedMessages.length - 1].isUser) {
                                updatedMessages[updatedMessages.length - 1].tokens = botTokens;
                            } else {
                                updatedMessages.push({tokens: botTokens, isUser: false});
                            }
                            return [...updatedMessages];
                        });
                    }
                });
            }
        } catch (error) {
            console.error("Stream error:", error);
            setMessages((prevMessages) => [...prevMessages, {
                tokens: [{
                    token: "Error fetching response.",
                    probabilities: []
                }], isUser: false
            }]);
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-2/3 justify-end content-around pt-4 pb-4 gap-2">
            <ScrollShadow className="w-full h-full flex flex-col items-center pl-10 pr-10 gap-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex w-full ${msg.isUser ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`max-w-xl p-3 rounded-lg break-words ${msg.isUser ? "bg-primary text-white" : "bg-gray-200 text-black"}`}>
                            {msg.tokens.map((tokenData, idx) => (
                                <TokenWithPopover key={idx} tokenData={tokenData}/>
                            ))}
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
                            placeholder="Enter your message"
                            radius="none"
                            variant="flat"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
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
