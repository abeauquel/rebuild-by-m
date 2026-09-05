# 04 — Ce que TrueCoach sait déjà faire, et qu'elle n'utilise pas

Type: task
Status: open
Blocked by: —

## Question

Manon paie **60 €/mois** de TrueCoach et va continuer. Avant de chiffrer quoi que ce soit, il
faut savoir combien du besoin est **déjà payé**. Le panorama suggère que ses *metric sets* et ses
graphiques longitudinaux sont bons et sans doute sous-exploités.

Dans le compte réel, établir ce que TrueCoach permet aujourd'hui pour :

1. Un **questionnaire d'admission** envoyé au client et rempli par lui.
2. Des **métriques personnalisées** — mesures de mobilité en degrés, charges, scores de test — et
   leur **historique dans le temps**.
3. Des **photos** attachées à un client ou à une mesure, et leur comparaison entre deux dates.
4. Un **document de bilan** structuré, éditable par elle.
5. Un **retour périodique du client** — douleur, RPE, sensations — hors messagerie.

Pour chacun : ça existe / ça existe mal / ça n'existe pas, et pourquoi elle ne s'en sert pas.

Alex a déjà rétro-conçu l'API interne (`C:\Users\alex2\projet\automisation true coach`,
voir son `FINDINGS.md`) : `GET /proxy/api/clients/{id}` expose objectifs, limitations et
assiduité. Vérifier au passage si des endpoints portent des métriques ou des photos — ça
déciderait de la faisabilité d'une passerelle plus tard.

**Pourquoi ce ticket compte** : si TrueCoach couvre déjà la moitié du noyau pour un abonnement
déjà payé, le scénario le moins cher de tous devient « mieux utiliser TrueCoach », et il n'est
aujourd'hui dans aucune de nos hypothèses.

## Ce que dit la documentation publique

Note complète : [`../research/04-truecoach-capacites.md`](../research/04-truecoach-capacites.md)

**Verdict : ~2 besoins sur 5 couverts, et le compte est très déséquilibré.**

| Besoin | État | Détail |
|---|---|---|
| 1 · Questionnaire d'admission | **ça existe mal** | **Aucun constructeur de formulaires.** L'article d'aide officiel conseille de détourner le constructeur de séances : chaque question devient un « exercice », la réponse est du texte libre dans le champ `results`. Un seul type de champ. Les décharges se gèrent en PDF téléchargé puis renvoyé. |
| 2 · Métriques chiffrées | **ça existe, et bien** | « 100 % customizable », *metric sets* réutilisables assignables en masse — les exemples de l'éditeur citent explicitement les *movement screens*. Graphique historisé, saisie possible par le client sur web et mobile, cibles fixes ou calculées. **Seule inconnue : les unités.** La liste n'est publiée nulle part et l'aide se termine par « Need another measurement unit? Email us », ce qui trahit une liste fermée. **Le degré d'amplitude n'est cité nulle part.** |
| 3 · Photos | **ça existe mal — et c'est le point qui décide** | Un seul article dans tout le centre d'aide, et il décrit l'**app cliente**. Les photos vivent sous `Account → Progress Pictures`, attachées **au client, pas à une mesure**. **Un seul lot par jour**, poses face / profil / dos — c'est de la photo de composition corporelle, pas de la capture de mouvement. Une vue « then / now » existe mais n'est documentée que côté client, et sa formulation décrit *premier lot vs dernier lot*, pas un choix libre de deux dates. **Zéro documentation de la vue coach.** |
| 4 · Document de bilan | **ça n'existe pas** | Dépôt de fichiers seulement, aucun éditeur. Piège : la bibliothèque Documents est partagée avec **tous** les clients. |
| 5 · Retour périodique | **partiellement** | L'*Advanced Habit & Nutrition Tracking* (11 déc. 2024, plan Standard+) fait saisir chaque jour énergie, stress et notes — mais les champs sont imposés. Douleur et RPE : documentation muette, à fabriquer en métrique. |

**Tarifs** — Starter 26,34 $/5 clients, Standard 57,99 $/20, Pro 136,99 $/50, en **USD uniquement**,
et rien entre 20 et 50 clients. Les 60 €/mois pointent vers le **Standard** (déduit, non vérifié) :
si c'est le cas, Manon **paie déjà** l'Advanced Habit Tracking sans l'utiliser.

**Passerelles** — la page tarifs place Zapier au Standard, l'aide dit Pro ; sans importance, car
**Zapier n'expose qu'une seule action (« ajouter un client »)**. Aucune passerelle
formulaire → TrueCoach n'est donc possible par ce biais.

**Réserve méthodologique** : le `FINDINGS.md` d'Alex montre que `goals`, `limitations` et
`equipment` existent dans l'API alors que l'aide ne les mentionne pas. **L'absence d'article ne
prouve pas l'absence de fonction.** Aucun endpoint de métrique ou de photo n'a été exploré.

## Ce qui reste à vérifier dans le compte réel

Ces quatre points sont bloquants, la documentation ne suffit pas :

1. **Où et comment la coach voit les photos** — la vue praticien n'est documentée nulle part.
2. **Si « then / now » côté coach permet de choisir deux dates**, ou seulement première contre
   dernière.
3. **Si le degré (°) figure dans la liste d'unités** des métriques. Sans lui, pas de mesure de
   mobilité.
4. **Le plan exactement facturé**, pour savoir ce qui est déjà payé.
