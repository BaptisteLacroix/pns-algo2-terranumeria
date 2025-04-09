import { Card, CardBody, Image } from '@heroui/react';

export const Biais: React.FC = () => {
    return (
        <Card className={"m-10 max-w-4xl mx-auto border-2 border-gray-200 rounded-lg"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    {/* En-tête avec une image de fond */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-t-lg mb-5 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-repeat" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
                        <h1 className="text-3xl font-bold text-gray-900 relative z-10">Les Biais dans les Intelligences Artificielles</h1>
                        <p className="text-lg text-gray-700 mt-2 relative z-10 max-w-3xl">
                            Comment les préjugés humains s'inscrivent dans les systèmes d'IA et quelles solutions peuvent être mises en place
                        </p>
                    </div>

                    {/* Introduction avec schéma explicatif */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="md:w-3/5">
                            <p className="text-lg text-gray-800">
                                Les biais dans l'IA sont des distorsions systématiques qui affectent les résultats et les prédictions des systèmes 
                                d'intelligence artificielle. Ces biais peuvent être particulièrement problématiques car ils risquent de perpétuer 
                                ou d'amplifier des inégalités existantes. Comprendre ces biais est essentiel pour développer et utiliser l'IA de 
                                manière responsable.
                            </p>
                        </div>
                        <div className="md:w-2/5 flex justify-center">
                            <Image
                                alt="Schéma illustrant le concept de biais dans l'IA"
                                src="documentation/biais/biais-sources.png"
                                className="rounded-lg shadow-md max-h-60 object-contain"
                            />
                        </div>
                    </div>

                    {/* Section 1: D'où viennent les biais */}
                    <div className="bg-blue-50 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold text-blue-800">1. D'où viennent les biais dans l'IA ?</h2>
                        <div className="flex flex-col md:flex-row gap-6 mt-4">
                            <div className="md:w-3/5">
                                <p className="text-lg text-gray-700">
                                    Les biais dans les systèmes d'IA proviennent principalement de trois sources :
                                </p>
                                <ul className="list-disc pl-5 text-lg text-gray-700 mt-4 space-y-2">
                                    <li><strong>Biais dans les données d'entraînement</strong> : Lorsque les données utilisées pour entraîner les modèles 
                                        contiennent elles-mêmes des préjugés ou ne représentent pas adéquatement tous les groupes.
                                    </li>
                                    <li><strong>Biais algorithmiques</strong> : La façon dont les algorithmes sont conçus peut introduire 
                                        involontairement des biais dans le traitement des informations.
                                    </li>
                                    <li><strong>Biais d'interprétation</strong> : Comment les résultats des modèles sont interprétés et 
                                        appliqués peut également introduire des biais.
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-2/5 flex items-center justify-center">
                                <Image
                                    alt="Sources des biais dans l'IA"
                                    src="documentation/biais/biais-sources.png"
                                    className="rounded-lg shadow-md max-h-60 object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Types de biais avec diagramme */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Types de biais courants dans l'IA</h2>
                        <div className="flex flex-col md:flex-row-reverse gap-6">
                            <div className="md:w-1/2">
                                <p className="text-lg text-gray-700">
                                    Plusieurs types de biais peuvent affecter les systèmes d'IA :
                                </p>
                                <ul className="list-disc pl-5 text-lg text-gray-700 mt-4 space-y-3">
                                    <li><strong>Biais sociétaux</strong> : Reflets des inégalités et préjugés existants dans la société.
                                        Par exemple, un système de recrutement automatisé pourrait favoriser les hommes pour des postes 
                                        techniques si les données d'entraînement reflètent la sous-représentation historique des femmes 
                                        dans ces domaines.
                                    </li>
                                    <li><strong>Biais de sélection</strong> : Quand les données ne sont pas représentatives de la 
                                        population à laquelle le modèle sera appliqué.
                                    </li>
                                    <li><strong>Biais de confirmation</strong> : Tendance à privilégier les informations qui confirment 
                                        des croyances préexistantes et à ignorer les informations contradictoires.
                                    </li>
                                    <li><strong>Biais d'automatisation</strong> : Confiance excessive dans les décisions prises par 
                                        des systèmes automatisés, même lorsqu'elles sont incorrectes.
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/2 flex items-center justify-center">
                                <Image
                                    alt="Types de biais dans l'IA"
                                    src="documentation/biais/biais-ia.png"
                                    className="rounded-lg shadow-md max-h-96 object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Exemples concrets avec étude de cas */}
                    <div className="bg-yellow-50 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold text-yellow-800">3. Exemples concrets de biais dans l'IA</h2>
                        <p className="text-lg text-gray-700 mt-4">
                            Plusieurs cas bien documentés illustrent les problèmes de biais dans l'IA :
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-semibold text-xl text-gray-800">Reconnaissance faciale</h3>
                                <p className="mt-2 text-gray-700">Des études ont montré que certains systèmes de 
                                    reconnaissance faciale ont des taux d'erreur plus élevés pour les femmes à peau foncée que 
                                    pour les hommes à peau claire.</p>
                                <div className="mt-3 text-sm text-gray-500">Étude: "Gender Shades" par Joy Buolamwini et Timnit Gebru</div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-semibold text-xl text-gray-800">Algorithmes de prêt</h3>
                                <p className="mt-2 text-gray-700">Des systèmes d'IA évaluant l'admissibilité au crédit 
                                    ont été trouvés discriminatoires envers certaines minorités, même lorsque les variables 
                                    explicitement liées à l'ethnie étaient exclues.</p>
                                <div className="mt-3 text-sm text-gray-500">Étude: "Algorithmic Lending Discrimination" par Berkeley Law</div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-semibold text-xl text-gray-800">Filtres de CV</h3>
                                <p className="mt-2 text-gray-700">Des systèmes automatisés de filtrage de CV ont montré des 
                                    biais basés sur le genre, l'âge, ou l'origine ethnique déduite des noms.</p>
                                <div className="mt-3 text-sm text-gray-500">Cas: Amazon AI Recruiting Tool (2018)</div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h3 className="font-semibold text-xl text-gray-800">Modèles de langage</h3>
                                <p className="mt-2 text-gray-700">Ces modèles peuvent perpétuer des stéréotypes de genre, 
                                    culturels ou raciaux présents dans leurs données d'entraînement.</p>
                                <div className="mt-3 text-sm text-gray-500">Publications: OpenAI & Stanford HAI</div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Comment détecter les biais */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Comment détecter les biais dans l'IA</h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-3/5">
                                <p className="text-lg text-gray-700">
                                    Identifier les biais dans les systèmes d'IA nécessite des méthodologies rigoureuses :
                                </p>
                                <ol className="list-decimal pl-5 text-lg text-gray-700 mt-4 space-y-2">
                                    <li><strong>Audits des données</strong> : Examiner attentivement la composition des ensembles de données 
                                        d'entraînement pour identifier les déséquilibres ou les sous-représentations.
                                    </li>
                                    <li><strong>Tests d'équité</strong> : Évaluer si le modèle produit des résultats différents pour 
                                        différents groupes démographiques.
                                    </li>
                                    <li><strong>Vérification contrefactuelle</strong> : Tester le modèle avec des entrées similaires 
                                        mais différant uniquement par des attributs sensibles (comme le genre ou l'ethnie).
                                    </li>
                                    <li><strong>Transparence algorithmique</strong> : Comprendre comment le modèle prend ses décisions, 
                                        ce qui peut révéler des biais intégrés.
                                    </li>
                                </ol>
                            </div>
                            <div className="md:w-2/5 flex items-center justify-center">
                                <Image
                                    alt="Méthodes de détection des biais dans l'IA"
                                    src="https://algorithmwatch.org/wp-content/uploads/2020/06/graph.png"
                                    className="rounded-lg shadow-md max-h-64 object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Stratégies pour atténuer les biais */}
                    <div className="bg-green-50 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-semibold text-green-800">5. Stratégies pour atténuer les biais</h2>
                        <div className="flex flex-col md:flex-row-reverse gap-6 mt-4">
                            <div className="md:w-3/5">
                                <p className="text-lg text-gray-700">
                                    Plusieurs approches peuvent aider à réduire les biais dans les systèmes d'IA :
                                </p>
                                <ul className="list-disc pl-5 text-lg text-gray-700 mt-4 space-y-2">
                                    <li><strong>Diversification des données</strong> : S'assurer que les ensembles de données d'entraînement 
                                        sont représentatifs et inclusifs.
                                    </li>
                                    <li><strong>Techniques d'équité algorithmique</strong> : Utiliser des algorithmes conçus pour détecter 
                                        et corriger les biais pendant l'entraînement.
                                    </li>
                                    <li><strong>Équipes diverses</strong> : Inclure des personnes de différents horizons dans les équipes 
                                        développant l'IA pour apporter diverses perspectives.
                                    </li>
                                    <li><strong>Révision humaine</strong> : Maintenir une surveillance humaine des décisions importantes 
                                        prises par l'IA.
                                    </li>
                                    <li><strong>Transparence et explicabilité</strong> : Développer des systèmes d'IA dont les décisions 
                                        peuvent être expliquées et comprises.
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-2/5 flex items-center justify-center">
                                <Image
                                    alt="Cycle de mitigation des biais dans l'IA"
                                    src="https://cdn.cio.com/contents/uploads/2020/02/ai-bias-elimination-cycle-for-continually-reducing-ai-bias.jpg"
                                    className="rounded-lg shadow-md max-h-72 object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Conclusion et responsabilité */}
                    <div className="bg-gray-100 p-6 rounded-lg mt-6 flex flex-col items-start">
                        <h2 className="text-2xl font-semibold text-gray-800">6. Responsabilité éthique et sociale</h2>
                        <div className="flex flex-col md:flex-row gap-6 mt-4">
                            <div className="md:w-2/3">
                                <p className="text-lg text-gray-700">
                                    La lutte contre les biais dans l'IA est une responsabilité partagée :
                                </p>
                                <ul className="list-disc pl-5 text-lg text-gray-700 mt-4 space-y-2">
                                    <li><strong>Pour les développeurs</strong> : Concevoir des systèmes plus équitables et tester 
                                        régulièrement pour détecter les biais.
                                    </li>
                                    <li><strong>Pour les entreprises</strong> : Établir des cadres éthiques pour l'utilisation de l'IA 
                                        et prioriser l'équité dans le développement.
                                    </li>
                                    <li><strong>Pour les régulateurs</strong> : Créer des normes et des cadres juridiques pour prévenir 
                                        la discrimination algorithmique.
                                    </li>
                                    <li><strong>Pour les utilisateurs</strong> : Rester vigilant et signaler les cas suspectés de 
                                        résultats biaisés ou discriminatoires.
                                    </li>
                                </ul>
                                <p className="text-lg text-gray-700 mt-4">
                                    En comprenant et en abordant activement les biais dans l'IA, nous pouvons travailler à développer 
                                    des technologies qui bénéficient équitablement à tous les segments de la société.
                                </p>
                            </div>
                            <div className="md:w-1/3 flex items-center justify-center">
                                <Image
                                    alt="Responsabilité éthique en IA"
                                    src="https://blogs.iadb.org/caribbean-dev-trends/wp-content/uploads/sites/34/2019/06/Artificial-Intelligence-Ethics.jpg"
                                    className="rounded-lg shadow-md max-h-56 object-contain"
                                />
                            </div>
                        </div>

                        {/* Sources */}
                        <div className="mt-8 w-full border-t border-gray-300 pt-4">
                            <h3 className="text-lg font-semibold text-gray-700">Sources et références</h3>
                            <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                <li>Buolamwini, J., & Gebru, T. (2018). <em>Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification</em>. Conference on Fairness, Accountability and Transparency.</li>
                                <li>Mehrabi, N., Morstatter, F., Saxena, N., Lerman, K., & Galstyan, A. (2021). <em>A survey on bias and fairness in machine learning</em>. ACM Computing Surveys.</li>
                                <li>Barocas, S., & Selbst, A. D. (2016). <em>Big data's disparate impact</em>. California Law Review.</li>
                                <li>Mitchell, S., Potash, E., & Barocas, S. (2020). <em>Prediction-Based Decisions and Fairness: A Catalogue of Choices, Assumptions, and Definitions</em>. Annual Review of Statistics and Its Application.</li>
                                <li>Images: AlgorithmWatch, Analytics Vidhya, MIT Media Lab, Berkeley Law</li>
                            </ul>
                        </div>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};

export default Biais;