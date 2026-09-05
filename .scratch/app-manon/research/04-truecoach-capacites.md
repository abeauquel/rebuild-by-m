# 04 — Ce que TrueCoach sait faire, d'après sa documentation publique

**Ticket** : [`04-audit-du-truecoach-existant.md`](../issues/04-audit-du-truecoach-existant.md)
**Date de la recherche** : 5 septembre 2026
**Périmètre** : documentation publique seulement — centre d'aide `help.truecoach.co`, pages
produit `truecoach.co`, blog, page tarifs. **Le compte réel de Manon n'a pas été ouvert.**

## Comment lire ce document

- **VU** = une phrase de la documentation de TrueCoach le dit, l'URL est citée.
- **DÉDUIT** = raisonnement à partir de ce qui est vu, ou de l'absence d'article.
- **MUET** = la documentation ne dit rien. C'est un résultat, pas un échec : ça bascule
  la question dans la liste « à vérifier dans le compte réel » en fin de document.

Une remarque de méthode qui vaut pour tout ce qui suit. Le centre d'aide de TrueCoach est
organisé en 17 collections, et j'ai listé les articles de celles qui comptent ici
(« Managing Clients », « Library », « The Workout Calendar & Sidebar », « TrueCoach Client
Tutorials », « The TrueCoach App »). **L'absence d'un article dans une collection est un
indice fort** : il n'existe aucun article « Forms », aucun article « Progress Pictures »
côté coach, aucun article « Client Notes ». Pour un produit dont chaque bouton a sa page
d'aide, ça veut dire quelque chose.

---

## 1. Questionnaires et formulaires — **ça existe mal**

### Ce qui est vu

**Il n'y a pas de constructeur de formulaires dans TrueCoach.** L'article d'aide qui porte
exactement ce titre — « Waivers, Questionnaires, Assessments and Check-in's » — explique
qu'on détourne le **constructeur de séances** pour ça :

> « We have designed the workout builder to be so customizable that the tasks you put here
> are not limited to just workouts. »

et, pour les réponses :

> « Your clients will be able to give you an open ended response from their results field in
> their client account. »

Source : <https://help.truecoach.co/en/articles/3363240-waivers-questionnaires-assessments-and-check-in-s>

L'article « Creating an Onboarding Sequence » confirme le procédé et le pousse jusqu'au
bout : on construit un « programme » d'admission, on met au Jour 2 un PAR-Q **dont chaque
question est saisie comme un exercice**, et le client répond dans le champ « résultat » de
cet exercice. Le coach reçoit une notification et lit les réponses depuis son tableau de bord.

Source : <https://help.truecoach.co/en/articles/3889427-creating-an-onboarding-sequence>

Pour les documents à signer — décharges, consentements — la réponse documentée est encore
plus rustique : le coach dépose le PDF dans la bibliothèque, le client le télécharge,
l'imprime, le remplit, le renvoie, et le coach le range à la main dans les notes du client.

Source : <https://help.truecoach.co/en/articles/3363240-waivers-questionnaires-assessments-and-check-in-s>

La page produit « Features » ne liste **aucune** fonctionnalité appelée « Forms »,
« Questionnaires » ou « Assessments ». Source : <https://truecoach.co/features/>

### Types de champs

**VU** : un champ de réponse libre (le champ « results » de l'exercice). L'article suggère
d'écrire dans le champ « reps » le type de réponse attendue — c'est-à-dire d'utiliser un
libellé comme consigne, faute de typage réel.

**MUET** : la documentation ne décrit nulle part un champ nombre, une échelle, un choix
multiple, une case à cocher ou un dépôt de fichier dans un formulaire. Le seul dépôt de
fichier documenté côté client est la **vidéo attachée à un exercice**
(<https://help.truecoach.co/en/articles/2580531-client-uploading-a-video-to-a-workout>) et
les **photos de progression**, qui vivent ailleurs (voir §3).

### Limite pratique

Un questionnaire d'admission dans TrueCoach est un faux : c'est une séance d'entraînement
déguisée, dont chaque question est un « exercice » et chaque réponse un texte libre non
typé, non requis, non validé, et **non exportable comme un formulaire**. Les réponses se
retrouvent dispersées dans l'historique des séances, pas dans un document d'admission.
C'est utilisable pour trois questions de réveil ; ça ne l'est pas pour un bilan initial de
vingt items dont on veut relire la trace deux ans plus tard.

**Verdict : ça existe mal.**

---

## 2. Métriques personnalisées — **ça existe, et c'est bon**

### Ce qui est vu

C'est le point fort, et c'est aussi celui que le panorama soupçonnait sous-exploité.

> « The metrics and metric sets that you create are 100% customizable, so you have total
> freedom in the information you collect. »

Source : <https://help.truecoach.co/en/articles/3047471-metrics>

- **Métriques personnalisées** : oui, entièrement. **VU.**
- **Metric sets** : on crée un jeu de métriques dans la Bibliothèque, et on l'assigne
  **à plusieurs clients d'un coup**, réutilisable pour les futurs clients. Les exemples
  donnés par TrueCoach incluent explicitement les **« movement screens »** — les bilans de
  mobilité. **VU.** (mêmes sources : article Metrics, et
  <https://truecoach.co/features/progress-tracking/> qui cite
  « Customized metrics (strength, health, movement screens, etc.) »)
- **Historique et graphique** : oui. L'article côté client dit
  « The graph represents all past entries updated by you AND/OR your coach ».
  **VU.** Source : <https://help.truecoach.co/en/articles/2641737-client-updating-a-metric>
- **Saisie par le client** : oui, depuis le web, iOS et Android, par deux chemins — sa page
  de profil, ou directement dans la séance si la métrique y est liée. **VU.** (même source)
- **Saisie par la coach** : oui, depuis le « Metric Manager » dans la barre latérale du
  calendrier du client. **VU.**
  Source : <https://help.truecoach.co/en/articles/3047875-updating-metrics>
- **Métrique liée à une séance** : on clique l'icône métrique à côté d'un exercice ou d'un
  circuit, et « a prompt will appear for the client to update that metric » pendant la
  séance. **VU.** Source : <https://help.truecoach.co/en/articles/2393419-linking-metrics-to-workouts>
- **Cibles** : chaque métrique peut porter une cible fixe (ex. 21:00 sur un 5 km) ou une
  cible calculée par formule reliant deux métriques (ex. 33 % du poids de corps). **VU.**
  Source : <https://help.truecoach.co/en/articles/3047863-metrics-targets>

### La seule vraie inconnue : les unités

**MUET, et c'est important.** Aucune page d'aide ne publie la liste des unités de mesure
disponibles. L'article Metrics se termine par :

> « Need another measurement unit? Email us at [support] ! »

Source : <https://help.truecoach.co/en/articles/3047471-metrics>

**DÉDUIT** : cette phrase n'a de sens que si les unités sont une **liste fermée** que
TrueCoach étend à la demande, pas un champ libre. Les unités effectivement nommées dans la
documentation sont des poids, des pourcentages, des distances, des durées et des
fréquences cardiaques. **Le degré d'amplitude articulaire n'est cité nulle part.** C'est
exactement la mesure dont Manon a besoin.

Deux issues, toutes deux à vérifier dans le compte réel : soit le degré existe déjà dans la
liste, soit il faut un e-mail au support — soit, repli acceptable, on crée une métrique
sans unité et on saisit un nombre nu, ce qui marche pour le graphique mais laisse le lecteur
deviner qu'il s'agit de degrés.

### Limite pratique

Rien à redire sur le mécanisme. La limite est ailleurs : **une métrique n'est qu'un nombre
daté**. Elle ne porte ni photo, ni côté (gauche/droite), ni condition de mesure, ni
commentaire. Un test de mobilité qui se lit « flexion d'épaule droite, 142°, mesurée en
décubitus, photo de face » se dégrade dans TrueCoach en deux métriques distinctes
(« Flexion épaule D », « Flexion épaule G ») et une photo rangée à un autre endroit.

**Verdict : ça existe, et bien. C'est la brique déjà payée la plus solide.**

---

## 3. Photos de progression — **ça existe mal, et c'est le point qui décide**

C'était le point le plus important de la recherche. Le résultat est net, et il n'est pas bon.

### Ce qui est vu

**Un seul article dans tout le centre d'aide** traite des photos de progression, et il est
côté **client** : « [Client] Uploading Progress Pictures ».
Source : <https://help.truecoach.co/en/articles/6812443-client-uploading-progress-pictures>

Ce qu'il dit :

- Le client va dans l'onglet **Account → Progress Pictures → Add Progress Photos**, et
  photographie ou choisit dans sa pellicule. Les poses attendues sont **face, profil, dos**.
- **Les photos sont datées** : « Notice the date section on this page which allows you to
  upload any previous progress pictures » — on peut donc antidater un lot.
- **Un seul lot par jour** : « once you have uploaded a progress photo set for the day, you
  will not be able to upload another progress photo set for the same date. »
- **Il existe une vue de comparaison** : « Once you have uploaded more than one set of
  progress pictures, you will be able to see the *'then' and 'now'* view which displays the
  awesome progress you've been making. »

### Les trois réserves, qui comptent plus que la fonctionnalité

**a) Les photos sont attachées au CLIENT, pas à une métrique ni à un test.** Elles vivent
dans `Account → Progress Pictures`, une section du profil, à côté des métriques et non
dedans. **VU** (l'article place explicitement l'onglet sous Account). Aucune page ne décrit
un moyen de rattacher une photo à une mesure. C'est exactement le défaut relevé sur Hexfit
dans le ticket `01` : « range les photos à côté des mesures ».

**b) La vue « then / now » est documentée dans l'APPLICATION MOBILE DU CLIENT.** Tout
l'article est écrit en « tap », avec des captures d'app. **MUET** sur l'existence de la même
vue dans l'interface web de la coach. Aucun article coach ne parle de photos ; la collection
« Managing Clients » (18 articles) n'en contient aucun, ni la collection « The TrueCoach App »
(4 articles).

Ce qu'on sait de la vue coach est indirect et faible :
- Les notifications coach mentionnent les « progress photo uploads » dans l'alerte groupée —
  donc la coach est prévenue, donc elle les voit quelque part. **VU.**
  Source : <https://help.truecoach.co/en/articles/2403627-coach-s-notification-settings>
- Une page concurrente (Hevy Coach, donc **source hostile, à prendre avec des pincettes**)
  décrit le profil client TrueCoach comme offrant « Progress pictures – upload clients'
  progress pictures and review previous ones ». Noter le verbe : **review**, pas *compare*.
  Source : <https://hevycoach.com/compare/truecoach/>
- Le blog TrueCoach écrit « upload photos to see physical changes side-by-side », mais c'est
  du marketing, sans capture ni mode d'emploi.
  Source : <https://truecoach.co/blog/how-to-track-client-progress-online-with-truecoach-metrics/>

**c) « Then / now » n'est pas « deux dates au choix ».** La formulation — *alors* et
*maintenant* — décrit une comparaison **premier lot contre dernier lot**. Rien dans l'article
ne décrit un sélecteur permettant de choisir deux dates arbitraires, ni un affichage
côte à côte de la même pose à deux dates données. **MUET** sur ce point précis, qui est
précisément la demande de Manon (« la comparaison à 8 semaines »).

### Limite pratique

Le modèle photo de TrueCoach est celui de la **transformation physique esthétique** — face,
profil, dos, avant/après, pour un client qui perd du poids. Ce n'est pas le modèle du **test
de mobilité** : un geste précis, un angle, un côté, refait à l'identique à huit semaines.
Un lot unique par jour interdit d'ailleurs de photographier six tests le même jour comme six
objets distincts.

**Verdict : ça existe mal.** La fonction existe, mais son modèle de données ne correspond
pas au besoin, et la vue de comparaison est documentée côté client mobile uniquement.
**La thèse de l'angle mort du marché tient — TrueCoach ne la dément pas.**

---

## 4. Document de bilan structuré — **ça n'existe pas**

### Ce qui est vu

TrueCoach sait **héberger des fichiers**, pas en **rédiger**.

> « You can attach any spreadsheets, PDFs, word documents, or photos/videos that you'd like! »

Source : <https://help.truecoach.co/en/articles/3047381-sharing-documents-and-files>

Trois emplacements, tous documentés :

| Emplacement | Portée | Note |
|---|---|---|
| Bibliothèque → Documents | **Tous les clients** | « All uploaded files are shared publicly with all of your clients. » |
| Message direct | Un client | Le seul partage réellement individuel documenté |
| Notes du client | Un client | On y range un fichier ; c'est là que l'aide dit de classer une décharge signée |

**Il n'y a aucun éditeur de document dans TrueCoach.** L'article ne décrit que le dépôt de
fichiers existants. Il n'existe **aucun article d'aide** sur des modèles de document, un
éditeur de texte riche, ou un bilan type. **VU par absence** dans les collections
« Library » (10 articles) et « Managing Clients » (18 articles).

Les **notes client** existent — l'aide dit d'y ranger les décharges — mais **elles n'ont
pas d'article dédié**, ce qui suggère un simple bloc de texte libre par client.
**DÉDUIT**, à confirmer dans le compte.

### Le piège de la bibliothèque

Attention : ranger un modèle de bilan dans la bibliothèque le rend **visible par tous les
clients**. La bibliothèque documents n'est pas un espace privé de la coach. C'est un piège
de confidentialité si Manon y dépose quoi que ce soit de nominatif.

### Limite pratique

Le bilan de fin de suivi de Manon resterait ce qu'il est aujourd'hui : un PDF fabriqué
ailleurs (Word, Canva, le bookmarklet d'Alex) puis **téléversé** dans TrueCoach. TrueCoach
sert de classeur, pas d'atelier. Aucun gain sur le temps de rédaction, seulement sur le
rangement — et encore, contre WhatsApp.

**Verdict : ça n'existe pas.** Seul le stockage existe.

---

## 5. Retour périodique du client hors messagerie — **ça existe, partiellement, et c'est récent**

### Ce qui est vu

Trois mécanismes, de force inégale.

**a) Métrique liée à une séance.** Le plus propre. La métrique est demandée au client
pendant la séance, elle alimente le graphique. Récurrence = celle de la séance.
**VU.** <https://help.truecoach.co/en/articles/2393419-linking-metrics-to-workouts>

**b) Habit Tracking.** On assigne des « habitudes » à un jour du calendrier, avec titre,
description et consignes ; le client les coche dans son app ; **elles comptent dans le taux
d'assiduité**. **VU.** <https://help.truecoach.co/en/articles/8399883-habit-tracking-feature>
**MUET** sur le type de donnée d'une habitude (oui/non ? nombre ?) et sur une récurrence
automatique — l'article décrit une assignation jour par jour.

**c) Advanced Habit & Nutrition Tracking — le morceau intéressant, et le plus récent.**
Article daté du **11 décembre 2024**. Il permet au client de saisir chaque jour, dans son
app, des données qui incluent explicitement :

> « calories, protein, weight, sleep, **energy**, hunger, **stress**, steps, **notes** »

avec des outils de visualisation intégrés pour « spot trends ».
Source : <https://help.truecoach.co/en/articles/9675861-advanced-habit-nutrition-tracking>

**« Energy », « stress » et « notes » sont du ressenti quotidien structuré, hors messagerie.**
C'est le plus proche de ce que Manon veut. Réserve immédiate : **c'est un jeu de champs
imposé, pas un questionnaire configurable**, et rien n'indique qu'on puisse y ajouter
« douleur » ou « RPE ».

**Réservé au plan Standard ou supérieur** : « Coaches on the Standard plan or higher can
access advanced habit and nutrition tracking features. » (même source)

### Douleur et RPE

**MUET.** Aucune page d'aide TrueCoach ne mentionne la douleur, une EVA, ou le RPE. La page
concurrente Hevy Coach affirme même que TrueCoach n'a pas de suivi RPE (**source hostile**,
non confirmée par TrueCoach). Source : <https://hevycoach.com/compare/truecoach/>

**DÉDUIT** : une échelle de douleur 0-10 ou un RPE se fabriquent en créant une **métrique
personnalisée** nommée ainsi et liée à la séance — le mécanisme du §2 le permet sans
difficulté. Ce n'est pas natif, mais ce n'est pas un obstacle.

### Limite pratique

Il n'existe **pas de check-in programmé et récurrent** au sens des concurrents (un
questionnaire hebdomadaire qui part tout seul et revient rempli). Ce que TrueCoach offre,
c'est : une séance récurrente qui contient des métriques, plus une saisie quotidienne
d'habitudes à champs fixes. La récurrence vient du calendrier des séances, pas d'un
planificateur de questionnaires.

**Verdict : ça existe partiellement**, et la partie la plus utile (Advanced Habit tracking,
déc. 2024) est assez récente pour qu'une utilisatrice de longue date ne l'ait jamais vue.

---

## Paliers tarifaires

Source unique : <https://truecoach.co/pricing> (consultée le 5 septembre 2026).

| Palier | Prix mensuel | Clients actifs | Ce que le palier ajoute |
|---|---|---|---|
| **Starter** | **26,34 $/mois** | jusqu'à **5** | Constructeur de séances, suivi client, MyFitnessPal, tableau de bord, bibliothèque de 3 000+ vidéos, messagerie, paiements automatisés |
| **Standard** | **57,99 $/mois** | jusqu'à **20** | + profils publics de coach, **wearables** (Apple, Garmin, WHOOP), **app à sa marque**, **Advanced Habit & Nutrition Tracking**, automatisations Zapier |
| **Pro** | **136,99 $/mois** | jusqu'à **50** | Mêmes fonctions que Standard, plus de clients |

Au-delà de 50 clients : « special pricing », donc **sur demande**.
Annuel : 1 mois offert sur Starter, 2 mois offerts sur Standard et Pro.

**Il n'existe aucun palier entre 20 et 50 clients.** **VU.**

### À quel palier correspondent les 60 €/mois de Manon ?

**DÉDUIT, non vérifié.** TrueCoach n'affiche ses prix **qu'en dollars** — aucune grille en
euros n'est publiée. Le seul palier dont le prix approche 60 € est le **Standard à
57,99 $/mois**, qui, converti et majoré de la TVA européenne, atterrit dans cette zone.
Le Starter (26,34 $) est trop bas, le Pro (136,99 $) beaucoup trop haut.

Avec ~10 clients actifs simultanés, **le Standard à 20 clients est le bon dimensionnement** —
et Manon a de la marge avant d'être forcée au Pro, qui coûterait plus du double.

**Conséquence directe et importante** : si elle est bien au Standard, **elle paie déjà
l'Advanced Habit & Nutrition Tracking** (§5), qui est la brique la plus proche du « retour
périodique du client ». À vérifier en priorité.

### Une contradiction dans la documentation

La page tarifs range les « Business Automations powered by Zapier » dans ce qu'ajoute le
**Standard**. L'article d'aide dit l'inverse : « Zapier is available on the **Pro** and above
plans. » Sources : <https://truecoach.co/pricing> contre
<https://help.truecoach.co/en/articles/8688374-zapier-integration>.

Peu importe qui a raison : le contenu Zapier est de toute façon squelettique — 4 déclencheurs
(client ajouté à un groupe, nouveau client, séance créée, séance terminée) et **une seule
action** (ajouter un client). **Aucune action ne permet d'écrire une métrique, une note ou une
photo dans TrueCoach.** Une passerelle « formulaire externe → TrueCoach » n'est donc pas
faisable par Zapier.

---

## Fonctions récentes, possiblement inconnues de Manon

Les numéros d'article du centre d'aide sont croissants dans le temps ; les articles à
7 chiffres commençant par 8, 9 ou 10 sont les plus récents.

| Fonction | Article | Date connue | Pourquoi ça compte |
|---|---|---|---|
| **Advanced Habit & Nutrition Tracking** | `9675861` | **11 déc. 2024** | Saisie quotidienne d'énergie, stress, notes — le plus proche du besoin 5. Standard+ |
| Workflow Automations (e-mails Gmail) | `9945315` | **21 oct. 2024** | Automatise seulement l'e-mail d'accueil, pas les questionnaires |
| Habit Tracking | `8399883` | — | Antérieur à l'« Advanced » |
| Intégration Zapier | `8688374` | — | 4 déclencheurs, 1 action, inexploitable ici |
| Profil public de coach | `10827765` | — | Marketing, hors sujet |
| App mobile coach (gestion clients, notes vocales) | — | 2025-2026, **source tierce** | Rapporté par des revues, non confirmé par une page TrueCoach |
| **Photos de progression** | `6812443` | — | Article relativement ancien : la fonction n'est **pas** une nouveauté qu'elle aurait ratée |

**Le pari le plus probable** : Manon connaît les métriques et les photos (fonctions
anciennes), et **ne connaît pas** l'Advanced Habit & Nutrition Tracking de décembre 2024,
qu'elle paie peut-être déjà.

---

## Ce que dit l'API interne (rétro-ingénierie d'Alex)

Source : `C:\Users\alex2\projet\automisation true coach\FINDINGS.md`, relu intégralement.

Endpoints identifiés : `GET /proxy/api/workouts/{id}`, `GET /proxy/api/exercises`,
`GET /proxy/api/clients/{id}`. Ce dernier expose `goals`, `limitations`, `equipment`,
`completed_workouts_count`, `missed_sessions_count`, `compliance_rate_for_{7,30,90}_days`.

Deux remarques pour ce ticket :

1. **`goals`, `limitations` et `equipment` existent bien dans le modèle de données du
   client** — alors que l'article d'aide « Adding a New Client » ne les mentionne pas.
   La documentation est donc **incomplète** sur les champs du profil client. Ça renforce
   la prudence : l'absence d'un article ne prouve pas l'absence d'une fonction.
2. **Aucun endpoint métrique ni photo n'a été exploré.** Les métriques et les photos
   existent forcément dans l'API (l'app les affiche), mais leur forme est inconnue. C'est
   la question qui déciderait de la faisabilité d'une passerelle. Elle reste ouverte.

Note d'usage, tirée du même document : l'authentification exige l'en-tête `Authorization:
Bearer` **et** un en-tête `Role: Trainer` — sans ce dernier, l'API répond `404` et non `401`.
Un futur explorateur d'endpoints se ferait piéger.

---

## Verdict : quelle fraction des cinq besoins est déjà payée ?

**Environ deux besoins sur cinq, soit 40 %** — et le compte est déséquilibré : ce qui est
couvert est très bien couvert, ce qui ne l'est pas ne l'est pas du tout.

| # | Besoin | Verdict | Poids réel |
|---|---|---|---|
| 1 | Questionnaire d'admission | **Ça existe mal** | Contournement par le constructeur de séances, texte libre non typé |
| 2 | Métriques personnalisées + historique | **Ça existe** | Complet : métriques libres, jeux réutilisables, graphiques, cibles, saisie client |
| 3 | Photos et comparaison entre deux dates | **Ça existe mal** | Photos rattachées au client et non à un test ; « then/now » documenté côté client mobile seulement |
| 4 | Document de bilan structuré | **Ça n'existe pas** | Dépôt de fichiers uniquement, aucun éditeur |
| 5 | Retour périodique hors messagerie | **Ça existe partiellement** | Advanced Habit tracking (Standard+, déc. 2024) : énergie, stress, notes — champs imposés |

**Ce que ça change pour la carte.** Le scénario « mieux utiliser TrueCoach », absent de nos
hypothèses, est **réel mais partiel**. Il couvre honnêtement le besoin 2 — le suivi
longitudinal chiffré, qui est le cœur des tests de mobilité — pour un abonnement déjà payé
et **zéro jour de développement**. Il ne couvre ni le bilan (4), ni le questionnaire (1) de
façon acceptable, et surtout **il ne couvre pas la comparaison photo (3), qui est le seul
besoin que le marché entier ne couvre pas** (ticket `01`).

**Conclusion pour la note de décision** : TrueCoach ne rend pas le sur-mesure inutile, mais
il en **rétrécit le périmètre**. Si les métriques TrueCoach font le travail des mesures
chiffrées, l'app sur-mesure n'a plus à les refaire — elle se concentre sur le triptyque
questionnaire / photos comparées / bilan. C'est un argument pour un outil **plus petit**,
donc moins cher, que ce que la pré-spec envisage. C'est aussi, honnêtement, un argument
pour une **journée de reprise en main de TrueCoach** comme scénario zéro, à chiffrer face
aux autres.

---

## À vérifier dans le compte réel — la documentation ne suffit pas

Par ordre décroissant d'impact sur la décision.

**Bloquants — ces réponses peuvent changer la recommandation**

1. **La coach voit-elle les photos de progression dans son interface web, et comment ?**
   Onglet dédié sur le profil client ? Vignettes ? Aucune page d'aide ne le documente.
2. **La vue « then / now » existe-t-elle côté coach, et permet-elle de CHOISIR deux dates ?**
   Ou est-elle figée sur premier lot / dernier lot ? C'est la question qui décide si l'angle
   mort du marché est réel pour Manon.
3. **Peut-on créer une métrique en degrés (°) ?** Ouvrir le formulaire de création d'une
   métrique et **photographier la liste déroulante des unités**. Si le degré manque, tester
   la métrique sans unité, et noter l'e-mail au support comme option.
4. **Manon est-elle au plan Standard ?** Vérifier dans Account Settings → Billing le nom du
   plan, le montant exact et la devise facturée. S'il s'agit du Standard, l'Advanced Habit &
   Nutrition Tracking est **déjà payé** et probablement inutilisé.

**Importants — ils cadrent le périmètre de l'app sur-mesure**

5. **À quoi ressemblent les notes client ?** Texte libre simple, ou éditeur avec mise en
   forme ? Y a-t-il plusieurs notes datées par client, ou une seule ? Peut-on y joindre
   plusieurs fichiers ?
6. **Peut-on téléverser une photo depuis l'interface COACH** — pour un test qu'elle
   photographie elle-même en visio — ou l'upload est-il réservé au client sur mobile ?
7. **Que contient exactement l'Advanced Habit & Nutrition Tracking ?** Les champs sont-ils
   configurables ? Peut-on ajouter « douleur 0-10 » à la liste, ou est-elle imposée ?
8. **Une habitude peut-elle porter un nombre**, ou seulement une coche ? Et peut-on la
   rendre récurrente sans la recopier chaque jour dans le calendrier ?
9. **Le champ `results` d'un exercice a-t-il une limite de longueur ?** Ça décide si le
   contournement questionnaire tient pour des réponses de trois lignes.
10. **Y a-t-il un export ?** Le ticket `10` a posé l'exigence « export d'un dossier en un
    clic ». `How to Export Clients` existe (article `5811721`) mais n'exporte probablement
    que la liste. **Les métriques et les photos sont-elles exportables ?** Si non, c'est un
    risque RGPD sur le statu quo, pas seulement un confort.

**Secondaires**

11. Un jeu de métriques peut-il être **retiré** d'un client, ou seulement ajouté ?
12. Les photos de progression sont-elles **supprimables** par la coach (droit à l'effacement) ?
13. Explorer `GET /proxy/api/metrics` et un endpoint photo probable, avec les en-têtes
    `Authorization: Bearer` + `Role: Trainer`, pour savoir si une passerelle serait faisable.

---

## Sources

Centre d'aide TrueCoach :
- Questionnaires : <https://help.truecoach.co/en/articles/3363240-waivers-questionnaires-assessments-and-check-in-s>
- Séquence d'admission : <https://help.truecoach.co/en/articles/3889427-creating-an-onboarding-sequence>
- Métriques : <https://help.truecoach.co/en/articles/3047471-metrics>
- Mise à jour des métriques : <https://help.truecoach.co/en/articles/3047875-updating-metrics>
- Cibles de métriques : <https://help.truecoach.co/en/articles/3047863-metrics-targets>
- Métriques liées aux séances : <https://help.truecoach.co/en/articles/2393419-linking-metrics-to-workouts>
- Métrique côté client : <https://help.truecoach.co/en/articles/2641737-client-updating-a-metric>
- Photos de progression (client) : <https://help.truecoach.co/en/articles/6812443-client-uploading-progress-pictures>
- Documents et fichiers : <https://help.truecoach.co/en/articles/3047381-sharing-documents-and-files>
- Habit Tracking : <https://help.truecoach.co/en/articles/8399883-habit-tracking-feature>
- Advanced Habit & Nutrition Tracking : <https://help.truecoach.co/en/articles/9675861-advanced-habit-nutrition-tracking>
- Notifications coach : <https://help.truecoach.co/en/articles/2403627-coach-s-notification-settings>
- Ajouter un client : <https://help.truecoach.co/en/articles/2403903-adding-a-new-client>
- Gérer ses clients : <https://help.truecoach.co/en/articles/2403919-managing-your-clients>
- Expérience client : <https://help.truecoach.co/en/articles/2403707-the-truecoach-client-experience>
- Zapier : <https://help.truecoach.co/en/articles/8688374-zapier-integration>
- Workflow Automations : <https://help.truecoach.co/en/articles/9945315-workflow-automations-onboarding-emails>
- Collections listées : `1396584` (Managing Clients), `1396576` (Library),
  `1396559` (Workout Calendar & Sidebar), `1412062` (Client Tutorials), `6281734` (The TrueCoach App)

Pages produit et blog TrueCoach :
- Tarifs : <https://truecoach.co/pricing>
- Fonctionnalités : <https://truecoach.co/features/>
- Suivi de progression : <https://truecoach.co/features/progress-tracking/>
- Tableau de bord : <https://truecoach.co/features/dashboard/>
- Page produit Metrics : <https://truecoach.co/what-is-truecoach/metrics>
- Blog Metrics : <https://truecoach.co/blog/how-to-track-client-progress-online-with-truecoach-metrics/>

Source tierce, explicitement hostile (concurrent), utilisée seulement en corroboration :
- <https://hevycoach.com/compare/truecoach/>

Source interne :
- `C:\Users\alex2\projet\automisation true coach\FINDINGS.md`
