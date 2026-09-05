# 06 — À quoi ressemble la comparaison à 8 semaines

Type: prototype
Status: open
Blocked by: 02

## Question

C'est **le seul besoin que le marché ne couvre pas** — d'après le panorama, presque aucun outil
ne compare des photos et des mesures de mobilité entre deux dates, et aucun no-code n'en est
capable. Toute la justification du sur-mesure tient sur ce point. Il faut donc arrêter d'en
parler et le montrer.

Faire un prototype jetable, en HTML/CSS/JS vanilla dans l'esprit du site (`css/cinema.css`),
alimenté par des données inventées mais crédibles — un athlète, une épaule douloureuse, deux
séries de tests à huit semaines d'écart.

Ce qu'il doit permettre de trancher :

1. **Photos côte à côte, ou superposées ?** Deux images d'un overhead squat prises à huit
   semaines d'écart ne sont jamais cadrées pareil. Est-ce qu'on assume ça, ou est-ce que la
   prise de vue doit être guidée ?
2. **Les mesures chiffrées** — un tableau à deux colonnes avec le delta, ou une courbe sur toute
   la durée du suivi ? La courbe suppose plus de deux points de mesure, donc un rythme régulier.
3. **Le modèle de données que ça implique.** Un « test » est-il un formulaire figé (les mêmes dix
   mesures pour tout le monde) ou une liste libre ? Manon fait de la kiné du sport : elle ne teste
   pas la même chose pour une épaule et pour une hanche. C'est la question de conception centrale,
   et le prototype est là pour la rendre concrète.
4. **Qui voit quoi.** Cette vue est-elle un écran de travail pour Manon, ou un rapport qu'elle
   envoie au client pour lui montrer sa progression ? Ce n'est pas le même objet.

Le prototype est jetable, il n'a pas à être beau ni juste — il a à provoquer une réaction de
Manon. À montrer avec elle en visio.

Sortie : le prototype, lié depuis l'`## Answer`, et les décisions de modélisation qu'il a fait
émerger.
