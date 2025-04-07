import {
    Image,
    Spacer,
    Link,
    Button,
} from "@heroui/react";
import { useEffect } from "react";
import { getProfil, resetChat } from "../components/services/BackendService";

export const SidePanelLeft = () => {
    useEffect(() => {
        resetChat(getProfil());
    }, []);

    return (
        <div className="flex flex-col h-screen w-1/6 bg-white shadow-lg pb-4">
            <Spacer y={4}/>
            <Image alt="heroui logo" src="/logo.png" className="rounded-none cursor-pointer mx-auto mb-6" onClick={
                        resetChat(getProfil());}/>
            <div className="flex flex-col justify-between h-full px-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-primary mb-4 px-2">Documentation</h1>
                    <div className="bg-gray-50 p-2">
                        <ul className="flex flex-col space-y-1">
                            <li className="hover:bg-yellow transition-colors">
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
                <Button
                    className="pr-5 pl-5 hover:bg-yellow  text-white font-semibold  text-lg"
                    color="primary"
                    radius="none"
                    size="lg"
                    onPress={() => {
                        resetChat(getProfil());
                        window.location.href = "/";
                    }}
                >
                    Nouvelle conversation
                </Button>
            </div>
        </div>
    );
};
