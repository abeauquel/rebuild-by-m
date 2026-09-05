# 05 — Une face ou deux, et ce que coûte la deuxième

Type: grilling
Status: open
Blocked by: 02

## Question

C'est la décision qui pèse le plus lourd sur le chiffrage, et elle n'a pas encore été prise.

**Une face** — l'outil est pour Manon seule. Elle saisit tout : l'admission qu'elle a reçue par
mail, le bilan, les tests, les retours WhatsApp. Pas d'authentification client, pas de gestion de
mots de passe, pas d'onboarding, pas de support. Le client ne voit jamais l'app.

**Deux faces** — les clients ont un compte. Ils remplissent l'admission eux-mêmes (ce qu'Alex a
posé comme point de départ : « il faut que ça parte du questionnaire client »), et saisissent
leur douleur et leur RPE régulièrement. C'est ce que Manon décrit, et c'est ce qui l'a séduite
chez Andrew App.

Ce que la deuxième face traîne derrière elle, et qu'il faut chiffrer sans complaisance :
authentification et récupération de mot de passe · invitation et onboarding de dix personnes ·
un deuxième jeu d'écrans, responsive mobile · les relances quand personne ne remplit ·
le support quand quelqu'un n'y arrive pas · un périmètre RGPD nettement plus large, puisque
c'est le client qui dépose ses propres données de santé.

À trancher :

1. **Ce que Manon veut** vs **ce que ses athlètes feront réellement.** Dix crossfitteurs qui
   remplissent un questionnaire de douleur tous les quinze jours, c'est une hypothèse, pas un
   fait. Y a-t-il un moyen de la tester avant de construire ?
2. **Le delta chiffré** — combien de jours-homme et combien d'euros récurrents sépare une face
   de deux ? La note doit montrer ce prix à Manon, pour qu'elle choisisse en connaissance.
3. **Le chemin intermédiaire** : un lien public sans compte (formulaire d'admission accessible
   par URL unique, expirant) donne 80 % de la valeur « ça part du client » sans authentification.
   Est-ce que ça suffit pour la v1 ?

Cette question est une entrée du chiffrage du scénario sur-mesure (`08`), et un critère de
comparaison des SaaS (tous n'ont pas de portail client).
