/* assets/js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // Menu Burger
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Liens animés
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Animation burger
            burger.classList.toggle('toggle');
        });
    }

    // Quizz
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        initQuiz();
    }

    // détails d'avions
    if (document.querySelector('.page-header h1') && (window.location.search.includes('model=') || document.title.includes('Concorde'))) {
        initAvionDetails();
    }
});

function initAvionDetails() {
    const avionContent = document.querySelector('main.container article');
    const urlParams = new URLSearchParams(window.location.search);
    const model = urlParams.get('model');

    console.log("Model détecté:", model);

    const data = {
        'concorde': {
            title: "Aérospatiale/BAC Concorde",
            subtitle: "L'oiseau blanc : l'élégance à Mach 2.",
            intro: "Le Concorde est un avion de ligne supersonique franco-britannique. Conçu par Sud-Aviation (Aérospatiale) et British Aircraft Corporation, il est l'un des deux seuls avions de ligne supersoniques à avoir été exploité commercialement.",
            history: "Au début des années 1960, le futur semble être supersonique. Le projet naît d'un traité franco-britannique en 1962. Le premier vol a lieu en 1969 et le service commercial débute en 1976.",
            innovations: [
                "L'aile Delta ogivale pour une portance à toutes les vitesses.",
                "Le nez basculant pour la visibilité à l'atterrissage.",
                "Commandes de vol électriques pionnières.",
                "Moteurs Olympus 593 à postcombustion."
            ],
            specs: [
                ["Équipage", "3 (2 pilotes + 1 OMN)"],
                ["Capacité", "92 à 128 passagers"],
                ["Longueur", "61,66 m"],
                ["Vitesse", "Mach 2,02"],
                ["Altitude", "60 000 pieds"],
                ["Distance", "6 200 km"]
            ],
            legacy: "Symbole de prestige et de prouesse technologique, il reste une icône de l'aviation malgré son retrait en 2003.",
            anecdote: "À Mach 2, l'avion s'allongeait de 20 cm à cause de la chaleur du frottement de l'air."
        },
        'b747': {
            title: "Boeing 747",
            subtitle: "Le Jumbo Jet : la Reine des Cieux.",
            intro: "Le Boeing 747, souvent surnommé « Jumbo Jet » ou « Reine des Cieux », est l'un des avions les plus reconnaissables au monde. Il a été le premier avion de ligne à fuselage large et a régné sur le transport aérien long-courrier pendant des décennies.",
            history: "Développé dans les années 1960 à la demande de Pan Am, le 747 était un pari risqué pour Boeing. Il était tellement grand qu'une nouvelle usine (Everett) a dû être construite pour l'assembler. Son premier vol a eu lieu le 9 février 1969.",
            innovations: [
                "Premier fuselage large (double couloir).",
                "Conception à double pont partiel (la célèbre bosse).",
                "Moteurs à double flux (turbofans) à haut taux de dilution.",
                "Systèmes quadruplés pour une sécurité accrue."
            ],
            specs: [
                ["Équipage", "3 puis 2 (pilotes)"],
                ["Capacité", "Jusqu'à 660 passagers (747-400)"],
                ["Longueur", "70,6 m (747-400)"],
                ["Envergure", "64,4 m"],
                ["Vitesse", "Mach 0.85"],
                ["Distance", "13 450 km"]
            ],
            legacy: "Le 747 a rendu le voyage aérien accessible aux masses. Bien que les quadrimoteurs soient progressivement remplacés par des bimoteurs plus économes, il reste une icône absolue de l'aviation.",
            anecdote: "La bosse du 747 a été conçue à l'origine pour permettre un chargement frontal facile pour les versions cargo, Boeing pensant que l'avion serait rapidement remplacé par des modèles supersoniques pour les passagers."
        },
        'a380': {
            title: "Airbus A380",
            subtitle: "Le Géant des Airs : le plus grand paquebot du ciel.",
            intro: "L'Airbus A380 est le plus gros avion de ligne civil jamais construit en série. Véritable prouesse d'ingénierie, il offre deux ponts complets sur toute sa longueur.",
            history: "Lancé pour briser le monopole du Boeing 747, le projet A3XX est devenu l'A380. Son premier vol a eu lieu le 27 avril 2005. Il a permis aux compagnies de transporter un grand nombre de passagers entre les hubs mondiaux.",
            innovations: [
                "Double pont intégral.",
                "Utilisation massive de matériaux composites (Glare).",
                "Systèmes hydrauliques à haute pression (5000 psi).",
                "Niveau de bruit en cabine exceptionnellement bas."
            ],
            specs: [
                ["Équipage", "2 pilotes"],
                ["Capacité", "525 à 853 passagers"],
                ["Longueur", "72,7 m"],
                ["Envergure", "79,8 m"],
                ["Vitesse", "Mach 0.85"],
                ["Distance", "15 200 km"]
            ],
            legacy: "Malgré un succès commercial mitigé dû à l'évolution du marché vers des vols directs (point-à-point), l'A380 reste l'avion préféré des passagers pour son confort inégalé.",
            anecdote: "Chaque A380 est composé d'environ 4 millions de pièces provenant de 30 pays différents."
        },
        'c172': {
            title: "Cessna 172 Skyhawk",
            subtitle: "L'avion de toute une vie.",
            intro: "Le Cessna 172 est l'avion le plus produit au monde. C'est la plateforme de formation standard pour des générations de pilotes à travers le globe.",
            history: "Introduit en 1956, il a évolué sans cesse tout en conservant sa formule gagnante : aile haute, robustesse et facilité de pilotage.",
            innovations: [
                "Train d'atterrissage tricycle 'Land-O-Matic'.",
                "Visibilité panoramique grâce à l'aile haute.",
                "Simplicité mécanique légendaire.",
                "Équipements modernes (Garmin G1000 sur les versions récentes)."
            ],
            specs: [
                ["Équipage", "1 pilote"],
                ["Capacité", "3 passagers"],
                ["Longueur", "8,28 m"],
                ["Envergure", "11,0 m"],
                ["Vitesse", "226 km/h (croisière)"],
                ["Distance", "1 185 km"]
            ],
            legacy: "Presque tous les pilotes ont passé au moins quelques heures aux commandes d'un 172. C'est l'épine dorsale de l'aviation générale.",
            anecdote: "En 1958, un Cessna 172 a établi un record d'endurance en restant en vol pendant plus de 64 jours sans interruption (ravitaillement par camion en roulant !)."
        },
        'spitfire': {
            title: "Supermarine Spitfire",
            subtitle: "L'élégance au service de la liberté.",
            intro: "Le Spitfire est sans doute le chasseur le plus célèbre de la Seconde Guerre mondiale. Ses ailes elliptiques et son moteur Merlin en ont fait une légende.",
            history: "Conçu par R.J. Mitchell, il a joué un rôle crucial lors de la Bataille d'Angleterre en 1940 face à la Luftwaffe.",
            innovations: [
                "Aile elliptique pour une traînée minimale.",
                "Construction entièrement métallique monocoque.",
                "Évolutivité constante (du moteur Merlin au Griffon).",
                "Radiateur sous les ailes pour un refroidissement optimisé."
            ],
            specs: [
                ["Équipage", "1 pilote"],
                ["Vitesse Max", "594 km/h (Mk I) à 721 km/h (Mk 24)"],
                ["Moteur", "Rolls-Royce Merlin (1030 ch et +)"],
                ["Armement", "8 mitrailleuses (puis canons de 20mm)"],
                ["Plafond", "11 300 m"],
                ["Autonomie", "760 km"]
            ],
            legacy: "Plus qu'un avion, le Spitfire est devenu un symbole de la résistance britannique et un chef-d'œuvre de design industriel.",
            anecdote: "Le bruit caractéristique du moteur Rolls-Royce Merlin est encore aujourd'hui capable de donner des frissons aux passionnés d'aviation."
        },
        'sr71': {
            title: "Lockheed SR-71 Blackbird",
            subtitle: "Plus vite que les missiles.",
            intro: "Le SR-71 est l'avion de reconnaissance stratégique ultime. Noir, furtif et incroyablement rapide, il opérait aux frontières de l'espace.",
            history: "Développé par les Skunk Works de Lockheed dans le secret le plus total pendant la Guerre Froide, il a volé de 1964 à 1999.",
            innovations: [
                "Structure composée à 85% de titane.",
                "Moteurs Pratt & Whitney J58 (turboréacteurs fonctionnant comme des statoréacteurs à haute vitesse).",
                "Peinture noire spéciale pour dissiper la chaleur et réduire la signature radar.",
                "Carburant JP-7 à très haut point d'éclair."
            ],
            specs: [
                ["Équipage", "2 (Pilote et RSO)"],
                ["Vitesse", "Mach 3.3+ (3 540 km/h)"],
                ["Altitude", "85 000 pieds (26 000 m)"],
                ["Longueur", "32,74 m"],
                ["Poids", "77 tonnes au décollage"],
                ["Distance", "5 400 km"]
            ],
            legacy: "Aucun SR-71 n'a jamais été abattu par l'ennemi. Sa tactique face à un missile était simple : accélérer et monter.",
            anecdote: "Au sol, le SR-71 fuyait du carburant car ses réservoirs ne devenaient étanches qu'en vol, une fois dilatés par la chaleur intense due au frottement de l'air."
        },
        'm2000': {
            title: "Dassault Mirage 2000",
            subtitle: "La pointe de diamant française.",
            intro: "Le Mirage 2000 est un avion de chasse polyvalent français à aile delta. Agile et puissant, il a été le pilier de l'Armée de l'Air pendant des décennies.",
            history: "Entré en service en 1984, il succède au Mirage III. Il combine la formule delta éprouvée avec des commandes de vol électriques modernes.",
            innovations: [
                "Commandes de vol électriques (instabilité naturelle pour l'agilité).",
                "Radar Doppler à Impulsion (RDI).",
                "Intégration poussée du cockpit (HOTAS).",
                "Grande polyvalence (interception, attaque au sol, nucléaire)."
            ],
            specs: [
                ["Équipage", "1 ou 2 pilotes"],
                ["Vitesse Max", "Mach 2.2"],
                ["Plafond", "18 000 m"],
                ["Moteur", "Snecma M53-P2"],
                ["Armement", "2 canons de 30mm + missiles MICA/Magic"],
                ["Rayon d'action", "1 500 km"]
            ],
            legacy: "Apprécié pour son élégance et son efficacité, le Mirage 2000 est toujours en service dans plusieurs pays et reste redoutable en combat tournoyant.",
            anecdote: "Le Mirage 2000 peut passer du vol lent à Mach 2 en un temps record grâce à son excellent rapport poids/poussée."
        },
        'b707': {
            title: "Boeing 707",
            subtitle: "Le pionnier de l'âge du jet.",
            intro: "Le Boeing 707 n'est pas le premier avion de ligne à réaction, mais c'est celui qui a véritablement lancé l'aviation commerciale moderne.",
            history: "Dérivé du prototype Dash 80, il entre en service en 1958 avec Pan Am. Il a réduit de moitié les temps de trajet transatlantiques.",
            innovations: [
                "Ailes en flèche à 35°.",
                "Moteurs suspendus en nacelles (pylônes) sous les ailes.",
                "Capacité de passagers importante pour l'époque.",
                "Fiabilité et performances supérieures aux avions à pistons."
            ],
            specs: [
                ["Équipage", "3 (pilotes + mécanicien)"],
                ["Capacité", "140 à 189 passagers"],
                ["Longueur", "44,2 m (707-320B)"],
                ["Vitesse", "970 km/h"],
                ["Distance", "6 700 km"],
                ["Moteurs", "4 turboréacteurs Pratt & Whitney"]
            ],
            legacy: "Le 707 a établi la configuration standard des avions de ligne modernes. Il a transformé le monde en un 'village planétaire'.",
            anecdote: "Pour démontrer la solidité du prototype, le pilote d'essai Tex Johnston a effectué un tonneau barriqué devant les officiels de l'aviation !"
        },
        'dc3': {
            title: "Douglas DC-3",
            subtitle: "L'avion qui a donné des ailes au monde.",
            intro: "Le Douglas DC-3 est considéré comme l'un des avions les plus importants de l'histoire. Il a rendu le transport de passagers rentable sans subventions.",
            history: "Apparu en 1935, il a révolutionné le transport civil avant de devenir le C-47 'Skytrain' pendant la guerre, transportant troupes et matériel.",
            innovations: [
                "Construction tout métal robuste.",
                "Performances de vol sur un seul moteur exceptionnelles pour l'époque.",
                "Confort de cabine (chauffage, isolation sonore).",
                "Facilité de maintenance et de pilotage."
            ],
            specs: [
                ["Équipage", "2"],
                ["Capacité", "21 à 32 passagers"],
                ["Vitesse", "270 km/h (croisière)"],
                ["Moteurs", "2 moteurs en étoile Pratt & Whitney Twin Wasp"],
                ["Distance", "1 650 km"],
                ["Production", "Plus de 16 000 exemplaires (toutes versions)"]
            ],
            legacy: "Increvable, le DC-3 vole encore aujourd'hui dans certaines régions reculées du monde. C'est l'archétype de l'avion de transport.",
            anecdote: "Dwight Eisenhower a cité le C-47 (version militaire du DC-3) comme l'un des quatre outils ayant permis de gagner la Seconde Guerre mondiale."
        },
        'a320': {
            title: "Airbus A320",
            subtitle: "Le cerveau électronique.",
            intro: "L'Airbus A320 est le best-seller européen. Il a introduit des technologies révolutionnaires qui sont aujourd'hui la norme dans l'industrie.",
            history: "Lancé en 1984 pour concurrencer le Boeing 737, il a effectué son premier vol en 1987. C'est le premier avion de sa catégorie conçu avec une forte dose d'électronique.",
            innovations: [
                "Commandes de vol électriques (Fly-by-wire) avec protection d'enveloppe.",
                "Cockpit tout écran (Glass Cockpit).",
                "Utilisation d'un mini-manche (Sidestick) à la place du manche traditionnel.",
                "Fuselages déclinés en plusieurs tailles (A318, A319, A321)."
            ],
            specs: [
                ["Équipage", "2 pilotes"],
                ["Capacité", "150 à 180 passagers"],
                ["Longueur", "37,57 m"],
                ["Vitesse", "Mach 0.78"],
                ["Distance", "6 100 km (A320neo)"],
                ["Moteurs", "2 turbofans CFM56 ou IAE V2500 (puis LEAP/GTF)"]
            ],
            legacy: "L'A320 a fait d'Airbus un géant mondial. Sa technologie de commandes de vol a radicalement amélioré la sécurité aérienne.",
            anecdote: "L'A320 est l'avion qui détient le record du nombre de commandes dans l'histoire de l'aviation civile."
        }
    };

    const avion = data[model];
    if (!avion) {
        console.log("Aucune donnée trouvée pour le modèle:", model);
        return;
    }

    console.log("Injection du contenu pour:", avion.title);

    // Update DOM
    document.title = `${avion.title} - Aviation Explorer`;

    const pageTitle = document.querySelector('.page-header h1');
    const pageSubtitle = document.querySelector('.page-header p');

    if (pageTitle) pageTitle.textContent = avion.title;
    if (pageSubtitle) pageSubtitle.textContent = avion.subtitle;

    if (avionContent) {
        let html = `
            <h2>Introduction</h2>
            <p>${avion.intro}</p>

            <h2>Contexte Historique et Développement</h2>
            <p>${avion.history}</p>

            <h2>Innovations Techniques</h2>
            <ul>
                ${avion.innovations.map(inn => `<li>${inn}</li>`).join('')}
            </ul>

            <h2>Caractéristiques Détaillées</h2>
            <table>
                <thead>
                    <tr><th>Paramètre</th><th>Valeur</th></tr>
                </thead>
                <tbody>
                    ${avion.specs.map(spec => `<tr><td>${spec[0]}</td><td>${spec[1]}</td></tr>`).join('')}
                </tbody>
            </table>

            <h2>Héritage et Exploitation</h2>
            <p>${avion.legacy}</p>

            <h2>Anecdotes</h2>
            <p>${avion.anecdote}</p>
        `;
        avionContent.innerHTML = html;
    } else {
        console.error("Élément 'main.container article' non trouvé pour l'injection.");
    }
}

// Animations par images clés via JavaScript pour plus de simplicité dans cette configuration
const style = document.createElement('style');
style.innerHTML = `
    @keyframes navLinkFade {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0px); }
    }
    .toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
    .toggle .line2 { opacity: 0; }
    .toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
`;
document.head.appendChild(style);

function initQuiz() {
    const questions = [
        {
            q: "En quelle année les frères Wright ont-ils effectué leur premier vol motorisé ?",
            options: ["1900", "1903", "1910", "1914"],
            answer: 1
        },
        {
            q: "Quel est l'avion de ligne le plus produit au monde ?",
            options: ["Airbus A320", "Boeing 737", "Boeing 747", "Cessna 172"],
            answer: 1
        },
        {
            q: "Quelle force s'oppose au poids d'un avion pour le maintenir en l'air ?",
            options: ["La traînée", "La poussée", "La portance", "La pesanteur"],
            answer: 2
        },
        {
            q: "Quel avion détient le record du monde de vitesse pour un avion piloté ?",
            options: ["Concorde", "SR-71 Blackbird", "X-15", "MiG-25"],
            answer: 1
        },
        {
            q: "Que signifie l'acronyme VFR ?",
            options: ["Visual Flight Rules", "Very Fast Route", "Variable Flight Rate", "Vertical Flight Range"],
            answer: 0
        },
        {
            q: "Quel avion est surnommé le 'Jumbo Jet' ?",
            options: ["Airbus A380", "Boeing 747", "Concorde", "DC-10"],
            answer: 1
        },
        {
            q: "Quelle est l'altitude de croisière typique d'un avion de ligne ?",
            options: ["10 000 ft", "20 000 ft", "35 000 ft", "60 000 ft"],
            answer: 2
        },
        {
            q: "Qui a traversé l'Atlantique en solo en 1927 ?",
            options: ["Mermoz", "Saint-Exupéry", "Charles Lindbergh", "Louis Blériot"],
            answer: 2
        },
        {
            q: "Que signifie ILS ?",
            options: ["Internal Landing System", "Instrument Landing System", "International Light Signal", "Instant Level Status"],
            answer: 1
        },
        {
            q: "Quel pays a construit le Concorde avec le Royaume-Uni ?",
            options: ["Allemagne", "États-Unis", "France", "Italie"],
            answer: 2
        },
        {
            q: "Quel est le plus grand avion de ligne au monde en nombre de passagers ?",
            options: ["Boeing 747-8", "Airbus A380", "Antonov An-225", "Airbus A350-1000"],
            answer: 1
        },
        {
            q: "Quel organe de l'avion permet de contrôler le roulis ?",
            options: ["La dérive", "Les ailerons", "La gouverne de profondeur", "Les volets"],
            answer: 1
        },
        {
            q: "Comment s'appelle la partie supérieure d'une aile ?",
            options: ["L'intrados", "L'extrados", "Le bord d'attaque", "Le bord de fuite"],
            answer: 1
        },
        {
            q: "Quel moteur utilise une soufflante à l'avant pour la poussée principale ?",
            options: ["Turbojet", "Turbofan", "Turboprop", "Moteur à pistons"],
            answer: 1
        },
        {
            q: "En navigation, que signifie un cap de 270° ?",
            options: ["Nord", "Est", "Sud", "Ouest"],
            answer: 3
        },
        {
            q: "Quel avion est célèbre pour ses ailes delta et son nez basculant ?",
            options: ["Rafale", "Mirage 2000", "Concorde", "Tu-160"],
            answer: 2
        },
        {
            q: "Quelle licence est nécessaire pour devenir pilote de ligne ?",
            options: ["PPL", "LAPL", "ATPL", "CPL"],
            answer: 2
        },
        {
            q: "Que mesure un altimètre ?",
            options: ["La vitesse", "La pression atmosphérique", "Le cap", "La température"],
            answer: 1
        },
        {
            q: "Qui est considéré comme le 'Père de l'Aviation' pour ses travaux théoriques ?",
            options: ["Otto Lilienthal", "George Cayley", "Clément Ader", "Leonardo da Vinci"],
            answer: 1
        },
        {
            q: "Quelle ville française est le siège d'Airbus ?",
            options: ["Paris", "Bordeaux", "Toulouse", "Marseille"],
            answer: 2
        }
    ];

    const quizContent = document.getElementById('quiz-questions');
    const submitBtn = document.getElementById('submit-quiz');
    const resultDiv = document.getElementById('quiz-result');

    if (!quizContent) return;

    questions.forEach((item, index) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question-card card';
        qDiv.style.marginBottom = '20px';

        let html = `<h3>Question ${index + 1}</h3><p>${item.q}</p><div class="options">`;
        item.options.forEach((opt, i) => {
            html += `<label style="display: block; margin: 10px 0; cursor: pointer;">
                        <input type="radio" name="q${index}" value="${i}"> ${opt}
                     </label>`;
        });
        html += `</div>`;
        qDiv.innerHTML = html;
        quizContent.appendChild(qDiv);
    });

    submitBtn.addEventListener('click', () => {
        let score = 0;
        questions.forEach((item, index) => {
            const selected = document.querySelector(`input[name="q${index}"]:checked`);
            if (selected && parseInt(selected.value) === item.answer) {
                score++;
            }
        });
        resultDiv.innerHTML = `<h3>Votre score : ${score} / ${questions.length}</h3>
                               <p>${score === questions.length ? "Félicitations, Expert !" : "Continuez à apprendre pour améliorer votre score."}</p>`;
        resultDiv.style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    });
}
