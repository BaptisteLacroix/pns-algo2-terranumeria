import {Card, CardBody, Divider, Image} from '@heroui/react';

export const Mathematiques: React.FC = () => {
    return (
        <Card className={"m-10 max-w-5xl mx-auto border-2 border-gray-200 rounded-lg shadow-lg"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    {/* En-tête */}
                    <div className="bg-gradient-to-r from-blue-50 to-darkblue/10 p-6 rounded-lg mb-8 border-l-4 border-blue shadow-sm">
                        <h1 className="text-3xl font-bold text-darkblue mb-4">Les Mathématiques dans l'IA</h1>
                        <p className="text-lg text-gray-700 italic">
                            Explorer les fondements mathématiques qui permettent aux intelligences artificielles de fonctionner
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
                        <div className="md:w-2/3">
                            <p className="text-lg text-gray-800 leading-relaxed">
                                Les mathématiques constituent le langage fondamental sur lequel repose toute l'intelligence artificielle. 
                                De l'algèbre linéaire aux probabilités, en passant par le calcul différentiel, comprendre ces fondements 
                                mathématiques permet de mieux saisir comment fonctionnent réellement les systèmes d'IA comme Terra NumerIA.
                            </p>
                        </div>
                        <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                            <Image
                                alt="Illustration de mathématiques dans l'IA"
                                className="w-full h-auto"
                                src="documentation/maths/maths.png"
                            />
                        </div>
                    </div>

                    <Divider className="my-8" />

                    {/* Section 1: Algèbre linéaire */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-blue mb-4 flex items-center">
                            <span className="bg-blue text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">1</span>
                            L'algèbre linéaire : la fondation
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-4">
                            L'algèbre linéaire est au cœur de presque tous les systèmes d'IA modernes.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue/10 border-none p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">Vecteurs et matrices</h3>
                                <p className="text-gray-700">
                                    Dans l'IA, les données sont représentées sous forme de vecteurs 
                                    (séquences ordonnées de nombres) et les opérations sont effectuées via des matrices. Par exemple, 
                                    le mot "chat" peut être représenté comme un vecteur dans un espace à plusieurs dimensions.
                                </p>
                            </div>
                            <div className="bg-blue/20 border-none p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">Espaces vectoriels</h3>
                                <p className="text-gray-700">
                                    Ces structures mathématiques permettent de représenter des 
                                    concepts abstraits dans des espaces multidimensionnels, où la similarité peut être mesurée par 
                                    des distances ou des angles entre vecteurs.
                                </p>
                            </div>
                            <div className="bg-blue/30 border-none p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">Transformations linéaires</h3>
                                <p className="text-gray-700">
                                    Dans les réseaux de neurones, les transformations 
                                    linéaires (suivies de fonctions non linéaires) permettent de transformer les données d'entrée 
                                    en prédictions ou en nouvelles représentations.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Calcul différentiel */}
                    <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-blue mb-4 flex items-center">
                            <span className="bg-blue text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">2</span>
                            Le calcul différentiel et l'optimisation
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="Illustration du calcul différentiel dans l'IA"
                                    className="w-full h-auto"
                                    src="documentation/maths/calcul-diff.png"
                                />
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-lg text-gray-700 mb-4">
                                    L'apprentissage dans les modèles d'IA modernes repose fortement sur le calcul différentiel.
                                </p>
                                <div className="bg-yellow/10 border-l-4 border-yellow p-4 mb-4 rounded-r">
                                    <p className="text-base text-gray-700">
                                        <strong>Point clé :</strong> La descente de gradient, méthode fondamentale en IA, utilise des dérivées 
                                        pour trouver progressivement les paramètres optimaux d'un modèle.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue">
                                        <h3 className="text-xl font-medium text-gray-800 mb-2">Dérivées et gradient</h3>
                                        <p className="text-base text-gray-600">
                                            Ces concepts permettent de déterminer 
                                            comment modifier les paramètres d'un modèle pour améliorer ses performances. Le gradient 
                                            indique la direction de la plus forte augmentation d'une fonction.
                                        </p>
                                    </div>
                                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green">
                                        <h3 className="text-xl font-medium text-gray-800 mb-2">Rétropropagation</h3>
                                        <p className="text-base text-gray-600">
                                            Cette méthode utilise la règle de chaîne du calcul différentiel 
                                            pour calculer efficacement les gradients dans les réseaux de neurones profonds.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Probabilités et statistiques */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-blue mb-4 flex items-center">
                            <span className="bg-blue text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">3</span>
                            Probabilités et statistiques
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-6">
                            Les fondements probabilistes sont essentiels pour comprendre comment les modèles d'IA gèrent l'incertitude.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <div className="bg-blue/10 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-blue font-bold text-lg">A</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Distributions de probabilité</h3>
                                    <p className="text-gray-700">
                                        Elles modélisent l'incertitude dans les données et 
                                        les prédictions. Par exemple, les modèles de langage comme Terra NumerIA prédisent la probabilité 
                                        de chaque mot qui pourrait suivre dans une séquence.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-blue/10 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-blue font-bold text-lg">B</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Maximum de vraisemblance</h3>
                                    <p className="text-gray-700">
                                        Cette méthode statistique est utilisée pour estimer 
                                        les paramètres des modèles qui maximisent la probabilité d'observer les données d'entraînement.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-blue/10 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-blue font-bold text-lg">C</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Inférence bayésienne</h3>
                                    <p className="text-gray-700">
                                        Cette approche permet de mettre à jour les croyances 
                                        probabilistes en fonction de nouvelles données, offrant un cadre formel pour l'apprentissage.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-blue/10 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-blue font-bold text-lg">D</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Entropie et information</h3>
                                    <p className="text-gray-700">
                                        Ces concepts quantifient l'incertitude et 
                                        l'information partagée entre variables, essentiels pour comprendre ce qu'un modèle a "appris".
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Divider className="my-8" />

                    {/* Section 4: Graphes et structures discrètes */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-blue mb-4 flex items-center">
                            <span className="bg-blue text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">4</span>
                            Graphes et structures discrètes
                        </h2>
                        
                        <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                            <div className="md:w-2/5 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="Illustration de théorie des graphes dans l'IA"
                                    className="w-full h-auto"
                                    src="documentation/maths/graphes.png"
                                />
                            </div>
                            <div className="md:w-3/5">
                                <p className="text-lg text-gray-700 mb-4">
                                    Les structures discrètes sont fondamentales pour représenter les relations entre entités.
                                </p>
                                <ul className="list-none pl-0 space-y-3">
                                    <li className="flex items-start">
                                        <span className="bg-blue/10 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Théorie des graphes</strong> : Utilisée pour modéliser des réseaux de relations complexes, 
                                            comme les réseaux sociaux ou les liens entre concepts.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-blue/10 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Arbres de décision</strong> : Structures hiérarchiques utilisées dans certains algorithmes 
                                            d'apprentissage pour diviser l'espace des caractéristiques en régions de décision.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-blue/10 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Chaînes de Markov</strong> : Modèles probabilistes où la prédiction du futur ne dépend 
                                            que de l'état présent, utilisés dans la génération de texte et la modélisation de séquences.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Géométrie et topologie */}
                    <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-blue mb-4 flex items-center">
                            <span className="bg-blue text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">5</span>
                            Géométrie et topologie
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            Ces domaines aident à comprendre la structure des données dans des espaces de haute dimension.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-blue/10 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Distances et métriques</h3>
                                    <p className="text-sm text-gray-600">
                                        Mesures qui quantifient la similarité ou la différence 
                                        entre des points de données, cruciales pour les algorithmes de clustering et de classification.
                                    </p>
                                </CardBody>
                            </Card>
                            
                            <Card className="bg-blue/20 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Variétés et dimensionnalité</h3>
                                    <p className="text-sm text-gray-600">
                                        Techniques pour comprendre et 
                                        visualiser des données de haute dimension, comme l'analyse en composantes principales (ACP).
                                    </p>
                                </CardBody>
                            </Card>
                            
                            <Card className="bg-blue/30 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Espaces de plongement</h3>
                                    <p className="text-sm text-gray-600">
                                        Représentations de concepts discrets 
                                        (comme des mots) dans des espaces continus, permettant de capturer des relations sémantiques.
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    {/* Section 6: Application dans les modèles de langage */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-blue mb-4 flex items-center">
                            <span className="bg-blue text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">6</span>
                            Application dans les modèles de langage
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-6">
                            Dans les modèles comme Terra NumerIA, ces concepts mathématiques se combinent de façon élégante.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Représentations vectorielles</h3>
                                <p className="text-base text-gray-600">
                                    Les mots sont convertis en vecteurs denses 
                                    (embeddings) qui capturent leur signification dans un espace multidimensionnel.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Mécanismes d'attention</h3>
                                <p className="text-base text-gray-600">
                                    Ces opérations matricielles permettent au modèle 
                                    de se concentrer sur différentes parties du contexte, pondérant dynamiquement l'importance 
                                    de chaque mot pour la prédiction.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Têtes d'attention multiples</h3>
                                <p className="text-base text-gray-600">
                                    Permettent au modèle de capturer différents 
                                    types de relations (grammaticales, sémantiques, etc.) entre les mots d'une phrase.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Modèles génératifs</h3>
                                <p className="text-base text-gray-600">
                                    Utilisent des distributions probabilistes pour générer 
                                    du texte cohérent, en prédisant la probabilité de chaque mot suivant possible.
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-center">
                            <Image
                                alt="Représentation des mathématiques dans un modèle de langage"
                                className="max-w-full h-auto rounded-lg shadow-md"
                                src="documentation/maths/maths-langage.png"
                            />
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-gradient-to-r from-blue/10 to-green/10 p-6 rounded-lg mt-8 shadow-sm">
                        <h2 className="text-2xl font-semibold text-darkblue mb-4">7. Pourquoi comprendre ces mathématiques ?</h2>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                            La compréhension des fondements mathématiques de l'IA offre plusieurs avantages :
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                                <span className="bg-blue/10 p-1 rounded-full mr-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold">Meilleure utilisation</h3>
                                    <p className="text-sm text-gray-600">Comprendre les capacités et limites intrinsèques 
                                        des modèles permet de formuler des requêtes plus efficaces.</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                                <span className="bg-blue/10 p-1 rounded-full mr-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold">Interprétation critique</h3>
                                    <p className="text-sm text-gray-600">Évaluer la fiabilité des réponses en comprenant 
                                        comment elles sont générées.</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                                <span className="bg-blue/10 p-1 rounded-full mr-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold">Développement</h3>
                                    <p className="text-sm text-gray-600">Pour ceux qui souhaitent créer ou modifier des modèles d'IA, 
                                        ces connaissances sont indispensables.</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                                <span className="bg-blue/10 p-1 rounded-full mr-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold">Démystification</h3>
                                    <p className="text-sm text-gray-600">Réduire l'"effet boîte noire" en comprenant les principes 
                                        fondamentaux qui animent ces systèmes complexes.</p>
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-lg text-gray-700 mt-4 italic">
                            "Bien qu'il ne soit pas nécessaire de maîtriser toutes ces mathématiques pour utiliser efficacement 
                            des systèmes comme Terra NumerIA, une compréhension de base de ces concepts permet d'apprécier la 
                            beauté et la complexité de ces technologies, tout en les utilisant de manière plus éclairée."
                        </p>
                        
                        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sources et Lectures complémentaires</h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                <li><a href="https://www.deeplearningbook.org/" className="text-blue hover:underline">Deep Learning</a> - Livre de Ian Goodfellow, Yoshua Bengio et Aaron Courville</li>
                                <li><a href="https://mml-book.github.io/" className="text-blue hover:underline">Mathematics for Machine Learning</a> - Livre de Marc Peter Deisenroth, A. Aldo Faisal, et Cheng Soon Ong</li>
                                <li><a href="https://www.khanacademy.org/math/linear-algebra" className="text-blue hover:underline">Khan Academy</a> - Cours d'algèbre linéaire</li>
                                <li><a href="https://www.3blue1brown.com/topics/linear-algebra" className="text-blue hover:underline">3Blue1Brown</a> - Visualisations de concepts mathématiques</li>
                            </ul>
                        </div>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};

export default Mathematiques;