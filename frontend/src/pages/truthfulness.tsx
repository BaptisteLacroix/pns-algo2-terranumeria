import { Card, CardBody } from "@heroui/react";

export const Truthfulness: React.FC = () => {
    return (
        <Card className={"m-10 max-w-4xl mx-auto border-none rounded-none"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    <div className="bg-darkblue p-4 rounded-none mb-5">
                        <h1 className="text-3xl font-bold text-white">
                            La Véracité de l'Information Produite par les IA
                            Génératives
                        </h1>
                    </div>
                    <p className="text-lg text-darkblue">
                        Avec l'essor des intelligences artificielles
                        génératives, la question de la fiabilité des
                        informations qu'elles produisent est cruciale. Ces
                        modèles sont capables de générer des textes cohérents et
                        convaincants, mais cela ne garantit pas toujours leur
                        exactitude. Comprendre comment ces IA fonctionnent
                        permet d'identifier leurs forces et leurs limites en
                        matière de véracité.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Comment les IA Génératives Produisent-elles des
                        Informations ?
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        Les IA génératives, comme les modèles de langage,
                        s'appuient sur de vastes ensembles de données textuelles
                        pour apprendre des structures linguistiques et des
                        associations d’idées. Leur objectif n'est pas de
                        produire la vérité, mais de générer un texte qui semble
                        plausible en fonction du contexte donné. Cette approche
                        statistique signifie qu'elles peuvent, involontairement,
                        produire des erreurs, voire inventer des faits.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Les Facteurs qui Influencent la Fiabilité des Réponses
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        Plusieurs éléments peuvent impacter la véracité des
                        informations générées par une IA :
                    </p>
                    <p className="text-lg text-darkblue mt-2">
                        - <strong>La qualité des données d'entraînement</strong>{" "}
                        : Si une IA apprend sur des données incorrectes ou
                        biaisées, elle risque de produire des réponses erronées.
                    </p>
                    <p className="text-lg text-darkblue mt-2">
                        - <strong>L'absence de validation des sources</strong> :
                        Contrairement aux moteurs de recherche, les modèles de
                        langage ne citent pas directement leurs sources, ce qui
                        rend difficile la vérification des informations qu'ils
                        génèrent.
                    </p>
                    <p className="text-lg text-darkblue mt-2">
                        - <strong>Le phénomène des "hallucinations"</strong> :
                        Les IA génératives peuvent inventer des faits, parfois
                        avec un grand niveau de détail, rendant leurs erreurs
                        d’autant plus trompeuses.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Comment Vérifier les Informations Générées par une IA ?
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        Il est essentiel d'adopter une approche critique face
                        aux informations produites par les IA génératives. Voici
                        quelques bonnes pratiques :
                    </p>
                    <p className="text-lg text-darkblue mt-2">
                        - Recouper les réponses avec des sources fiables comme
                        des articles académiques, des sites d'actualités réputés
                        ou des publications officielles.
                    </p>
                    <p className="text-lg text-darkblue mt-2">
                        - Vérifier si l'information est cohérente avec des faits
                        connus et éviter de prendre pour acquis des affirmations
                        non sourcées.
                    </p>
                    <p className="text-lg text-darkblue mt-2">
                        - Utiliser des outils de fact-checking et interroger
                        plusieurs IA pour comparer leurs réponses.
                    </p>

                    <div className="bg-darkblue p-4 rounded-none mt-6 flex flex-col items-start">
                        <h2 className="text-2xl font-semibold text-primary">
                            Conclusion
                        </h2>
                        <p className="text-lg text-white mt-2">
                            Bien que les IA génératives soient des outils
                            puissants pour produire du texte et synthétiser des
                            idées, elles ne garantissent pas la véracité des
                            informations qu'elles produisent. Une approche
                            critique et une vérification systématique restent
                            essentielles pour éviter la propagation
                            d’informations erronées et assurer une utilisation
                            responsable de ces technologies.
                        </p>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};
