import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Checkbox,
    Slider,
    Button,
    Spinner,
    Avatar,
    Tooltip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@heroui/react";
import {useEffect, useState} from "react";
import {ApiService, Profile, CurrentProfile} from "../services/ApiService";

// Type pour les props du composant
type SidePanelRightProps = {
    showTokenBorders: boolean;
    setShowTokenBorders: (value: boolean) => void;
    showTokenPopovers: boolean;
    setShowTokenPopovers: (value: boolean) => void;
    changeProfile: (profile: string) => void;
    temperature: number;
    setTemperature: (value: number) => void;
    topP: number;
    setTopP: (value: number) => void;
}

export const SidePanelRight: React.FC<SidePanelRightProps> = ({
                                                                  showTokenBorders,
                                                                  setShowTokenBorders,
                                                                  showTokenPopovers,
                                                                  setShowTokenPopovers,
                                                                  changeProfile,
                                                                  temperature,
                                                                  setTemperature,
                                                                  topP,
                                                                  setTopP,
                                                              }) => {
    const [profiles, setProfiles] = useState<Record<string, Profile>>({});
    const [currentProfile, setCurrentProfile] = useState<CurrentProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleTemperatureChange = (value: any) => {
        if (isNaN(Number(value))) return;
        setTemperature(value);
    };

    const handleTopPChange = (value: any) => {
        if (isNaN(Number(value))) return;
        setTopP(value);
    };

    // Nombre de profils à afficher dans la vue principale
    const MAX_PROFILES_TO_SHOW = 4;

    // Chargement des profils disponibles
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                setIsLoading(true);

                // Récupérer tous les profils
                const profilesData = await ApiService.getAllProfiles();
                setProfiles(profilesData);

                // Charger également le profil actuel
                const currentProfileData = await ApiService.getCurrentProfile();
                if (currentProfileData) {
                    setCurrentProfile(currentProfileData);
                }

                setError(null);
            } catch (err) {
                console.error("Erreur:", err);
                setError("Impossible de charger les profils");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const handleProfileChange = async (profileId: string) => {
        try {
            setIsLoading(true);

            // Appel au service pour changer de profil
            const data = await ApiService.changeProfile(profileId);
            setCurrentProfile(data.profile);

            // Notifier le composant parent du changement de profil
            changeProfile(profileId);

            // Fermer la modal si elle est ouverte
            onClose();

            // Optionnel: Redirection vers la page principale avec le nouvel ID de conversation
            if (data.conversation_id) {
                window.location.href = `/?conversation=${data.conversation_id}`;
            }

        } catch (err) {
            console.error("Erreur:", err);
            setError("Impossible de changer de profil");
        } finally {
            setIsLoading(false);
        }
    };

    const renderProfileItem = (id: string, profile: Profile, currentProfileId: string) => (
        <div
            key={id}
            className={`p-2 rounded-none  cursor-pointer transition-colors flex flex-col items-center
        ${currentProfileId === id
                ? 'bg-blue-100 border border-blue-300'
                : 'hover:bg-gray-100 border border-transparent'}`}
            onClick={() => handleProfileChange(id)}
        >
            <Avatar
                src={`/profiles/${id}.png`}
                alt={profile.name}
                className="mb-1"
                size="md"
            />
            <div className="text-center">
                <span className="font-medium block text-sm truncate">{profile.name}</span>
                <Tooltip content={profile.description} placement="top">
          <span className="text-xs text-gray-500 cursor-help w-full block">
            ⓘ
          </span>
                </Tooltip>
            </div>
        </div>
    );

    const renderProfiles = () => {
        const profileEntries = Object.entries(profiles);
        const currentProfileId = currentProfile?.id || "default";

        // Si nous avons plus de profils que la limite définie, n'afficher que la limite
        const limitedProfiles = profileEntries.slice(0, MAX_PROFILES_TO_SHOW);
        const hasMoreProfiles = profileEntries.length > MAX_PROFILES_TO_SHOW;

        return (
            <>
                <div className="mt-2">
                    {/* Profil actuel mis en évidence */}
                    {currentProfile && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-none  border-l-4 border-blue-500 flex items-center">
                            <Avatar
                                src={`/profiles/${currentProfile.id}.png`}
                                alt={currentProfile.name}
                                className="mr-3"
                                size="sm"
                            />
                            <div>
                                <p className="text-sm font-semibold">Profil actuel:</p>
                                <p className="text-base font-bold text-blue-600 truncate">{currentProfile.name}</p>
                            </div>
                        </div>
                    )}

                    {/* Grille limitée sans défilement */}
                    <div className="grid grid-cols-2 gap-2">
                        {limitedProfiles.map(([id, profile]) => renderProfileItem(id, profile, currentProfileId))}
                    </div>

                    {/* Bouton "Voir plus" si nécessaire */}
                    {hasMoreProfiles && (
                        <div className="mt-3 flex justify-center">
                            <Button
                                color="primary"
                                variant="light"
                                size="sm"
                                onPress={onOpen}
                                className="text-sm"
                            >
                                Voir tous les profils
                            </Button>
                        </div>
                    )}
                </div>

                {/* Modal pour afficher tous les profils */}
                {isOpen && (
                    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                        <ModalContent>
                            <ModalHeader className="flex flex-col gap-1">
                                Tous les profils disponibles
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-3 gap-4 p-2">
                                    {profileEntries.map(([id, profile]) => renderProfileItem(id, profile, currentProfileId))}
                                </div>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )}
            </>
        );
    };

    return (
        <div className="flex flex-col overflow-y-auto h-screen w-1/6 shadow-xl">
            <div className="flex flex-col h-full">
                <Card className="rounded-none h-full">
                    <CardHeader className="flex gap-3">
                        <h1>Configuration</h1>
                    </CardHeader>
                    <CardBody className="overflow-y-auto">
                        <h2>Choix de la personnalité</h2>
                        {isLoading ? (
                            <div className="flex justify-center my-4">
                                <Spinner color="primary"/>
                            </div>
                        ) : error ? (
                            <div className="text-red-500 my-2">{error}</div>
                        ) : (
                            renderProfiles()
                        )}
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
                                classNames={{
                                    base: "max-w-md",
                                    label: "text-medium",
                                }}
                                color="primary"
                                label="Température"
                                maxValue={1.2}
                                minValue={0.5}
                                radius={"none"}
                                size="sm"
                                step={0.05}
                                value={temperature}
                                onChange={handleTemperatureChange}
                            />
                            <Tooltip content={
                                <div className="p-3 bg-gray-800 text-white rounded-none  shadow-lg w-64">
                                    <div className="mb-2">
                                        <strong className="text-lg">Température</strong>
                                    </div>
                                    <div className="text-sm">
                                        Contrôle l'aléa des réponses du modèle.
                                    </div>
                                    <div className="mt-1 text-sm">
                                        Une valeur plus élevée (près de 1.2) rend le modèle plus créatif et diversifié.
                                    </div>
                                    <div className="mt-1 text-sm">
                                        Une valeur plus faible (près de 0.5) rend le modèle plus concentré et
                                        déterministe.
                                    </div>
                                </div>
                            } placement="top">
      <span className="text-xs text-gray-500 cursor-help w-full inline">
        ⓘ
      </span>
                            </Tooltip>
                        </div>

                        <div className="pl-5 pr-5">
                            <Slider
                                classNames={{
                                    base: "max-w-md",
                                    label: "text-medium",
                                }}
                                color="primary"
                                label="Top P"
                                maxValue={1}
                                minValue={0}
                                radius={"none"}
                                size="sm"
                                step={0.05}
                                value={topP}
                                onChange={handleTopPChange}
                            />
                            <Tooltip content={
                                <div className="p-3 bg-gray-800 text-white rounded-none  shadow-lg w-64">
                                    <div className="mb-2">
                                        <strong className="text-lg">Top-p</strong>
                                    </div>
                                    <div className="text-sm">
                                        Contrôle la diversité des choix de mots pendant la génération de texte.
                                    </div>
                                    <div className="mt-1 text-sm">
                                        Le modèle sélectionne les mots dont la somme cumulative de probabilité est
                                        inférieure à la valeur de p.
                                    </div>
                                    <div className="mt-1 text-sm">
                                        Une valeur de p proche de 1 permet une plus grande diversité, tandis qu'une
                                        valeur plus faible limite les choix aux mots les plus probables.
                                    </div>
                                </div>
                            } placement="top">
      <span className="text-xs text-gray-500 cursor-help w-full inline">
        ⓘ
      </span>
                            </Tooltip>
                        </div>

                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
