import { Card, CardBody } from "@heroui/react";

export const Biasis: React.FC = () => {
    return (
        <Card className={"m-10 max-w-4xl mx-auto border-none rounded-none"}>
            <CardBody className={"overflow-auto max-h-[90vh]"}>
                <CardBody className="p-6 bg-white">
                    <div className="bg-darkblue p-4 rounded-none mb-5">
                        <h1 className="text-3xl font-bold text-white">
                            Les Biais Sociaux des IA Génératives
                        </h1>
                    </div>
                    <p className="text-lg text-darkblue">
                        Les IA génératives ne sont pas neutres. Elles apprennent
                        à partir de grandes quantités de données, mais ces
                        données peuvent refléter des inégalités et des
                        discriminations sociales. Ainsi, ces IA peuvent
                        reproduire et amplifier des biais sociaux comme le
                        racisme, le sexisme ou encore des biais de complaisance.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Les Biais Sociaux en IA
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        Les biais sociaux en intelligence artificielle
                        proviennent souvent de données historiques qui
                        contiennent des préjugés humains. Si une IA est
                        entraînée avec des informations reflétant des
                        discriminations, elle risque de perpétuer ces inégalités
                        dans ses réponses et décisions. Par exemple, certains
                        modèles de reconnaissance faciale montrent des taux
                        d'erreur plus élevés pour les personnes à la peau
                        foncée. De même, des IA génératives peuvent associer
                        inconsciemment les femmes à des rôles domestiques et les
                        hommes à des rôles professionnels, reproduisant ainsi
                        des stéréotypes de genre ancrés dans les données.
                    </p>

                    <p className="text-lg text-darkblue mt-4">
                        Un autre biais fréquent est la complaisance des modèles
                        d'IA, qui tendent à produire des réponses évitant les
                        sujets controversés ou minimisant les problèmes sociaux.
                        Ce phénomène peut fausser la perception des utilisateurs
                        en leur donnant une vision édulcorée de la réalité, sans
                        remise en question critique des inégalités existantes.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Conséquences des Biais Sociaux en IA
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        L'impact des biais sociaux en IA est considérable.
                        Lorsqu'une IA influence le recrutement, elle peut
                        discriminer certains profils en se basant sur des
                        critères injustes. Dans les médias et la publicité, elle
                        peut renforcer des représentations stéréotypées au lieu
                        de proposer une diversité plus fidèle à la réalité. Même
                        dans la sphère politique, les biais peuvent influencer
                        les décisions en favorisant des perspectives dominantes
                        au détriment d'autres voix moins représentées. Ainsi,
                        loin d'être de simples erreurs techniques, ces biais ont
                        des implications sociales profondes qui doivent être
                        prises au sérieux.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 text-primary">
                        Comment Réduire les Biais Sociaux ?
                    </h2>
                    <p className="text-lg text-darkblue mt-2">
                        Pour limiter l'impact des biais, il est essentiel
                        d'améliorer la diversité des jeux de données, afin
                        qu'ils soient plus représentatifs et équilibrés. Les
                        modèles doivent être régulièrement audités pour détecter
                        et corriger ces biais, en impliquant des experts de
                        différents horizons pour garantir une meilleure
                        impartialité. Enfin, la transparence est une condition
                        indispensable : les décisions des IA doivent être
                        explicables et compréhensibles, afin que leurs limites
                        puissent être identifiées et améliorées en continu.
                    </p>

                    <div className="bg-darkblue p-4 rounded-none mt-6 flex flex-col items-start">
                        <h2 className="text-2xl font-semibold  text-primary">
                            Conclusion
                        </h2>
                        <p className="text-lg text-white mt-2">
                            Les biais sociaux dans les IA génératives sont un
                            défi majeur. En comprenant ces biais et en mettant
                            en place des pratiques d'amélioration continues,
                            nous pouvons développer des IA plus éthiques, justes
                            et inclusives. Seule une vigilance constante
                            permettra d'éviter que ces technologies ne
                            perpétuent les discriminations au lieu de les
                            réduire.
                        </p>
                    </div>
                </CardBody>
            </CardBody>
        </Card>
    );
};
