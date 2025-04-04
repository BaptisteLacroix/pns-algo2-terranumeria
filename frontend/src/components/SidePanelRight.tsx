import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    User,
    Divider,
    Checkbox,
    Slider,
    Button,
} from "@heroui/react";

type SidePanelRightProps = {
    showTokenBorders: boolean;
    setShowTokenBorders: (value: boolean) => void;
    showTokenPopovers: boolean;
    setShowTokenPopovers: (value: boolean) => void;
}

export const SidePanelRight: React.FC<SidePanelRightProps> = ({
                                                                  showTokenBorders,
                                                                  setShowTokenBorders,
                                                                  showTokenPopovers,
                                                                  setShowTokenPopovers,
                                                              }) => {
    return (
        <div className="flex flex-col overflow-y-auto h-screen w-1/6 shadow-xl">
            <div className="flex flex-col h-full">
                <Card className="rounded-none h-full">
                    <CardHeader className="flex gap-3">
                        <h1>Configuration</h1>
                    </CardHeader>
                    <CardBody>
                        <h2>Choix de la personnalité</h2>
                        <div className={"flex flex-col items-start space-y-4"}>
                            <User
                                avatarProps={{
                                    src: "#",
                                }}
                                name="Terra NumerIA"
                            />
                            <User
                                avatarProps={{
                                    src: "#",
                                }}
                                name="Profil 2"
                            />
                            <User
                                avatarProps={{
                                    src: "#",
                                }}
                                name="Profil 3"
                            />
                        </div>
                        <Divider className={"mt-5 mb-5"}/>
                        <h2>Informations complémentaires</h2>
                        <div>
                            <Checkbox
                                radius="none"
                                checked={showTokenBorders}
                                onChange={() => setShowTokenBorders(!showTokenBorders)}
                            >
                                Afficher les tokens
                            </Checkbox>
                            <Checkbox
                                className={"mt-2"}
                                radius="none"
                                checked={showTokenPopovers}
                                onChange={() => setShowTokenPopovers(!showTokenPopovers)}
                            >
                                Afficher les autres possibilités
                            </Checkbox>
                        </div>
                        <Divider className={"mt-5 mb-5"}/>
                        <div className="pl-5 pr-5">
                            <Slider
                                color="primary"
                                defaultValue={1}
                                hideValue={true}
                                label="Vitesse de génération"
                                marks={[
                                    {
                                        value: 0,
                                        label: "Manuel",
                                    },
                                    {
                                        value: 1,
                                        label: "Lent",
                                    },
                                    {
                                        value: 2,
                                        label: "Rapide",
                                    },
                                ]}
                                maxValue={2}
                                radius={"none"}
                                size="sm"
                                step={1}
                            />
                        </div>
                        <div className={"flex"}>
                            <Button
                                className="w-1/2 mt-5 hover:bg-yellow"
                                color="primary"
                                radius="none"
                            >
                                Token suivant
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
