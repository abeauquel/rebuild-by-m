# 02 — Les questions à poser à Manon

Type: task
Status: open
Blocked by: —

## Question

Plusieurs décisions de cette carte attendent des faits que seule Manon détient. Ce ticket
produit **un seul message à lui envoyer** — pas cinq allers-retours — et se résout quand les
réponses sont revenues.

Ce qu'il faut lui demander :

1. **TrueCoach reste-t-il ?** L'app ne ferait ni programmation, ni bibliothèque vidéo, ni suivi
   de séance. Elle garderait deux outils ouverts, avec un peu de double saisie. Est-ce que ça
   lui va ? *(Sans un oui franc, tout le chiffrage est faux — c'est ce découpage qui garde le
   projet petit.)*
2. **Les clients ont-ils un compte ?** Deux mondes très différents : soit l'outil est pour elle
   seule et les clients continuent par WhatsApp ; soit les clients se connectent, remplissent
   l'admission eux-mêmes et saisissent leur douleur / RPE régulièrement. Le second est ce
   qu'elle décrit, et c'est aussi ce qui multiplie le coût. Qu'est-ce qu'elle veut vraiment, et
   qu'est-ce qu'elle croit que ses athlètes feront réellement ?
3. **Le temps qu'elle y passe aujourd'hui**, en ordre de grandeur, pas au chronomètre :
   par nouveau client — envoyer le PDF, relancer, dépouiller, saisir le bilan, monter les
   captures d'écran ; et par semaine — les retours des 15 jours, retrouver une info dans un
   vieux dossier. *(C'est la baseline du compteur 4. Sans elle, on ne peut prouver aucun gain.)*
4. **Son plafond budgétaire mensuel.** Elle paie déjà 60 € de TrueCoach. Qu'est-ce qui est
   « oui sans réfléchir », « oui si ça vaut le coup », « non » ?
5. **La comparaison à 8 semaines** — qu'est-ce qu'elle veut voir exactement ? Deux photos côte à
   côte ? Une courbe de mesures ? Un rapport à envoyer au client ? *(C'est le seul besoin que le
   marché ne couvre pas, donc c'est le pivot de toute la décision.)*
6. ~~**Ce qui l'a séduite chez Andrew App**~~ — question retirée de la pré-spec le 5 septembre : la recherche ayant établi qu'Andrew n'a ni tests chiffrés, ni photos, ni comparaison, la question n'orientait plus aucune décision.
7. **Combien de clients actifs** en ce moment, et combien elle vise dans un an.
8. **Est-elle prête à posséder le dépôt et l'hébergement** à son nom ? C'est ce qui la rend
   autonome, mais ça lui crée aussi des comptes à gérer.

Résolu quand les réponses sont revenues et consignées dans l'`## Answer`.

## Support

Les huit questions sont posées dans la pré-spec publiée pour Manon —
`dossier-athlete.html`, section 07, artefact
<https://claude.ai/code/artifact/a8bd1605-d97b-4353-8395-b71f21d52e11>.

Elle peut y répondre directement dans la page : les réponses sont enregistrées côté artefact
sous le document `reponses/manon`, et se relisent depuis une session Claude Code avec
`action: "read_db"` sur cet artefact. Ce ticket se résout quand ces réponses sont revenues et
recopiées dans un `## Answer` ici.
