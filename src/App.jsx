import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import logoUp from "./assets/pdf/logo-up.png";
import "./App.css";
import etudesImage from "./assets/pdf/card-etudes.png";

import realisationsImage from './assets/pdf/card-realisations.png'
import systemesImage from './assets/pdf/card-systemes.png'
import servicesImage from './assets/pdf/card-services.png'
import etudesPhoto from './assets/pdf/p2-img6-xref155-225x225.png'
import realisationsPhoto from './assets/pdf/p2-img8-xref161-615x461.png'
import systemesPhoto from './assets/pdf/p2-img9-xref164-612x446.png'
import servicesPhoto from './assets/pdf/p2-img10-xref167-615x461.png'

const red = '#d41428'

const pages = {
  accueil: 'Accueil',
  presentation: 'Présentation',
  histoire: 'Histoire',
  qualite: 'Qualité',
  savoirFaire: 'Nos savoir-faire',
  etudes: 'Études',
  realisations: 'Réalisations',
  systemes: 'Systèmes',
  services: 'Services',
  domaines: "Nos domaines d'intervention",
  transport: 'Transport',
  energie: 'Énergie',
  mecanique: 'Mécanique',
  agroalimentaire: 'Agroalimentaire',
  chimie: 'Chimie et cosmétique',
  references: 'Nos références',
  actualites: 'Actualités',
  actualiteSolutions: 'Solutions clé en main',
  actualiteUsinage: 'Usinage de précision et micromécanique',
  actualiteInstallation: 'Installation sur site et formation',
  actualiteMaintenance: 'SAV et contrats de maintenance',
  actualiteRenovation: 'Rénovation et mise en conformité de machines',
  actualiteConseil: 'Conseil et optimisation de production',
  contact: 'Contact',
}

const nav = [
  { label: 'ACCUEIL', page: 'accueil' },
  {
    label: 'NOTRE SOCIETÉ',
    page: 'presentation',
    children: [
      { label: 'PRÉSENTATION', page: 'presentation' },
      { label: 'HISTOIRE', page: 'histoire' },
      { label: 'QUALITÉ', page: 'qualite' },
    ],
  },
  {
    label: 'NOS SAVOIR-FAIRE',
    page: 'savoirFaire',
    children: [
      { label: 'ETUDES', page: 'etudes' },
      { label: 'RÉALISATIONS', page: 'realisations' },
      { label: 'SYSTÈMES', page: 'systemes' },
      { label: 'SERVICES', page: 'services' },
    ],
  },
  {
    label: "NOS DOMAINES D'INTERVENTION",
    page: 'domaines',
    children: [
      { label: 'TRANSPORT', page: 'transport' },
      { label: 'ÉNERGIE', page: 'energie' },
      { label: 'MÉCANIQUE', page: 'mecanique' },
      { label: 'AGROALIMENTAIRE', page: 'agroalimentaire' },
      { label: 'CHIMIE ET COSM’IQUE', page: 'chimie' },
    ],
  },
  { label: 'NOS RÉFÉRENCES', page: 'references' },
  { label: 'ACTUALITÉS', page: 'actualites' },
  { label: 'CONTACT', page: 'contact' },
]

const savoirFaire = {
  etudes: {
    title: 'ETUDES',
    image: etudesImage,
    detailImage: etudesPhoto,
    subtitle: 'Conception mécanique, bureau d’études et optimisation industrielle.',
    items: [
      'Conception mécanique',
      'Études BE et automatismes',
      'Optimisation des coûts',
      'Moyens d’études: SolidWorks, AutoCAD, Tekla Structures, Robot Structural Analysis',
    ],
    text: [
      'USINAGE PRO intervient dès la phase de réflexion afin de transformer un besoin industriel en solution technique claire, réalisable et adaptée aux contraintes du terrain. Nos études prennent en compte les objectifs de production, la sécurité, l’ergonomie, l’intégration dans l’environnement existant et la facilité de maintenance.',
      'Chaque projet commence par une analyse du besoin, la compréhension du cahier des charges et la proposition de solutions technologiques pertinentes. La conception mécanique est ensuite structurée pour réduire les risques, optimiser les coûts et préparer une fabrication efficace.',
      'Nos moyens d’études permettent de travailler sur des ensembles mécaniques, des structures, des outillages, des machines et des systèmes industriels sur-mesure. SolidWorks, AutoCAD, Tekla Structures et Robot Structural Analysis accompagnent cette démarche technique.',
    ],
  },
  realisations: {
    title: 'REALISATIONS',
    image: realisationsImage,
    detailImage: realisationsPhoto,
    subtitle: 'Usinage, prototypes, petites séries, montage et mise au point.',
    items: [
      'Usinage de précision et micromécanique',
      'Prototypes et petites séries',
      'Montage et mise au point',
      'Matières travaillées: Tous métaux',
      'Moyens: Usinage, électroérosion et contrôle',
    ],
    text: [
      'USINAGE PRO réalise des pièces mécaniques, prototypes, petites séries et ensembles industriels avec une attention particulière portée à la précision, à la répétabilité et à la qualité de finition.',
      'Nos réalisations couvrent l’usinage de précision, la micromécanique, le montage, le contrôle et la mise au point. Les matières travaillées incluent tous métaux afin de répondre aux exigences des projets industriels variés.',
      'La maîtrise des moyens d’usinage, d’électroérosion et de contrôle permet d’accompagner les demandes spécifiques comme les besoins globaux, depuis la fabrication jusqu’à l’intégration finale.',
    ],
  },
  systemes: {
    title: 'SYSTEMES',
    image: systemesImage,
    detailImage: systemesPhoto,
    subtitle: 'Machines, outillages, bancs d’essais, automatisation et robotisation.',
    items: [
      'Étude de faisabilité et intégration',
      'Machines et outillages de production',
      'Bancs et montages d’essais',
      'Automatisation et robotisation',
    ],
    text: [
      'USINAGE PRO conçoit des systèmes industriels sur-mesure pour répondre à des problématiques de production, de contrôle, d’essais, de manutention et d’intégration.',
      'L’étude de faisabilité permet de valider les choix techniques avant la fabrication. Les machines et outillages de production sont pensés pour améliorer la cadence, fiabiliser les opérations et limiter les interventions manuelles inutiles.',
      'Les bancs et montages d’essais, ainsi que les solutions d’automatisation et de robotisation, sont développés pour s’intégrer efficacement dans les process existants.',
    ],
  },
  services: {
    title: 'SERVICES',
    image: servicesImage,
    detailImage: servicesPhoto,
    subtitle: 'Installation, formation, SAV, maintenance, rénovation et conseil.',
    items: [
      'Installation sur site et formation',
      'SAV et contrats de maintenance',
      'Intervention sur site ou en atelier',
      'Rénovation et mise en conformité de machines',
      'Conseil et optimisation de production',
    ],
    text: [
      'USINAGE PRO accompagne ses clients après la fabrication avec des services adaptés à l’exploitation industrielle quotidienne. L’installation sur site, la formation et la mise en route permettent une prise en main claire des équipements.',
      'Le SAV, les contrats de maintenance et les interventions sur site ou en atelier assurent la continuité de production et la durabilité des installations.',
      'La rénovation, la mise en conformité de machines, le conseil et l’optimisation de production permettent d’améliorer des équipements existants sans nécessairement repartir de zéro.',
    ],
  },
}

const companyPages = {
  presentation: {
    title: 'Présentation',
    heading: 'USINAGE PRO, créateur de systèmes industriels',
    paragraphs: [
      'USINAGE PRO est une entreprise industrielle spécialisée dans la conception, l’étude, la fabrication, le montage, la mise au point et l’installation de solutions sur-mesure. Pour toute demande spécifique ou globale, l’entreprise accompagne les industriels depuis le cahier des charges jusqu’à la solution opérationnelle.',
      'Trouvons ensemble la solution sur-mesure à votre projet. USINAGE PRO met en relation l’analyse du besoin, la proposition de solutions technologiques, la réactivité, la flexibilité, le suivi de projets, le réseau de partenaires et une démarche qualité avec processus qualité interne.',
      'L’objectif est simple : transformer une idée technique en système industriel fiable, précis, maintenable et adapté à votre activité.',
    ],
  },
  histoire: {
    title: 'Histoire',
    heading: 'Une démarche construite autour du projet industriel',
    paragraphs: [
      'L’histoire d’USINAGE PRO s’inscrit dans une logique de proximité avec les besoins des industriels. Chaque projet naît d’une contrainte concrète : produire mieux, sécuriser un poste, améliorer une cadence, rénover une machine ou créer un équipement spécifique.',
      'Cette approche terrain permet à USINAGE PRO de développer des solutions adaptées, pragmatiques et évolutives. Le travail se construit autour de l’écoute, de l’étude, de la fabrication, du montage, de la mise au point et de l’accompagnement jusqu’à l’installation.',
      'Avec une couverture incluant Casablanca, Mohamedia, Rabat, Berrchid, Settat, El Jadida et Marrakech, l’entreprise intervient au plus près des sites industriels marocains.',
    ],
  },
  qualite: {
    title: 'Qualité',
    heading: 'Une démarche qualité avec processus qualité interne',
    paragraphs: [
      'La qualité est intégrée à chaque étape : analyse du besoin, étude, conception, fabrication, montage, contrôle, mise au point et installation. USINAGE PRO recherche une solution fiable, cohérente et maîtrisée.',
      'L’optimisation des coûts ne signifie pas réduire l’exigence technique. Elle consiste à proposer les bons choix, les bons moyens, les bons matériaux et les bonnes méthodes pour atteindre le résultat attendu.',
      'La démarche qualité interne permet de suivre les projets, de contrôler les réalisations, d’assurer la conformité et de maintenir un niveau de service adapté aux attentes industrielles.',
    ],
  },
}

const domainPages = {
  transport: {
    title: 'Transport',
    text: 'USINAGE PRO accompagne les acteurs du transport avec des outillages, pièces mécaniques, montages, systèmes d’essais et solutions de production adaptés aux contraintes de fiabilité, de cadence et de sécurité.',
  },
  energie: {
    title: 'Énergie',
    text: 'Pour le secteur de l’énergie, USINAGE PRO conçoit et fabrique des solutions mécaniques robustes, des ensembles techniques, des bancs et des systèmes capables de répondre à des environnements exigeants.',
  },
  mecanique: {
    title: 'Mécanique',
    text: 'La mécanique est au cœur du savoir-faire USINAGE PRO : conception, usinage de précision, micromécanique, prototypes, petites séries, montage, contrôle et mise au point.',
  },
  agroalimentaire: {
    title: 'Agroalimentaire',
    text: 'USINAGE PRO développe des équipements, outillages et systèmes de production pour des environnements agroalimentaires où l’ergonomie, la régularité, la maintenance et l’intégration sont essentielles.',
  },
  chimie: {
    title: 'Chimie et cosmétique',
    text: 'Dans la chimie et la cosmétique, USINAGE PRO apporte des solutions sur-mesure pour la production, le contrôle, le montage et l’amélioration de process nécessitant précision et fiabilité.',
  },
}

const expertises = [
  'Analyse du besoin',
  'Proposition de solutions technologiques',
  'Réactivité et flexibilité',
  'Suivi de projets',
  'Réseau de partenaires',
  'Démarche qualité avec processus qualité interne',
]

const cities = ['Casablanca', 'Mohamedia', 'Rabat', 'Berrchid', 'Settat', 'El Jadida', 'Marrakech']

const articlePages = {
  actualiteSolutions: {
    title: 'Solutions clé en main',
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    intro:
      'USINAGE PRO accompagne les industriels dans la réalisation de solutions complètes, depuis le cahier des charges jusqu’à l’installation finale.',
    paragraphs: [
      'Une solution clé en main permet de confier un projet industriel à un interlocuteur capable de comprendre le besoin, d’étudier les contraintes, de fabriquer les éléments nécessaires, d’assurer le montage, la mise au point et l’installation.',
      'Du cahier des charges à l’installation en passant par l’étude, la fabrication, le montage et la mise au point, USINAGE PRO conçoit des solutions sur-mesure adaptées aux exigences de production.',
      'Cette approche globale facilite le suivi de projet, améliore la cohérence technique et limite les pertes de temps entre les différentes étapes.',
    ],
  },
  actualiteUsinage: {
    title: 'Usinage de précision et micromécanique',
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    intro:
      'L’usinage de précision et la micromécanique font partie des savoir-faire essentiels d’USINAGE PRO.',
    paragraphs: [
      'USINAGE PRO réalise des pièces mécaniques, prototypes, petites séries et ensembles techniques nécessitant précision, contrôle et régularité.',
      'Les matières travaillées incluent tous métaux, avec des moyens adaptés : usinage, électroérosion et contrôle.',
      'Chaque réalisation est pensée pour répondre au besoin réel du client, que la demande concerne une pièce spécifique, un prototype, une petite série ou un ensemble complet à monter et mettre au point.',
    ],
  },
  actualiteInstallation: {
    title: 'Installation sur site et formation',
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    intro:
      'L’installation sur site et la formation assurent la bonne intégration des solutions industrielles chez le client.',
    paragraphs: [
      'USINAGE PRO accompagne ses clients après la fabrication afin de garantir que les équipements soient correctement installés, réglés et compris par les équipes utilisatrices.',
      'La formation permet de faciliter la prise en main, de sécuriser l’utilisation et de réduire les risques d’arrêt liés à une mauvaise exploitation.',
      'Cette étape complète la démarche clé en main : étude, fabrication, montage, mise au point, installation et accompagnement terrain.',
    ],
  },
  actualiteMaintenance: {
    title: 'SAV et contrats de maintenance',
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    intro:
      'Le SAV et les contrats de maintenance permettent de prolonger la durée de vie des équipements et de sécuriser la production.',
    paragraphs: [
      'USINAGE PRO propose un accompagnement technique pour répondre aux besoins de maintenance, d’intervention et de suivi des équipements industriels.',
      'Les interventions peuvent être réalisées sur site ou en atelier selon la nature du besoin, l’urgence et les contraintes de production.',
      'Un suivi adapté contribue à limiter les arrêts, anticiper les défaillances et maintenir les machines dans un état de fonctionnement conforme aux attentes.',
    ],
  },
  actualiteRenovation: {
    title: 'Rénovation et mise en conformité de machines',
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80",
    intro:
      'Rénover une machine existante peut être une réponse efficace pour améliorer la performance sans repartir de zéro.',
    paragraphs: [
      'USINAGE PRO intervient sur la rénovation et la mise en conformité de machines afin d’adapter des équipements existants aux besoins actuels de production.',
      'La démarche peut inclure l’analyse de l’existant, la proposition de solutions techniques, la fabrication de pièces ou sous-ensembles, le montage, la mise au point et le contrôle.',
      'Cette approche permet de prolonger la durée d’exploitation, d’améliorer la sécurité et d’optimiser les performances industrielles.',
    ],
  },
  actualiteConseil: {
    title: 'Conseil et optimisation de production',
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    intro:
      'Le conseil et l’optimisation de production aident les industriels à améliorer leurs process, leurs cadences et leur organisation technique.',
    paragraphs: [
      'USINAGE PRO analyse le besoin, les contraintes, les objectifs et l’environnement de production afin de proposer des solutions technologiques adaptées.',
      'L’optimisation peut concerner un poste de travail, une machine, un outillage, un montage d’essai, une ligne ou une étape précise du process.',
      'Réactivité, flexibilité, suivi de projets et réseau de partenaires permettent de construire une réponse cohérente avec les enjeux du client.',
    ],
  },
}



function Header({ currentPage, setCurrentPage, nav, logoUp }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Recherche pour:', searchQuery)
    }
  }

  const handleNavClick = (page) => {
    setCurrentPage(page)
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_12px_rgba(0,0,0,.18)]">
      <div className="mx-auto flex min-h-[88px] max-w-[1200px] items-center justify-between px-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('accueil')}
          className="flex min-w-[160px] items-center text-left focus:outline-none"
        >
          <img src={logoUp} alt="USINAGE PRO" className="h-[72px] w-auto object-contain" />
        </button>

        {/* Barre de recherche (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:border-[#d41428] mx-4"
        >
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 text-sm outline-none w-48 lg:w-64 text-gray-800"
          />
          <button
            type="submit"
            className="bg-[#d41428] px-3 py-1.5 text-white transition hover:bg-[#a80f1f]"
          >
            🔍
          </button>
        </form>

        {/* Menu Navigation (Desktop) */}
        <nav className="hidden flex-1 justify-end lg:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <button
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`block whitespace-nowrap px-[12px] py-[34px] text-[15px] font-medium uppercase transition hover:text-[#d41428] group-hover:text-[#d41428] ${
                  currentPage === item.page ? 'text-[#d41428]' : 'text-[#444]'
                }`}
              >
                {item.label}
              </button>
              {item.children && (
                <div className="invisible absolute left-0 top-full min-w-[250px] bg-[#333] py-4 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 z-50">
                  {item.children.map((child) => (
                    <button
                      type="button"
                      key={child.label}
                      onClick={() => handleNavClick(child.page)}
                      className="block w-full px-6 py-2.5 text-left text-[14px] font-medium uppercase text-white transition hover:bg-[#d41428]"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bouton Burger (Mobile) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded border border-gray-300 text-2xl lg:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Dropdown Menu (Mobile) */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-6 shadow-lg lg:hidden">
          {/* Barre de recherche (Mobile) */}
          <form
            onSubmit={handleSearch}
            className="mb-6 flex items-center border border-gray-300 rounded-md overflow-hidden"
          >
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 text-sm outline-none text-gray-800"
            />
            <button type="submit" className="bg-[#d41428] px-4 py-2 text-white">
              🔍
            </button>
          </form>

          {/* Navigation & Sous-menus (Mobile) */}
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <div key={item.label} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left border-b border-gray-100 pb-2 text-base font-bold uppercase transition ${
                    currentPage === item.page ? 'text-[#d41428]' : 'text-gray-800 hover:text-[#d41428]'
                  }`}
                >
                  {item.label}
                </button>
                {item.children && (
                  <div className="ml-4 my-2 flex flex-col gap-2 border-l-2 border-[#d41428] pl-3">
                    {item.children.map((child) => (
                      <button
                        type="button"
                        key={child.label}
                        onClick={() => handleNavClick(child.page)}
                        className="text-left text-sm font-medium uppercase text-gray-600 hover:text-[#d41428]"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

function Hero({ setCurrentPage, logoUp }) {
  return (
    <section className="relative min-h-[700px] overflow-hidden">
      <img
        src="https://www.ati-solutions.fr/images/accueil/plan-travail.jpg"
        alt="USINAGE PRO solutions clé en main"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.85),rgba(0,0,0,.65),rgba(0,0,0,.2))]"/>
      <div className="relative mx-auto flex min-h-[700px] max-w-[1180px] items-center px-4 py-16 md:py-20">
        <div className="w-full text-white">
          <h1 className="max-w-[850px] text-[32px] font-black uppercase leading-tight md:text-[52px]">
            DÉCOUVREZ NOS SOLUTIONS "CLÉ EN MAIN"
          </h1>
          <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
            <div className="max-w-[600px] space-y-5 text-[16px] leading-7 md:text-[18px] md:leading-8 text-gray-100">
              <p>
                Du cahier des charges à l'installation en passant par l'étude, l'automatisation, la
                fabrication, le montage et la mise au point, <strong>USINAGE PRO conçoit des solutions sur-mesure</strong>{' '}
                (machines spéciales, banc d'essais, lignes de production, ...).
              </p>
              <p>
                L'ensemble des activités est optimisé par une <strong>recherche constante de qualité</strong>.
                Cette démarche se concrétise quotidiennement par l'application d'un processus qualité interne.
              </p>
            </div>
           {/* <div className="hidden justify-center md:flex">
  <div className="bg-white/95 px-10 py-8 shadow-2xl rounded-sm">
    <img src={logoUp} alt="USINAGE PRO" className="h-[190px] w-auto object-contain" />
  </div>
</div> */}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage('savoirFaire')}
              className="bg-[#d41428] px-8 py-3.5 text-[14px] font-black uppercase text-white transition hover:bg-[#a80f1f] shadow-lg"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function PageShell({ title, children }) {
  return (
    <main>
      <section className="bg-[#f2f2f2] py-10">
        <div className="mx-auto max-w-[1180px] px-4">
          <h1 className="text-[38px] font-black uppercase text-[#d41428]">{title}</h1>
        </div>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1180px] px-4">{children}</div>
      </section>
    </main>
  )
}

function CompanyPage({ type }) {
  const page = companyPages[type]
  return (
    <PageShell title={page.title}>
      <article className="space-y-5 text-[18px] leading-8 text-[#333]">
        <h2 className="text-[32px] font-black text-[#222]">{page.heading}</h2>
        {page.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <ExpertiseBlock />
    </PageShell>
  )
}

function SavoirFaireLanding({ setCurrentPage }) {
  return (
    <PageShell title="Nos savoir-faire">
      <h2 className="text-center text-[28px] font-black uppercase text-[#3b3b3b]">NOS SOLUTIONS</h2>
      <div className="mx-auto mt-3 h-[3px] w-16 bg-[#d41428]" />
      <p className="mx-auto mt-7 max-w-4xl text-center text-[18px] leading-8">
        USINAGE PRO regroupe ses compétences autour de quatre piliers : ETUDES, REALISATIONS,
        SYSTEMES et SERVICES. Chaque savoir-faire possède ses moyens, ses méthodes et son
        accompagnement spécifique.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Object.entries(savoirFaire).map(([key, card]) => (
          <Card key={key} card={card} onClick={() => setCurrentPage(key)} />
        ))}
      </div>
    </PageShell>
  )
}

function SavoirFairePage({ type, setCurrentPage }) {
  const page = savoirFaire[type]
  return (
    <PageShell title={page.title}>
      <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <img src={page.detailImage} alt={page.title} className="h-[360px] w-full object-cover shadow-md" />
        <div>
          <h2 className="text-[32px] font-black text-[#222]">{page.subtitle}</h2>
          <ul className="mt-6 space-y-3 text-[17px] leading-7">
            {page.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-[10px] h-2 w-2 shrink-0 bg-[#d41428]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <article className="mt-10 space-y-5 text-[18px] leading-8 text-[#333]">
        {page.text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <div className="mt-10 flex flex-wrap gap-3">
        {Object.entries(savoirFaire).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => setCurrentPage(key)}
            className={`px-5 py-3 text-sm font-black uppercase ${
              key === type ? 'bg-[#d41428] text-white' : 'bg-[#eee] text-[#333]'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </PageShell>
  )
}

function DomainLanding({ setCurrentPage }) {
  return (
    <PageShell title="Nos domaines d'intervention">
      <h2 className="text-center text-[28px] font-black uppercase text-[#3b3b3b]">MARCHÉS / SECTEURS D'ACTIVITÉ</h2>
      <div className="mx-auto mt-3 h-[3px] w-16 bg-[#d41428]" />
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(domainPages).map(([key, domain]) => (
          <button key={key} type="button" onClick={() => setCurrentPage(key)} className="bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="mx-auto mb-5 h-12 w-12 rounded-full border-4 border-[#d41428]" />
            <p className="text-[17px] font-black uppercase text-[#333]">{domain.title}</p>
          </button>
        ))}
      </div>
    </PageShell>
  )
}

function DomainPage({ type }) {
  const page = domainPages[type]
  return (
    <PageShell title={page.title}>
      <article className="space-y-5 text-[18px] leading-8 text-[#333]">
        <h2 className="text-[32px] font-black text-[#222]">Solutions industrielles pour le secteur {page.title}</h2>
        <p>{page.text}</p>
        <p>
          L’accompagnement peut intégrer l’analyse du besoin, la proposition de solutions
          technologiques, l’étude, la fabrication, le montage, la mise au point, l’installation sur
          site, la formation, le SAV, la maintenance et l’optimisation de production.
        </p>
      </article>
    </PageShell>
  )
}
function Card({ card, onClick }) {
  const { title, image, items, color } = card

  return (
    <div className="flex flex-col border border-[#e5e5e5] bg-white text-center shadow-sm">
      {/* Conteneur de l'image et du titre avec espacement ajusté */}
      <div className="flex h-[180px] flex-col items-center justify-between p-4 pt-6">
        <img
          src={image}
          alt={title}
          className="h-[110px] w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
        {/* Bandeau de titre coloré sous le logo */}
        <div
          className="w-full py-1 text-[13px] font-black uppercase text-white"
          style={{ backgroundColor: color || '#d41428' }}
        >
          {title}
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="flex flex-1 flex-col justify-between bg-[#f8f8f8] p-5">
        <ul className="space-y-2 text-left text-[14px] text-[#555]">
          {items?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#d41428]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {onClick && (
          <button
            type="button"
            onClick={onClick}
            className="mt-5 w-full bg-[#333] py-2 text-[12px] font-bold uppercase text-white transition hover:bg-[#d41428]"
          >
            En savoir plus
          </button>
        )}
      </div>
    </div>
  )
}

function ExpertiseBlock() {
  return (
    <section className="mt-12 bg-[#222] text-white">
      <div className="grid md:grid-cols-2">
        <img
          src="https://www.ati-solutions.fr/images/accueil/expertise-ati-solutions.jpg"
          alt="Une expertise adaptée à vos projets"
          className="h-full min-h-[360px] w-full object-cover"
        />
        <div className="flex min-h-[360px] items-center bg-[#333] px-8 py-12">
          <div>
            <h2 className="text-[32px] font-black leading-tight">Une expertise adaptée à vos projets :</h2>
            <ul className="mt-8 space-y-3 text-[18px] leading-8">
              {expertises.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-2 w-2 shrink-0 bg-[#d41428]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Home({ setCurrentPage }) {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1180px] px-4">
          <h2 className="text-center text-[28px] font-black uppercase text-[#3b3b3b]">NOS SOLUTIONS</h2>
          <div className="mx-auto mt-3 h-[3px] w-16 bg-[#d41428]" />
          <h1 className="mt-9 text-[34px] font-black leading-tight text-[#d41428]">
            Fabricant de machines spéciales : concrétisez vos projets industriels sur mesure
          </h1>
          <p className="mt-5 text-[18px] font-bold leading-8 text-[#333]">
            Transformer une idée technique en solution industrielle performante nécessite de la
            rigueur, une certaine vision et une parfaite maîtrise des procédés. En tant que fabricant
            de machines spéciales basé à Casablanca, USINAGE PRO accompagne les entreprises qui souhaitent
            automatiser, optimiser ou fiabiliser leur production. Chaque projet représente un enjeu unique,
            avec ses contraintes, ses objectifs et ses exigences de précision. Ainsi, nous mettons à votre
            disposition notre savoir-faire pour concevoir des équipements adaptés à votre activité. Que vous
            cherchiez à améliorer vos performances, à réduire vos temps de production ou à développer une
            nouvelle ligne, vous bénéficiez d’un accompagnement structuré et orienté résultats.
          </p>
          <h2 className="mt-9 text-[28px] font-black leading-tight text-[#333]">
            USINAGE PRO : votre fabricant de machines spéciales à Casablanca !
          </h2>
          <p className="mt-4 text-[18px] leading-8 text-[#333]">
            Chaque environnement industriel impose ses propres contraintes techniques, organisationnelles et
            de cadence. En faisant appel à un <strong>fabricant de machines spéciales</strong>, vous accédez
            à une solution conçue spécifiquement pour répondre à vos besoins réels. USINAGE PRO analyse votre
            cahier des charges afin de proposer un équipement parfaitement intégré à votre process existant.
            Ainsi, vous gagnez en fluidité, tout en limitant les adaptations coûteuses. De plus, la conception
            sur mesure permet d’anticiper les contraintes d’espace, de sécurité et de production. Grâce à cette
            vision globale, vous obtenez une machine pensée pour durer et évoluer avec votre activité, sans
            compromis sur la performance ni sur la précision attendue.
          </p>
          <h2 className="mt-9 text-[28px] font-black leading-tight text-[#333]">
            Des machines spéciales conçues pour votre activité industrielle
          </h2>
          <p className="mt-4 text-[18px] leading-8 text-[#333]">
            Opter pour une machine spécifique permet d’atteindre un niveau d’efficacité difficile à obtenir
            avec des solutions standards. En collaborant avec USINAGE PRO, vous bénéficiez d’une équipe qui
            comprend vos objectifs de production, vos cadences et toutes vos contraintes techniques. En faisant
            le choix de <strong>fabriquer une machine spéciale</strong>, vous améliorez la répétabilité de vos
            opérations tout en réduisant les interventions manuelles. De plus, l’intégration d’automatismes et
            de systèmes de contrôle favorise une meilleure maîtrise des cycles de production. Cette optimisation
            se traduit également par une réduction des erreurs et une meilleure régularité des résultats. Vous
            avancez ainsi avec un outil fiable, conçu pour soutenir votre développement industriel sur le long terme.
          </p>
          <h2 className="mt-9 text-[28px] font-black leading-tight text-[#333]">
            Donnez vie à vos projets industriels avec USINAGE PRO
          </h2>
          <p className="mt-4 text-[18px] leading-8 text-[#333]">
            Passer de l’idée à la réalisation demande une coordination précise entre conception mécanique,
            automatisation et mise en service. <strong>USINAGE PRO</strong> vous accompagne à chaque étape afin
            de concrétiser votre projet dans les meilleures conditions. En tant que fabricant de machines
            spéciales, nous vous aidons à structurer votre besoin, puis à transformer vos contraintes en
            solutions techniques concrètes. Vous profitez ainsi d’un interlocuteur unique, capable de suivre
            votre projet avec cohérence et réactivité. De la première réflexion jusqu’à l’installation finale,
            chaque étape est pensée pour garantir un résultat conforme à vos attentes. Vous disposez alors d’un
            équipement performant, conçu pour répondre à vos enjeux industriels actuels et futurs.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Object.entries(savoirFaire).map(([key, card]) => (
              <Card key={key} card={card} onClick={() => setCurrentPage(key)} />
            ))}
          </div>
        </div>
      </section>
      <ExpertiseBlock />
    </>
  )
}
function CoverageMap() {
  const [activeCity, setActiveCity] = useState(null)

  const cities = [
    { name: 'Casablanca', top: '44%', left: '38%', count: 'Siège & Projets' },
    { name: 'Mohamedia', top: '40%', left: '40%', count: 'Zone Industrielle' },
    { name: 'Rabat', top: '34%', left: '44%', count: 'Projets Spéciaux' },
    { name: 'Berrechid', top: '48%', left: '41%', count: 'Usinage & Maintenance' },
    { name: 'Settat', top: '53%', left: '43%', count: 'Interventions Sur Site' },
    { name: 'El Jadida', top: '49%', left: '32%', count: 'Projets Industriels' },
    { name: 'Marrakech', top: '68%', left: '37%', count: 'Accompagnement Technique' },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-wider text-gray-900">
            Villes Desservies / Couverture
          </h2>
          <div className="w-16 h-1 bg-[#d41428] mx-auto mt-3 mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            USINAGE PRO intervient pour des projets industriels sur-mesure à Casablanca, Mohamedia, Rabat, Berrchid, Settat, El Jadida et Marrakech.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-gray-100">
          <div className="lg:col-span-2 relative w-full h-[420px] bg-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            ></div>

            {cities.map((city) => (
              <div
                key={city.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                style={{ top: city.top, left: city.left }}
                onMouseEnter={() => setActiveCity(city)}
                onClick={() => setActiveCity(city)}
              >
                <span className="absolute -inset-2 rounded-full bg-[#d41428] opacity-75 animate-ping"></span>
                <div className="relative w-4 h-4 bg-[#d41428] border-2 border-white rounded-full shadow-md transition-transform duration-300 group-hover:scale-125"></div>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 text-white text-xs font-semibold px-2.5 py-1 rounded border border-gray-700 shadow-md group-hover:bg-[#d41428]">
                  {city.name}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
              Zone d'intervention
            </h3>

            {activeCity ? (
              <div className="p-5 bg-red-50 border-l-4 border-[#d41428] rounded-r-lg transition-all duration-300">
                <p className="text-xs uppercase tracking-widest font-bold text-[#d41428]">Ville Sélectionnée</p>
                <h4 className="text-2xl font-bold text-gray-900 mt-1">{activeCity.name}</h4>
                <p className="text-sm text-gray-600 mt-2">{activeCity.count}</p>
              </div>
            ) : (
              <div className="p-5 bg-gray-100 border-l-4 border-gray-400 rounded-r-lg text-gray-500 text-sm">
                Survolez ou cliquez sur une ville pour voir le détail de l'intervention.
              </div>
            )}

            <div className="pt-2">
              <p className="text-xs font-semibold uppercase text-gray-400 mb-2">Villes desservies :</p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => setActiveCity(city)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                      activeCity?.name === city.name
                        ? 'bg-[#d41428] text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
function ReferencesPage() {
  return (
    <PageShell title="Nos références">
      <CoverageMap />
    </PageShell>
  )
}

function ActualitesPage({ setCurrentPage }) {
  return (
    <PageShell title="Actualités">
      <div className="grid gap-6 md:grid-cols-3">
        {Object.entries(articlePages).map(([key, article]) => (
          <article key={key} className="bg-white text-center shadow-sm">
            <div className="h-[210px] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
            <div className="p-7">
              <h3 className="text-[22px] font-black text-[#333]">{article.title}</h3>
              <p className="mt-4 min-h-[92px] text-[15px] leading-7 text-[#666]">
                {article.intro}
              </p>
              <button type="button" onClick={() => setCurrentPage(key)} className="mt-4 inline-flex bg-[#d41428] px-5 py-2 text-[13px] font-black uppercase text-white">
                Lire la suite
              </button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  )
}

function ArticlePage({ type, setCurrentPage }) {
  const article = articlePages[type]
  return (
    <PageShell title={article.title}>
      <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <img src={article.image} alt={article.title} className="h-[360px] w-full object-cover shadow-md" />
        <div>
          <h2 className="text-[32px] font-black text-[#222]">{article.title}</h2>
          <p className="mt-5 text-[19px] font-bold leading-8 text-[#555]">{article.intro}</p>
          <button
            type="button"
            onClick={() => setCurrentPage('contact')}
            className="mt-7 bg-[#d41428] px-7 py-3 text-[14px] font-black uppercase text-white"
          >
            Contactez-nous
          </button>
        </div>
      </div>
      <article className="mt-10 space-y-5 text-[18px] leading-8 text-[#333]">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
      <div className="mt-10 flex flex-wrap gap-3">
        {Object.entries(articlePages).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => setCurrentPage(key)}
            className={`px-5 py-3 text-sm font-black uppercase ${
              key === type ? 'bg-[#d41428] text-white' : 'bg-[#eee] text-[#333]'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </PageShell>
  )
}





function ContactPage() {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: '',
    company: '',
    address: '',
    postal: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Envoi en cours...')

    const SERVICE_ID = 'service_vu90r0i'
    const TEMPLATE_ID = 'template_p90b7cn'
    const PUBLIC_KEY = '4KSYeJVW0j3e_YPzd'

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus('Message et fichier envoyés avec succès !')
          setForm({
            name: '',
            company: '',
            address: '',
            postal: '',
            city: '',
            country: '',
            email: '',
            phone: '',
            message: '',
          })
          if (formRef.current) formRef.current.reset()
        },
        (error) => {
          console.error('EmailJS Error:', error)
          setStatus('Erreur lors de l’envoi. Veuillez réessayer.')
        },
      )
  }

  const mapSearch = encodeURIComponent('USINAGE PRO, N174, Rue 13 Hay Rahmani, Sidi Moumen, Casablanca')

  return (
    <PageShell title="Contact">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
        {/* Infos de contact & Carte */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-[32px] font-black uppercase text-[#333]">USINAGE PRO</h2>
            <div className="mt-3 h-[3px] w-16 bg-[#d41428]" />
            <div className="mt-8 space-y-4 text-[17px] leading-8">
              <p>N174, Rue 13 Hay Rahmani - Sidi Moumen, Casablanca Maroc</p>
              <p>
                Téléphone :{' '}
                <a className="font-bold text-[#d41428]" href="tel:+212663579571">
                  06 63 57 95 71
                </a>
              </p>
              <p>
                Email :{' '}
                <a className="font-bold text-[#d41428]" href="mailto:contact@usinagepro.ma">
                  contact@usinagepro.ma
                </a>
              </p>
              <p>
                Site Web :{' '}
                <a className="font-bold text-[#d41428]" href="http://www.usinagepro.ma" target="_blank" rel="noreferrer">
                  www.usinagepro.ma
                </a>
              </p>
            </div>
          </div>

          <div className="relative h-[320px] w-full overflow-hidden border border-[#ddd] shadow-sm">
            <iframe
              title="Localisation USINAGE PRO"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${mapSearch}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
            />
          </div>
        </div>

        {/* Formulaire */}
        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4 bg-[#f5f5f5] p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <input required name="user_name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Nom /Prénom(*)" className="border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />
            <input name="company" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Société" className="border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />
            <input name="address" value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Adresse" className="border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />
            <input name="postal" value={form.postal} onChange={(e) => update('postal', e.target.value)} placeholder="Code Postal" className="border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />
            <input name="city" value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Ville" className="border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />
            <input name="country" value={form.country} onChange={(e) => update('country', e.target.value)} placeholder="Pays" className="border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />
            <input required type="email" name="user_email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email(*)" className="border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />
            <input name="phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Téléphone" className="border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />
          </div>

          <textarea required name="message" rows="6" value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Message" className="resize-none border border-[#d4d4d4] bg-white px-4 py-3 outline-none focus:border-[#d41428]" />

          <div className="flex flex-col space-y-2">
            <label className="text-[15px] font-bold text-[#333]">Fichier(s) à joindre</label>
            <input
              type="file"
              name="my_file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:border-0 file:bg-[#e0e0e0] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-[#d0d0d0]"
            />
          </div>

          <button type="submit" className="mt-2 w-fit bg-[#d41428] px-8 py-3 text-[14px] font-black uppercase text-white transition hover:bg-[#a80f1f]">
            Envoyer
          </button>

          {status && <p className="mt-2 text-sm font-semibold text-[#d41428]">{status}</p>}
        </form>
      </div>
    </PageShell>
  )
}

function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-[#262626] py-12 text-center text-white">
      <div className="mx-auto max-w-[980px] px-4">
        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className="inline-block rounded-md bg-white p-3 shadow-md">
            <img 
              src={logoUp} 
              alt="USINAGE PRO" 
              className="h-[100px] w-auto object-contain" 
            />
          </div>
        </div>

        <p className="text-[19px] font-bold">
          USINAGE PRO - N174, Rue 13 Hay Rahmani - Sidi Moumen, Casablanca Maroc Tél. 06 63 57 95 71
        </p>
        <p className="mt-4 text-[15px] leading-7 text-[#d5d5d5]">
          Créateur de systèmes industriels: Bureau d'études mécaniques, usinage de précision,
          micromécanique, prototypes, petites séries, machines et outillages de production, bancs et
          montages d'essais, automatisation, robotisation, installation, SAV, contrats de maintenance,
          rénovation et mise en conformité de machines.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-6 text-[13px] uppercase text-[#bbb]">
          {['accueil', 'presentation', 'savoirFaire', 'domaines', 'contact'].map((page) => (
            <button key={page} type="button" onClick={() => setCurrentPage(page)}>
              {pages[page]}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}


function App() {
  const [currentPage, setCurrentPage] = useState('accueil')


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const go = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    if (currentPage === 'accueil') return <Home setCurrentPage={go} />
    if (['presentation', 'histoire', 'qualite'].includes(currentPage)) return <CompanyPage type={currentPage} />
    if (currentPage === 'savoirFaire') return <SavoirFaireLanding setCurrentPage={go} />
    if (Object.keys(savoirFaire).includes(currentPage)) return <SavoirFairePage type={currentPage} setCurrentPage={go} />
    if (currentPage === 'domaines') return <DomainLanding setCurrentPage={go} />
    if (Object.keys(domainPages).includes(currentPage)) return <DomainPage type={currentPage} />
    if (currentPage === 'references') return <ReferencesPage />
    if (currentPage === 'actualites') return <ActualitesPage setCurrentPage={go} />
    if (Object.keys(articlePages).includes(currentPage)) return <ArticlePage type={currentPage} setCurrentPage={go} />
    if (currentPage === 'contact') return <ContactPage />
    return <Home setCurrentPage={go} />
  }

  return (
    <div className="min-h-screen bg-white text-[#222]">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={go} 
        nav={nav} 
        logoUp={logoUp} 
      />
      {renderPage()}
      <Footer setCurrentPage={go} />
    </div>
  )
}

export default App