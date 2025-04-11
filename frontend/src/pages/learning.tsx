import {Card, CardBody, Divider, Image} from '@heroui/react';

export const Learning: React.FC = () => {
    return (
        <Card className={"m-10 max-w-5xl mx-auto border-2 border-gray-200 rounded-lg shadow-lg"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    {/* En-tête */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg mb-8 border-l-4 border-primary shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Comprendre l'Apprentissage des IA Génératives</h1>
                        <p className="text-lg text-gray-700 italic">
                            Découvrez comment les intelligences artificielles apprennent à créer du contenu original
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
                        <div className="md:w-2/3">
                            <p className="text-lg text-gray-800 leading-relaxed">
                                Les IA génératives sont des intelligences artificielles capables de créer de nouvelles choses,
                                comme des images, des textes, des musiques, ou même des vidéos. Leur fonctionnement repose sur
                                un processus d'apprentissage où elles apprennent à partir d'exemples pour ensuite produire de
                                nouvelles créations. Mais comment ça marche exactement ? Voyons cela étape par étape !
                            </p>
                        </div>
                        <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                            <Image
                                alt="Illustration d'IA générative"
                                className="w-full h-auto"
                                src="documentation/learning/intro-ia.png"
                            />
                        </div>
                    </div>

                    <Divider className="my-8" />

                    {/* Section 1: Apprentissage Automatique */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
                            <span className="bg-primary text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">1</span>
                            Qu'est-ce que l'Apprentissage Automatique ?
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="md:w-2/3">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    L'apprentissage automatique (ou <em>machine learning</em> en anglais) est un type d'intelligence
                                    artificielle qui permet à un ordinateur d'apprendre à partir de données sans être explicitement
                                    programmé pour chaque tâche. Cela signifie que l'IA analyse des informations (par exemple, des
                                    images ou des textes) et apprend à en tirer des règles ou des motifs pour mieux prédire ou créer
                                    quelque chose de nouveau.
                                </p>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 rounded-r">
                                    <p className="text-sm text-gray-700">
                                        <strong>Point clé :</strong> Contrairement à la programmation traditionnelle où un humain écrit des 
                                        règles explicites, avec l'apprentissage automatique, l'ordinateur découvre lui-même les règles à 
                                        partir des données.
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="Schéma d'apprentissage automatique"
                                    className="w-full h-auto"
                                    src="https://miro.medium.com/v2/resize:fit:1400/1*c_fiB-YgbnMl6nntYGBMHQ.jpeg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Apprentissage Génératif */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
                            <span className="bg-primary text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">2</span>
                            Qu'est-ce que l'Apprentissage Génératif ?
                        </h2>
                        <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                            <div className="md:w-2/3">
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    L'apprentissage génératif est une sous-catégorie de l'apprentissage automatique où l'IA apprend
                                    non seulement à reconnaître des motifs dans des données, mais aussi à <em>générer</em> de nouvelles
                                    données qui ressemblent à celles qu'elle a étudiées. Par exemple, une IA générative pourrait
                                    apprendre à partir de milliers de photos de chats et ensuite créer une toute nouvelle image d'un
                                    chat qui n'existe pas dans la réalité !
                                </p>
                            </div>
                            <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="Illustration de l'apprentissage génératif"
                                    className="w-full h-auto"
                                    src="documentation/learning/TN-joker.png"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Processus d'apprentissage */}
                    <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
                            <span className="bg-primary text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">3</span>
                            Comment l'IA Apprend-elle à Générer des Contenus ?
                        </h2>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                            L'IA générative apprend par un processus appelé <strong>entraînement</strong>. Voici comment
                            cela se passe généralement :
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">1. Collecte de Données</h3>
                                <p className="text-base text-gray-600">
                                    L'IA commence par "regarder" des tonnes d'exemples. Par exemple,
                                    pour générer des textes, elle pourrait lire des milliers de livres, articles, ou dialogues.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">2. Comprendre les Motifs</h3>
                                <p className="text-base text-gray-600">
                                    L'IA essaie de comprendre les caractéristiques communes de ces exemples.
                                    Par exemple, si elle regarde des photos de chats, elle apprend leurs caractéristiques distinctives.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">3. Apprentissage par Répétition</h3>
                                <p className="text-base text-gray-600">
                                    L'IA fait beaucoup d'essais et d'erreurs. Elle ajuste ses "règles" internes et réessaie,
                                    jusqu'à ce qu'elle soit assez bonne pour créer des contenus convaincants.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">4. Réseaux de Neurones</h3>
                                <p className="text-base text-gray-600">
                                    L'IA générative utilise des structures appelées <strong>réseaux de neurones</strong>,
                                    qui imitent le cerveau humain pour analyser les données à plusieurs niveaux.
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-center">
                            <Image
                                alt="Schéma du processus d'apprentissage de l'IA générative"
                                className="max-w-full h-auto rounded-lg shadow-md"
                                src="https://miro.medium.com/v2/resize:fit:1400/1*Mf6deTXbXw4PgcVtJ4qyRw.png"
                            />
                        </div>
                    </div>

                    <Divider className="my-8" />

                    {/* Section 4: Exemples d'IA Génératives */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
                            <span className="bg-primary text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">4</span>
                            Exemples d'IA Génératives
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-6">
                            Il existe plusieurs types d'IA génératives, voici quelques exemples populaires :
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-blue-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden shadow-sm">
                                        <Image
                                            alt="Illustration de GPT"
                                            className="max-w-full max-h-full"
                                            src="documentation/learning/ChatGPT.png"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">GPT-3 et GPT-4</h3>
                                    <p className="text-sm text-gray-600">
                                        Ces IA génèrent du texte. Elles sont capables de rédiger des histoires, 
                                        des poèmes, des articles, ou même de répondre à des questions complexes.
                                    </p>
                                </CardBody>
                            </Card>
                            
                            <Card className="bg-green-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden shadow-sm">
                                        <Image
                                            alt="Illustration de DALL·E"
                                            className="max-w-full max-h-full"
                                            src="documentation/learning/DALL-E.png"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">DALL·E</h3>
                                    <p className="text-sm text-gray-600">
                                        Une IA générative qui crée des images à partir de descriptions textuelles. 
                                        Par exemple, si on demande "un chat qui porte un chapeau", elle crée cette image.
                                    </p>
                                </CardBody>
                            </Card>
                            
                            <Card className="bg-red-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden shadow-sm">
                                        <Image
                                            alt="Illustration de DeepFake"
                                            className="max-w-full max-h-full"
                                            src="documentation/learning/deepfake.png"
                                            width={1050}
                                            height={190}
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">DeepFake</h3>
                                    <p className="text-sm text-gray-600">
                                        Une technologie qui utilise des IA génératives pour créer des vidéos où des visages 
                                        peuvent être remplacés, ce qui peut être impressionnant ou inquiétant selon l'usage.
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    {/* Section 5: Importance de l'IA Générative */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center">
                            <span className="bg-primary text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">5</span>
                            Pourquoi l'IA Générative est-elle Importante ?
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="md:w-3/5">
                                <p className="text-lg text-gray-700 mb-4">
                                    Les IA génératives ouvrent des possibilités incroyables dans de nombreux domaines :
                                </p>
                                <ul className="list-none pl-0 space-y-3">
                                    <li className="flex items-start">
                                        <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700">Création artistique en générant des œuvres nouvelles</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700">Amélioration de la productivité, comme générer des résumés ou des documents</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700">Simulation de scénarios ou création d'environnements virtuels dans des jeux vidéo</span>
                                    </li>
                                </ul>
                                <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-6 rounded-r">
                                    <p className="text-sm text-gray-700">
                                        <strong>Attention :</strong> Ces technologies peuvent aussi être utilisées de manière irresponsable
                                        (par exemple, pour créer de fausses informations ou des contenus trompeurs).
                                    </p>
                                </div>
                            </div>
                            <div className="md:w-2/5 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="Applications de l'IA générative"
                                    className="w-full h-auto"
                                    src="documentation/learning/applications-ia.png"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg mt-8 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Conclusion</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Les IA génératives sont des outils puissants qui utilisent l'apprentissage automatique
                            pour créer de nouvelles choses à partir de ce qu'elles ont appris. Que ce soit pour créer des images,
                            des textes ou même des vidéos, elles ont le potentiel de transformer des domaines comme l'art, la
                            science, et bien d'autres. Il est important de comprendre leur fonctionnement pour pouvoir les utiliser
                            de manière responsable et créative !
                        </p>
                        
                        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sources et Lectures complémentaires</h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                <li><a href="https://openai.com/research/" className="text-blue-600 hover:underline">OpenAI Research</a> - Recherches sur les modèles d'IA générative</li>
                                <li><a href="https://arxiv.org/abs/2003.08271" className="text-blue-600 hover:underline">Generative Adversarial Networks (GANs)</a> - Article scientifique</li>
                                <li><a href="https://distill.pub/2016/augmented-rnns/" className="text-blue-600 hover:underline">Distill: Visualizing Neural Networks</a> - Visualisations des réseaux de neurones</li>
                                <li><a href="https://www.deeplearningbook.org/" className="text-blue-600 hover:underline">Deep Learning</a> - Livre de Ian Goodfellow, Yoshua Bengio et Aaron Courville</li>
                            </ul>
                        </div>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};
