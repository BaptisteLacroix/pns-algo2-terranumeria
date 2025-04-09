import {Card, CardBody, Divider, Image} from '@heroui/react';

export const Veracite: React.FC = () => {
    return (
        <Card className={"m-10 max-w-5xl mx-auto border-2 border-gray-200 rounded-lg shadow-lg"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    {/* En-tête */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500 shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">La Véracité des Informations dans l'IA</h1>
                        <p className="text-lg text-gray-700 italic">
                            Comment évaluer la fiabilité des informations générées par l'intelligence artificielle
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
                        <div className="md:w-2/3">
                            <p className="text-lg text-gray-800 leading-relaxed">
                                La véracité des informations produites par les systèmes d'intelligence artificielle est un enjeu crucial 
                                à l'ère numérique. Alors que les IAs comme Terra NumerIA deviennent plus présentes dans nos vies, il est 
                                essentiel de comprendre leurs limites en matière de fiabilité et d'exactitude des informations qu'elles produisent.
                            </p>
                        </div>
                        <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                            <Image
                                alt="Illustration de la véracité de l'IA"
                                className="w-full h-auto"
                                src="documentation/veracite/veracite.png"
                            />
                        </div>
                    </div>

                    <Divider className="my-8" />

                    {/* Section 1: Hallucinations de l'IA */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                            <span className="bg-blue-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">1</span>
                            Le phénomène des "hallucinations" de l'IA
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-4">
                            Les "hallucinations" constituent l'un des défis majeurs des grands modèles de langage (LLM) comme ceux 
                            utilisés dans Terra NumerIA.
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r">
                            <p className="text-base text-gray-700">
                                <strong>Point clé :</strong> Les hallucinations sont des informations générées par l'IA qui semblent 
                                plausibles et sont présentées avec assurance, mais qui sont en réalité inexactes, fabriquées ou sans fondement factuel.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Causes principales</h3>
                                <p className="text-base text-gray-600">
                                    Elles surviennent lorsque le modèle tente de compléter des motifs 
                                    de langage sans avoir de connaissances factuelles solides sur le sujet, ou en mélangeant des informations provenant 
                                    de différentes sources dans ses données d'entraînement.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Exemples courants</h3>
                                <p className="text-base text-gray-600">
                                    Citations inventées, références à des recherches inexistantes, 
                                    création d'événements historiques fictifs, ou attribution erronée d'informations à des sources.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Limites des connaissances */}
                    <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                            <span className="bg-blue-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">2</span>
                            Limites des connaissances de l'IA
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="Limites des connaissances de l'IA"
                                    className="w-full h-auto"
                                    src="documentation/veracite/limitations.png"
                                />
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-lg text-gray-700 mb-6">
                                    Les modèles d'IA comme Terra NumerIA ont des limitations inhérentes à leur conception :
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 border-none p-4 rounded-lg shadow-sm">
                                        <h3 className="text-lg font-semibold mb-2">Date limite des connaissances</h3>
                                        <p className="text-gray-700">
                                            Les modèles d'IA sont entraînés sur des données
                                            jusqu'à une certaine date, après laquelle ils n'ont plus de connaissances des événements ou découvertes.
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 border-none p-4 rounded-lg shadow-sm">
                                        <h3 className="text-lg font-semibold mb-2">Absence d'accès à Internet</h3>
                                        <p className="text-gray-700">
                                            Contrairement aux moteurs de recherche, la plupart des IA 
                                            conversationnelles ne peuvent pas rechercher activement de nouvelles informations sur le web en temps réel.
                                        </p>
                                    </div>
                                    <div className="bg-indigo-50 border-none p-4 rounded-lg shadow-sm">
                                        <h3 className="text-lg font-semibold mb-2">Compréhension limitée du contexte</h3>
                                        <p className="text-gray-700">
                                            Les modèles peuvent mal interpréter les nuances 
                                            ou le contexte spécifique d'une question, conduisant à des réponses hors sujet ou inappropriées.
                                        </p>
                                    </div>
                                    <div className="bg-cyan-50 border-none p-4 rounded-lg shadow-sm">
                                        <h3 className="text-lg font-semibold mb-2">Traitement probabiliste</h3>
                                        <p className="text-gray-700">
                                            L'IA ne "sait" pas vraiment des faits mais produit du texte basé 
                                            sur des probabilités statistiques, ce qui peut conduire à des informations qui "sonnent bien" mais sont inexactes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Évaluation de la fiabilité */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                            <span className="bg-blue-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">3</span>
                            Évaluation de la fiabilité des réponses
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-4">
                            Il existe plusieurs indices permettant d'évaluer la fiabilité des informations fournies par une IA :
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <Card className="bg-blue-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Niveau de certitude</h3>
                                    <p className="text-sm text-gray-600">
                                        Les formulations équivoques comme "il me semble que" 
                                        ou "je crois que" peuvent indiquer une incertitude du modèle.
                                    </p>
                                </CardBody>
                            </Card>
                            
                            <Card className="bg-purple-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Incohérences</h3>
                                    <p className="text-sm text-gray-600">
                                        Des contradictions dans une même réponse suggèrent souvent 
                                        un manque de fiabilité dans les informations fournies.
                                    </p>
                                </CardBody>
                            </Card>
                            
                            <Card className="bg-indigo-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Références</h3>
                                    <p className="text-sm text-gray-600">
                                        Les réponses citant des sources précises sont généralement 
                                        plus fiables que des affirmations générales sans attribution.
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                        
                        <div className="mt-6 flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/2 bg-white p-5 rounded-lg shadow-sm border-l-4 border-cyan-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Plausibilité</h3>
                                <p className="text-base text-gray-600">
                                    Les informations extraordinaires ou qui contredisent des connaissances 
                                    établies devraient être traitées avec plus de scepticisme.
                                </p>
                            </div>
                            <div className="md:w-1/2 bg-white p-5 rounded-lg shadow-sm border-l-4 border-teal-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Sujet et temporalité</h3>
                                <p className="text-base text-gray-600">
                                    Les informations sur des sujets spécialisés ou des événements 
                                    récents sont plus susceptibles de contenir des erreurs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Stratégies */}
                    <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                            <span className="bg-blue-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">4</span>
                            Stratégies pour obtenir des informations plus fiables
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-6">
                            Lorsque vous utilisez Terra NumerIA ou d'autres IA, ces pratiques peuvent aider à améliorer la fiabilité 
                            des informations obtenues :
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <div className="bg-blue-100 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-blue-700 font-bold text-lg">1</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Poser des questions précises</h3>
                                    <p className="text-gray-700">
                                        Plus votre question est claire et spécifique, 
                                        plus l'IA a de chances de fournir une réponse pertinente et exacte.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-blue-100 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-blue-700 font-bold text-lg">2</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Demander des clarifications</h3>
                                    <p className="text-gray-700">
                                        Si une réponse semble douteuse, demandez à l'IA 
                                        d'expliquer son raisonnement ou de fournir des sources.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-blue-100 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-blue-700 font-bold text-lg">3</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Vérifier les informations</h3>
                                    <p className="text-gray-700">
                                        Utilisez des sources fiables externes pour confirmer 
                                        les informations importantes fournies par l'IA.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-blue-100 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-blue-700 font-bold text-lg">4</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Interroger par étapes</h3>
                                    <p className="text-gray-700">
                                        Décomposez les questions complexes en plusieurs étapes 
                                        pour permettre à l'IA de traiter l'information plus méthodiquement.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-6">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Conseil pro</h3>
                                    <p className="text-gray-700">
                                        Dans Terra NumerIA, le profil "Scientifique" peut 
                                        être plus rigoureux pour les informations factuelles, tandis que le profil "Professeur" peut être 
                                        préférable pour des explications de concepts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Pensée critique */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center">
                            <span className="bg-blue-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">5</span>
                            L'importance de la pensée critique
                        </h2>
                        <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                            <div className="md:w-2/5 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="La pensée critique face à l'IA"
                                    className="w-full h-auto"
                                    src="documentation/veracite/pensee-critique.png"
                                />
                            </div>
                            <div className="md:w-3/5">
                                <p className="text-lg text-gray-700 mb-4">
                                    Face aux réponses de l'IA, la pensée critique reste votre meilleur outil :
                                </p>
                                <ul className="list-none pl-0 space-y-3">
                                    <li className="flex items-start">
                                        <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Triangulation</strong> : Comparez les informations de l'IA avec plusieurs sources indépendantes 
                                            et fiables avant de les considérer comme exactes.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Contexte d'utilisation</strong> : Adaptez votre niveau d'exigence en matière de précision selon 
                                            l'importance de l'information et son utilisation prévue.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Reconnaissance des limites</strong> : Soyez conscient que certains domaines spécialisés ou techniques 
                                            peuvent dépasser les capacités de l'IA.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mt-8 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. L'avenir de la véracité dans l'IA</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            Les recherches actuelles s'orientent vers l'amélioration de la fiabilité des IA grâce à des techniques 
                            d'auto-évaluation, l'intégration de sources vérifiées, l'apprentissage par renforcement et une transparence accrue.
                        </p>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
                            <p className="text-gray-700 italic">
                                "En attendant ces avancées, n'oubliez jamais que l'IA est un outil d'aide à la réflexion et à 
                                l'information, et non une source définitive de vérité. La responsabilité finale de vérifier 
                                l'exactitude des informations reste entre les mains des utilisateurs humains."
                            </p>
                        </div>
                        
                        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sources et Lectures complémentaires</h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                <li><a href="https://hai.stanford.edu/news/how-large-language-models-will-transform-science-society-and-ai" className="text-blue-600 hover:underline">Stanford HAI</a> - Les impacts des grands modèles de langage</li>
                                <li><a href="https://www.nature.com/articles/s42256-022-00535-y" className="text-blue-600 hover:underline">Nature Journal</a> - Véracité et fiabilité des modèles d'IA</li>
                                <li><a href="https://www.turing.ac.uk/research/publications/opportunities-and-risks-using-ai-information-accessibility" className="text-blue-600 hover:underline">Alan Turing Institute</a> - Opportunités et risques de l'IA dans l'accessibilité de l'information</li>
                            </ul>
                        </div>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};

export default Veracite;