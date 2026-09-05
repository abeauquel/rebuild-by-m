# 08 — Chiffrer le scénario sur-mesure

Type: grilling
Status: open
Blocked by: 05, 06

## Question

Poser le périmètre technique du sur-mesure et le chiffrer sur les quatre compteurs de la carte.

Les entrées sont connues à ce stade : le noyau est admission + bilan + tests (le suivi 15 jours
est chiffré à part), une face ou deux est tranché par `05`, le modèle de données des tests est
sorti du prototype `06`, et la posture d'hébergement est arrêtée par `03`.

À établir :

1. **La pile.** Alex vise du TypeScript déployé sur Netlify, pour aller vite et pas cher. Mais
   la posture RGPD peut interdire que des données de santé transitent par des fonctions
   hébergées hors UE — auquel cas Netlify ne sert plus qu'à servir des fichiers statiques, et la
   base et les uploads vivent ailleurs, en UE. Trancher la pile réelle, avec son coût mensuel.
2. **Le stockage des photos.** C'est le poste que personne n'anticipe : dix clients × deux séries
   de tests × dix photos, ça reste petit, mais ça exige un stockage privé, des URLs signées, des
   sauvegardes et une politique de rétention. Le chiffrer séparément.
3. **Les jours-homme**, découpés par lot, avec le delta « deuxième face » isolé et le lot
   « suivi 15 jours » isolé, pour que Manon voie le prix de chaque envie.
4. **L'exploitation à 2 ans**, honnêtement — Alex a accepté que cet axe soit chiffré *contre* le
   sur-mesure. Renouvellement de certificats, migrations, sauvegardes vérifiées, le message à
   22 h quand une photo a disparu. Le fait que Manon possède le dépôt et puisse rappeler une IA
   règle la maintenance du **code**, pas l'exploitation du **service**.
5. **La transmission.** Le code appartient à Manon : qu'est-ce qu'il faut livrer pour qu'un autre
   développeur, ou une IA, reprenne sans Alex ? Un README, un schéma, des tests ? Ce coût-là fait
   partie du chiffrage, pas des bonnes intentions.
