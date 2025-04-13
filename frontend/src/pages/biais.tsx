import { useState, useRef, useEffect } from 'react';
import { Card, CardBody, Image, Button, Tabs, Tab, Divider } from '@heroui/react';

// Composant de carte pour les sections de contenu
const ContentCard: React.FC<{title: string; icon?: string; children: React.ReactNode; variant?: string}> = ({ 
    title, 
    children, 
    variant = "default" 
}) => {
    const variantStyles = {
        default: "bg-white border border-gray-200",
        warning: "bg-yellow/5 border-l-4 border-yellow",
        info: "bg-blue/5 border-l-4 border-blue",
        success: "bg-green/5 border-l-4 border-green"
    };
    
    const style = variantStyles[variant as keyof typeof variantStyles] || variantStyles.default;
    
    return (
        <div className={`p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${style} mb-6`}>
            <h3 className="text-xl font-semibold mb-4 text-darkblue">{title}</h3>
            <div className="text-gray-700">{children}</div>
        </div>
    );
};

export const Biais: React.FC = () => {
    const [, setActiveSection] = useState<string>("introduction");
    const [activeTab, setActiveTab] = useState<string>("societal");
    const sectionRefs = {
        introduction: useRef<HTMLDivElement>(null),
        sources: useRef<HTMLDivElement>(null),
        types: useRef<HTMLDivElement>(null),
        exemples: useRef<HTMLDivElement>(null),
        detection: useRef<HTMLDivElement>(null),
        solutions: useRef<HTMLDivElement>(null),
        conclusion: useRef<HTMLDivElement>(null)
    };
    
    // Observer pour suivre la section visible
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    setActiveSection(id);
                }
            });
        }, options);
        
        // Observer chaque section
        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });
        
        return () => {
            Object.values(sectionRefs).forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, []);
    
    // Fonction pour scroller vers une section
    const scrollToSection = (sectionId: string) => {
        sectionRefs[sectionId as keyof typeof sectionRefs]?.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };
    
    return (
        <Card className={"m-10 max-w-5xl mx-auto border-2 border-gray-200 rounded-lg shadow-lg"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <div className="p-6 bg-white">
                    {/* En-tête */}
                    <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-6 rounded-lg mb-8 border-l-4 border-darkblue shadow-sm">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Les Biais dans l'Intelligence Artificielle</h1>
                        <p className="text-lg text-gray-700 italic">
                            Comprendre et atténuer les distorsions systématiques dans les systèmes d'IA
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
                        <div className="md:w-2/3">
                            <p className="text-lg text-gray-800 leading-relaxed">
                                Les biais dans l'IA sont des distorsions systématiques qui affectent les résultats et les prédictions des systèmes 
                                d'intelligence artificielle. Ces biais peuvent être particulièrement problématiques car ils risquent de perpétuer 
                                ou d'amplifier des inégalités existantes.
                            </p>
                        </div>
                        <div className="md:w-1/3 rounded-lg overflow-hidden shadow-md">
                            <Image
                                alt="Illustration de biais dans l'IA"
                                className="w-full h-auto"
                                src="./documentation/biais/biais-ia.png"
                            />
                        </div>
                    </div>

                    <Divider className="my-8" />
                
                    {/* Section Introduction */}
                    <div id="introduction" ref={sectionRefs.introduction} className="mb-16">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="md:w-3/5">
                                <h2 className="text-3xl font-bold text-darkblue mb-6">Comprendre les biais dans l'IA</h2>
                                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                                    Comprendre ces biais est essentiel pour développer et utiliser l'IA de 
                                    manière responsable et éthique dans notre société de plus en plus automatisée.
                                </p>
                                
                                <div className="mt-8">
                                    <Button 
                                        color="primary" 
                                        className="px-6 py-3 font-medium"
                                        onClick={() => scrollToSection('sources')}
                                    >
                                        Explorer les sources des biais →
                                    </Button>
                                </div>
                            </div>
                            <div className="md:w-2/5">
                                <div className="rounded-lg overflow-hidden shadow-xl border-4 border-white rotate-1 transform hover:rotate-0 transition-transform duration-300">
                                    <Image
                                        alt="Illustration de biais dans l'IA"
                                        className="w-full h-auto"
                                        src="./documentation/biais/comprendre-biais.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Section Sources des biais */}
                    <div id="sources" ref={sectionRefs.sources} className="mb-16 scroll-mt-4">
                        <div className="border-l-4 border-blue pl-6 mb-8">
                            <h2 className="text-3xl font-bold text-darkblue">D'où viennent les biais dans l'IA?</h2>
                            <p className="text-lg text-gray-600 mt-2">Les origines des distorsions dans les systèmes intelligents</p>
                        </div>
                        
                        <p className="text-lg text-gray-700 mb-8">
                            Les biais dans les systèmes d'IA proviennent principalement de trois sources distinctes mais interconnectées.
                            Comprendre ces sources est la première étape pour créer des systèmes plus équitables.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-yellow/10 to-yellow/5 rounded-xl p-6 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <div className="w-14 h-14 bg-yellow/20 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 16.5c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5c0 .5-.5 1-1 1" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-darkblue">Biais dans les données</h3>
                                <p className="text-gray-700">
                                    Lorsque les données utilisées pour entraîner les modèles contiennent elles-mêmes des préjugés ou ne représentent pas adéquatement tous les groupes.
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-blue/10 to-blue/5 rounded-xl p-6 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <div className="w-14 h-14 bg-blue/20 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-darkblue">Biais algorithmiques</h3>
                                <p className="text-gray-700">
                                    La façon dont les algorithmes sont conçus peut introduire involontairement des biais dans le traitement des informations.
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green/10 to-green/5 rounded-xl p-6 shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                <div className="w-14 h-14 bg-green/20 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-darkblue">Biais d'interprétation</h3>
                                <p className="text-gray-700">
                                    Comment les résultats des modèles sont interprétés et appliqués peut également introduire des biais.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Section Types de biais */}
                    <div id="types" ref={sectionRefs.types} className="mb-16 scroll-mt-4">
                        <div className="border-l-4 border-yellow pl-6 mb-8">
                            <h2 className="text-3xl font-bold text-darkblue">Types de biais courants</h2>
                            <p className="text-lg text-gray-600 mt-2">Classification des distorsions rencontrées dans les systèmes d'IA</p>
                        </div>
                        
                        <div className="bg-gray-50 p-8 rounded-xl shadow-sm mb-8">
                            <Tabs aria-label="Types de biais" variant="solid" color="warning" className="mb-4" selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key.toString())}>
                                <Tab key="societal" title="Biais sociétaux">
                                    <div className="space-y-4 p-4 bg-white rounded-lg mt-4">
                                        <h3 className="text-xl font-semibold text-darkblue">Biais sociétaux</h3>
                                        <p className="text-gray-700">
                                            Reflets des inégalités et préjugés existants dans la société. Par exemple, un système de recrutement automatisé pourrait favoriser les hommes pour des postes techniques si les données d'entraînement reflètent la sous-représentation historique des femmes dans ces domaines.
                                        </p>
                                        <div className="p-4 bg-yellow/5 border-l-4 border-yellow rounded-r-lg">
                                            <p className="text-sm text-gray-700">
                                                <strong>Exemple:</strong> Amazon a abandonné un outil de recrutement IA qui discriminait les femmes car il avait été entraîné sur des CV historiquement dominés par des hommes.
                                            </p>
                                        </div>
                                    </div>
                                </Tab>
                                
                                <Tab key="selection" title="Biais de sélection">
                                    <div className="space-y-4 p-4 bg-white rounded-lg mt-4">
                                        <h3 className="text-xl font-semibold text-darkblue">Biais de sélection</h3>
                                        <p className="text-gray-700">
                                            Quand les données ne sont pas représentatives de la population à laquelle le modèle sera appliqué. Par exemple, si un modèle médical est entraîné principalement sur des données de patients caucasiens, il pourrait être moins précis pour d'autres groupes ethniques.
                                        </p>
                                        <div className="p-4 bg-yellow/5 border-l-4 border-yellow rounded-r-lg">
                                            <p className="text-sm text-gray-700">
                                                <strong>Exemple:</strong> Des algorithmes médicaux entraînés principalement sur des données de patients caucasiens ont montré des taux d'erreur plus élevés pour d'autres groupes ethniques.
                                            </p>
                                        </div>
                                    </div>
                                </Tab>
                                
                                <Tab key="confirmation" title="Biais de confirmation">
                                    <div className="space-y-4 p-4 bg-white rounded-lg mt-4">
                                        <h3 className="text-xl font-semibold text-darkblue">Biais de confirmation</h3>
                                        <p className="text-gray-700">
                                            Tendance à privilégier les informations qui confirment des croyances préexistantes et à ignorer les informations contradictoires, menant à des systèmes qui renforcent les idées dominantes.
                                        </p>
                                        <div className="p-4 bg-yellow/5 border-l-4 border-yellow rounded-r-lg">
                                            <p className="text-sm text-gray-700">
                                                <strong>Exemple:</strong> Les algorithmes de recommandation qui créent des "chambres d'écho" en suggérant uniquement du contenu aligné avec les opinions déjà exprimées par l'utilisateur.
                                            </p>
                                        </div>
                                    </div>
                                </Tab>
                                
                                <Tab key="automation" title="Biais d'automatisation">
                                    <div className="space-y-4 p-4 bg-white rounded-lg mt-4">
                                        <h3 className="text-xl font-semibold text-darkblue">Biais d'automatisation</h3>
                                        <p className="text-gray-700">
                                            Confiance excessive dans les décisions prises par des systèmes automatisés, même lorsqu'elles sont incorrectes. Ce phénomène tend à déléguer trop de pouvoir décisionnel aux algorithmes.
                                        </p>
                                        <div className="p-4 bg-yellow/5 border-l-4 border-yellow rounded-r-lg">
                                            <p className="text-sm text-gray-700">
                                                <strong>Exemple:</strong> Des juges suivant les recommandations de systèmes algorithmiques d'évaluation des risques pour la libération conditionnelle, même lorsque ces systèmes ont des biais raciaux documentés.
                                            </p>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                    
                    {/* Section Exemples */}
                    <div id="exemples" ref={sectionRefs.exemples} className="mb-16 scroll-mt-4">
                        <div className="border-l-4 border-green pl-6 mb-8">
                            <h2 className="text-3xl font-bold text-darkblue">Exemples concrets de biais</h2>
                            <p className="text-lg text-gray-600 mt-2">Cas documentés de distorsions dans les systèmes d'IA</p>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="md:w-1/2">
                                <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                                    <h3 className="text-xl font-semibold text-darkblue mb-4">Cas notables de biais algorithmiques</h3>
                                    <ul className="space-y-4">
                                        <li className="flex gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                <span className="text-red-600 font-bold">1</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Reconnaissance faciale biaisée</h4>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Des taux d'erreur significativement plus élevés pour les femmes à peau foncée que pour les hommes à peau claire.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                <span className="text-red-600 font-bold">2</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Algorithmes de prêt discriminatoires</h4>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Systèmes qui défavorisent certaines minorités, même sans variables explicitement liées à l'ethnie.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                                <span className="text-red-600 font-bold">3</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Filtres de CV biaisés</h4>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    Systèmes de filtrage automatique montrant des biais basés sur le genre, l'âge, ou l'origine ethnique déduite des noms.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="md:w-1/2">
                                <div className="rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        alt="Exemple de biais dans la reconnaissance faciale"
                                        className="w-full h-auto"
                                        src="documentation/biais/biais-reconnaissance-faciale.png"
                                    />
                                    <div className="p-4 bg-gray-100">
                                        <p className="text-sm text-gray-700">
                                            Illustration des problèmes de biais dans les technologies de reconnaissance faciale, montrant des taux d'erreur variables selon les caractéristiques démographiques.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Section Détection */}
                    <div id="detection" ref={sectionRefs.detection} className="mb-16 scroll-mt-4">
                        <div className="border-l-4 border-blue pl-6 mb-8">
                            <h2 className="text-3xl font-bold text-darkblue">Comment détecter les biais</h2>
                            <p className="text-lg text-gray-600 mt-2">Méthodes et approches pour identifier les distorsions</p>
                        </div>
                        
                        <div className="bg-blue/5 p-6 rounded-xl mb-8">
                            <p className="text-lg text-gray-700">
                                Identifier les biais dans les systèmes d'IA nécessite des méthodologies rigoureuses et multidimensionnelles.
                                Ces approches permettent d'évaluer et d'améliorer l'équité des systèmes.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ContentCard title="Audits des données" variant="info">
                                <p>
                                    Examiner attentivement la composition des ensembles de données d'entraînement pour identifier les déséquilibres 
                                    ou les sous-représentations de certains groupes démographiques.
                                </p>
                                <div className="mt-4 p-3 bg-blue/5 rounded-lg">
                                    <p className="text-sm">
                                        <strong>Technique:</strong> Analyser les distributions statistiques des variables sensibles dans les données d'entraînement.
                                    </p>
                                </div>
                            </ContentCard>
                            
                            <ContentCard title="Tests d'équité" variant="info">
                                <p>
                                    Évaluer si le modèle produit des résultats différents pour différents groupes démographiques, en mesurant les 
                                    disparités dans les taux d'erreur ou les décisions.
                                </p>
                                <div className="mt-4 p-3 bg-blue/5 rounded-lg">
                                    <p className="text-sm">
                                        <strong>Technique:</strong> Comparer les taux de faux positifs et faux négatifs entre différents groupes démographiques.
                                    </p>
                                </div>
                            </ContentCard>
                            
                            <ContentCard title="Vérification contrefactuelle" variant="info">
                                <p>
                                    Tester le modèle avec des entrées similaires mais différant uniquement par des attributs sensibles (comme le genre 
                                    ou l'ethnie) pour détecter les divergences de traitement.
                                </p>
                                <div className="mt-4 p-3 bg-blue/5 rounded-lg">
                                    <p className="text-sm">
                                        <strong>Technique:</strong> Créer des paires de données synthétiques identiques sauf pour les variables protégées.
                                    </p>
                                </div>
                            </ContentCard>
                            
                            <ContentCard title="Transparence algorithmique" variant="info">
                                <p>
                                    Comprendre comment le modèle prend ses décisions, ce qui peut révéler des biais intégrés dans le processus 
                                    de raisonnement de l'IA.
                                </p>
                                <div className="mt-4 p-3 bg-blue/5 rounded-lg">
                                    <p className="text-sm">
                                        <strong>Technique:</strong> Utiliser des méthodes d'explicabilité comme SHAP (SHapley Additive exPlanations) ou LIME.
                                    </p>
                                </div>
                            </ContentCard>
                        </div>
                    </div>
                    
                    {/* Section Solutions */}
                    <div id="solutions" ref={sectionRefs.solutions} className="mb-16 scroll-mt-4">
                        <div className="border-l-4 border-green pl-6 mb-8">
                            <h2 className="text-3xl font-bold text-darkblue">Stratégies pour atténuer les biais</h2>
                            <p className="text-lg text-gray-600 mt-2">Approches pour développer des systèmes d'IA plus équitables</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    alt="Stratégies pour réduire les biais dans l'IA"
                                    className="w-full h-auto"
                                    src="documentation/biais/biais-strategies.png"
                                />
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-lg text-gray-700">
                                    Plusieurs approches complémentaires peuvent aider à réduire les biais dans les systèmes d'IA et à créer des technologies plus inclusives.
                                </p>
                                
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green/20 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Diversification des données</h4>
                                            <p className="text-gray-600 text-sm mt-1">
                                                S'assurer que les ensembles de données d'entraînement sont représentatifs et inclusifs de tous les groupes concernés.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green/20 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Techniques d'équité algorithmique</h4>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Intégrer des contraintes d'équité directement dans les algorithmes pour détecter et corriger les biais pendant l'entraînement.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green/20 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Équipes diverses</h4>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Inclure des personnes de différents horizons dans les équipes développant l'IA pour apporter diverses perspectives.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green/20 rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Transparence et explicabilité</h4>
                                            <p className="text-gray-600 text-sm mt-1">
                                                Développer des systèmes d'IA dont les décisions peuvent être expliquées et comprises par les utilisateurs et les parties prenantes.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Conclusion */}
                    <div id="conclusion" ref={sectionRefs.conclusion} className="scroll-mt-4">
                        <div className="bg-gradient-to-r from-blue/10 to-green/10 p-8 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-darkblue mb-6">Responsabilité éthique et sociale</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                La lutte contre les biais dans l'IA est une responsabilité partagée entre développeurs, 
                                entreprises, régulateurs et utilisateurs. En comprenant et en abordant activement ces biais, 
                                nous pouvons travailler à développer des technologies qui bénéficient équitablement à tous 
                                les segments de la société.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                C'est une étape cruciale pour que l'IA réalise son plein potentiel 
                                en tant qu'outil positif de progrès social tout en minimisant les risques d'amplification des inégalités existantes.
                            </p>
                            
                            <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Sources et Lectures complémentaires</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <li className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <a href="https://www.brookings.edu/articles/algorithmic-bias-detection-and-mitigation-best-practices-and-policies-to-reduce-consumer-harms/" className="text-blue hover:underline">Brookings Institution - Détection et atténuation des biais algorithmiques</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <a href="https://hai.stanford.edu/news/ai-bias" className="text-blue hover:underline">Stanford HAI - Recherche sur les biais dans l'IA</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <a href="https://www.nature.com/articles/s42256-019-0088-2" className="text-blue hover:underline">Nature Journal - Biais dans les systèmes d'IA médicale</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <a href="https://www.technologyreview.com/2019/01/29/137676/algorithms-criminal-justice-ai/" className="text-blue hover:underline">MIT Technology Review - Algorithmes dans la justice pénale</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default Biais;
