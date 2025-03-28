import { Card, CardBody } from "@heroui/react";

export const Learning: React.FC = () => {
    return (
        <Card className={"m-10 max-w-4xl mx-auto border-none rounded-none"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    <div className="bg-darkblue p-4 rounded-none mb-5">
                        <h1 className="text-3xl font-bold text-white">
                            Comprendre l'Apprentissage des IA Génératives
                        </h1>
                    </div>
                    <p className="text-lg text-darkblue">
                        Les IA génératives sont des intelligences artificielles
                        capables de créer de nouvelles choses, comme des images,
                        des textes, des musiques, ou même des vidéos. Leur
                        fonctionnement repose sur un processus d'apprentissage
                        où elles apprennent à partir d'exemples pour ensuite
                        produire de nouvelles créations. Mais comment ça marche
                        exactement ? Voyons cela étape par étape !
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Qu'est-ce que l'Apprentissage Automatique ?
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        L'apprentissage automatique (ou <i>machine learning</i> en
                        anglais) est un type d'intelligence artificielle qui
                        permet à un ordinateur d'apprendre à partir de données
                        sans être explicitement programmé pour chaque tâche.
                        Cela signifie que l'IA analyse des informations (par
                        exemple, des images ou des textes) et apprend à en tirer
                        des règles ou des motifs pour mieux prédire ou créer
                        quelque chose de nouveau.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Qu'est-ce que l'Apprentissage Génératif ?
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        L'apprentissage génératif est une sous-catégorie de
                        l'apprentissage automatique où l'IA apprend non
                        seulement à reconnaître des motifs dans des données,
                        mais aussi à *générer* de nouvelles données qui
                        ressemblent à celles qu'elle a étudiées. Par exemple,
                        une IA générative pourrait apprendre à partir de
                        milliers de photos de chats et ensuite créer une toute
                        nouvelle image d'un chat qui n'existe pas dans la
                        réalité !
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Comment l'IA Apprend-elle à Générer des Contenus ?
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        L'IA générative apprend par un processus appelé{" "}
                        <strong>entraînement</strong>. Voici comment cela se
                        passe généralement :
                    </p>
                    <ol className="list-decimal pl-5 text-lg text-darkblue mt-4">
                        <li>
                            Collecte de Données : L'IA commence par "regarder"
                            des tonnes d'exemples. Par exemple, pour générer des
                            textes, elle pourrait lire des milliers de livres,
                            articles, ou dialogues. Pour générer des images,
                            elle pourrait analyser des millions de photos et de
                            dessins.
                        </li>
                        <li>
                            Comprendre les Motifs : L'IA essaie de comprendre
                            les caractéristiques communes de ces exemples. Par
                            exemple, si elle regarde des photos de chats, elle
                            pourrait apprendre que les chats ont des oreilles
                            pointues, des moustaches et une fourrure douce.
                        </li>
                        <li>
                            Apprentissage par Répétition : L'IA fait beaucoup
                            d’essais et d’erreurs. Elle génère des exemples à
                            partir de ce qu’elle a appris, puis compare ses
                            créations aux données réelles pour voir si elles
                            ressemblent assez. Si elle fait une erreur, elle
                            ajuste ses "règles" internes et réessaie. Ce
                            processus se répète encore et encore, jusqu'à ce que
                            l'IA soit assez bonne pour créer des images ou des
                            textes convaincants.
                        </li>
                        <li>
                            Modèles de Réseaux de Neurones : L'IA générative
                            utilise souvent des modèles appelés{" "}
                            <strong>réseaux de neurones</strong>. Ce sont des
                            structures informatiques qui imitent le
                            fonctionnement du cerveau humain, avec des
                            "neurones" (petites unités de calcul) connectés
                            entre eux. Ces réseaux permettent à l'IA d'analyser
                            les données à plusieurs niveaux, et de produire des
                            résultats de plus en plus réalistes.
                        </li>
                    </ol>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Exemples d'IA Génératives
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        Il existe plusieurs types d'IA génératives, voici
                        quelques exemples populaires :
                    </p>
                    <ul className="list-disc pl-5 text-lg text-darkblue mt-4">
                        <li>
                            <strong>GPT-3 et GPT-4</strong> : Ce sont des IA qui
                            génèrent du texte. Elles sont capables de rédiger
                            des histoires, des poèmes, des articles, ou même de
                            répondre à des questions.
                        </li>
                        <li>
                            <strong>DALL·E</strong> : Une IA générative qui crée
                            des images à partir de descriptions textuelles. Par
                            exemple, si tu demandes "un chat qui porte un
                            chapeau", DALL·E peut créer une image de cela.
                        </li>
                        <li>
                            <strong>DeepFake</strong> : Une technologie qui
                            utilise des IA génératives pour créer des vidéos où
                            des visages peuvent être remplacés, ce qui peut être
                            à la fois impressionnant et inquiétant si mal
                            utilisé.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Pourquoi l'IA Générative est-elle Importante ?
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        Les IA génératives ouvrent des possibilités incroyables
                        dans de nombreux domaines :
                    </p>
                    <ul className="list-disc pl-5 text-lg text-darkblue mt-4">
                        <li>
                            Création artistique en générant des œuvres
                            nouvelles.
                        </li>
                        <li>
                            Amélioration de la productivité, comme générer des
                            résumés ou des documents.
                        </li>
                        <li>
                            Simulation de scénarios ou création d'environnements
                            virtuels dans des jeux vidéo.
                        </li>
                    </ul>
                    <p className="text-lg text-darkblue mt-4">
                        Mais, il faut aussi être vigilant car ces technologies
                        peuvent aussi être utilisées de manière irresponsable
                        (par exemple, pour créer de fausses informations ou des
                        contenus trompeurs).
                    </p>
                    <div className="bg-darkblue p-4 rounded-none mt-6 flex flex-col items-start">
                        <h2 className="text-2xl font-semibold text-primary">
                            Conclusion
                        </h2>
                        <p className="text-lg text-white mt-2">
                            Les IA génératives sont des outils puissants qui
                            utilisent l'apprentissage automatique pour créer de
                            nouvelles choses à partir de ce qu'elles ont appris.
                            Que ce soit pour créer des images, des textes ou
                            même des vidéos, elles ont le potentiel de
                            transformer des domaines comme l'art, la science, et
                            bien d'autres. Il est important de comprendre leur
                            fonctionnement pour pouvoir les utiliser de manière
                            responsable et créative !
                        </p>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};
