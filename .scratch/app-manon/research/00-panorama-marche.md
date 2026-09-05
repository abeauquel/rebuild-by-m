# Étude de marché — Outils existants pouvant remplacer une app sur-mesure

**Contexte client** : kinésithérapeute du sport, micro-entreprise française, ~50 athlètes, 100 % à distance, **hors cadre conventionné** (pas de remboursement Sécu, pas de FSE/Sesam-Vitale), besoin **français + anglais**.

**Date de la recherche** : septembre 2026.

## Méthode et conventions de lecture

- **VU** = information lue directement sur une page officielle de l'éditeur, URL citée.
- **DÉDUIT** = inférence de ma part, ou information provenant d'un tiers (comparatif, annuaire SaaS, revendeur). À re-vérifier avant toute décision.
- **« sur demande »** = aucun prix public trouvé. **Aucun prix n'a été inventé dans ce document.**

### Les 7 besoins, numérotés B1 → B7

| # | Besoin |
|---|---|
| **B1** | Formulaire d'admission rempli **en ligne par le client** (coordonnées, antécédents, problématique) |
| **B2** | Bilan visio **pré-rempli**, complété en direct par la praticienne |
| **B3** | Tests mobilité/force : **valeurs chiffrées + photos/vidéos**, répétables à 8 semaines, **comparaison longitudinale** |
| **B4** | Espace « SUIVI » : retours client **tous les 15 jours** (douleur, RPE, sensations) + notes de visio de re-check |
| **B5** | **Saisie autonome** par le client de sa douleur / RPE |
| **B6** | Facturation (actuellement Tiime + virements bancaires, **pas de Stripe**) |
| **B7** | Programmation d'exercices avec vidéos (actuellement TrueCoach) |

> ⚠️ **Avertissement transversal sur B6.** La cliente facture via **Tiime + virements**. Or la quasi-totalité des plateformes de coaching/santé qui « font la facturation » le font **via Stripe uniquement**, avec commission. Aucune ne s'interface avec Tiime. **B6 restera donc très probablement hors périmètre de l'outil choisi, quel qu'il soit.** Ce n'est pas un défaut d'un produit en particulier, c'est une caractéristique du marché.

---

# A) Les deux références citées par la cliente

## A.1 — Andrew® (andrewapp.com / andrewapp.fr)

**Éditeur** : ANDREWAPP, SAS immatriculée à **Lyon, France** (SIRET 952 463 636) — VU (CGU).

### Prix — **PUBLIC ET AFFICHÉ** (rare sur ce marché)

| Offre | Prix | Source |
|---|---|---|
| **Andrew® Lite** | **34,90 € / mois / praticien** | VU — https://www.andrewapp.com/ |
| **Andrew® Coach** | **49,90 € / mois / praticien** (mis en avant « le plus populaire ») | VU — https://www.andrewapp.com/ |
| **Andrew® Multi** | **104,70 € / mois au total** (3 membres, facturation annuelle) | VU — https://www.andrewapp.com/ |

Essai gratuit **15 jours** — VU.

> Note : la page `andrewapp.fr` redirige (308) vers `andrewapp.com` — même produit, même grille.

### Couverture des 7 besoins

| Besoin | Verdict | Détail |
|---|---|---|
| B1 | ❌ | Aucun formulaire d'admission public rempli par le client avant prise en charge — VU (absent des pages produit) |
| B2 | 🟡 | **Visio intégrée** (« téléconsultation », transmission vidéo) — VU. Mais le bilan est saisi par la praticienne : « diagnostic, zone anatomique, phase de rééducation, douleur, objectifs fonctionnels » — VU (page Andrew AI). Ce n'est **pas** un formulaire pré-rempli par le client |
| B3 | ❌ **point faible majeur** | Pas de batterie de tests chiffrés répétables, **pas de capture photo/vidéo de mobilité**, pas de comparaison A/B à 8 semaines. Le « bilan » sert surtout à alimenter la recommandation d'exercices par IA — VU |
| B4 | ✅ | Suivi de l'observance, historique complet des séances, **messagerie chiffrée**, commentaires du patient sur chaque exercice — VU |
| B5 | ✅ **bon** | **Échelles EVA** renseignées par le patient, questionnaires de suivi, **graphique d'évolution des symptômes** — VU. Andrew publie même une étude sur 478 patients (amélioration moyenne 1,55 point EVA en 1 semaine) — VU |
| B6 | 🟡 | Facturation + paiement **via Stripe uniquement** ; « ANDREWAPP ne fournit que le moyen technique de paiement et ne prélève aucune commission » — VU (CGU). **Incompatible avec le circuit Tiime + virements actuel** |
| B7 | ✅ | Prescription d'exercices en moins de 30 s, **bibliothèque 1 500+ vidéos**, programmation multi-semaines, Andrew® AI — VU |

### Hébergement des données de santé — **le meilleur du panel**

**VU (CGU)** : hébergement chez **OVH SAS** (Roubaix, France). Citation : *« OVH est un hébergeur de données certifié HDS »*. Données de santé, droit français, portabilité et suppression garanties. **HDS France : OUI.**

### Langues, API

- **FR + EN** — VU (bascule 🇫🇷 FR / 🇬🇧 EN, site `/en/` complet).
- **API** : non documentée publiquement. Export : non documenté.

### Verdict Andrew

Andrew est **le mieux positionné sur le cadre** : français, HDS, bilingue, prix public bas, et l'éditeur **cible explicitement le suivi « hors nomenclature » à distance** (plusieurs articles de fond sur le sujet — VU). Il couvre bien B4, B5, B7 et partiellement B2.

**Mais il rate le cœur de la demande : B3.** Il n'y a pas de batterie de tests de mobilité/force chiffrée, photographiée et rejouable à 8 semaines. Andrew est un outil de **prescription d'exercices + suivi de douleur**, pas un outil de **bilan quantifié longitudinal**.

## A.2 — Check-up Santé (check-up-sante.com)

### Ce que j'ai VU

Le produit correspond **très bien au besoin B3 sur le papier** — c'est même le seul de toute l'étude à être conçu exactement pour ça :

- Application de **bilan physique** pour praticiens, coachs et staff sportif.
- **Trois espaces distincts** : Coach/Praticien, Athlète, Staff — VU (page `/auth`).
- **Suivi longitudinal** et **comparaison aux normes**, évaluation du **risque de blessure**, **génération de rapports PDF** — VU.
- L'athlète dispose d'un accès pour consulter ses résultats et ses axes de progrès — VU.

### Mais : signaux d'alerte sérieux

C'est le point le plus important de cette section, et il change la lecture de la référence.

1. **Aucun prix public.** → **« sur demande »**, et il n'y a même pas de formulaire de contact ou de demande de démo — VU.
2. **Aucune page publique** hors la page de connexion : pas de page fonctionnalités, pas de tarifs, pas de contact.
3. **Aucune mention légale, aucune CGU, aucune politique de confidentialité** — VU. Pour un produit qui traite des **données de santé**, c'est une non-conformité RGPD apparente (l'information des personnes est une obligation).
4. **Aucune information d'hébergement**, aucune mention HDS ni RGPD — VU.
5. **Aucune existence commerciale détectable** : plusieurs recherches ciblées n'ont **rien** remonté sur ce produit (ni presse, ni annuaire, ni avis, ni page société).
6. **Le site porte un badge « Edit with Lovable »** — VU (page `/auth`). Lovable.dev est une plateforme de génération d'applications par IA.

### Conclusion sur Check-up Santé — à remonter à la cliente

**DÉDUIT, mais avec un bon niveau de confiance** : Check-up Santé n'est pas un éditeur SaaS établi. C'est selon toute vraisemblance une **application développée sur-mesure avec Lovable**, à usage restreint ou confidentiel — pas un produit qu'on peut acheter sur étagère.

**DÉDUIT (à vérifier)** : les applications Lovable s'appuient par défaut sur Supabase, dont les régions par défaut ne sont pas françaises et qui **n'est pas hébergeur HDS**. Si c'est le cas, ce produit **ne serait pas conforme** pour héberger des données de santé françaises.

> **Point de cadrage important pour la cliente** : sa deuxième référence n'est donc pas un concurrent à acheter — c'est **un exemple de ce qu'elle veut faire construire**. Cela ne plaide pas contre le sur-mesure, cela plaide *pour*. La bonne question à lui poser : « qu'est-ce que tu as vu dans Check-up Santé exactement — l'écran de bilan ? la comparaison aux normes ? le PDF ? »

---

# B) Logiciels de télékiné / kiné français

## B.0 — Vérification d'existence : 6 noms sur 13 sont à écarter

| Nom demandé | Verdict |
|---|---|
| Kinequantum | ✅ Existe |
| Kiplin | ✅ Existe |
| Nabla | ✅ Existe — mais **scribe IA médical**, sans rapport avec la kiné à distance |
| Doctolib Téléconsultation | ✅ Existe |
| Physiotec | ✅ Existe — **renommé « Wibbi »** (physiotec.ca redirige vers wibbi.com) |
| Physitrack | ✅ Existe |
| Kinvent | ✅ Existe |
| **Vivoka** | ⚠️ **Hors domaine.** Startup de Metz, moteur de **reconnaissance vocale embarquée**. Rien à voir avec la santé. **À sortir de la liste.** |
| **Prescrimouv** | ⚠️ **Pas un logiciel commercial.** C'est **Prescri'mouv**, dispositif **public régional Grand Est** (ARS + Région) d'orientation vers l'APA. Non achetable, non national. |
| **Medoc** | ⚠️ **Erreur de nom probable.** Le seul trouvé est **Med'oc**, gestion de cabinet **médical** (médecins), Sesam-Vitale. Hors cadre. |
| **« MonKineEnLigne »** | ❌ **N'EXISTE PAS.** Confusion probable avec *MonRdvKiné* (monrdvkine.fr). |
| **« Kinéfit »** | ❌ **N'EXISTE PAS** comme logiciel FR. |
| **« Instant Kiné »** | ❌ **N'EXISTE PAS.** |

## B.1 — Physitrack ⭐ (le plus pertinent de la liste demandée)

- **Prix VU** : **22,95 € / mois / praticien** (zone euro) ou **247,86 € / an** (−10 %) — https://support.physitrack.com/article/159-how-much-does-physitrack-cost
  - La page marketing affiche par ailleurs **18,99 $ / praticien / mois** — https://www.physitrack.com/physitrack-pricing. ⚠️ **Incohérence entre deux pages officielles, à faire confirmer.**
  - Add-on **Telehealth Pro : 11,99 € / mois** (2 000 min de visio ; 60 min incluses de base) — VU.
- **Couvre** : B7 ✅ (18 000+ vidéos) · B5 ✅ (le patient note douleur et difficulté à chaque séance dans PhysiApp) · B4 ✅ (PROMs programmables, observance, messagerie sécurisée) · B2 🟡 (visio native).
- **Ne couvre pas** : **B1** ❌, **B6** ❌ (les « billing reports » concernent le RTM **américain**, codes CPT — inutilisable en France), **B3** 🟡 (mesures chiffrées oui, mais **pas de capture photo/vidéo comparative** à 8 semaines).
- **Hébergement** : AWS, région **Francfort (UE)** disponible. **RGPD, ISO 27001 & 27018, HIPAA, NHS DSP Toolkit** — VU https://www.physitrack.com/security. **Pas de HDS France.**
- **Langues** : **FR + EN** (+ 13 autres) — VU.
- **API** : REST existante mais **accès réservé** aux éditeurs de 500+ praticiens (exceptions à 50) — VU https://www.physitrack.com/developer-information. **DÉDUIT : inaccessible à une micro-entreprise.**

## B.2 — Physiotec → Wibbi

- **Prix** : **« sur demande »** — VU https://www.wibbi.com/pricing/ (plans listés, **aucun montant**).
  - DÉDUIT (tiers non officiel, GetApp/Capterra) : point d'entrée ~33 $/mois. **Non confirmé, ne pas budgéter dessus.**
- **Couvre** : B7 ✅ (20 000+ exercices) · B4/B5 ✅ (portail patient, PROs, épisodes de soins).
- **Ne couvre pas** : B1, B2 (**pas de visio native**), B6, et B3 en version photo/vidéo comparative.
- **Hébergement** : société **canadienne** (Montréal). DÉDUIT : serveurs Canada/US/UK/UE selon partenaire. PIPEDA + RGPD + HIPAA. **Pas de HDS.** ⚠️ Transfert hors UE possible.
- **Langues** : **FR + EN** — VU.
- **API** : intégrations EMR mentionnées, **aucune API publique documentée**.

## B.3 — Kinvent

- **Prix** : **« sur demande »** — VU (kinvent.com et /software/ : aucun tarif, CTA « Book a demo »).
- **Couvre B3 magistralement — c'est son métier** : dynamomètres (K-Push, K-Grip, K-Pull), plateformes de force, EMG, goniomètre connecté → **valeurs chiffrées, protocoles, rapports, graphiques, suivi longitudinal** — VU. B5 🟡 (intégration PROMs). Export de rapports ✅.
- **Ne couvre pas** : B1, B2, B6, B7.
- ⚠️ **Bloqueur structurel pour ce cas** : les capteurs doivent être **physiquement au contact de l'athlète**. En 100 % distanciel, il faudrait équiper les 50 athlètes. **Inapplicable.**
- **Hébergement** : mentions **« HDS certified »**, ISO 27001:2022, HIPAA sur la home — VU, mais **sans page dédiée le détaillant**. À faire confirmer par attestation écrite.
- **Langues** : EN, FR, ES, ZH — VU.

## B.4 — Doctolib Téléconsultation

- **Prix VU** : **79 € TTC / mois / praticien** pour le module Téléconsultation — https://info.doctolib.fr/presentation/offre-teleconsultation-medecin/
  - ⚠️ L'offre VU est **réservée aux médecins résidant en France** — *pas aux kinés*.
  - ⚠️ La page tarifs générale n'affiche **aucun montant** : le socle Doctolib Pro est **« sur demande »**, avec « engagement de 12 mois » — VU https://info.doctolib.fr/tarifs/.
- **Couvre** : B2 🟡 (visio, salle d'attente virtuelle), B1 🟡 (questionnaires de pré-consultation), B6 🟡 (encaissement de la téléconsultation).
- **Ne couvre pas** : **B3, B4, B5, B7 — totalement absents.**
- ⚠️ **Inadapté** : agenda + visio + facturation conventionnée, construit pour une patientèle de proximité via annuaire. Rien à voir avec le suivi de 50 athlètes à distance.
- **Langues** : FR. Interface patient EN non confirmée. **DÉDUIT : faible pour un besoin bilingue.**

## B.5 — KineQuantum

- **Prix VU** : **11 440,00 € HT** pour le dispositif VR « Classique » (logiciel + casque + PC + 1 an de maintenance) — https://www.kinequantum.com/en/shop. Abonnement logiciel : **« sur demande »**.
- **Couvre** : B3 🟡 (bilans articulaires chiffrés en VR), B7 🟡 (exercices en VR, pas des vidéos à domicile).
- **Ne couvre pas** : B1, B2, B4, B5, B6.
- ⚠️ **Disqualifié** : dispositif **matériel de cabinet**, ticket d'entrée à 11 440 € HT, et il faudrait un casque VR par athlète.

## B.6 — Kiplin

- **Prix** : **« sur demande »** — VU (kiplin.com/fr/soignants/ et /faq/).
- ⚠️ **Modèle B2B strict** : clients = entreprises, collectivités, établissements, mutuelles. **Minimum ~20 participants**, aucune formule pour un praticien indépendant — VU.
- **Couvre** : B3 🟡 (bilans initiaux/finaux), B4/B5 🟡 (challenges gamifiés, séances visio, quiz).
- **Ne couvre pas** : B1, B2, B6, B7.
- **Hébergement VU** : *« Les données patients sont stockées dans un environnement certifié Hébergeur Données de Santé »* → **HDS France : OUI.**
- **Langues VU** : **5 langues dont FR et EN.** ✅
- **Verdict** : bon cadre (HDS, FR/EN, distanciel) mais **le modèle commercial exclut une micro-entreprise**.

## B.7 — Nabla

- **Prix** : **« sur demande »** — VU (nabla.com ; la page `/pricing/` renvoie une **404**).
  - DÉDUIT (tiers uniquement, jamais confirmé par Nabla) : gratuit ~30 consultations/mois, puis ~119 $ / ~239 $ par mois. **Chiffres non officiels.**
- **Couvre** : **aucun des 7 besoins directement.** C'est un **scribe ambiant IA** qui génère la note clinique. Il pourrait aider à pré-remplir un compte rendu (proche de B2) mais **par transcription a posteriori**, pas via un formulaire structuré.
- **Hébergement** : badges HIPAA / SOC 2 Type 2 / ISO 27001 / RGPD — VU. **Localisation non précisée**, bureaux **Brooklyn (US) + Paris**. **HDS non mentionné.** ⚠️ À clarifier impérativement.
- **Langues** : FR + EN.
- **API** : ✅ **publique et documentée** (docs.nabla.com) — le seul de la liste.

---

# B bis) Outils français NON demandés, trouvés en cours de route — dont le meilleur candidat de l'étude

Cette section n'était pas au programme mais elle contient **la découverte la plus importante**.

## ⭐ B bis.1 — Hexfit — *le meilleur compromis global identifié*

Éditeur canadien avec **présence commerciale française dédiée**, et — fait notable — une page produit intitulée littéralement **« Logiciel kinésithérapeutes hors nomenclature »**, soit exactement le cadre d'exercice de la cliente.

### Prix — **PUBLIC**

Offre France dédiée kinés — VU https://hexfit-sport-sante.fr/tarifs-hexfit-logiciel-kines/ :

| Offre | Prix | Contenu VU |
|---|---|---|
| **Starter kiné** | **39 € / mois / praticien** | Programmation d'exercices, 13 000 vidéos, app mobile client, envoi PDF/email, création assistée par IA, support chat |
| **Essentiel kiné** | **59 € / mois / praticien** | Tout Starter + **banque de tests et protocoles personnalisables**, suivi avancé, gestion de groupes, agenda/RDV, **facturation via Stripe (+0,6 %)**, messagerie |

**Nombre de clients suivis : ILLIMITÉ** — VU (*« le nombre de clients suivis est illimité »*). Essai gratuit 15 jours.

> ⚠️ La grille internationale (myhexfit.com/fr/tarifs) diffère : plans Therapist « Solo 50/mois » (jusqu'à 50 patients) et « Clinique 120/mois », devise déterminée par le pays de la carte bancaire — VU. **Il y a donc deux grilles ; celle à retenir est la grille française kiné (39/59 €).** À faire confirmer.

### Couverture des 7 besoins

| Besoin | Verdict | Détail |
|---|---|---|
| B1 | ✅ | **140 formulaires prêts à l'emploi** (questionnaires de santé, protocoles d'évaluation, questionnaires de motivation) — VU. Onglet « Documents » de la fiche client, versions remplies archivées en PDF dans le « Cloud storage » |
| B2 | ✅ **excellent** | VU (aide en ligne) : *« pour n'importe quel formulaire, vous avez l'option de le remplir en direct pendant une séance avec le client, ou de l'envoyer en ligne pour qu'il le complète »*. **C'est exactement le workflow demandé** : le client remplit en amont, la praticienne complète en direct pendant la visio. Bonus : **notes vocales automatiquement synthétisées et structurées** — VU. *(Réserve : la visio elle-même n'est pas native, à tenir sur un outil tiers.)* |
| B3 | ✅ **le point fort** | **130 tests physiques préexistants** + *« Créez vos propres protocoles de tests »* + **visualisation test/retest et comparaison longitudinale** — VU |
| B4 | ✅ | Suivi 360°, dossier historisé, messagerie patient, alertes d'objectifs — VU |
| B5 | ✅ | App mobile client : suivi de progression, visualisation test/retest, séances prescrites — VU |
| B6 | 🟡 | Facturation incluse dans Essentiel, mais **via Stripe (+0,6 %)** — **incompatible Tiime/virements** |
| B7 | ✅ | 1 700 exercices vidéo/images (13 000 selon la page FR), programmes personnalisés, déroulé automatique — VU |

### Hébergement, langues, API

- **HDS France : OUI** — VU : *« données […] hébergées sur des serveurs sécurisés certifiés HDS en France »* (hexfit-sport-sante.fr). RGPD mentionné.
- **Langues : FR + EN confirmé** — VU. Mieux : le logiciel est nativement bilingue et **affiche les exercices dans la langue du compte client**, et on peut saisir titres/descriptions dans plusieurs langues. C'est **exactement** ce qu'il faut pour une patientèle FR + EN.
- **API** : non documentée publiquement.

### Verdict Hexfit

C'est **le seul outil de toute l'étude à cumuler** : prix public bas (39–59 €/mois), **clients illimités**, **HDS France**, **bilingue FR/EN natif**, **batterie de tests chiffrés avec protocoles personnalisables et comparaison test/retest** (B3, le besoin que presque personne ne couvre), **140 formulaires remplissables par le client en ligne *ou* en direct pendant la visio** (B1 + B2), app client, messagerie et programmation vidéo.

**Score : 6 besoins sur 7 couverts** (B1 ✅ B2 ✅ B3 ✅ B4 ✅ B5 ✅ B7 ✅), seul B6 restant partiel. **Aucun autre outil de l'étude n'approche ce niveau.**

**Réserves** : pas de visio native (il faut garder un outil de visio à part), facturation Stripe-only donc incompatible avec le circuit Tiime + virements, et **le doublon de grilles tarifaires** (39/59 € sur le site partenaire français vs « Therapist Solo 50/mois » sur le site éditeur) demande une clarification commerciale avant signature.

## B bis.2 — Autres trouvailles françaises

| Outil | Prix | Ce qu'il apporte | Bloqueur |
|---|---|---|---|
| **Axomove** | **30 €/mois** (Pack Exercices) · **60 €/mois** (Pack Télésoin) — VU https://www.axomove.com/tarifs. Patients illimités, essai 15 j | 1 800 vidéos, téléconsultations illimitées, messagerie chiffrée, suivi d'activité | **Ni bilan chiffré, ni tests, ni photos, ni facturation** — VU (absents de la page). Pas de HDS/RGPD documenté |
| **KineHub** | **« sur demande »** (essai 2 semaines, mensuel sans engagement — VU CGU) | **HDS France confirmé** — VU. 500+ exercices filmés, bilans personnalisés, télésoin, **« facturation hors nomenclature intégrée »** (rare et pertinent !) | Questionnaires client, tests chiffrés répétables, photos/vidéos, RPE : **non documentés**. Anglais non mentionné |
| **Maiia Bilan** (ex-**Kobus**, Cegedim) | **« sur demande »** — VU (la grille publique a disparu au rachat) | **Base de tests et questionnaires**, *« Photos, vidéos, tableau de bord : d'un coup d'œil vous suivez la progression »* — VU. Prescription d'exercices vidéo. **Couvre bien B3 et B7** | **Aucun portail de saisie patient**, pas de facturation, **pas d'anglais**, adossé à l'écosystème NGAP |
| **FITéval** | **220 €** (promo, au lieu de 350 €) — **licence, non mensuelle** — VU https://www.fitevalsoft.com/20/fonctionnalites/ | **70+ tests avec normes** (ACSM, canadiennes), populations personnalisables, 3 questionnaires, suivi de charge hebdo (méthode Foster), 450 exercices illustrés | Saisie patient, photos/vidéos, hébergement, RGPD : **non documentés**. DÉDUIT : logiciel de poste, pas de portail client |
| **BilanKiné** | **25 €/mois avec engagement 1 an**, +10 €/mois par praticien supplémentaire — VU https://bilankine.fr/ | Bilan en <10 min, PDF, **duplication du bilan initial en bilan final + export de la comparaison** (B3 partiel) | **Aucune saisie patient** (outil praticien), **FR uniquement**, construit autour du BDK **sur ordonnance** (conventionné). Hébergement non documenté |
| **Milo** | Pas de prix sur la page consultée | Dossier centralisé, BDK, ajout de photos/documents, facturation par lots | **Lecteur de carte Vitale inclus** → conventionné. Pas de saisie patient, pas de téléconsultation, FR only |
| **BDKapp** | **Version gratuite** (fonctions de base) — DÉDUIT (source tierce, comparatif) | Création de bilans | Non audité directement |

## ⭐ B bis.3 — AthleteMonitoring — *le meilleur sur le suivi athlète pur*

Trouvé hors liste, et **fonctionnellement le plus proche du besoin B3+B4+B5**.

- **Prix** : **« sur demande »** — VU https://www.athletemonitoring.com/pricing/ (*« Request a Free Quote »*, réponse sous 24 h). Quatre niveaux affichés (Testing & Progress Tracking / Load & Readiness / Health & Sports Medicine / Complete AMS) **sans aucun montant**. Modèle **par athlète et par mois** avec dégressivité volume — DÉDUIT (tiers). Pas de tarif public : c'est un vrai frein à l'évaluation.
- **Couvre — VU** : ✅ auto-déclaration athlète (**wellness, RPE, douleur**), ✅ **batteries de tests physiques chiffrées**, ✅ **comparaison longitudinale**, ✅ dossiers blessures/médical, ✅ programmes de rééducation, ✅ **constructeur de questionnaires** (→ couvre B1 !), ✅ photos/vidéos, ✅ messagerie.
- **Ne couvre pas** : **visio** ❌, **facturation** ❌.
- **Langues** : ✅ **15 langues dont français et anglais** — VU.
- **Hébergement** : *« HIPAA, PIPEDA & GDPR compliant »* — VU. **Localisation des serveurs non divulguée**, **pas de HDS**. DÉDUIT : éditeur canadien (mention PIPEDA).
- **Verdict** : sur B1/B3/B4/B5 c'est **le plus complet de toute l'étude**. Mais prix opaque, pas de visio, pas de facturation, pas de HDS, et c'est un outil pensé pour des **staffs d'équipe**, pas pour une praticienne solo facturant ses clients.

---

# C) Plateformes coach / fitness / rééducation anglo-saxonnes

> Conversions €/mois = **ordres de grandeur approximatifs** (bases 1 USD ≈ 0,92 € ; 1 GBP ≈ 1,17 €). À revérifier au moment de l'achat.

## C.1 — TrueCoach : ce que la cliente a DÉJÀ (analyse prioritaire)

### Prix — **et c'est l'option la plus chère du panel**

| Palier | Prix | Clients actifs |
|---|---|---|
| Starter | 26,34 $/mois | 5 |
| Standard | 57,99 $/mois | 20 |
| **Pro** | **136,99 $/mois** ≈ **125 €/mois** | **50** |
| 50+ | « custom pricing » | — |

VU — https://truecoach.co/pricing/. Annuel : « 2 MONTHS FREE » → ≈ 114 $/mois ≈ 105 €. Essai 14 j sans CB.

### Ce que TrueCoach sait DÉJÀ faire — le point le plus utile du dossier

**Métriques personnalisées — c'est son vrai point fort, et il est sous-exploité.**
- Métriques **100 % custom** avec unités, cibles et fréquence. La doc éditeur cite explicitement « force de préhension, VO₂ max, ou des marqueurs spécifiques au sport » — VU.
- Catégories natives : composition corporelle, **force (1RM, rep-max, volume)**, endurance, **souplesse/mobilité**, indicateurs de santé — VU.
- **Metric sets** : ensembles de métriques assignables, **mis à jour à chaque réévaluation** — *c'est exactement le mécanisme d'un bilan répétable à 8 semaines* — VU.
- **Métriques récurrentes** avec mise à jour automatique à intervalles définis — VU.
- **Graphiques longitudinaux** : chaque métrique affiche toutes les entrées passées, **saisies par le coach ET/OU le client** — historique comparatif natif — VU.
- Sources : https://truecoach.co/blog/truecoach-metrics-track-client-progress-and-save-time/ et https://help.truecoach.co/en/articles/2641737-client-updating-a-metric

**Photos de progression** — VU : le client prend/choisit des photos en poses **face / profil / dos** ; à partir de 2 séries, vue **« then and now » côte à côte** — https://help.truecoach.co/en/articles/6812443-client-uploading-progress-pictures

**Vidéo enregistrée par le client** — VU : le client filme sa série depuis la séance ; le coach revoit et commente. La doc éditeur dit explicitement que pour un bilan, le client « peut téléverser une vidéo le montrant réaliser le mouvement demandé », que le coach **évalue et note** — https://help.truecoach.co/en/articles/2580531-client-uploading-a-video-to-a-workout

**⚠️ Formulaires — capacité réelle mais BRICOLÉE.** C'est le point le plus important à faire remonter :
- TrueCoach **n'a pas de générateur de formulaires**. Les articles officiels « Waivers, Questionnaires, Assessments and Check-in's » et « Creating an Onboarding Sequence » décrivent tous deux un **contournement** : on construit les questionnaires **dans le *workout builder***, en créant des « exercices » qui sont en fait des questions — VU.
- Le client répond en **texte libre** dans le champ *results*. Pour un PAR-Q, la doc conseille de « noter dans le champ *reps* quel type de réponse on attend » — VU. **C'est un bricolage, pas un formulaire.**
- **Pas de types de questions structurés** (choix multiple, échelle, oui/non, obligatoire, logique conditionnelle) — VU (absence explicite).
- **Pas de signature électronique** : le client **télécharge, imprime, signe et renvoie** ; le coach range le PDF en pièce jointe — VU.
- Sources : https://help.truecoach.co/en/articles/3363240-waivers-questionnaires-assessments-and-check-in-s

### Couverture

| # | TrueCoach |
|---|---|
| B1 | ⚠️ **Bricolé** — texte libre via le workout builder, sans types de questions ni signature |
| B2 | ❌ **Non.** Aucune visio native, aucun formulaire clinicien remplissable en séance |
| B3 | ✅ **Point fort** — métriques custom + metric sets + graphiques historiques + vidéos client + photos then/now. Manque : la fiche de bilan agrégée |
| B4 | ⚠️ Partiel — métriques « douleur »/« RPE » créables et graphables, mais la collecte /15 j passe par un pseudo-workout ou la messagerie |
| B5 | ✅ Oui, via métriques custom mises à jour par le client |
| B6 | ❌ **La France n'est pas éligible** à TrueCoach Payments (US/UK/AU/CA seulement). TrueCoach écrit que ses utilisateurs internationaux « utilisent un processeur tiers » — VU. **Neutre ici** : la cliente facture via Tiime |
| B7 | ✅ **Excellent** — builder drag-and-drop, 3 500+ démos vidéo, export PDF |

### Hébergement, langue, API

- **Hébergement : États-Unis.** TrueCoach appartient à **Xplor Technologies** ; truecoach.co/privacy redirige (301) vers xplortechnologies.com/us/privacy-notice — VU. **Aucune mention RGPD structurée, ni HIPAA, ni HDS.**
- **Langue : ❌ ANGLAIS STRICT, confirmé par l'éditeur.** L'article « TrueCoach and International Languages » indique qu'en tant que société américaine, TrueCoach n'est disponible qu'en anglais. **Aucun sélecteur de langue** — VU. Toute la coque applicative reste anglaise, **côté coach ET côté athlète**.
- **API : ❌ aucune API publique.** Export CSV clients limité à **15 champs** ; **pas d'export en libre-service** de l'historique de check-ins, des photos, des notes ni du journal d'entraînement — VU. → **risque de verrouillage des données.**

> **Synthèse TrueCoach** : très bon sur B3, B5, B7 ; correct sur B4 ; mauvais sur B1 ; nul sur B2. Les deux vrais manques structurels sont **le formulaire d'admission propre** et **le bilan visio**. C'est **le plus cher du panel (~125 €/mois)**, anglais strict, hébergé aux USA, et difficile à quitter (pas d'export complet).

## C.2 — ⭐ Rehab Guru — *le seul outil à couvrir les 7 besoins*

- **Prix VU** — https://www.rehabguru.com/pricing : **Gratuit** (6 clients) · **Basic 10 £/mois** (100 £/an) — **clients illimités** · **Pro 20 £/mois** (200 £/an) ≈ **23 €/mois** · Enterprise sur demande.
  **C'est le tarif le plus bas de toute l'étude pour 50 clients.**
- **Inclus dans Pro** — VU : RDV/réservations/paiements en ligne · **outcome measures et reporting patient** · **notes de traitement et formulaires patients** · **téléconsultation** · support prioritaire. Tous plans : 6 000+ exercices vidéo HD, portail client, apps mobiles, marque personnalisée.

| # | Rehab Guru |
|---|---|
| B1 | ✅ **Générateur de formulaires flexible** — modèles servant soit de notes de traitement, soit de formulaires envoyables au patient (SOAP, questionnaires, dépistage) — VU |
| B2 | ✅ **Le meilleur du panel sur ce besoin précis.** Seul outil combinant **téléconsultation vidéo chiffrée de bout en bout, dans le navigateur, sans téléchargement**, marque personnalisée — **ET** un générateur de formulaires servant de **notes de traitement**, avec **annotation sur schéma corporel** (dessin et texte) et upload sécurisé de PDF/Word/images — VU. *C'est très exactement le bilan visio pré-rempli complété en direct.* |
| B3 | ✅ PROM/PREM fondés sur les preuves, données **avant / pendant / après**, monitoring temps réel **douleur et RPE**, photos/vidéos via upload sécurisé — VU |
| B4 | ✅ App client (iOS/Android/Web) : adhérence, douleur, RPE, bien-être ; synchro multi-appareils — VU |
| B5 | ✅ **Natif** — douleur et RPE sont des champs de monitoring patient natifs — VU |
| B6 | ✅ **Inclus dans Pro** : factures, paiements en ligne, acomptes, portail de réservation. Processeur non nommé publiquement. **Non imposé** → Tiime reste possible |
| B7 | ✅ 6 000+ exercices vidéo, 280+ modèles pathologies, filtres multiples, exercices privés en HD — VU |

- **Hébergement — excellent** : société britannique, **centre de données à Londres, serveurs au Royaume-Uni**, et **tout le traitement IA se fait au UK, aucune donnée ne quitte le pays** — VU (https://www.rehabguru.com/trust/security). Page RGPD dédiée. **Pas de HDS.** DÉDUIT : le UK bénéficie d'une **décision d'adéquation** de la Commission européenne → transfert UE→UK libre.
- **⚠️ Langue : NON DOCUMENTÉE — DÉDUIT anglais uniquement. C'est le verrou à lever en priorité.**
- **API** : référencée (« API Reference »), intégrations FHIR/HL7 en Enterprise, export mentionné — VU.
- **Ne couvre pas** : la logique **préparation physique / performance** (pas de %1RM, périodisation, blocs de force) — c'est un outil de rééducation, pas de coaching sportif.

## C.3 — ⭐ Physitrack / PhysiApp — *le meilleur profil de conformité*

- **Prix VU** : **22,95 €/mois zone euro** (247,86 €/an, −10 %), **patients ILLIMITÉS**, tarifé nativement en euros. 60 min de Telehealth Pro offertes/mois, extension 2 000 min à 11,99 €. Essai 14 j, sans engagement. **PhysiApp gratuit pour les patients** — VU.
- **Couverture** : B1 ✅ (PROMs validés assignables seuls, avec date de complétion choisie) · B2 ✅ (**Telehealth Pro natif** + PROMs) · B3 ✅ (PROMs répétables à des points définis « pour établir la progression de la récupération » ; résultats agrégés exportables ; **douleur et difficulté capturées à chaque séance**) · B4 ✅ · B5 ✅ **natif** · B6 ❌ (neutre) · B7 ✅ **18 000+ exercices dont 4 385 en français**.
- **Hébergement — le meilleur du panel** : **instance dédiée `fr.physitrack.com` hébergée à Francfort (UE)** — VU. ISO/IEC 27001, **ISO/IEC 27018**, HIPAA+BAA, RGPD et UK GDPR, NHS DSP Toolkit — VU (https://www.physitrack.com/en-au/security). **HDS : aucune mention.**
- **Langue** : ✅ **4 385 exercices en français** ; **PhysiApp s'adapte automatiquement à la langue du téléphone du patient** — VU. ⚠️ **Réserve importante : PROMs, modèles et contenu éducatif ne sont PAS traduits en français** — VU. Les questionnaires restent donc en anglais.
- **Ne couvre pas** : facturation, agenda de réservation, et **la programmation orientée performance sportive** (charges, %1RM, périodisation) — c'est un outil de rééducation. Pour une kiné **du sport** suivant des athlètes, c'est une vraie limite.

## C.4 — Everfit — *l'alternative directe la plus crédible à TrueCoach*

- **Prix VU** — https://everfit.io/pricing/ : Starter gratuit (5 clients) · Pro à partir de 19 $/mois (dégressif) · **Studio à partir de 105 $/mois pour 50 clients** ≈ **97 €**. ⚠️ **Réserve : la page utilise un curseur dynamique et deux lectures ont renvoyé des chiffres différents** (Pro ≈ 95–120 $, Studio 105–249 $) — **à confirmer sur le curseur**. Annuel ≈ −16 %.
- **Add-ons en sus** — VU : Autoflow 29 $ · On-Demand 25 $ · **Payments & Packages 9 $** · Meal Plans 39 $.
- **Couverture** : B1 ✅ **très bon** (vrai générateur de formulaires, **Onboarding Flow** avec 3 modèles dont **Medical History / PAR-Q**) · B2 ❌ · B3 ✅ **très bon** — *fonction clé : une réponse de formulaire peut être **exigée comme valeur numérique et synchronisée automatiquement vers une métrique du client**, plus une fonction « Responses comparison »* — VU · B4 ✅ · B5 ✅ · B6 add-on optionnel à 9 $ (**non imposé**) · B7 ✅.
- **Hébergement** : **États-Unis**, transfert hors EEE assumé dans la politique. **DPA RGPD publié** (https://everfit.io/dpa/) — VU.
- **Langue** : ✅ **app client en français** (1ʳᵉ langue de localisation) — VU. ⚠️ DÉDUIT : interface coach probablement anglaise.
- **API** : ✅ **API publique documentée** (https://public-docs.everfit.io/) + Zapier — **le meilleur profil d'interopérabilité du panel fitness**.

## C.5 — Les autres (à écarter ou en retrait)

| Outil | Prix VU | Pourquoi en retrait |
|---|---|---|
| **PT Distinction** | Basic 19,90 $ · Pro 59,90 $ (25 cl.) · **Master 89,90 $/mois (50 cl.)** ≈ 83 € — https://www.ptdistinction.com/pricing. Essai **1 mois complet** | **Meilleur que TrueCoach sur B1** : formulaires pré-remplis (consentement éclairé, PAR-Q, consultation) que le client **remplit ET signe** depuis l'app — la **signature électronique** est le vrai différenciateur. Bilans intégrés/custom (souplesse, endurance, force, équilibre) + vidéo client. Mais **B2 ❌**, hébergement **non documenté du tout**, langue non documentée (DÉDUIT anglais) |
| **My PT Hub** | Starter 25 € · **Premium 59 €/mois (52 € annuel) — clients ILLIMITÉS** · Ultimate 215 € — https://www.mypthub.net/pricing/. **Tarifé nativement en euros.** Essai 30 j sans CB | **B1 ✅ automatisé** (PAR-Q assigné automatiquement à l'inscription ; formulaires rattachés à un « package »). Mais **B3 faible** (pas de métriques custom fines ni de comparaison graphique), **B2 ❌**, et ⚠️ **AWS de région non précisée** — la politique RGPD est **muette sur les transferts internationaux**, ce qui est gênant pour des données de santé |
| **ABC Trainerize** | Pro 50 clients : **79 $/mois** ≈ 73 € — https://www.trainerize.com/pricing/. ⚠️ **Conflit de sources** : un comparateur tiers annonce **135 $/mois** post-« Pricing Updates 2026 ». **À revérifier** | **Écarter.** Formulaires **plafonnés à 10 questions** — insuffisant pour un bilan kiné. **Anglais strict confirmé par l'éditeur** (demandes de français jamais satisfaites). Add-ons qui empilent (Stripe 10 $, Video Coaching 10 $…). Hébergement DÉDUIT Amérique du Nord, non documenté |
| **Medbridge / Medbridge GO** | **325 $/an** ≈ 25 €/mois (Premium) — https://www.medbridge.com/pricing. Aucun tarif mensuel | **Écarter.** Le tarif attractif est **trompeur** : c'est majoritairement un abonnement de **formation continue (CEU) américaine** ; le HEP est un module inclus. B1 ❌ B2 ❌ B3 ❌ B6 ❌. Le patient **coche seulement les exercices douloureux** (binaire, pas d'échelle, pas de RPE). **Anglais + espagnol uniquement, pas de français.** Hébergement US, aucune mention RGPD |
| **Exercise.com** | **« sur demande »** — aucun tarif public, uniquement « Book Demo » — https://www.exercise.com/ | **Écarter d'emblée.** Opacité tarifaire totale, orienté **salles multi-sites US**, pas le praticien solo. Hébergement/RGPD/langue non documentés |

## C.6 — Deux constats transversaux rassurants

1. **Aucun outil du panel n'impose Stripe.** Le module de paiement est soit un add-on optionnel (Everfit 9 $, Trainerize 10 $), soit une fonctionnalité activable et **ignorable** (PT Distinction, My PT Hub, Rehab Guru). **B6 n'est donc pas un critère d'exclusion** : le circuit Tiime + virements peut rester en place partout. *Ironie du dossier : TrueCoach est le seul où la question ne se pose même pas — la France n'y est pas éligible.*

2. **Aucun outil anglo-saxon du panel n'est certifié HDS France** — VU (absence dans toutes les sources). Les meilleurs profils sont **Physitrack** (instance UE à Francfort + ISO 27001/27018) puis **Rehab Guru** (UK, adéquation européenne).

---

# D) Les « no-code / assemblage »

> Tous prix **HT**. Les pages affichent tantôt des €, tantôt des $ — **aucune conversion n'a été faite**.

## D.1 — Fiches outil

| Outil | Prix VU | Hébergement UE ? | DPA | FR | Upload fichiers | API/export |
|---|---|---|---|---|---|---|
| **Tally** | Free · **Pro 20 €/mois** · Business 65 € — https://tally.so/pricing. Annuel : « 2 mois offerts » → DÉDUIT ≈ 16,67 €/mois | ✅ **Europe par défaut**, société **belge** | ✅ accepté à la création de compte | ✅ 45+ langues | ✅ 10 Mo gratuit, **illimité en Pro** | non vérifié |
| **Fillout** | Free · **Starter 15 $** · Pro 40 $ · **Business 75 $/mois** (900 $/an) — https://www.fillout.com/pricing. **Sièges illimités sur tous les plans** | ⚠️ US/UE/UK/AU/CA, **UE sur demande au support** à partir du plan « Team »/Enterprise | non confirmé | ? | ✅ **20 Mo**, **1 Go+ en Business** | ✅ API REST + CSV, tous plans |
| **Jotform** | Free · Bronze 39 $ · Silver 49 $ · **Gold 129 $** (1 188 $/an = 99 $/mois) — https://www.jotform.com/pricing/ | ✅ **Francfort, GRATUIT, tous plans** | ✅ | ? | ✅ 1 / 10 / **100 Go** | ✅ |
| **Notion** | Free · **Plus 9,50 €/u/mois** · Business 19,50 € — https://www.notion.com/fr/pricing | ❌ **résidence UE = Enterprise seulement** → en Plus, **données aux US** | ✅ | ✅ | ✅ illimité dès Plus | ✅ dès Plus |
| **Airtable** | Free · **Team 20 $/u/mois annuel** (24 $) · Business 45 $ (54 $) — https://airtable.com/pricing | ❌ **US par défaut (AWS us-east-1)**, UE = **Enterprise Scale** | ✅ + **CCT/SCC**, ISO 27701 | ✅ | ✅ 20 Go/base (Team), 100 Go (Business) | ✅ |
| **Softr** | Free · Basic 19 $ · **Pro 99 $ annuel** (119 $) · Business 329 $ — https://docs.softr.io/workspace-and-billing/pricing-and-plans | ✅ Allemagne (**ses propres bases seulement**) | — | ❌ **pas de multilingue natif**, passe par **Weglot** (payant) | selon la base | ✅ |
| **Baserow** | Free · **Premium 10 $/u/mois annuel** · Advanced 18 $ — https://baserow.io/pricing. **Self-hosted : open source MIT, gratuit et illimité** | ✅ **Allemagne** (cloud), ou **où elle veut** en self-host | ✅ | ? | 20 Go / 100 Go | ✅ API REST |
| **Google Workspace** | **Starter 6,80 €** · **Standard 13,60 €** · Plus 21,10 € — https://workspace.google.com/pricing | ✅ **mais choix de région seulement à partir de Standard** | ✅ | ✅ | 🚨 voir ci-dessous | ✅ |
| **Typeform** | **Basic 39 $** (28 $ annuel, **100 réponses/mois**) · **Plus 79 $** (56 $) · Business 129 $ — https://www.typeform.com/pricing/ | ❌ **choix US/UE = Enterprise uniquement** | ✅ | ? | ✅ | ✅ |

### Trois pièges tarifaires à connaître

1. **🚨 Google Forms est disqualifié pour B3.** VU : **dès qu'un formulaire contient une question d'upload de fichier, le répondant doit se connecter avec un compte Google.** Pour des athlètes qui envoient des photos/vidéos de mobilité, c'est un frottement majeur et une cause d'abandon garantie.

2. **🚨 Le mode HIPAA de Jotform serait un achat inutile.** VU : *« By signing up for either the Gold or Enterprise plan, Jotform offers you access to HIPAA-enabled templates… »* → palier minimum **Gold, 129 $/mois**. Mais **HIPAA est une loi fédérale américaine**, sans portée juridique pour une praticienne française ; le BAA ne lui apporte rien. Ce qui lui sert vraiment — **le stockage sur serveurs européens à Francfort** — est VU **gratuit, sur tous les plans**. *Si quelqu'un lui vend « Jotform Gold parce que c'est HIPAA », c'est une erreur d'analyse à 60 $/mois.* Le seul vrai motif de prendre Gold serait les **100 Go de stockage vidéo**.

3. **🚨 Typeform est le pire rapport qualité/prix du panel.** Basic à 39 $/mois plafonne à **100 réponses/mois** — or 50 athlètes qui répondent tous les 15 jours consomment ~100 réponses/mois **rien que sur le suivi**, bilans non compris.

## D.2 — Trois scénarios d'assemblage chiffrés

> **Périmètre** : B6 (Tiime) et B7 (TrueCoach) **ne sont remplacés dans aucun scénario** — ce serait la première erreur coûteuse.

### Scénario A — « Le strict minimum » : Tally + Notion — **~29,50 €/mois**

```
Tally Pro                 20,00 €
Notion Plus (1 siège)      9,50 €
──────────────────────────────────
TOTAL                     29,50 €/mois   (~354 €/an)
```
En annuel Tally (DÉDUIT ≈ 16,67 €) → **~26,17 €/mois**.

- **Marche** : meilleur profil RGPD côté collecte (Tally belge, UE, DPA inclus), uploads illimités dès Pro, Notion en français, coût dérisoire.
- **Casse** : **Notion Plus héberge aux États-Unis** — bilans et notes cliniques quittent l'UE. **Le lien Tally → Notion n'est pas vérifié** : sans connecteur natif il faut Make/Zapier/n8n (coût non chiffré). **Aucun espace client** : soit lien public « toute personne ayant le lien » (**pas privé** — inacceptable pour de la donnée de santé), soit inviter chaque athlète en *guest*, ce qui l'oblige à **créer un compte Notion**.
- **Comparaison 8 semaines** : ❌ **à la main.**
- **Maintenance DÉDUIT : 2–4 h/mois.** Relances manuelles, rattachement via email saisi par le client (faute de frappe = doublon orphelin), et **si un client ne remplit pas, rien ne se passe et personne n'est prévenu**.

### Scénario B — « Vrai portail client » : Fillout + Airtable + Softr — **~134 $/mois**

```
Fillout Starter                   15 $
Airtable Team (1 siège, annuel)   20 $
Softr Pro (annuel)                99 $
───────────────────────────────────────
TOTAL                            134 $/mois   (~1 608 $/an)
```
En mensuel : 15 + 24 + 119 = **158 $/mois**.

- **Marche** : **le seul scénario avec un espace client réellement privé**. **Bilan visio pré-rempli natif et bon** via les **Interfaces Airtable**. **Seul scénario où la comparaison longitudinale à 8 semaines est réellement faisable** (table Tests liée à Athlète, formule d'écart, graphique) — du paramétrage, pas du bricolage.
- **Casse — et c'est lourd** :
  - 🚨 **Données de santé aux États-Unis** (AWS us-east-1 ; UE = Enterprise Scale). Que Softr soit en Allemagne **ne change rien** : la donnée vit dans Airtable.
  - 🚨 **Le plafond de 50 clients de Softr Pro tombe pile sur ses 50 athlètes — zéro marge.** Un 51ᵉ athlète force une extension **au prix non public** ou Business à **329 $/mois** (triplement).
  - 🚨 **Le stockage vidéo va exploser** : Airtable Team = 20 Go/base. DÉDUIT : 50 athlètes × 2 passages × 4 vidéos × ~50 Mo ≈ **20 Go**, plafond atteint dès la 1ʳᵉ année. Business exige en plus **un email sur domaine privé** (pas de Gmail) — VU.
  - **Softr sans multilingue natif** → portail en anglais sauf à payer Weglot.
- **Maintenance DÉDUIT : 4–8 h/mois + 10–20 h de mise en place.** Renommer un champ Airtable casse silencieusement un bloc Softr ; un check-in manquant crée un trou que le graphique affiche comme une chute (**faux signal clinique**) ; **une erreur de permissions Softr expose la donnée d'un athlète à un autre**.

### Scénario C — « Tout-en-un » : Jotform seul — **39 à 99 $/mois**

```
Jotform Gold, annuel              99 $/mois  (1 188 $/an)
   ou en mensuel                 129 $/mois
```
**Mais** : si les vidéos restent dans TrueCoach, **Silver à 39 $/mois annuel suffit largement** (2 500 soumissions/mois pour un besoin réel DÉDUIT de ~120/mois). **C'est probablement le meilleur rapport conformité/prix du volet no-code.**

- **Marche** : **un seul fournisseur, aucune jonction à casser.** RGPD sérieux **et gratuit** (Francfort, DPA, compte UE d'office). **Rappels et relances automatiques natifs** — le seul scénario où le « tous les 15 jours » ne repose pas sur sa mémoire. Uploads sans obliger l'athlète à créer un compte.
- **Casse** : **pas de portail client** (l'athlète remplit et ne revoit jamais ses données). **Bilan visio pré-rempli médiocre.** **Comparaison 8 semaines = export CSV → tableur → à la main.**
- **Maintenance DÉDUIT : 1–3 h/mois** (la plus faible) **+ 2–3 h par cycle de réévaluation**. Sans portail, elle devra renvoyer les résultats par email/PDF — travail manuel récurrent et risque de mauvais destinataire.

## D.3 — Ce que la comparaison no-code fait ressortir

| Besoin | A (Tally+Notion) | B (Fillout+Airtable+Softr) | C (Jotform) |
|---|---|---|---|
| B1 admission | ✅ | ✅ | ✅ |
| B2 bilan visio pré-rempli | 🟡 manuel | ✅ natif | ❌ |
| B3 tests + médias | 🟡 stockés, non comparés | ✅ | 🟡 stockés, non comparés |
| **B3bis comparaison 8 sem.** | ❌ à la main | ✅ | ❌ export tableur |
| B4 espace suivi | 🟡 côté praticienne | ✅ des deux côtés | 🟡 côté praticienne |
| B5 saisie autonome | ✅ | ✅ | ✅ **+ relances auto** |
| **Espace client privé** | ❌ | ✅ | ❌ |
| **Données en UE** | 🟡 formulaires oui, Notion non | ❌ **Airtable US** | ✅ |
| **Coût** | **~30 €/mois** | **~134 $/mois** | **39–99 $/mois** |

**Trois arbitrages structurants :**

1. **On ne peut pas avoir « portail client privé » ET « données en UE » ET « pas cher » dans ce panel.** B donne le portail mais met la donnée de santé aux US. C garde la donnée en UE mais n'a pas de portail. A est bon marché mais n'a ni l'un ni l'autre. **Sacrifier l'UE pour de la donnée de santé mérite une validation juridique explicite, pas un choix par défaut.**
2. **La vidéo est le vrai poste de coût, pas les formulaires.** **Si les vidéos restent dans TrueCoach, les trois scénarios descendent d'un cran de prix.**
3. **La comparaison longitudinale n'est nativement faisable que dans Airtable.** Et **aucun outil no-code ne compare deux vidéos côte à côte** — c'est le métier d'une app d'analyse vidéo. Ce besoin ne sera résolu par aucun assemblage de formulaires.

---

# E) DPI / logiciels de dossier patient français pour kiné libéral

## E.0 — Vérification : 3 noms sur 7 sont hors sujet

| Nom | Verdict |
|---|---|
| **Vega** (Epsilog / CGM) | ✅ Pertinent — kinés, IDEL, orthophonistes |
| **Kinepratik** | ✅ Pertinent — kinés exclusivement |
| **Kinemax** (by Topaze) | ✅ Pertinent — kinés |
| **Kobus** | ⚠️ **Absorbé.** Racheté par **Cegedim Santé** (2021). `kobusapp.com/tarifs` renvoie une **301 vers cegedim-sante.com** — VU. Devenu **Maiia Bilan** ; **la grille tarifaire publique a disparu** |
| **AxiSanté** (CGM) | ⚠️ **Pas un logiciel kiné.** VU : conçu pour les **médecins libéraux** ; CGM segmente AxiSanté = médecins, Vega = paramédicaux. **Hors sujet** (pour info : à partir de 75 €/mois) |
| **Julie** (Julie Solutions) | ⚠️ **100 % dentaire** — VU (« logiciel de gestion pour cabinet dentaire »). **Hors sujet** |
| **Iatros** | ❌ **N'EXISTE PAS** comme DPI kiné français. `iatros.fr` → **DNS ENOTFOUND** (VU). Les seuls trouvés : `iatros.it` (médecins **italiens**) et une app allemande pour patients cardiaques |

## E.1 — Prix

| Produit | Prix | HT/TTC | Source | Statut |
|---|---|---|---|---|
| **Kinepratik** | **35 €/mois TTC** (mono) · **39 €/mois TTC** (multi) · licence perpétuelle 1 355 € / 1 510 € · contrat MAJ 390 €/an · Mobile Pratik 190 €/an · Pratik Safe 228 €/an | **TTC** (affiché) | https://kinepratik.com/mon-logiciel/ | **VU — le seul vraiment transparent** |
| **Vega** | **à partir de 45 €/mois** (+ VEGA Tab dès 121,50 €/mois sur 36 mois) | non précisé — DÉDUIT HT | https://www.vega-logiciel.fr/kinesitherapeute/mon-offre-vega/ | **VU** (la page produit principale dit « devis personnalisé » → contradiction interne) |
| **Kinemax** | **à partir de 42 €/mois**, dégressif dès le 2ᵉ praticien. Lecteurs : Kap&link 12 €/mois, Kap&Go 21 €, Eskapad 26 € | non précisé — DÉDUIT HT | https://www.kinemax.fr/page/offres | **VU** |
| **Kobus / Maiia Bilan** | **« sur demande »** | — | https://www.cegedim-sante.com/bilan-kine/ | **VU** |
| **Maiia Kiné** (suite) | **« sur demande »** | — | https://www.cegedim-sante.com/solutions-sante-cegedim/solutions-web/maiia-kine/ | **VU** |

> ⚠️ **L'opacité tarifaire est la norme du secteur.** Un seul éditeur sur quatre publie une grille complète. Le mot-clé récurrent est « devis personnalisé ».
>
> ⚠️ **Attention aux fourchettes qui circulent** (« Vega 70–90 €/mois », « Doctolib kiné 75–95 €/mois »…) : elles proviennent d'un **comparatif de blog tiers** (bilan-kine.fr), **pas des éditeurs**. Elles ne doivent pas servir de base de budget.

## E.2 — Couverture des 7 besoins

| # | Vega | Kinepratik | Kinemax | Kobus / Maiia Bilan |
|---|---|---|---|---|
| B1 admission **par le client** | ❌ | ❌ | ❓ | ❌ |
| B2 bilan visio pré-rempli | 🟡 BDKapp, côté praticien | 🟡 (DÉDUIT, tiers) | ❓ | 🟡 modèles par spécialité, remplis par le kiné |
| B3 tests + photos/vidéos + longitudinal | ❌/❓ | 🟡 « 900+ tests » (DÉDUIT, tiers) | ❓ | ✅ **le seul point fort** — VU : *« Photos, vidéos, tableau de bord : d'un coup d'œil vous suivez la progression de vos patients »* |
| B4 suivi /15 j | ❌ | ❌ | ❓ | ❌ |
| B5 saisie autonome client | ❌ | ❌ | ❓ | ❌ |
| B6 facturation | ✅ mais **FSE/NGAP/tiers payant** | ✅ idem + compta, export FEC | ✅ idem | ❌ |
| B7 exercices vidéo | ❌ | ❌ | ❓ | ✅ |

### Le verrou : le portail patient n'existe pas

**VU** : aucun des quatre ne propose d'espace où le patient **saisit lui-même** des données cliniques. Sur Vega c'est explicite (gestion côté praticien uniquement ; le patient ne touche qu'à la prise de RDV via ClickDoc). **Les besoins B1, B4 et B5 — le cœur d'une pratique 100 % à distance — ne sont couverts par aucun.**

## E.3 — Technique, langue, API

| | Vega | Kinepratik | Kinemax | Kobus/Maiia |
|---|---|---|---|---|
| Cloud / local | DÉDUIT cloud-hybride | **LOCAL — VU** (*« données stockées directement sur votre ordinateur »*) | Cloud (web) — VU | Cloud 100 % web — VU |
| HDS | ❓ non mentionné | ❓ non mentionné | ❓ non mentionné | ❓ DÉDUIT au niveau groupe Cegedim, non vérifié produit |
| OS | DÉDUIT Windows (VEGA Tab = Surface) | DÉDUIT Windows only | ✅ **« MAC ou PC »** — VU | ✅ web |
| **Anglais** | ❌ | ❌ | ❌ | ❌ |
| API / export | ❓ | 🟡 **export FEC comptable uniquement** | ❓ | ❓ |

> **Sur l'anglais : non, partout, sans exception.** Le besoin FR+EN est **structurellement incompatible** avec cette catégorie.
> **Sur l'API : aucun des quatre n'en documente publiquement.** Le seul export est le FEC de Kinepratik — un export **comptable réglementaire**, pas clinique → **risque de verrouillage des données**.

## E.4 — VERDICT : catégorie DISQUALIFIÉE

**Oui, et pas à la marge.**

1. **Inadéquation de modèle, pas de fonctionnalités.** Ces logiciels sont des **machines à télétransmettre**. Leur prix et leur architecture de données sont justifiés par la chaîne **Sesam-Vitale / FSE / NGAP / NOEMIE / tiers payant**. Retirez la convention : il reste un carnet d'adresses avec un agenda, vendu 35–45 €/mois, souvent avec un lecteur de carte Vitale dans le pack. **On ne paie pas « trop cher pour trop de fonctions » : on paie pour la mauvaise fonction.** Le modèle de données lui-même (ordonnance → série d'actes → lettre-clé AMK/AMS → FSE) ne correspond à rien dans une activité de coaching sport-santé facturée en direct.
2. **Le portail patient n'existe pas — rédhibitoire.** Un produit conçu pour le cabinet (« le patient vient, le praticien saisit ») ne peut pas être plié en outil de suivi à distance : il n'y a **aucun canal de données entrantes côté client**.
3. **Monolingue, fermé, opaque.** Zéro anglais, zéro API publique, trois éditeurs sur quatre exigent un devis.

**Nuance honnête** : **Kobus / Maiia Bilan** est le seul à couvrir réellement B3 et B7. La brique « bilan » est bonne. Mais **sans portail patient, sans facturation adaptée, sans anglais, sans tarif public** — elle ne peut pas être la colonne vertébrale, tout au plus un point de comparaison fonctionnel.

---

# TABLEAU DE SYNTHÈSE GÉNÉRAL

Seuls les candidats réellement défendables figurent ici. Légende : ✅ couvert · 🟡 partiel · ❌ absent · ❓ non documenté.

| Outil | Prix affiché | B1 | B2 | B3 | B4 | B5 | B6 | B7 | Hébergement | FR | EN | API |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ⭐ **Hexfit** (kiné FR) | **39 € / 59 €** /mois, **clients illimités** | ✅ | ✅ | ✅ | ✅ | ✅ | 🟡 Stripe | ✅ | 🇫🇷 **HDS France** | ✅ | ✅ | ❓ |
| ⭐ **Rehab Guru Pro** | **20 £/mois** (~23 €), **illimité** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🇬🇧 UK (adéquation UE) | ❓ | ✅ | ✅ |
| ⭐ **Physitrack** | **22,95 €/mois**, **patients illimités** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | 🇩🇪 **UE Francfort**, ISO 27001/27018 | 🟡 | ✅ | 🟡 |
| **Andrew®** | **34,90 € / 49,90 €** /mois | ❌ | 🟡 | ❌ | ✅ | ✅ | 🟡 Stripe | ✅ | 🇫🇷 **HDS (OVH)** | ✅ | ✅ | ❌ |
| **Everfit Studio** | ~105 $/mois à 50 cl. (⚠️ curseur) | ✅ | ❌ | ✅ | ✅ | ✅ | 🟡 add-on | ✅ | 🇺🇸 US | 🟡 app client | ✅ | ✅ |
| **TrueCoach Pro** *(actuel)* | **136,99 $/mois** (~125 €), 50 cl. | 🟡 bricolé | ❌ | ✅ | 🟡 | ✅ | ❌ FR inéligible | ✅ | 🇺🇸 US | ❌ | ✅ | ❌ |
| **AthleteMonitoring** | **« sur demande »** | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ❓ non divulgué | ✅ | ✅ | ❓ |
| **PT Distinction** | **89,90 $/mois**, 50 cl. | ✅ +signature | ❌ | ✅ | ✅ | 🟡 | 🟡 | ✅ | ❓ non documenté | ❓ | ✅ | ❌ |
| **My PT Hub Premium** | **52–59 €/mois**, **illimité** | ✅ auto | ❌ | 🟡 | ✅ | 🟡 | 🟡 | ✅ | ⚠️ AWS région non précisée | ❓ | ✅ | 🟡 |
| **Axomove** | **30 € / 60 €** /mois | ❌ | ✅ visio | ❌ | 🟡 | ❓ | ❌ | ✅ | ❓ | ✅ | ❓ | ❓ |
| **KineHub** | **« sur demande »** | ❓ | ✅ télésoin | ❓ | ❓ | ❓ | ✅ **hors nomenclature** | ✅ | 🇫🇷 **HDS France** | ✅ | ❓ | ❓ |
| **Maiia Bilan** (ex-Kobus) | **« sur demande »** | ❌ | 🟡 | ✅ | ❌ | ❌ | ❌ | ✅ | ❓ | ✅ | ❌ | ❓ |
| **No-code A** (Tally+Notion) | **~30 €/mois** | ✅ | 🟡 | 🟡 | 🟡 | ✅ | n/a | n/a | 🟡 Tally UE / **Notion US** | ✅ | ✅ | 🟡 |
| **No-code B** (Fillout+Airtable+Softr) | **~134 $/mois** | ✅ | ✅ | ✅ | ✅ | ✅ | n/a | n/a | ❌ **Airtable US** | 🟡 | ✅ | ✅ |
| **No-code C** (Jotform) | **39–99 $/mois** | ✅ | ❌ | 🟡 | 🟡 | ✅ | n/a | n/a | ✅ **UE Francfort** | ❓ | ✅ | ✅ |

**Catégories entièrement disqualifiées** : DPI kiné français (Vega, Kinepratik, Kinemax…) — conçus pour la FSE/Sesam-Vitale, aucun portail patient, aucun anglais. Doctolib, KineQuantum, Kiplin, Kinvent, Nabla, Medbridge, Exercise.com, Trainerize — voir les motifs détaillés dans les sections B et C.

---

# CLASSEMENT — LES 5 CANDIDATS LES PLUS CRÉDIBLES

## 1. 🥇 Hexfit — offre kiné France (39 € ou 59 €/mois, clients illimités)

- **Raison principale de le retenir** : **c'est le seul outil qui coche simultanément les trois contraintes non négociables** — **HDS France**, **bilingue FR/EN natif** (avec affichage des exercices dans la langue du compte client), et **prix public bas à clients illimités** — tout en couvrant **6 besoins sur 7**. Il est le seul à faire tenir ensemble la **banque de 130 tests physiques avec protocoles personnalisables et comparaison test/retest** (B3, le besoin que presque personne ne couvre) **et** les **140 formulaires remplissables par le client en ligne *ou* en direct pendant la séance** (B1 + B2). L'éditeur commercialise même une offre intitulée « logiciel kinésithérapeutes **hors nomenclature** » — le cadre d'exercice exact de la cliente.
- **Raison principale de le rejeter** : **pas de visioconférence native** (il faudra garder un outil de visio à part), et **la facturation passe par Stripe (+0,6 %)**, donc inutilisable avec le circuit Tiime + virements. S'ajoute une **ambiguïté commerciale à lever** : deux grilles tarifaires coexistent (39/59 € sur le site partenaire français vs « Therapist Solo 50/mois » sur le site éditeur).

## 2. 🥈 Rehab Guru Pro (20 £/mois ≈ 23 €, clients illimités)

- **Raison principale de le retenir** : **c'est le seul outil de toute l'étude à couvrir les 7 besoins**, et le seul à traiter correctement **B2**, que personne d'autre n'adresse : **téléconsultation chiffrée de bout en bout dans le navigateur** *combinée* à un générateur de formulaires servant de **notes de traitement remplies en direct**, avec **annotation sur schéma corporel** et upload sécurisé de fichiers. Douleur et RPE sont des champs **natifs**. Le tout au **tarif le plus bas de l'étude**, en clients illimités, avec serveurs et traitement IA **entièrement au Royaume-Uni**.
- **Raison principale de le rejeter** : **la disponibilité du français n'est documentée nulle part** — DÉDUIT anglais uniquement. Pour une patientèle francophone, **c'est potentiellement rédhibitoire**, et c'est la toute première chose à vérifier auprès de l'éditeur. Secondairement, c'est un outil de **rééducation** sans logique de préparation physique (pas de %1RM, pas de périodisation), ce qui est une vraie limite pour une kiné **du sport**.

## 3. 🥉 Physitrack (22,95 €/mois, patients illimités, facturé en euros)

- **Raison principale de le retenir** : **le meilleur profil de conformité de toute l'étude, et de loin** — une **instance dédiée `fr.physitrack.com` hébergée à Francfort (UE)**, certifiée **ISO/IEC 27001 et 27018**, RGPD et UK GDPR, NHS DSP Toolkit. **Douleur et difficulté sont saisies nativement par le patient à chaque séance** (B5 sans aucun bricolage), les PROMs sont répétables à des dates choisies et **exportables**, et la bibliothèque compte **4 385 exercices en français**, avec une app patient qui s'adapte automatiquement à la langue du téléphone.
- **Raison principale de le rejeter** : **les PROMs, modèles et contenus éducatifs ne sont PAS traduits en français** — donc les questionnaires, c'est-à-dire précisément le cœur du suivi, **restent en anglais**. S'y ajoute l'absence totale de programmation orientée performance sportive, et une API **inaccessible** à une micro-entreprise (réservée aux éditeurs de 500+ praticiens).

## 4. Andrew® (34,90 € ou 49,90 €/mois)

- **Raison principale de le retenir** : **le meilleur cadre juridique et culturel du panel** — éditeur **français** (Lyon), données de santé chez **OVH, hébergeur certifié HDS**, interface **FR + EN**, prix public bas, et un positionnement produit **explicitement tourné vers le suivi « hors nomenclature » à distance**. Il couvre très bien B4, B5 (échelles EVA avec graphique d'évolution des symptômes) et B7.
- **Raison principale de le rejeter** : **il rate le cœur de la demande, B3.** Il n'existe **aucune batterie de tests de mobilité/force chiffrée, photographiée et rejouable à 8 semaines** ; le « bilan » se limite à quelques champs (diagnostic, zone, phase, douleur, objectifs) servant à alimenter une recommandation d'exercices par IA. C'est un outil de **prescription + suivi de douleur**, pas de **bilan quantifié longitudinal**.

## 5. Everfit Studio (~105 $/mois à 50 clients — à confirmer)

- **Raison principale de le retenir** : **c'est le remplaçant le plus direct de TrueCoach**, et il corrige précisément ses deux faiblesses. Là où TrueCoach bricole ses questionnaires dans le workout builder, Everfit a un **vrai générateur de formulaires** avec un **Onboarding Flow** livré avec un modèle **Medical History / PAR-Q**. Surtout, il offre une mécanique unique dans tout le panel : **une réponse de formulaire peut être exigée comme valeur numérique et synchronisée automatiquement vers une métrique du client** — c'est exactement le mécanisme d'un test chiffré répétable. Ajoutez l'**app client en français**, une **API publique documentée**, et un module de paiement **optionnel** (donc compatible Tiime).
- **Raison principale de le rejeter** : **hébergement aux États-Unis**, avec transfert hors EEE explicitement assumé dans la politique de confidentialité — le moins bon profil de conformité des cinq pour des données de santé. Et **aucune visio** (B2 non couvert). Le prix lui-même est incertain : la page utilise un curseur dynamique qui a renvoyé des chiffres différents d'une lecture à l'autre.

---

# CE QU'IL FAUT RETENIR

### 1. Aucun outil ne couvre parfaitement les 7 besoins — un seul s'en approche
**Rehab Guru** est le seul à cocher les 7 cases, mais avec un doute majeur sur le français. **Hexfit** en couvre 6 sur 7 sans aucun doute sur la langue ni sur l'hébergement. Ce sont les deux seules options qui rendent le sur-mesure vraiment discutable.

### 2. Le besoin B3 « photos/vidéos comparées à 8 semaines » est le grand angle mort du marché
Beaucoup d'outils stockent des chiffres, certains stockent des médias — mais **presque aucun ne juxtapose deux séries de tests avec les vidéos côte à côte**. Seuls **TrueCoach** (vue « then and now » sur les photos de progression), **Hexfit** (visualisation test/retest) et **Maiia Bilan** s'en approchent. **Aucun outil no-code ne sait le faire.** C'est le besoin qui justifierait le plus un développement sur-mesure.

### 3. La facturation (B6) n'est pas un critère de choix
**Aucun outil n'impose Stripe** : le module de paiement est partout soit optionnel, soit ignorable. Le circuit **Tiime + virements peut rester en place quel que soit l'outil retenu**. Inversement, les seuls logiciels qui « facturent » vraiment (DPI français) le font pour la **FSE conventionnée** — exactement ce dont la cliente n'a pas besoin. **B6 doit sortir de la grille de décision.**

### 4. TrueCoach est l'option la plus chère du panel, et la plus fermée
À ~125 €/mois, il coûte **environ 5× le prix de Rehab Guru ou Physitrack**, qui offrent tous deux des clients illimités. Il est **anglais strict** (confirmé par l'éditeur, côté coach *et* côté athlète), **hébergé aux USA**, et **sans export complet** de l'historique des check-ins, photos et notes — donc difficile à quitter. Mais **ses métriques personnalisées avec metric sets et graphiques longitudinaux sont réellement bonnes** et probablement sous-exploitées : avant toute migration, il vaut la peine de vérifier ce qu'elle en tire déjà.

### 5. La deuxième référence de la cliente est un argument POUR le sur-mesure, pas contre
**Check-up Santé n'est pas un produit achetable** : pas de prix, pas de page produit, pas de contact, **pas de mentions légales ni de CGU** alors qu'il traite des données de santé — et un badge **« Edit with Lovable »** sur la page de connexion. Tout indique une **application développée sur-mesure**, à usage restreint. Quand la cliente dit « je veux quelque chose comme Check-up Santé », elle décrit **un outil fait pour elle**, pas un logiciel du marché.

---

# PROCHAINES ÉTAPES SUGGÉRÉES

1. **Demander à la cliente ce qu'elle a précisément aimé dans Check-up Santé** — l'écran de bilan ? la comparaison aux normes ? le PDF ? C'est la question qui cadre tout le reste.
2. **Écrire à Rehab Guru** : « l'interface et la bibliothèque sont-elles disponibles en français ? » Une réponse positive en ferait probablement le meilleur choix du marché ; une réponse négative l'élimine.
3. **Tester Hexfit** (essai 15 jours) en vérifiant trois points : la visio (absente ?), le contenu réel de la banque de 130 tests, et **laquelle des deux grilles tarifaires s'applique**.
4. **Tester Physitrack** (essai 14 jours) en vérifiant si l'anglais des PROMs est acceptable pour ses athlètes francophones.
5. **Auditer l'usage actuel de TrueCoach** avant toute décision : les *metric sets* et les graphiques longitudinaux couvrent peut-être déjà B3 mieux qu'elle ne le pense. Le vrai manque serait alors seulement **B1 + B2**, ce qui se comble avec un simple **Tally Pro à 20 €/mois** — la solution la moins chère et la moins risquée de toute l'étude.
6. **Ne pas explorer les DPI kiné français ni le no-code de type Airtable/Softr** : les premiers sont structurellement inadaptés, le second met les données de santé aux États-Unis pour un coût supérieur à Hexfit ou Rehab Guru.
