import {Card, CardBody, Divider, Image} from '@heroui/react';

export const EspaceVectoriel: React.FC = () => {
    return (
        <Card className={"m-10 max-w-5xl mx-auto border-2 border-gray-200 rounded-lg shadow-lg"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    {/* En-tête */}
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mb-8 border-l-4 border-green-500 shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Les Espaces Vectoriels et l'IA</h1>
                        <p className="text-lg text-gray-700 italic">
                            Comment les structures mathématiques fondamentales permettent aux IA de représenter le monde
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
                        <div className="md:w-2/3">
                            <p className="text-lg text-gray-800 leading-relaxed">
                                Les espaces vectoriels sont des structures mathématiques fondamentales qui constituent 
                                la colonne vertébrale des technologies d'intelligence artificielle modernes. Comprendre 
                                ce concept est essentiel pour saisir comment les modèles comme Terra NumerIA représentent 
                                et manipulent l'information.
                            </p>
                        </div>
                        <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                            <Image
                                alt="Illustration d'espaces vectoriels"
                                className="w-full h-auto"
                                src="documentation/espace-vectoriel/espace-vectoriel.png"
                            />
                        </div>
                    </div>

                    <Divider className="my-8" />

                    {/* Section 1: Définition */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">1</span>
                            Qu'est-ce qu'un espace vectoriel ?
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-4">
                            Un espace vectoriel est une structure mathématique qui formalise la notion d'opérations 
                            sur des objets géométriques (vecteurs).
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r">
                            <p className="text-base text-gray-700">
                                <strong>Définition formelle :</strong> Un ensemble d'éléments (vecteurs) sur lesquels on peut 
                                effectuer deux opérations : l'addition de vecteurs et la multiplication par un scalaire, en respectant 
                                certains axiomes (associativité, commutativité, existence d'éléments neutres, etc.).
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 border-none p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">Exemples intuitifs</h3>
                                <p className="text-gray-700">
                                    L'espace 2D ou 3D auquel nous sommes habitués, où les vecteurs 
                                    peuvent représenter des directions et des magnitudes, est un exemple d'espace vectoriel.
                                </p>
                            </div>
                            <div className="bg-teal-50 border-none p-4 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-2">Généralisation</h3>
                                <p className="text-gray-700">
                                    En IA, nous utilisons souvent des espaces vectoriels de très haute 
                                    dimension (plusieurs centaines ou milliers) qui dépassent notre intuition géométrique directe.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Vecteurs dans le traitement du langage */}
                    <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">2</span>
                            Les vecteurs dans le traitement du langage
                        </h2>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="Word embeddings illustration"
                                    className="w-full h-auto"
                                    src="documentation/espace-vectoriel/example.png"
                                />
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-lg text-gray-700 mb-4">
                                    Dans les modèles de langage comme Terra NumerIA, les mots et les concepts sont représentés 
                                    comme des vecteurs dans un espace de haute dimension.
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-400">
                                        <h3 className="text-xl font-medium text-gray-800 mb-2">Word embeddings</h3>
                                        <p className="text-base text-gray-600">
                                            Technique qui consiste à associer à chaque mot un vecteur 
                                            dense de nombres réels. Des mots sémantiquement similaires auront des vecteurs proches dans cet espace.
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-400">
                                        <h3 className="text-xl font-medium text-gray-800 mb-2">Propriétés algébriques</h3>
                                        <p className="text-base text-gray-600">
                                            Ces représentations vectorielles capturent des relations 
                                            sémantiques. Par exemple, la célèbre équation : vecteur("reine") - vecteur("roi")
                                            ≈ vecteur("femme") - vecteur("homme").
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Opérations et métriques vectorielles */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">3</span>
                            Opérations et métriques vectorielles
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-6">
                            La puissance des espaces vectoriels réside dans les opérations qu'ils permettent d'effectuer.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <div className="bg-green-100 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-green-700 font-bold text-lg">1</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Produit scalaire (dot product)</h3>
                                    <p className="text-gray-700">
                                        Mesure la similarité entre deux vecteurs, 
                                        fondamentale pour déterminer la proximité sémantique entre concepts.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-green-100 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-green-700 font-bold text-lg">2</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Distance euclidienne</h3>
                                    <p className="text-gray-700">
                                        Quantifie la dissimilarité entre vecteurs, permettant 
                                        de mesurer à quel point deux concepts sont éloignés.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-green-100 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-green-700 font-bold text-lg">3</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Similarité cosinus</h3>
                                    <p className="text-gray-700">
                                        Mesure l'angle entre deux vecteurs, particulièrement utile 
                                        pour comparer des textes ou des documents indépendamment de leur longueur.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-green-100 rounded-full mr-3 mt-1 h-8 w-8 flex items-center justify-center">
                                    <span className="text-green-700 font-bold text-lg">4</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Norme</h3>
                                    <p className="text-gray-700">
                                        La "magnitude" d'un vecteur, souvent utilisée pour normaliser les 
                                        représentations et faciliter les comparaisons.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Divider className="my-8" />

                    {/* Section 4: Mécanisme d'attention */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">4</span>
                            Le mécanisme d'attention et les espaces vectoriels
                        </h2>
                        
                        <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
                            <div className="md:w-2/5 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    alt="Illustration du mécanisme d'attention"
                                    className="w-full h-auto"
                                    src="documentation/espace-vectoriel/attention.png"
                                />
                            </div>
                            <div className="md:w-3/5">
                                <p className="text-lg text-gray-700 mb-4">
                                    Les architectures modernes comme les Transformers, qui sous-tendent Terra NumerIA, utilisent 
                                    intensivement les opérations vectorielles.
                                </p>
                                <ul className="list-none pl-0 space-y-3">
                                    <li className="flex items-start">
                                        <span className="bg-teal-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Attention</strong> : Ce mécanisme calcule une pondération des mots d'entrée en fonction 
                                            de leur importance pour la prédiction actuelle, essentiellement par des produits matriciels.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-teal-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Requêtes, clés et valeurs</strong> : Trois projections vectorielles différentes de chaque token, 
                                            utilisées pour calculer les scores d'attention et agréger l'information.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-teal-100 p-1 rounded-full mr-2 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                        <span className="text-gray-700"><strong>Multi-tête</strong> : Permet au modèle de prêter attention à différents aspects 
                                            de l'information en parallèle, via plusieurs sous-espaces vectoriels.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Transformations linéaires et non-linéaires */}
                    <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">5</span>
                            Transformations linéaires et non-linéaires
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            L'apprentissage dans les modèles d'IA consiste essentiellement à trouver les bonnes transformations 
                            d'espaces vectoriels.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="bg-green-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Couches denses</h3>
                                    <p className="text-sm text-gray-600">
                                        Aussi appelées "fully connected", ces couches appliquent une 
                                        transformation linéaire aux vecteurs d'entrée via une matrice de poids.
                                    </p>
                                </CardBody>
                            </Card>
                            
                            <Card className="bg-teal-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Fonctions d'activation</h3>
                                    <p className="text-sm text-gray-600">
                                        Transformations non-linéaires (comme ReLU, GELU ou softmax) 
                                        appliquées après les transformations linéaires pour introduire de la complexité.
                                    </p>
                                </CardBody>
                            </Card>
                            
                            <Card className="bg-emerald-50 border-none shadow-sm">
                                <CardBody>
                                    <div className="h-12 flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-center">Projection et rotations</h3>
                                    <p className="text-sm text-gray-600">
                                        Géométriquement, chaque couche du réseau effectue une combinaison 
                                        de projections, rotations et déformations dans l'espace vectoriel.
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                    {/* Section 6: Espaces latents et génération */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                            <span className="bg-green-600 text-white rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">6</span>
                            Espaces latents et génération
                        </h2>
                        <p className="text-lg text-gray-700 mt-2 mb-6">
                            Les modèles génératifs comme Terra NumerIA s'appuient sur des espaces latents sophistiqués.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Espaces latents</h3>
                                <p className="text-base text-gray-600">
                                    Représentations vectorielles intermédiaires qui capturent les 
                                    caractéristiques abstraites des données.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-teal-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Génération séquentielle</h3>
                                <p className="text-base text-gray-600">
                                    Les modèles de langage génèrent du texte en navigant pas 
                                    à pas dans l'espace vectoriel, chaque token influençant la position du suivant.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-emerald-400">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Paramètre de température</h3>
                                <p className="text-base text-gray-600">
                                    Ce réglage (disponible dans Terra NumerIA) contrôle 
                                    la dispersion dans l'espace vectoriel lors de l'échantillonnage du prochain token, influençant 
                                    la créativité et la diversité des réponses.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                            <p className="text-base text-gray-700">
                                <strong>Aspect intéressant :</strong> Changer le paramètre de température dans Terra NumerIA revient à 
                                modifier la façon dont le modèle explore l'espace vectoriel des mots. Une température élevée favorise 
                                l'exploration de régions plus éloignées de cet espace, produisant des réponses plus diverses et créatives.
                            </p>
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mt-8 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Applications pratiques des espaces vectoriels</h2>
                        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                            Comprendre les espaces vectoriels permet de mieux appréhender diverses applications :
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                                <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold">Recherche sémantique</h3>
                                    <p className="text-sm text-gray-600">Trouver des documents similaires en comparant 
                                        leurs représentations vectorielles.</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                                <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold">Classification</h3>
                                    <p className="text-sm text-gray-600">Catégoriser des textes en identifiant dans quelle région 
                                        de l'espace vectoriel ils se situent.</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                                <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold">Traduction</h3>
                                    <p className="text-sm text-gray-600">Naviguer d'un espace vectoriel d'une langue à celui d'une autre.</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                                <span className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <div>
                                    <h3 className="text-lg font-semibold">Résumé</h3>
                                    <p className="text-sm text-gray-600">Condenser l'information en préservant les aspects les plus importants 
                                        dans l'espace vectoriel.</p>
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-lg text-gray-700 mt-4 italic">
                            "Les espaces vectoriels offrent un cadre mathématique élégant qui permet de comprendre comment les modèles 
                            d'IA représentent, manipulent et génèrent du langage. Ils transforment des concepts abstraits comme les 
                            mots et les idées en objets mathématiques concrets que les ordinateurs peuvent traiter, constituant ainsi 
                            le pont fondamental entre le langage humain et le calcul machine."
                        </p>
                        
                        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sources et Lectures complémentaires</h3>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                <li><a href="https://www.tensorflow.org/text/guide/word_embeddings" className="text-blue-600 hover:underline">TensorFlow - Word Embeddings</a> - Guide sur les plongements lexicaux</li>
                                <li><a href="https://jalammar.github.io/illustrated-transformer/" className="text-blue-600 hover:underline">The Illustrated Transformer</a> - Visualisation des mécanismes d'attention</li>
                                <li><a href="https://distill.pub/2019/computing-receptive-fields/" className="text-blue-600 hover:underline">Distill - Understanding Representations</a> - Comment les modèles représentent l'information</li>
                                <li><a href="https://web.stanford.edu/class/cs224n/" className="text-blue-600 hover:underline">Stanford CS224N</a> - Cours sur le traitement du langage naturel et les représentations vectorielles</li>
                            </ul>
                        </div>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};

export default EspaceVectoriel;