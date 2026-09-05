# 01 — Ce que valent vraiment les quatre finalistes SaaS

**Date de vérification** : septembre 2026.
**Source** : pages officielles des éditeurs, centres d'aide, CGU/CGS, pages sécurité, fiches App Store,
Companies House. Aucun comparatif de blog n'a servi de source pour un fait chiffré.

## Conventions

- **VU** = lu directement sur la page citée, URL donnée.
- **DÉDUIT** = inférence de ma part. Signalée comme telle à chaque fois.
- **« sur demande »** = aucun prix public. **Aucun prix n'a été inventé.**
- **404 constaté** = j'ai réellement demandé l'URL et reçu un 404. C'est un fait, pas une supposition.

---

# Résultat en une page

| | Rehab Guru | Hexfit | Andrew® | Physitrack |
|---|---|---|---|---|
| **1. Où vivent les données** | 🇬🇧 Londres (AWS + MongoDB) — VU | ❓ **non documenté** dans la politique officielle ; « France HDS » affirmé sur le site marketing FR seulement | 🇫🇷 OVH, Roubaix, HDS — VU | 🇩🇪 Francfort pour l'instance `fr` — VU |
| **2. DPA art. 28** | ❌ **URL du DPA en 404** | ❌ aucun DPA public, aucune liste de sous-traitants | ✅ **Annexe 2 intégrée au contrat** | ✅ **public, téléchargeable, sous-traitants listés** |
| **3. Français réel** | ❌ **« Languages: English »** | ✅ FR natif | ✅ FR natif | 🟡 UI et exercices oui, questionnaires non |
| **4. Réversibilité** | 🟡 sur ticket support | ✅ CSV/JSON en libre-service | ✅ format lisible par machine sous 60 j ouvrés | 🟡 export tableur des réponses |
| **5. Photo attachée à une mesure** | 🟡 upload dans un formulaire | ❌ fichiers rangés à part | ❌ inexistant | ❌ **impossible** |
| **5. Vue comparative 2 dates** | ❌ non documentée | ✅ **documentée** (sur les chiffres seuls) | ❌ (graphe EVA seulement) | 🟡 graphe de score dans le temps |
| **6. Essai** | **30 j, sans CB** — VU | **14 j, sans CB** — VU | **15 j, CB requise** — VU | 14 j, résiliation avant facturation |
| **7. Prix ~10 clients** | **20 £/mois**, illimité | **39 €** ou **50 €** — deux grilles contradictoires | **34,90 €** ou **49,90 €**, illimité | **22,95 €/mois**, illimité |

**Restent en lice : Hexfit seul, et sous réserve.**
Éliminés : Rehab Guru (langue + DPA), Physitrack (point 5), Andrew (point 5).

---

# 1. Rehab Guru — **ÉLIMINÉ**

## Identité et hébergement (point 1)

- **VU** — Entité : `Rehab Guru Limited`, company number **06725431**, `Unit 13e 92 Burton Road, Sheffield,
  South Yorkshire, England S3 8BX` — https://www.rehabguru.com/terms
  Confirmé au registre public : https://find-and-update.company-information.service.gov.uk/company/06725431
- **VU** — Hébergement : *« Amazon Web Services (AWS) Virtual Private Cloud (VPC) »*, **Londres, UK** par
  défaut (« enterprise plans may specify otherwise ») — https://www.rehabguru.com/trust/security
  Chiffrement **AES-256** au repos, TLS en transit, sauvegardes horaires + snapshots quotidiens, répliquées
  *« within the same region »* — VU, même page.
- **VU** — La politique de confidentialité dit : *« If you are located outside United Kingdom and choose to
  provide information to us, please note that we transfer the data, including Personal Data, to United
  Kingdom and process it there. »* — https://www.rehabguru.com/privacy-policy

**Réponse à la question du ticket « est-ce que ça tient pour des données de santé ? »**
**DÉDUIT** : oui *sur le plan du transfert*. Le Royaume-Uni bénéficie d'une décision d'adéquation de la
Commission européenne, donc le transfert UE→UK ne demande ni CCT ni analyse d'impact de transfert.
**Mais l'adéquation ne remplace pas l'article 28** : il faut quand même un contrat de sous-traitance écrit.
C'est là que ça casse (point 2). Et **aucune certification HDS** n'existe côté UK — la certification HDS
est une obligation de droit français qui ne s'applique qu'aux données de santé *à caractère personnel
recueillies à l'occasion d'activités de prévention, de diagnostic ou de soins*. Le statut hors nomenclature
de Manon rend cette qualification discutable, mais c'est un débat juridique, pas une réponse.

## DPA (point 2) — **le premier motif d'élimination**

C'est le point où l'écart entre la communication et la réalité est le plus net.

- **VU** — Les CGU disent (§12.1.1) : *« you shall act as a data controller and Rehab Guru shall act as a
  data processor in respect of all of your Personal Data »*, et renvoient les termes de ce traitement à
  **`www.rehabguru.com/data-processing-terms`** — https://www.rehabguru.com/terms
- **VU — cette URL retourne un HTTP 404.** Testée le jour de la rédaction.
- **VU** — Les CGU ajoutent (§12.3) : *« the Parties agree that before any such Personal Data is shared
  they will first enter into a data processing agreement »*. Autrement dit : le DPA **reste à négocier**,
  il n'est pas fourni.
- **VU** — La page GDPR ne mentionne **aucun** DPA, aucun mécanisme de transfert, aucune procédure pour en
  obtenir un — https://www.rehabguru.com/gdpr
- **VU** — `https://www.rehabguru.com/privacy` et `https://www.rehabguru.com/data-privacy` retournent
  également des **404**, alors que « Data privacy » figure au pied de page.

**Ce qui existe, en revanche, et qui est très bon** : une liste de sous-traitants publique, nommée,
localisée — VU https://www.rehabguru.com/gdpr :

| Sous-traitant | Rôle | Localisation déclarée |
|---|---|---|
| Amazon Web Services | Cloud | Londres, UK |
| MongoDB | Base de données | Londres |
| Algolia | Recherche | France |
| Anthropic (via AWS Bedrock) | Modèle IA | UK/USA |
| AssemblyAI | Transcription | USA |
| Twilio | Téléconsultation | USA |
| Stripe / Braintree / Chargebee | Paiement, abonnements | UK, USA |
| Intercom / HubSpot / PostHog / Postmark / Cloudflare / BugSnag / Google Analytics / Google Firebase / Featurebase | Support, CRM, analytics, e-mail, réseau | USA (Featurebase : UE) |

Un DPO nommé, joignable à `dpo@rehabguru.com` — VU.

**Verdict point 2** : la liste des sous-traitants est meilleure que celle de la plupart des concurrents, mais
**il n'existe aucun accord de sous-traitance accessible ni signable en ligne**, et le lien contractuel censé
le porter est mort. Le ticket dit : *« un outil sans DPA accessible est éliminé, quel que soit son prix »*.
Appliqué littéralement, Rehab Guru tombe ici.

## Français réel (point 3) — **le second motif d'élimination, et le plus dur**

Le panorama avait laissé la langue en « ❓ DÉDUIT anglais uniquement — le verrou à lever en priorité ».
**Le verrou est levé, et dans le mauvais sens.**

- **VU** — Fiche App Store de l'application praticien : champ **`Languages: English`**, seller
  **`REHAB GURU LIMITED`** — https://apps.apple.com/us/app/rehab-guru-pro/id976636351
- **VU** — Aucun sélecteur de langue nulle part sur https://www.rehabguru.com/ ; les 21 liens de pied de
  page sont tous anglais ; aucune mention de localisation, de traduction ou de version française.
- **VU** — Le centre d'aide `support.rehabguru.com` n'a **aucun** article sur les réglages de langue
  (recherches ciblées infructueuses) ; toutes les URL d'articles sont préfixées `/en/`.

**DÉDUIT, confiance élevée** : Rehab Guru est **anglais uniquement, côté praticien et côté client**.

Conséquence concrète pour Manon : ses clients recevraient un portail, une app et des formulaires en anglais.
Le point 3 du ticket demande *« le français réel de l'interface, pas la présence de quelques mots »* — il n'y
a même pas les quelques mots.

## Réversibilité (point 4)

- **VU** — *« Export requests can be performed by submitting a help ticket from our support portal »* et
  *« we export your data in the format you require (within the bounds of what is technologically possible) »*
  — https://www.rehabguru.com/gdpr
- **VU** — Droit à la portabilité rappelé dans la politique : *« in a structured, machine-readable and
  commonly used format »* — https://www.rehabguru.com/privacy-policy
- **VU** — Les CGU prévoient la suppression des comptes dormants après **90 j + 30 j de grâce**, mais
  **aucune clause de restitution des données à la résiliation d'un compte actif** n'a été trouvée.

**Verdict** : export **sur demande**, pas en un clic. Acceptable, pas rassurant.

## Couverture réelle (point 5) — le point le plus important

C'est ici que j'ai cherché de la documentation, pas des pages de vente.

**Ce qui est réellement documenté — VU :**

- Un **générateur de formulaires générique**, avec les types de champs listés nommément dans l'annonce
  produit : *« Single line text · Paragraph text · Multiple choice (checkboxes) · Single choice (radio
  buttons) · File selection / upload · Body Charts (a special for annotating body charts) »* —
  https://www.rehabguru.com/blog/announcing-treatment-notes-patient-forms-and-telehealth-plus
  Le centre d'aide confirme les types *« paragraph, file uploader, text box »* —
  https://support.rehabguru.com/en/articles/9922628-creating-a-treatment-note-and-form-template
- **Un formulaire peut être envoyé au client** pour qu'il le remplisse : *« the Actions button gives you
  options to… Send the form by Email »*, et la réponse revient marquée *« Submitted »*, consultable dans la
  section *« Responses »* — https://support.rehabguru.com/en/articles/9926072-creating-and-sending-forms-to-clients
  → **Le point « questionnaire d'admission auto-rempli par le client » est réellement couvert.**
- **Signature électronique** native sur les formulaires — VU
  https://www.rehabguru.com/blog/announcing-signatures-for-forms-and-notes
- Les PROMs supportent une **auto-calculation** par formule — VU
  https://support.rehabguru.com/en/articles/9925782-creating-patient-reported-outcome-measure-proms-templates

**Ce qui n'est documenté nulle part — et c'est décisif :**

- ❌ **Aucun type de champ numérique dédié** n'apparaît dans la liste officielle des types de champs. Il y a
  du texte, du choix, un uploader, un schéma corporel — pas de « nombre avec unité ». **DÉDUIT** : une
  amplitude articulaire se saisirait en texte libre, donc non exploitable en graphique.
- ❌ **Aucune vue comparative entre deux dates.** L'annonce produit ne montre qu'un écran *« Client Treatment
  Notes Entry Screen with Notes History »* sans expliquer ce qu'il fait — VU. L'article d'aide sur
  l'organisation du dossier client (« cases » liés à des notes et des programmes) **ne décrit ni frise
  chronologique, ni vue côte à côte, ni tableau des résultats passés** —
  https://support.rehabguru.com/en/articles/9917536-managing-client-cases
- ❌ L'annonce « Outcome Measures » **ne décrit pas** le rendu des résultats : elle ne parle que
  d'auto-calcul et d'automatisation d'envoi — https://www.rehabguru.com/blog/announcing-outcome-measures

**Nuance honnête** : c'est le seul des quatre où une **photo peut atterrir à l'intérieur du même
enregistrement qu'une mesure** (un champ `file uploader` dans le même formulaire que les réponses). C'est
la structure la plus proche de « photo attachée à une mesure » de tout le panel. Mais **rien ne permet de
rejouer le formulaire à 8 semaines et de mettre les deux versions face à face** — c'est un empilement de
soumissions, pas une comparaison.

## Essai et prix (points 6 et 7)

- **VU** — https://www.rehabguru.com/pricing :
  - **Free** — 6 clients, templates, favoris
  - **Basic — 10 £/mois** ou **100 £/an** — *« Unlimited clients »*
  - **Pro — 20 £/mois** ou **200 £/an** — *« Unlimited clients »*
  - **Enterprise** — *« Let's talk »* → **sur demande**
- **VU** — *« 30-day free trial. No credit card required upfront »* — **le meilleur essai des quatre.**
- **VU** — *« applies VAT based on your selected country at checkout »* → la TVA française s'ajouterait au
  prix affiché.
- **Pro** contient ce qui compte ici : *« outcome measures, treatment notes, patient forms, body charts,
  customized telehealth »* — VU.

**Prix pour ~10 clients actifs : 20 £/mois HT**, clients illimités. Facturation au praticien, jamais au
client actif. C'est de loin le moins cher du panel — et ça ne le sauve pas.

## ❌ Verdict Rehab Guru

**Éliminé sur deux critères éliminatoires, indépendamment l'un de l'autre :**

1. **La langue.** `Languages: English` sur la fiche officielle de l'app, aucun sélecteur de langue, aucune
   documentation de traduction. Le point 3 du ticket n'est pas « partiellement » raté, il est raté
   entièrement. Le panorama recommandait d'écrire à l'éditeur — la fiche App Store répond déjà.
2. **Le DPA.** Le contrat renvoie à une URL de conditions de sous-traitance **qui retourne 404**, et prévoit
   explicitement que le DPA reste à conclure au cas par cas. Le ticket tranche : *« un outil sans DPA
   accessible est éliminé »*.

**À sauver du dossier** : sa liste de sous-traitants publique et localisée est un modèle du genre, et son
générateur de formulaires (types de champs + upload + schéma corporel + signature + envoi au client) est
**la meilleure référence fonctionnelle du marché** pour spécifier l'admission et le bilan d'une app
sur-mesure. Il mérite d'être gardé comme maquette de référence, pas comme fournisseur.

---

# 2. Physitrack — **ÉLIMINÉ**

## Où vivent les données (point 1)

- **VU** — Entité contractante : **Physitrack PLC**, société de droit d'Angleterre et du Pays de Galles,
  n° **08106661**, `140 Aldersgate Street, London, EC1A 4HY` —
  https://www.physitrack.com/legal/data-processing-agreement
  → **Point à ne pas manquer : le contrat est britannique, pas européen.** L'instance est en UE, le
  responsable ne l'est pas.
- **VU** — Table des centres de données par instance — https://www.physitrack.com/security :
  l'instance **`fr` est hébergée à « Frankfurt, Germany »**. Comme `de`, `es`, `nl` et `pl`.
  **Il n'y a pas de datacentre français.** Le « fr.physitrack.com » du panorama est une instance
  logique, pas une localisation française.
- **VU** — Certifications : **ISO/IEC 27001 & 27018**, HIPAA, RGPD et UK GDPR, alignement NHS DSP Toolkit.
  Chiffrement : *« Data is encrypted during transmission using TLS 1.2+ and at rest with AES-256. »*
- **VU** — **Aucune mention de HDS** nulle part sur la page sécurité.

## DPA (point 2) — **le meilleur des quatre, sans discussion**

- **VU** — Le DPA est **publié en clair, consultable et téléchargeable** :
  *« You can view, download or (if you really must) print our data processor agreement on this page »* —
  https://support.physitrack.com/article/730-data-processor-agreement-dpa
- **VU** — Une version signée s'obtient sur demande : *« Please contact us at legal@physitrack.com if you
  need a signed processor agreement with Physitrack. »*
- **VU** — **Liste complète des sous-traitants ultérieurs, avec pays**, dans le corps du DPA :

| Sous-traitant | Pays déclaré |
|---|---|
| AWS (PaaS) | Luxembourg |
| Coconut.co | Luxembourg |
| ADA | Allemagne |
| HubSpot | Irlande |
| Lemlist | France |
| Chargebee, Cloudflare, Fullstory, Grafana Cloud, Sentry, Twilio, Zoom, ActiveCampaign, Anthropic, PandaDoc, Seamless.AI, Webflow, Zapier, Google Workspace, HelpScout | **USA** |
| Gong.io | Israël |

- **VU** — Politique de rétention séparée et publique : https://www.physitrack.com/data-retention-policy

**Lecture honnête** : c'est un vrai DPA article 28, avec la chaîne de sous-traitance nommée — exactement ce
que le ticket demande. **Mais la chaîne comporte une quinzaine de sous-traitants américains**, dont Zoom,
Fullstory (rejeu de session) et Twilio. Le fait que l'instance `fr` soit à Francfort ne dit rien de ce que
voient ces briques-là. À qui veut un dossier RGPD propre, c'est un point d'attention réel, pas un détail.

## Français réel (point 3)

- **VU** — *« PhysiApp adapts to the language settings of the patient's device »* ; si un exercice n'est pas
  traduit, *« they default to English on the app but appear in the assigned language on the web version »* —
  https://support.physitrack.com/article/1826-language-settings-in-physitrack-and-physiapp
- **VU** — L'article de langue **ne dit rien** des questionnaires, modèles et contenus éducatifs.
  La bibliothèque d'exercices est traduite en français (le panorama comptait 4 385 exercices FR).
- **DÉDUIT** : l'interface praticien et l'app patient sont en français, **les outcome measures et les
  contenus pédagogiques restent en anglais**. C'est cohérent avec ce que notait déjà le panorama, et ça n'a
  pas bougé.

**Verdict** : 🟡 le français existe là où on le voit tout de suite, pas là où on saisit les données.

## Réversibilité (point 4)

- **VU** — *« It is also possible to download a spreadsheet with the answers of (a selection of) your
  patients »* — https://support.physitrack.com/article/130-view-and-download-the-aggregate-results-of-assigned-outcome-measures
- **VU** — Versions imprimables des résultats individuels —
  https://support.physitrack.com/article/583-view-the-individual-results-of-assigned-outcome-measures
- **Aucune procédure d'export complet du dossier client** n'est documentée.

**Verdict** : 🟡 on récupère les réponses aux questionnaires en tableur ; le reste, non documenté.

## Couverture réelle (point 5) — **le motif d'élimination**

C'est ici que la page de vente et le centre d'aide divergent le plus, et c'est exactement ce que le ticket
annonçait.

**Ce que la page produit laisse croire** — *« PROM and PREM collection », « pre/post/during treatment data »,
« custom outcome measures »* — https://www.physitrack.com/features

**Ce que la documentation dit réellement — VU :**

Quand on construit sa propre outcome measure, il n'existe que **deux types de question** :

> *« questions with one answer option (A, B, C, etc.) »* (minimum 2 options)
> *« questions with an answer range (e.g. a scale from 1 to 5) »* — **valeurs bornées entre 0 et 10**

— https://support.physitrack.com/article/129-add-a-new-outcome-measure-to-your-library

**Conséquences, et elles sont fatales pour ce cas d'usage :**

1. ❌ **Pas de champ numérique libre.** Une flexion de hanche à **142°**, un squat à **38 kg**, un temps de
   gainage de **74 s** ne peuvent pas être saisis. L'échelle est plafonnée à 10. **Physitrack ne sait pas
   enregistrer une mesure de mobilité ou de force telle que Manon la produit.**
   Aucune unité (degré, kg, cm) n'est prévue — VU, aucune mention dans la doc de scoring
   (https://support.physitrack.com/article/464-how-do-i-set-up-scoring-in-my-own-outcome-measures).
2. ❌ **Aucun type de réponse « fichier » ou « photo ».** Il n'existe pas de moyen d'attacher une image à une
   mesure.
3. ❌ **Le patient ne peut pas envoyer d'image du tout** : la messagerie est **texte seulement**, le patient
   ne peut téléverser ni vidéo ni image (confirmé par la documentation d'intégration de Jane App, éditeur
   tiers — https://jane.app/guide/physitrack-faq-troubleshooting — **source tierce, à confirmer auprès de
   Physitrack**, mais cohérente avec l'absence totale d'article d'aide sur l'upload patient).
4. 🟡 **La vue comparative existe, mais seulement pour un score de questionnaire** :
   *« You will now see a graphical representation of the results completed by the patient »*, avec en
   dessous *« a date with a score »* cliquable —
   https://support.physitrack.com/article/583-view-the-individual-results-of-assigned-outcome-measures
   C'est une courbe de score, pas une comparaison de bilan entre deux dates.
5. ✅ Ce qui marche vraiment : l'observance et l'inconfort par séance, avec granularité quotidienne —
   *« how many of the prescribed exercises the patient completed (the green bars) and how much discomfort
   the patient experienced »* — https://support.physitrack.com/article/376-track-the-progress-of-your-patient

**Le panorama notait « B3 ✅ ». C'était une surestimation.** Physitrack fait très bien le suivi de douleur
et d'observance ; il ne sait pas faire un bilan quantifié photographié.

## Essai et prix (points 6 et 7)

- **VU** — https://support.physitrack.com/article/159-how-much-does-physitrack-cost :
  **22,95 € / mois** ou **247,86 € / an** en zone euro, **par praticien**.
  *« unlimited number of patients »*. PhysiApp gratuite pour le patient.
  Add-on **Telehealth Pro : 11,99 € / mois** pour 2 000 min (60 min incluses de base).
- **VU** — Essai : *« If you cancel your trial subscription within 14 days, you won't be charged »*, et
  *« There is no lock-in. You can cancel your subscription every month »*.
  **DÉDUIT** : la formulation (« cancel your trial *subscription* ») implique qu'on souscrit d'abord, donc
  **qu'un moyen de paiement est fourni au départ**. Ce n'est pas un essai sans carte au sens strict — la
  page ne le dit pas explicitement, dans un sens ni dans l'autre.

**Prix pour ~10 clients actifs : 22,95 €/mois**, patients illimités, facturé nativement en euros.
Note : l'incohérence relevée par le panorama entre 22,95 € (support) et 18,99 $ (marketing) n'a **pas** été
reproduite cette fois — seule la page support a été consultée et elle est cohérente avec elle-même.

## ❌ Verdict Physitrack

**Le meilleur dossier de conformité des quatre, éliminé par le point 5.**

Il gagne haut la main sur le DPA (public, téléchargeable, sous-traitants nommés avec pays — le seul des
quatre à cocher les trois cases de la question 2), sur l'hébergement UE, sur les certifications, sur le prix
et sur la clarté tarifaire.

**Il est éliminé parce qu'il ne sait pas enregistrer ce que Manon mesure.** Une outcome measure
personnalisée n'accepte que des choix multiples et des échelles 0→10 ; il n'existe ni champ numérique libre
avec unité, ni champ d'upload d'image, ni possibilité pour le client d'envoyer une photo. Le noyau du besoin
— **mesure chiffrée + photo, rejouées à 8 semaines** — lui est structurellement inaccessible. Aucun
abonnement, aucune option, aucune négociation ne change ça.

Réserve secondaire, à mentionner à Manon même si elle ne décide rien : la chaîne de sous-traitance comporte
une quinzaine de prestataires américains, alors même que l'instance est à Francfort.

---

# 3. Andrew® — **ÉLIMINÉ**

## Où vivent les données (point 1) — **le meilleur cadre juridique des quatre**

- **VU** — Entité : *« Société ANDREWAPP, Société par actions simplifiée, immatriculée au Registre du
  Commerce et des Sociétés de Lyon sous le numéro 952 463 636, dont le siège social est sis 32 RUE DU BŒUF
  69005 LYON »* — https://explore.andrewapp.fr/cgs
- **VU** — Hébergement : ANDREWAPP *« héberge les données du Backoffice auprès d'un hébergeur de données de
  santé certifié HDS »*, et l'article 13 des CGU nomme **OVH**, *« hébergeur de données certifié HDS »*,
  société immatriculée à Lille (RCS 424 761 419 00045), `2 rue Kellermann, 59100 Roubaix, France` —
  https://explore.andrewapp.fr/cgu
- **VU** — Les données de santé *« seront strictement accessibles par le ou les Partenaires ayant reçu
  l'Utilisateur en consultation »*.

**Seul des quatre à combiner : éditeur français, droit français, hébergeur HDS français nommé.**

## DPA (point 2) — **existe et est contractuellement intégré**

- **VU** — *« Annexe 2 – Accord sur la protection des données »* fait partie intégrante du contrat, avec des
  appendices décrivant les traitements et la politique de sécurité — https://explore.andrewapp.fr/cgs
- ⚠️ **La liste nominative des sous-traitants ultérieurs figure dans l'« Appendice 1 – Description des
  Traitements de données concernés », que je n'ai pas pu lire dans le corps public des CGS.**
  **DÉDUIT** : elle existe (elle est référencée), mais je ne peux pas affirmer qu'elle est publique. À
  demander par écrit avant toute signature.
- Le DPA n'est donc **pas signé séparément** : il est accepté avec les CGS, ce qui est la forme la plus
  simple pour un micro-entrepreneur. C'est un point fort, pas une faiblesse.

## Français réel (point 3)

- **VU** — Éditeur français, site en français, bascule 🇫🇷 FR / 🇬🇧 EN sur https://www.andrewapp.com/
- **VU** — Le centre d'aide est en français, avec deux bases distinctes : *« 🩺 Thérapeutes »* et
  *« 💊 Patients »* — https://andrewapp.crisp.help/fr/
- **✅ Français natif des deux côtés.** Aucune réserve.

## Réversibilité (point 4) — **la clause la plus explicite des quatre**

- **VU** — Les CGS prévoient que le Partenaire peut demander ses données *« dans un format structuré,
  couramment utilisé et lisible par machine »*, **dans les soixante jours ouvrés suivant la fin du contrat**
  — https://explore.andrewapp.fr/cgs
- **VU** — Côté utilisateur, possibilité de *« Modifier ou supprimer son Compte ou ses données »* dans
  l'app, et de *« Solliciter la portabilité de ses données auprès d'un autre Partenaire de l'Application »*
  — https://explore.andrewapp.fr/cgu

**Verdict** : ✅ clause de réversibilité écrite, délai chiffré, format qualifié. C'est le seul des quatre à
l'écrire dans le contrat plutôt que dans une FAQ.

## Couverture réelle (point 5) — **le motif d'élimination, et il est net**

J'ai cherché activement une preuve du contraire (pages produit, blog, centre d'aide, fiches store, CGU).
**Je n'en ai trouvé aucune.**

**Ce qui existe — VU :**

- Un **questionnaire de santé** rempli par le patient : type et intensité de la douleur **sur échelle EVA**,
  zones concernées, facteurs aggravants et soulageants, évolution dans le temps — VU (pages produit et blog
  andrewapp.com/.fr).
- Un **graphe d'évolution des symptômes** généré à partir des réponses EVA — VU.
- Un **module de télésoin** permettant de conduire le bilan initial ou un re-check en visio — VU
  https://www.andrewapp.com/features/telehealth
- Messagerie chiffrée, suivi de l'observance, bibliothèque d'exercices, Andrew® IA qui recommande des
  exercices *« selon bilan et guidelines internationales »* — VU https://www.andrewapp.com/

**Ce qui n'existe pas — absence constatée sur toutes les sources consultées :**

- ❌ **Aucune batterie de tests de mobilité ou de force chiffrée.** Pas de goniométrie, pas de protocole de
  test, pas de banque de tests. Les dix sections de fonctionnalités listées sur la page d'accueil sont :
  *« Prescription d'exercices · Planification · Suivi de l'observance · Télésoin & Suivi à distance ·
  Facturation & Paiement · Éducation des patients · Andrew® IA · Abonnements · Messagerie cryptée &
  sécurisée · Contenus centrés sur le patient »* — VU. **Il n'y a pas de section « bilan » ni « tests ».**
- ❌ **Aucune photo attachée à une mesure.** Aucune mention d'upload de photo ou de vidéo par le client dans
  un contexte d'évaluation.
- ❌ **Aucune vue comparative entre deux dates**, sinon la courbe EVA — qui est un score déclaratif de
  douleur, pas un bilan.
- ⚠️ Il n'existe **pas de page produit dédiée aux kinés** : `andrewapp.com/kine`, `/kinesitherapie` et
  `/kinesitherapeute` retournent tous des **404** ; `kine.andrewapp.fr` ne résout pas (DNS). La navigation
  propose « Kinésithérapie » comme catégorie de métier, pas comme module fonctionnel.

**Le panorama disait « B3 ❌ point faible majeur ». Vérification faite : c'est confirmé, sans nuance.**

## Essai et prix (points 6 et 7)

- **VU** — https://www.andrewapp.com/ (la page `/tarifs` retourne un **404** ; la grille est sur la home) :
  - **Andrew® Lite — 34,90 € / mois / praticien**, patients illimités
  - **Andrew® Coach — 49,90 € / mois / praticien** (« le plus populaire »), ajoute le module de
    téléconsultation, l'IA de prescription et la création d'abonnements patients
  - **Andrew® Multi — 104,70 € / mois** au total (3 membres, facturation annuelle) ou **1 256,40 € / an**
  - **−20 % en facturation annuelle** — VU
- **VU** — Essai : *« 15 jours d'utilisation offerts »*, mais **« CB requise »**.
  → **Le seul des quatre à exiger une carte bancaire pour essayer.**

**Prix pour ~10 clients actifs : 34,90 €/mois** (Lite) ou **49,90 €/mois** (Coach), patients illimités.
Facturation au praticien. Pour Manon, seul Coach a du sens (il contient la téléconsultation) → **49,90 €**,
soit **~3,3 % d'un CA mensuel de 1 500 €**.

## ❌ Verdict Andrew®

**Le meilleur dossier réglementaire du panel, éliminé par le point 5.**

Il gagne sur les points 1, 2, 3 et 4 : éditeur français, hébergement OVH HDS nommé, DPA en annexe
contractuelle, français natif des deux côtés, clause de restitution écrite avec délai. Sur le papier de la
conformité, c'est le candidat le plus propre.

**Il est éliminé parce qu'il ne fait pas le métier demandé.** Andrew est un outil de **prescription
d'exercices avec suivi de douleur déclarée**. Il n'y a aucune batterie de tests chiffrés, aucune photo
attachée à une mesure, aucune vue comparative de bilan. Le noyau du besoin — le bilan quantifié
photographié et rejoué — est absent, pas partiel.

Aggravant mineur mais réel pour un essai : **carte bancaire obligatoire** pour les 15 jours.

---

# 4. Hexfit — **RESTE EN LICE, sous trois réserves**

C'est le seul des quatre à survivre au point 5, et c'est aussi celui dont le dossier de conformité s'est le
plus **dégradé** à la vérification.

## Où vivent les données (point 1) — **le point qui s'est dégradé**

Deux sources officielles, et elles ne disent pas la même chose.

**Source A — la politique de confidentialité de l'éditeur** (le document qui fait foi) :
- **VU** — Entité : **`Hexfit Solutions Inc.`**, `CP 70172 SUCC Québec-Centre, Quebec City, CA, G2J 0A2` —
  **société canadienne** — https://www.myhexfit.com/en/privacy-policy/
- **VU** — **La localisation de l'hébergement n'est pas indiquée.** Aucun nom d'hébergeur.
- **VU** — **Le mot HDS n'apparaît pas.** Aucune mention de la France.
- **VU** — Aucune liste de sous-traitants. Le document parle de *« external suppliers as a subcontractor »*
  qui *« agree to abide by this Policy »*, sans en nommer un seul.
- **VU** — Conformité affirmée : ISO 27001 et RGPD.

**Source B — le site commercial français** :
- **VU** — *« Les données des professionnels situés en France sont hébergées sur des serveurs sécurisés
  certifiés HDS en France également »* — https://hexfit-sport-sante.fr/tarifs-hexfit-logiciel-kines/
- **VU** — Bandeaux *« Hébergé en France »* et *« Certifié HDS »* sur https://hexfit-sport-sante.fr/
- ⚠️ **VU** — Ce site **n'a pas de page de mentions légales accessible** (`/mentions-legales/` → **404**),
  ne publie **aucune raison sociale, aucun SIREN, aucune adresse**. Le pied de page porte
  *« © 2025 Hexfit Sport Santé »* et trois numéros de téléphone (France, Suisse, Amérique du Nord).

**Ce que j'en déduis, explicitement :**
**DÉDUIT** — Le site français est une vitrine commerciale d'Hexfit (il se présente comme l'éditeur, pas
comme un revendeur : *« Chez Hexfit, on s'assure de collaborer avec… »*), mais **l'engagement HDS France
n'existe que sur une page marketing sans mentions légales, et n'est repris dans aucun document contractuel
public.** Pour des données de santé, une promesse marketing non contractualisée ne vaut rien.

⚠️ **C'est la question n°1 à poser par écrit à Hexfit** : le nom de l'hébergeur HDS, son numéro de
certification, et l'engagement écrit que les données d'un praticien français y restent.

## DPA (point 2) — **le maillon faible**

- **VU** — La politique de confidentialité dit seulement : *« Agreements are also signed between Hexfit and
  its employees and subcontractors for the use of your Information in a manner consistent with this
  Policy »* — https://www.myhexfit.com/en/privacy-policy/
- ❌ **Aucun DPA article 28 public.** Aucune page « DPA », aucun document téléchargeable, aucune procédure
  documentée pour en obtenir un. Recherches ciblées infructueuses.
- ❌ **Aucune liste de sous-traitants ultérieurs.** C'est le seul des quatre à n'en nommer strictement aucun
  (Physitrack en nomme 21, Rehab Guru 18, Andrew renvoie à un appendice contractuel).

**Lecture stricte du ticket** (*« un outil sans DPA accessible est éliminé »*) : Hexfit tomberait aussi.
**Je ne l'élimine pas ici, pour une raison précise** : contrairement à Rehab Guru, il n'y a pas de lien
contractuel mort ni de clause disant que le DPA reste à négocier — il y a une **absence de publication**,
qui peut se lever par un simple e-mail commercial. C'est un test à faire pendant l'essai gratuit, pas une
impossibilité structurelle. **Mais si Hexfit ne fournit pas de DPA signable, il est éliminé aussi, et il ne
reste alors personne.**

## Français réel (point 3)

- ✅ **Le meilleur des quatre après Andrew.** Site français complet, centre d'aide bilingue avec des URL
  `/fr/` réelles (ex. https://help.myhexfit.com/fr/articles/8219488-quels-formulaires-et-bilans-de-forme-utiliser-dans-hexfit-pour-l-onboarding-client),
  interface et app client en français — VU.
- **VU** (panorama, non contredit) : le logiciel affiche les exercices dans la langue du compte client.

## Réversibilité (point 4) — **la meilleure des quatre**

- **VU** — Export des réponses d'un document pour un client ou un groupe : *« Click the "Export" button at
  the top right of the page. You will thus have a ".CSV" file including all its answers. »* —
  https://help.myhexfit.com/en/articles/4271258-export-document-responses
- **VU** — Export global via le **query builder**, avec filtres multicritères, en **CSV ou JSON** —
  https://help.myhexfit.com/en/articles/4273742-data-export
- **VU** — Export possible pour **tous les clients à la fois**, pas seulement un par un.

**Verdict** : ✅ **le seul des quatre où l'export est en libre-service, multicritère, et dans deux formats.**
C'est la meilleure garantie de non-enfermement du panel. Réserve : **la sortie des photos et fichiers du
« Cloud storage » n'est pas documentée** — l'export porte sur les réponses et les données chiffrées.

## Couverture réelle (point 5) — **le seul à passer, mais à moitié**

C'est le cœur du ticket. Voici ce que dit la documentation, décomposé besoin par besoin.

### ✅ Questionnaire d'admission auto-rempli par le client — **couvert**

- **VU** — *« fill out the form yourself, as a professional, or send it to the client so he can complete it
  on his side »* — https://help.myhexfit.com/en/articles/5162316-evaluations-and-assessments
- **VU** — Banque de **150+ évaluations** classées par catégorie, plus des formulaires d'onboarding
  documentés en français.

### ✅ Bilan structuré éditable en direct pendant une visio — **couvert (mais sans la visio)**

- **VU** — Le même article : le professionnel peut remplir le formulaire lui-même, ou l'envoyer. C'est très
  exactement le double usage demandé.
- ⚠️ **Rappel** : Hexfit **n'a pas de visio native**. Le formulaire se remplit pendant une visio tenue
  ailleurs (Zoom, Meet, WhatsApp…). Ce n'est pas bloquant, c'est un outil de plus à garder.

### ✅ Saisie de mesures chiffrées de mobilité et de force — **couvert, et bien**

C'est le point où Hexfit écrase Physitrack.

- **VU** — *« a data point represents a numerical value associated with a measurement, observation, or
  performance indicator »*, *« always numerical »*, *« measurable and comparable over time »* —
  https://help.myhexfit.com/en/articles/5128160-what-is-data
- **VU** — Les données peuvent venir de trois sources : saisie manuelle du praticien (*« Add a new value »*),
  **génération automatique par un test ou une évaluation**, ou un champ de données à l'intérieur d'un
  document. On peut **créer ses propres données personnalisées**.
- **VU** — Hexfit Lab (app de tests) : tests de puissance, de morphologie et d'endurance ; *« Once the tests
  have been completed in Hexfit Lab, you will be able to find the history in Hexfit »*, résultats déposés
  dans la section « Data » du dossier client —
  https://help.myhexfit.com/en/articles/9290386-what-is-hexfit-lab
  ⚠️ **VU** : *« Subscription to Hexfit Lab is included with some Hexfit packages but is also available à
  la carte. »* → **Le prix de Hexfit Lab en à la carte est « sur demande ».** Il n'est affiché nulle part.

### ✅ Vue comparative entre deux dates — **couvert, et documenté noir sur blanc**

C'est le seul des quatre à l'écrire explicitement dans son aide.

- **VU** — *« Compare a customer's results over time or between different indicators »* et *« Create
  personalized progress charts »* — https://help.myhexfit.com/en/articles/5128160-what-is-data
- **VU** — Statistiques affichées pour chaque donnée : *« The average of the measurements. The difference
  (between the first and last measurements). The sum of all measurements. Maximum value recorded. The
  minimum value entered. »* — https://help.myhexfit.com/en/articles/4438442-analyze-your-data
  → **Le delta entre première et dernière mesure est une valeur native.** C'est littéralement
  « la comparaison à 8 semaines », pour les chiffres.
- **VU** — Graphe automatique par donnée, sélection de la période par calendrier, *« History gives you all
  measurements for the last year »*, tableaux de graphes qui se mettent à jour automatiquement, et partage
  du graphe au client.

### ❌ Photos attachées à une mesure — **NON couvert**

C'est la limite, et elle est réelle.

- **VU** — Le client comme le praticien peuvent téléverser *« files such as photos and videos »* (limite
  **200 Mo par fichier**), rangés dans des **dossiers du « Cloud storage »** créés par le praticien —
  https://help.myhexfit.com/en/articles/4413797-client-view-and-add-files
- ❌ **Rien, dans aucun article, ne décrit le rattachement d'une photo à une mesure ou à une évaluation.**
  L'article sur les évaluations ne mentionne aucun média. L'article sur l'analyse des données ne mentionne
  aucune photo.
- **VU** — Hexfit Lab **prend bien des photos** : *« three photos of the client »* pour l'analyse posturale,
  *« two photos, one from the front and one from the side »* pour les mesures morphologiques —
  https://help.myhexfit.com/en/articles/11003323-perform-the-morphology-tests-in-hexfit-lab
  **Mais ce que Hexfit Lab renvoie dans le dossier, ce sont les mesures calculées, pas une galerie
  comparable.** L'article ne dit nulle part qu'on peut afficher les photos de deux séances côte à côte.
- **VU** — La page produit « analyse » parle de comparer *« two athletes, two groups of athletes, one athlete
  with the performance of a group »* — https://www.myhexfit.com/en/features/analysis/ —
  **c'est de la comparaison inter-individus, pas test/retest photographique.**

**DÉDUIT, confiance élevée** : dans Hexfit, **les chiffres se comparent, les photos se rangent.**
Ce sont deux univers séparés. La « visualisation test/retest » mentionnée par le panorama porte sur les
valeurs, pas sur les images.

## Essai et prix (points 6 et 7) — **deux grilles, toujours pas réconciliées**

C'est la réserve commerciale que le panorama signalait, et **elle n'est pas levée — elle est confirmée.**

**Grille A — site commercial français, dédiée kinés** — VU
https://hexfit-sport-sante.fr/tarifs-hexfit-logiciel-kines/ :

| Offre | Prix | Clients |
|---|---|---|
| **Starter kiné** | **39 € / mois** | **illimités** |
| **Essentiel kiné** | **59 € / mois** | **illimités** — ajoute la banque de tests, le suivi avancé, l'agenda (via Acuity Scheduling), la facturation Stripe (+0,6 %), les protocoles personnalisables |

Dégressivité *« à partir de 3 professionnels au sein de la même structure »* — VU.
Essai : **14 jours**, *« aucune carte de crédit n'est demandée »* — VU (hexfit-sport-sante.fr).

**Grille B — site éditeur, section « Therapists »** — VU https://www.myhexfit.com/fr-fr/tarifs/ :

| Offre | Prix | Clients |
|---|---|---|
| **Solo** | **50 / mois** | **jusqu'à 50 patients actifs** |
| **Clinic** | **120 / mois** | 500 à 1 000+ patients, 3 accès pro |

Add-on *« Remote monitoring: +6/patient/month »* — VU.
**VU** — *« The payment currency will be determined by the country of issue of your credit card (CAD, USD,
EUR or CHF) »* → **une carte française serait facturée en euros.**

⚠️ **Les deux grilles sont incompatibles** : 39 €/illimité contre 50 €/50 patients, pour le même métier.
L'une des deux au moins est périmée ou conditionnelle. **Aucune des deux ne peut servir de base de budget
tant qu'un devis écrit ne tranche pas.**

**Prix pour ~10 clients actifs** : **39 €/mois** si la grille française s'applique, **50 €/mois** sinon.
Dans les deux cas, sous le plafond de tous les paliers — **le nombre de clients n'est pas le facteur
limitant** pour Manon (elle en a ~10 pour un plafond de 50 minimum).
À ajouter, non chiffré : **Hexfit Lab « sur demande »** s'il n'est pas inclus dans le palier retenu.

## 🟡 Verdict Hexfit

**Le seul survivant, et il ne remporte pas le point 5 en entier.**

Ce qu'il fait, seul du panel :
- ✅ mesures chiffrées libres, avec unités et données personnalisées, saisies par le praticien **ou**
  générées par un test ;
- ✅ **comparaison documentée entre deux dates**, avec le delta première/dernière mesure comme valeur
  native ;
- ✅ formulaires remplissables par le client en ligne **ou** en direct pendant la séance ;
- ✅ **export libre-service en CSV et JSON**, la meilleure garantie anti-enfermement du panel ;
- ✅ français natif, essai 14 jours sans carte bancaire.

Ce qu'il ne fait pas, et qui est le cœur du ticket :
- ❌ **la photo n'est pas attachée à la mesure.** Elle vit dans un dossier de fichiers, à côté.
- ❌ **aucune vue comparative de deux photos entre deux dates** n'est documentée nulle part, y compris pour
  Hexfit Lab qui pourtant en prend.

Les trois réserves à lever, par écrit, pendant l'essai gratuit :
1. **Le DPA.** Existe-t-il un accord de sous-traitance article 28 signable, avec la liste des sous-traitants
   ultérieurs ? *Rien de public aujourd'hui.* **Si non → Hexfit tombe et il ne reste personne.**
2. **L'hébergement HDS.** Quel hébergeur, quel numéro de certification, et cet engagement figure-t-il dans
   un document contractuel ou seulement sur une page marketing sans mentions légales ?
3. **La grille tarifaire.** 39 €/illimité ou 50 €/50 patients ? Et Hexfit Lab est-il inclus, ou « sur
   demande » en supplément ?

---

# Ce que cette vérification change pour la carte

## Le point 5 disqualifie tout le monde, et c'est le résultat le plus important

Le ticket prévenait : *« le point 5 est celui où les pages marketing mentent le plus »*. Vérifié :

| | Mesure chiffrée libre | Photo **attachée à** cette mesure | Vue comparative 2 dates |
|---|---|---|---|
| Rehab Guru | ❌ pas de champ numérique | 🟡 upload dans le même formulaire | ❌ |
| Hexfit | ✅ | ❌ fichiers rangés à part | ✅ (chiffres seuls) |
| Andrew® | ❌ | ❌ | ❌ |
| Physitrack | ❌ **plafonné à 0–10** | ❌ **aucun type de champ fichier** | 🟡 courbe de score |

**Aucun des quatre ne sait faire « photo attachée à une mesure » ET « vue comparative entre deux dates ».**
Le plus proche est un partage impossible : Rehab Guru met la photo au bon endroit mais ne compare rien et
parle anglais ; Hexfit compare bien mais range les photos ailleurs.

**Le panorama avançait que la comparaison photo/vidéo de mobilité à 8 semaines n'est faite par presque
personne. Cette vérification le confirme sur les quatre meilleurs candidats du marché, documentation en
main.** C'est le seul argument fonctionnel sérieux en faveur du sur-mesure — et il tient.

## Ce qui doit remonter dans la note de décision

1. **Le scénario « acheter » n'est pas mort, mais il coûte un renoncement nommé.** Acheter Hexfit à
   39–50 €/mois, c'est accepter que les photos restent dans un dossier et que la comparaison visuelle se
   fasse à l'œil, hors de l'outil (aujourd'hui : WhatsApp). L'outil couvre l'admission, le bilan, les
   chiffres et leur évolution — **pas l'image**.
2. **Le vrai coût du statu quo est identifié** : le geste que Manon fait aujourd'hui et qu'aucun SaaS ne
   reprend, c'est mettre deux photos côte à côte. Le compteur 4 de la carte (son temps) doit être mesuré
   **sur ce geste-là en priorité**.
3. **Trois questions écrites à envoyer avant toute décision** — elles sont bloquantes, pas informatives :
   - à **Hexfit** : DPA art. 28 signable + liste des sous-traitants + attestation HDS + grille applicable ;
   - à **Hexfit** : peut-on rattacher une photo à un résultat de test, et afficher deux passages côte à
     côte ? (Si la réponse est oui et non documentée, tout change.)
   - **ne rien envoyer à Rehab Guru** : la fiche App Store a déjà répondu sur la langue.
4. **Ne pas rouvrir Rehab Guru, Physitrack ni Andrew** sur ce périmètre. Leurs motifs d'élimination sont
   structurels (langue, type de champ, absence de module), pas commerciaux. Aucun devis ne les lève.

## Les limites de cette vérification, dites franchement

- **Je n'ai testé aucun des quatre produits.** Tout ce qui précède vient de pages publiques et de centres
  d'aide. Une fonctionnalité peut exister sans être documentée — c'est même fréquent. Les ❌ ci-dessus
  signifient « non documenté après recherche ciblée », pas « prouvé absent », **sauf** pour trois faits qui
  sont des preuves positives : les deux types de question de Physitrack, la mention `Languages: English` de
  Rehab Guru, et le 404 de son URL de DPA.
- **Je n'ai pas lu les appendices contractuels d'Andrew ni le contrat client d'Hexfit**, qui ne sont pas
  publics. La liste des sous-traitants d'Andrew existe (elle est référencée) mais je ne l'ai pas vue.
- **Aucun prix n'a été converti ni extrapolé.** Les 20 £ de Rehab Guru restent en livres ; les paliers
  d'Hexfit sur la grille internationale sont affichés sans symbole sur la page consultée et la devise dépend
  du pays de la carte — je ne leur ai donc pas apposé « € » de mon propre chef.
