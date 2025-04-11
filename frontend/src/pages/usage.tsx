import {Card, CardBody} from '@heroui/react';

export const Usage: React.FC = () => {
    return (
        <Card className={"m-10 max-w-4xl mx-auto border-2 border-gray-200 rounded-lg"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    <div className="bg-gray-100 p-4 rounded-t-lg mb-5">
                        <h1 className="text-3xl font-bold text-gray-900">Comment utiliser Terra NumerIA</h1>
                    </div>
                    <p className="text-lg text-gray-800">
                        Terra NumerIA est une application d'intelligence artificielle conversationnelle conçue pour vous aider
                        dans vos différentes tâches. Que vous ayez besoin d'aide pour apprendre un nouveau concept, rédiger
                        du code, ou simplement discuter, Terra NumerIA est là pour vous. Voici comment tirer le meilleur parti
                        de cette application.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6">1. Interface principale</h2>
                    <p className="text-lg text-gray-700 mt-2">
                        L'interface de Terra NumerIA est divisée en trois parties principales :
                    </p>
                    <ul className="list-disc pl-5 text-lg text-gray-700 mt-4">
                        <li><strong>Le panneau de gauche</strong> : Il vous permet de gérer vos conversations, créer de
                            nouvelles discussions et accéder à l'historique de vos échanges.
                        </li>
                        <li><strong>La zone centrale</strong> : C'est ici que se déroule votre conversation avec Terra NumerIA.
                            Vous pouvez saisir vos messages dans la zone de texte en bas et voir les réponses de l'IA au-dessus.
                        </li>
                        <li><strong>Le panneau de droite</strong> : Il contient les paramètres d'IA, comme le choix du profil et
                            les réglages de température qui influencent la créativité des réponses.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6">2. Démarrer une conversation</h2>
                    <p className="text-lg text-gray-700 mt-2">
                        Pour commencer à utiliser Terra NumerIA :
                    </p>
                    <ol className="list-decimal pl-5 text-lg text-gray-700 mt-4">
                        <li>Assurez-vous que le profil d'IA souhaité est sélectionné dans le panneau de droite (par défaut :
                            "Terra NumerIA").
                        </li>
                        <li>Tapez votre question ou requête dans la zone de texte en bas de l'écran.</li>
                        <li>Appuyez sur "Envoyer" ou utilisez la touche Entrée pour envoyer votre message.</li>
                        <li>Attendez quelques instants que l'IA génère sa réponse.</li>
                    </ol>

                    <h2 className="text-2xl font-semibold mt-6">3. Paramètres de l'IA</h2>
                    <p className="text-lg text-gray-700 mt-2">
                        Vous pouvez personnaliser l'expérience en ajustant les paramètres suivants :
                    </p>
                    <ul className="list-disc pl-5 text-lg text-gray-700 mt-4">
                        <li><strong>Profil</strong> : Changez le type d'assistant en fonction de vos besoins (enseignant,
                            développeur, scientifique, etc.).
                        </li>
                        <li><strong>Température</strong> : Ajustez le niveau de créativité de l'IA. Une température plus basse
                            donne des réponses plus précises et cohérentes, tandis qu'une température plus élevée favorise
                            des réponses plus créatives et diverses.
                        </li>
                        <li><strong>Affichage des tokens</strong> : Option avancée pour voir comment l'IA traite le texte mot
                            par mot.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6">4. Gestion des conversations</h2>
                    <p className="text-lg text-gray-700 mt-2">
                        Terra NumerIA sauvegarde automatiquement vos conversations pour que vous puissiez y revenir plus tard.
                    </p>
                    <ul className="list-disc pl-5 text-lg text-gray-700 mt-4">
                        <li><strong>Nouvelle conversation</strong> : Cliquez sur le bouton "Nouvelle conversation" dans le
                            panneau de gauche pour démarrer un nouvel échange.
                        </li>
                        <li><strong>Historique</strong> : Accédez à vos conversations précédentes en cliquant sur l'onglet
                            "Historique".
                        </li>
                        <li><strong>Suppression</strong> : Vous pouvez supprimer une conversation depuis la page d'historique
                            en cliquant sur le bouton "Supprimer".
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6">5. Conseils d'utilisation</h2>
                    <p className="text-lg text-gray-700 mt-2">
                        Pour obtenir les meilleures réponses de Terra NumerIA :
                    </p>
                    <ul className="list-disc pl-5 text-lg text-gray-700 mt-4">
                        <li>Soyez précis dans vos questions pour obtenir des réponses plus pertinentes.</li>
                        <li>Utilisez le profil le plus adapté à votre requête (ex : profil développeur pour du code).</li>
                        <li>N'hésitez pas à poser des questions de suivi pour approfondir un sujet.</li>
                        <li>Si la réponse n'est pas satisfaisante, essayez de reformuler votre question ou d'ajuster la
                            température.
                        </li>
                    </ul>
                    
                    <div className="bg-gray-100 p-4 rounded-b-lg mt-6 flex flex-col items-start">
                        <h2 className="text-2xl font-semibold">6. Limitations</h2>
                        <p className="text-lg text-gray-700 mt-2">
                            Il est important de noter que Terra NumerIA, comme toute IA :
                        </p>
                        <ul className="list-disc pl-5 text-lg text-gray-700 mt-2">
                            <li>Peut parfois générer des informations incorrectes.</li>
                            <li>A une connaissance limitée aux données sur lesquelles elle a été entraînée.</li>
                            <li>Ne peut pas naviguer sur Internet ou accéder à des données externes.</li>
                            <li>N'est pas capable d'exécuter des actions dans le monde réel.</li>
                        </ul>
                        <p className="text-lg text-gray-700 mt-4">
                            Utilisez toujours votre jugement critique et vérifiez les informations importantes auprès de sources
                            fiables.
                        </p>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};