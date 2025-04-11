// Types
export type Message = {
    role: string;
    content: string;
};

export type Conversation = {
    id: string;
    timestamp: string;
    preview: string;
    date?: string;
    messages?: Message[];
    metadata?: {
        profile_id?: string;
        profile_name?: string;
    };
};

export type Profile = {
    id: string;
    name: string;
    description: string;
};

export type CurrentProfile = {
    id: string;
    name: string;
};

// Constantes
const API_BASE_URL = "http://127.0.0.1:5000";

// Services d'API
export const ApiService = {
    // Conversations
    getConversations: async (): Promise<Conversation[]> => {
        const response = await fetch(`${API_BASE_URL}/conversations`);
        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des conversations: ${response.status}`);
        }
        const data = await response.json();

        // Formater les dates
        return data.conversations.map((conv: any) => ({
            ...conv,
            date: new Date(conv.timestamp).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        }));
    },

    getConversation: async (id: string): Promise<Conversation> => {
        const response = await fetch(`${API_BASE_URL}/conversations/${id}`);
        if (!response.ok) {
            throw new Error(`Impossible de charger cette conversation: ${response.status}`);
        }
        return await response.json();
    },

    deleteConversation: async (id: string): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/conversations/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression: ${response.status}`);
        }
    },

    // Réponses et messages
    sendMessage: async (prompt: string, model: string = "mistral", temperature: number, topP: number, conversationId?: string, profileId?: string) => {
        const requestBody: Record<string, any> = {
            prompt,
            model
        };

        requestBody.temperature = temperature;
        requestBody.topP = topP;

        if (conversationId) {
            requestBody.conversation_id = conversationId;
        }

        if (profileId && !conversationId) {
            requestBody.profile_id = profileId;
        }

        const response = await fetch(`${API_BASE_URL}/responses`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de l'envoi du message: ${response.status}`);
        }

        return response;
    },

    // Profils
    getAllProfiles: async (): Promise<Record<string, Profile>> => {
        const response = await fetch(`${API_BASE_URL}/profiles`);
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement des profils: ${response.status}`);
        }
        const data = await response.json();
        return data.profiles;
    },

    getCurrentProfile: async (): Promise<CurrentProfile | null> => {
        const response = await fetch(`${API_BASE_URL}/profiles/current`);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    },

    changeProfile: async (profileId: string): Promise<{ profile: CurrentProfile, conversation_id?: string }> => {
        const response = await fetch(`${API_BASE_URL}/profiles/change`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({profile_id: profileId}),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors du changement de profil: ${response.status}`);
        }

        return await response.json();
    },

    // Gestion de la mémoire/conversation
    resetMemory: async (profileId?: string): Promise<{ conversation_id: string, profile?: CurrentProfile }> => {
        const requestBody: Record<string, any> = {};
        if (profileId) {
            requestBody.profile_id = profileId;
        }

        const response = await fetch(`${API_BASE_URL}/reset-memory`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la réinitialisation: ${response.status}`);
        }

        return await response.json();
    }
};
