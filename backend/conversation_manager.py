import json
import os
import time
from datetime import datetime

class ConversationManager:
    def __init__(self, storage_dir="conversations"):
        """
        Initialise le gestionnaire de conversations
        :param storage_dir: Le répertoire où stocker les conversations
        """
        self.storage_dir = storage_dir
        os.makedirs(storage_dir, exist_ok=True)
    
    def save_conversation(self, conversation_id, messages, metadata=None):
        """
        Sauvegarde une conversation
        :param conversation_id: Identifiant unique de la conversation
        :param messages: Liste des messages de la conversation
        :param metadata: Métadonnées additionnelles (profil utilisé, etc.)
        :return: Le chemin vers le fichier de la conversation
        """
        # Création du fichier avec le timestamp et l'ID de conversation
        file_path = os.path.join(self.storage_dir, f"{conversation_id}.json")
        
        # Ajout des métadonnées
        conversation_data = {
            "id": conversation_id,
            "timestamp": datetime.now().isoformat(),
            "messages": messages
        }
        
        # Ajout des métadonnées si fournies
        if metadata:
            conversation_data["metadata"] = metadata
        
        # Sauvegarde dans un fichier JSON
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(conversation_data, f, ensure_ascii=False, indent=2)
            
        return file_path
    
    def load_conversation(self, conversation_id):
        """
        Charge une conversation existante
        :param conversation_id: ID de la conversation à charger
        :return: Les données de la conversation ou None si non trouvée
        """
        file_path = os.path.join(self.storage_dir, f"{conversation_id}.json")
        
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        
        return None
    
    def get_all_conversations(self):
        """
        Récupère toutes les conversations sauvegardées
        :return: Liste des métadonnées des conversations
        """
        conversations = []
        
        for filename in os.listdir(self.storage_dir):
            if filename.endswith('.json'):
                file_path = os.path.join(self.storage_dir, filename)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    
                # N'extrait que les métadonnées pour la liste
                preview = ""
                if data.get("messages") and len(data["messages"]) > 0:
                    first_user_message = next((m for m in data["messages"] if m.get("role") == "user"), None)
                    if first_user_message:
                        preview = first_user_message.get("content", "")[:100]
                
                conversation_info = {
                    "id": data.get("id"),
                    "timestamp": data.get("timestamp"),
                    "preview": preview
                }
                
                # Ajouter les informations de profil si présentes
                if "metadata" in data and "profile_id" in data["metadata"]:
                    conversation_info["profile_id"] = data["metadata"]["profile_id"]
                    conversation_info["profile_name"] = data["metadata"].get("profile_name", "")
                
                conversations.append(conversation_info)
        
        # Trie par date (du plus récent au plus ancien)
        conversations.sort(key=lambda x: x.get("timestamp", ""), reverse=True)
        
        return conversations
    
    def delete_conversation(self, conversation_id):
        """
        Supprime une conversation
        :param conversation_id: ID de la conversation à supprimer
        :return: True si supprimé avec succès, False sinon
        """
        file_path = os.path.join(self.storage_dir, f"{conversation_id}.json")
        
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        
        return False
    
    def generate_conversation_id(self):
        """
        Génère un ID unique pour une nouvelle conversation
        :return: ID de conversation unique
        """
        timestamp = int(time.time() * 1000)
        return f"conv_{timestamp}"