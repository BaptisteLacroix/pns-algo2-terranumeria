import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidePanelLeft } from "@/components/SidePanelLeft.tsx";
import { SidePanelRight } from "@/components/SidePanelRight.tsx";
import { DialogBox } from "@/components/DialogBox.tsx";
import { Learning } from "@/pages/learning.tsx";
import { Biais } from "@/pages/biais.tsx";
import { Veracite } from "@/pages/veracite.tsx";
import { Mathematiques } from "@/pages/mathematiques.tsx";
import { EspaceVectoriel } from "@/pages/espace-vectoriel.tsx";
import { History } from "@/pages/history.tsx";
import { ApiService } from "../services/ApiService";
import { useEffect, useState } from "react";

// Définition du type de message pour le partage entre les composants
export type TokenData = {
	token: string;
	probabilities: { token: string; probability: number }[];
};

export type Message = {
	tokens: TokenData[];
	isUser: boolean;
};

export const CommonParent = () => {
	const [showTokenBorders, setShowTokenBorders] = useState(false);
	const [showTokenPopovers, setShowTokenPopovers] = useState(false);
	const [temperature, setTemperature] = useState(0.7);
	const [topP, setTopP] = useState(0.1);

	// États partagés entre CommonParent et DialogBox
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
	const [currentProfileId, setCurrentProfileId] = useState<string | null>(null);

	const [isModelReady, setIsModelReady] = useState(false);
	const [isAPIAvailable, setIsAPIAvailable] = useState(false);

	// Vérifie toutes les 5 secondes si le modèle est prêt
	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				const res = await fetch("/api/health");
				const data = await res.json();
				if (data.model_status === "ready") {
					setIsModelReady(true);
					clearInterval(interval);
				}
				setIsAPIAvailable(true);
			} catch (error) {
				console.error("Erreur healthcheck :", error);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	// Récupérer le profil initial
	useEffect(() => {
		const fetchCurrentProfile = async () => {
			try {
				const profile = await ApiService.getCurrentProfile();
				if (profile) {
					setCurrentProfileId(profile.id);
				}
			} catch (error) {
				console.error("Erreur lors du chargement du profil initial:", error);
			}
		};

		fetchCurrentProfile();
	}, []);

	const resetChat = () => {
		setMessages([]);
		setCurrentConversationId(null);
	};

	const resetChatWithProfil = async (profileId: string) => {
		try {
			await ApiService.resetMemory(profileId);
			resetChat();
			setCurrentProfileId(profileId);
		} catch (error) {
			console.error("Erreur lors de la réinitialisation du chat:", error);
		}
	};

	const callResetChat = async () => {
		try {
			await ApiService.resetMemory(currentProfileId || undefined);
			resetChat();
		} catch (error) {
			console.error("Erreur lors de la réinitialisation du chat:", error);
		}
	};

	// ⛔ Si le modèle n’est pas prêt, affiche l’écran de chargement
	if (!isAPIAvailable) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-white z-50">
				<div className="flex flex-col items-center">
					<div className="mb-4">
						<span className="text-2xl font-bold text-red-600">API Unavailable</span>
					</div>
					<div>
						<span className="text-gray-600">
							The backend API is not reachable. Please ensure the server is running.
						</span>
					</div>
				</div>
			</div>
		);
	} else if (!isModelReady) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-white z-50">
				<div className="flex flex-col items-center">
					<div className="mb-4">
						<span className="text-2xl font-bold text-blue-600">
							Loading AI Model...
						</span>
					</div>
					<div>
						<span className="text-gray-600">
							Please wait while the model is being loaded. This may take a few
							minutes.
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<Router>
			<div className="flex w-full h-screen overflow-hidden">
				<SidePanelLeft callResetChat={callResetChat} />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<DialogBox
									showTokenBorders={showTokenBorders}
									showTokenPopovers={showTokenPopovers}
									messages={messages}
									setMessages={setMessages}
									currentConversationId={currentConversationId}
									setCurrentConversationId={setCurrentConversationId}
									currentProfileId={currentProfileId}
									temperature={temperature}
									topP={topP}
								/>
								<SidePanelRight
									setShowTokenBorders={setShowTokenBorders}
									setShowTokenPopovers={setShowTokenPopovers}
									showTokenBorders={showTokenBorders}
									showTokenPopovers={showTokenPopovers}
									changeProfile={resetChatWithProfil}
									temperature={temperature}
									setTemperature={setTemperature}
									topP={topP}
									setTopP={setTopP}
								/>
							</>
						}
					/>
					<Route path="/learning" element={<Learning />} />
					<Route path="/biais" element={<Biais />} />
					<Route path="/veracite" element={<Veracite />} />
					<Route path="/mathematiques" element={<Mathematiques />} />
					<Route path="/espace-vectoriel" element={<EspaceVectoriel />} />
					<Route path="/history" element={<History />} />
				</Routes>
			</div>
		</Router>
	);
};
