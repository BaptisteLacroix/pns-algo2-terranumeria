import {Card, CardBody} from '@heroui/react';

export const Profiles: React.FC = () => {
    return (
        <Card className={"m-10 max-w-4xl mx-auto border-2 border-gray-200 rounded-lg"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    <div className="bg-gray-100 p-4 rounded-t-lg mb-5">
                        <h1 className="text-3xl font-bold text-gray-900">Les Profils de Terra NumerIA</h1>
                    </div>
                    <p className="text-lg text-gray-800">
                        Terra NumerIA est une IA adaptable qui peut endosser différents rôles selon vos besoins. 
                        Chaque profil possède des compétences et un style de communication spécifiques. 
                        Découvrez les différents profils disponibles et choisissez celui qui correspond le mieux 
                        à votre requête du moment.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6">1. Terra NumerIA (Profil par défaut)</h2>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 mt-2">
                        <p className="text-lg text-gray-700">
                            <strong>Description :</strong> L'assistant par défaut, équilibré et adapté à tous types de requêtes
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            Le profil par défaut de Terra NumerIA est un assistant polyvalent, spécialisé dans les domaines de
                            l'informatique, des mathématiques et des technologies. Il communique de manière claire et précise,
                            avec un ton professionnel mais accessible. Ses réponses sont bien structurées en format Markdown 
                            pour une meilleure lisibilité, avec un usage judicieux des titres, listes, et mise en évidence 
                            des informations importantes.
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            <strong>Idéal pour :</strong> Les questions générales sur la technologie, l'informatique et les
                            mathématiques, ou lorsque vous n'êtes pas sûr du profil à choisir.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6">2. Professeur</h2>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 mt-2">
                        <p className="text-lg text-gray-700">
                            <strong>Description :</strong> Un profil pédagogique orienté vers l'explication de concepts complexes
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            Le Professeur excelle dans l'art d'expliquer des concepts complexes de manière accessible.
                            Il adapte ses explications au niveau de l'utilisateur, en commençant toujours par une
                            introduction simplifiée avant d'approfondir. Il utilise des exemples concrets, des analogies
                            et propose même des exercices pour faciliter l'assimilation des connaissances.
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            <strong>Idéal pour :</strong> Comprendre des concepts difficiles, étudier, préparer des examens,
                            ou satisfaire votre curiosité intellectuelle.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6">3. Développeur</h2>
                    <div className="p-4 border-l-4 border-purple-500 bg-purple-50 mt-2">
                        <p className="text-lg text-gray-700">
                            <strong>Description :</strong> Spécialisé dans l'aide à la programmation et la résolution de problèmes techniques
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            Le profil Développeur est conçu pour assister dans toutes les tâches de programmation. Il fournit
                            du code complet, fonctionnel et bien commenté, tout en respectant les conventions du langage
                            utilisé. Ses réponses sont structurées pour inclure une explication du problème, la solution proposée,
                            le code, des explications détaillées et des suggestions d'amélioration.
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            <strong>Idéal pour :</strong> L'aide à la programmation, le débogage, l'apprentissage de nouveaux
                            langages ou frameworks, et l'amélioration de votre code existant.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6">4. Scientifique</h2>
                    <div className="p-4 border-l-4 border-red-500 bg-red-50 mt-2">
                        <p className="text-lg text-gray-700">
                            <strong>Description :</strong> Rigoureux et précis pour les discussions scientifiques et techniques
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            Le Scientifique se concentre sur la précision et la rigueur dans ses explications, tout en
                            rendant les concepts accessibles. Il distingue clairement les faits établis, les théories
                            acceptées, les hypothèses en cours d'étude et les spéculations. Il utilise des termes
                            techniques précis tout en fournissant leur définition simplifiée.
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            <strong>Idéal pour :</strong> Les discussions scientifiques approfondies, l'exploration de
                            théories complexes, et l'obtention d'informations précises sur des sujets techniques.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6">5. Philosophe</h2>
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 mt-2">
                        <p className="text-lg text-gray-700">
                            <strong>Description :</strong> Réfléchi et nuancé pour les discussions philosophiques et éthiques
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            Le Philosophe adopte une approche réflexive, critique et nuancée sur tous les sujets.
                            Il présente différentes perspectives philosophiques, évite les positions dogmatiques et
                            favorise le pluralisme des idées. Ce profil est particulièrement habile pour établir des
                            liens entre la philosophie et la vie quotidienne, rendant les idées abstraites accessibles.
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            <strong>Idéal pour :</strong> Les discussions philosophiques, les questions éthiques, les
                            réflexions existentielles, et l'exploration de concepts abstraits.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6">6. Coach Personnel</h2>
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50 mt-2">
                        <p className="text-lg text-gray-700">
                            <strong>Description :</strong> Motivant et constructif pour le développement personnel et professionnel
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            Le Coach Personnel adopte une attitude bienveillante, encourageante et constructive. Il
                            reconnaît et valide vos préoccupations, pose des questions ouvertes pour favoriser la
                            réflexion personnelle, et propose des étapes concrètes et réalisables. Il favorise
                            l'autonomie et la responsabilisation, vous aidant à trouver vos propres solutions.
                        </p>
                        <p className="text-lg text-gray-700 mt-2">
                            <strong>Idéal pour :</strong> Le développement personnel, l'établissement d'objectifs,
                            la gestion du stress, l'amélioration de la productivité, et la motivation.
                        </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-b-lg mt-6 flex flex-col items-start">
                        <h2 className="text-2xl font-semibold">Comment choisir le bon profil ?</h2>
                        <p className="text-lg text-gray-700 mt-2">
                            Le choix du profil dépend de votre objectif :
                        </p>
                        <ul className="list-disc pl-5 text-lg text-gray-700 mt-2">
                            <li><strong>Pour des questions générales :</strong> Utilisez le profil par défaut (Terra NumerIA)</li>
                            <li><strong>Pour apprendre ou comprendre :</strong> Optez pour le profil Professeur</li>
                            <li><strong>Pour coder ou déboguer :</strong> Choisissez le profil Développeur</li>
                            <li><strong>Pour des informations scientifiques précises :</strong> Sélectionnez le profil Scientifique</li>
                            <li><strong>Pour réfléchir à des questions profondes :</strong> Préférez le profil Philosophe</li>
                            <li><strong>Pour du soutien et des conseils personnels :</strong> Tournez-vous vers le Coach Personnel</li>
                        </ul>
                        <p className="text-lg text-gray-700 mt-4">
                            Vous pouvez changer de profil à tout moment depuis le panneau de droite de l'interface,
                            en fonction de l'évolution de vos besoins au cours d'une session.
                        </p>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};