import { Card, CardBody, Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Conversation = {
    id: string;
    timestamp: string;
    preview: string;
};

export const History: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:5000/conversations");
            
            if (!response.ok) {
                throw new Error(`Erreur lors de la récupération des conversations: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Formater les dates
            const formattedConversations = data.conversations.map((conv: any) => ({
                ...conv,
                // Convertir le ISO timestamp en date lisible
                date: new Date(conv.timestamp).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })
            }));
            
            setConversations(formattedConversations);
            setError(null);
        } catch (err) {
            console.error("Erreur:", err);
            setError("Impossible de récupérer l'historique des conversations");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectConversation = (id: string) => {
        // Redirection vers la page principale avec l'ID de conversation
        navigate(`/?conversation=${id}`);
    };

    const handleDeleteConversation = async (id: string, event: React.MouseEvent) => {
        event.stopPropagation(); // Empêcher le clic de remonter jusqu'à la Card
        
        try {
            const response = await fetch(`http://127.0.0.1:5000/conversations/${id}`, {
                method: "DELETE"
            });
            
            if (!response.ok) {
                throw new Error(`Erreur lors de la suppression: ${response.status}`);
            }
            
            // Rafraîchir la liste après suppression
            fetchConversations();
        } catch (err) {
            console.error("Erreur lors de la suppression:", err);
            setError("Impossible de supprimer la conversation");
        }
    };

    if (loading) {
        return <div className="w-2/3 p-6">Chargement de l'historique...</div>;
    }

    if (error) {
        return (
            <div className="w-2/3 p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
                <Button 
                    color="primary" 
                    className="mt-4"
                    onClick={() => fetchConversations()}
                >
                    Réessayer
                </Button>
            </div>
        );
    }

    return (
        <div className="w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-6">Historique des conversations</h1>
            
            {conversations.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <p>Aucune conversation sauvegardée</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {conversations.map((conv) => (
                        <Card key={conv.id} className="border-2 border-gray-200 hover:border-primary transition-colors">
                            <CardBody className="p-4 cursor-pointer" onClick={() => handleSelectConversation(conv.id)}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-500">{conv.date}</p>
                                        <p className="text-lg font-medium mt-1">{conv.preview || "Nouvelle conversation"}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            color="primary" 
                                            radius="none" 
                                            size="sm"
                                            onClick={() => handleSelectConversation(conv.id)}
                                        >
                                            Ouvrir
                                        </Button>
                                        <Button 
                                            color="danger" 
                                            radius="none" 
                                            size="sm"
                                            onClick={(e) => handleDeleteConversation(conv.id, e)}
                                        >
                                            Supprimer
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};