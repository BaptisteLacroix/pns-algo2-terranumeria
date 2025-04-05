import {
    Image,
    Spacer,
    Link,
    Button,
} from "@heroui/react";

export const SidePanelLeft = () => {
    const handleNewConversation = () => {
        fetch("http://127.0.0.1:5000/reset-memory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }).catch(err => console.error("Erreur lors de la réinitialisation:", err));
        
        window.location.href = "/";
    };

    return (
        <div className="flex flex-col h-screen w-1/6 bg-white shadow-lg pb-4">
            <Spacer y={4}/>
            <Image alt="heroui logo" src="/logo.png" className="rounded-none cursor-pointer mx-auto mb-6" onClick={handleNewConversation}/>
            <div className="flex flex-col justify-between h-full px-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-primary mb-4 px-2">Documentation</h1>
                    <div className="bg-gray-50 rounded-lg p-2">
                        <ul className="flex flex-col space-y-1">
                            <li className="hover:bg-yellow rounded-md transition-colors">
                                <Link
                                    href={"/learning"}
                                    isBlock
                                    color={undefined}
                                    className="text-darkblue font-semibold text-lg py-2 px-4 block"
                                >
                                    L'entraînement
                                </Link>
                            </li>
                            <li className="hover:bg-yellow rounded-md transition-colors">
                                <Link
                                    href="#"
                                    isBlock
                                    color={undefined}
                                    className="text-darkblue font-semibold text-lg py-2 px-4 block"
                                >
                                    Les biais
                                </Link>
                            </li>
                            <li className="hover:bg-yellow rounded-md transition-colors">
                                <Link
                                    href="#"
                                    isBlock
                                    color={undefined}
                                    className="text-darkblue font-semibold text-lg py-2 px-4 block"
                                >
                                    La véracité
                                </Link>
                            </li>
                            <li className="hover:bg-yellow rounded-md transition-colors">
                                <Link
                                    href="#"
                                    isBlock
                                    color={undefined}
                                    className="text-darkblue font-semibold text-lg py-2 px-4 block"
                                >
                                    Les mathématiques
                                </Link>
                            </li>
                            <li className="hover:bg-yellow rounded-md transition-colors">
                                <Link
                                    href="#"
                                    isBlock
                                    color={undefined}
                                    className="text-darkblue font-semibold text-lg py-2 px-4 block"
                                >
                                    L'espace vectoriel
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-auto px-2">
                    <Button
                        className="w-full py-3 px-6 bg-primary hover:bg-yellow text-white font-semibold text-lg shadow-md transition-colors"
                        radius="none"
                        size="lg"
                        onPress={handleNewConversation}
                    >
                        Nouvelle conversation
                    </Button>
                </div>
            </div>
        </div>
    );
};
