import {Image, Spacer, Link, Button} from "@heroui/react";

export const SidePanelLeft: React.FC<{ callResetChat: () => void }> = ({
  callResetChat,
}) => {
  return (
    <div className="flex flex-col h-screen w-1/6 bg-white shadow-lg pb-4">
      <Spacer y={4} />
      <Image
        alt="heroui logo"
        src="/logo.png"
        className="rounded-none cursor-pointer mx-auto mb-6"
        onClick={() => {
            callResetChat();
            // Change the Route to /
            window.location.href = "/";
        }}

      />
      <div className="flex flex-col justify-between h-full px-4">
        <div className="flex flex-col">
            <div className="flex flex-col mb-6">
                        <Link
                            href={"/history"}
                            isBlock
                            color={undefined}
                            className="bg-gray-50 hover:bg-yellow rounded-md transition-colors text-darkblue font-semibold text-lg py-2 px-4 block mb-2"
                        >
                            Historique des conversations
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold text-primary mb-4 px-2">
                        Documentation
                    </h1>
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
                                    href={"/biais"}
                                    isBlock
                                    color={undefined}
                                    className="text-darkblue font-semibold text-lg py-2 px-4 block"
                                >
                                    Les biais
                                </Link>
                            </li>
                            <li className="hover:bg-yellow rounded-md transition-colors">
                                <Link
                                    href={"/veracite"}
                                    isBlock
                                    color={undefined}
                                    className="text-darkblue font-semibold text-lg py-2 px-4 block"
                                >
                                    La véracité
                                </Link>
                            </li>
                            <li className="hover:bg-yellow rounded-md transition-colors">
                                <Link
                                    href={"/mathematiques"}
                                    isBlock
                                    color={undefined}
                                    className="text-darkblue font-semibold text-lg py-2 px-4 block"
                                >
                                    Les mathématiques
                                </Link>
                            </li>
                            <li className="hover:bg-yellow rounded-md transition-colors">
                                <Link
                                    href={"/espace-vectoriel"}
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
                        callResetChat();
                        // Change the Route to /
                        window.location.href = "/";
                    }}
                >
                    Nouvelle conversation
                </Button>
            </div>
        </div>
    );
};
