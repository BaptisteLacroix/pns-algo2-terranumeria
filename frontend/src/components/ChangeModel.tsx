import React, {useEffect, useState} from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Spinner, useDisclosure
} from "@heroui/react";
import {ApiService} from "@/services/ApiService.ts";

export const ChangeModel: React.FC = () => {
    const [availableModels, setAvailableModels] = useState<Record<string, { [modelId: string]: string }>>({});
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [customModelUrl, setCustomModelUrl] = useState<string>('');
    const [errorModels, setErrorModels] = useState<string | null>(null);
    const [currentModelInUse, setCurrentModelInUse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {isOpen, onOpen, onClose} = useDisclosure();

    // Charger les modèles disponibles
    const fetchModels = async () => {
        try {
            const models = await ApiService.getModels();
            setAvailableModels(models);  // Set models grouped by category
            if (Object.keys(models).length > 0) {
                const firstCategory = Object.keys(models)[0]; // Default to the first category
                setSelectedCategory(firstCategory);
                // @ts-ignore
                setSelectedModel(Object.keys(models[firstCategory])[0]); // Default to the first model in the category
            }
        } catch (err) {
            console.error("Erreur:", err);
            setErrorModels("Impossible de charger les modèles");
        }
    };

    // Fetch the current model in use from the server
    const fetchCurrentModel = async () => {
        try {
            const response = await ApiService.getCurrentModel();
            setCurrentModelInUse(response);
        } catch (err) {
            console.error("Erreur:", err);
            setErrorModels("Impossible de charger le modèle actuel");
        }
    };

    useEffect(() => {
        fetchCurrentModel();
        fetchModels();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setSelectedCategory(category);
        if (category) setSelectedModel(Object.keys(availableModels[category])[0]); // Reset to the first model in the new category
    };

    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(e.target.value);
    };

    const handleCustomModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomModelUrl(e.target.value);
    };

    const handleModelSubmit = async () => {
        setIsLoading(true);
        try {
            if (selectedModel && !customModelUrl) {
                // Use the server model logic
                const response = await ApiService.setModel(selectedCategory, selectedModel);
                setCurrentModelInUse(response.currentModel);
            } else if (customModelUrl) {
                // Handle Hugging Face custom model URL
                const response: { message: string, models: any } = await ApiService.setCustomModel(customModelUrl);
                setAvailableModels(response.models);
                setCustomModelUrl('');
            }
            setErrorModels(null);
        } catch (err) {
            setErrorModels("Erreur lors de la sélection du modèle.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderModelCategories = () => {
        return Object.keys(availableModels).map((category) => (
            <SelectItem key={category} value={category}>
                {category}
            </SelectItem>
        ));
    };

    const renderModelsForCategory = () => {
        if (!selectedCategory) return null;
        return Object.entries(availableModels[selectedCategory]).map(([modelId]) => (
            <SelectItem key={modelId} value={modelId}>
                {modelId}
            </SelectItem>
        ));
    };

    return (
        <>
            <div className={"flex flex-col gap-4"}>
                                <span className="text-xs text-gray-500 ml-2">
                    {currentModelInUse}
            </span>
                <Button color="primary" variant={"bordered"} onPress={onOpen}>
                    {/*
                Show a message that show the current model and the possibility to change it
                */}
                    <span>Changer de modèle</span>
                </Button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpen} size="lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className={'flex-col'}>
                                <h2>Utiliser un autre modèle</h2>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-2 mb-3">
                                    {/* Category Selection Dropdown */}
                                    <Select
                                        label="Choisir une catégorie"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        {renderModelCategories()}
                                    </Select>

                                    {/* Model Selection Dropdown */}
                                    <Select
                                        label="Choisir un modèle"
                                        value={selectedModel}
                                        onChange={handleModelChange}
                                    >
                                        {renderModelsForCategory()}
                                    </Select>

                                    {/* Option to use a Hugging Face custom model */}
                                    <div className="mt-4">
                                        <h2>Entrez un modèle Hugging Face personnalisé:</h2>
                                        <p className="text-xs text-gray-500 mt-2">
                                            <span className={'text-red-500'}>Attention:</span> Changer de modèle peut
                                            entraîner des erreurs si les dépendances
                                            requises ne sont pas satisfaites.
                                            <br/>
                                            Veuillez vous assurer que le modèle sélectionné est compatible avec
                                            l'application.
                                        </p>
                                        <input
                                            type="text"
                                            className="mt-2 p-2 border rounded w-full"
                                            placeholder="https://huggingface.co/username/model_name"
                                            value={customModelUrl}
                                            onChange={handleCustomModelChange}
                                        />
                                    </div>
                                </div>

                                {
                                    isLoading ? (
                                        <div className="flex justify-center my-4">
                                            <Spinner color="primary" className={"mr-2"}/> Chargement du modèle...
                                        </div>
                                    ) : (
                                        errorModels && (
                                            <div className="text-red-500 my-2">{errorModels}</div>
                                        )
                                    )
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    size="sm"
                                    onPress={handleModelSubmit}
                                    isLoading={isLoading}
                                >
                                    Appliquer
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
