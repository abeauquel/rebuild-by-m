# Carte — Une app pour aider Manon

## Destination

Une **note de décision chiffrée**, adressée à Manon, qui lui permet de trancher entre
**acheter un outil existant** et **faire développer une app sur-mesure** pour centraliser
son suivi client — admission, bilan visio, tests de mobilité et leur comparaison dans le
temps. La note présente 2 à 4 scénarios, chacun chiffré sur quatre compteurs, et se termine
par une recommandation argumentée.

La carte s'arrête à la décision. La spec de l'app, si sur-mesure il y a, sera une autre carte.

### Les quatre compteurs de coût

| # | Compteur | Forme |
|---|---|---|
| 1 | Récurrent mensuel payé par Manon (abonnements, hébergement) | chiffré, € / mois |
| 2 | Temps de développement d'Alex | chiffré, jours-homme |
| 3 | Exploitation et maintenance à 2 ans | qualitatif, mais explicite |
| 4 | Temps de Manon — spec en amont, saisie en aval | estimé, avec la baseline actuelle |

Le compteur 4 est le nerf de l'affaire : l'app est censée lui faire **gagner** du temps, mais
elle n'existe pas encore, donc pour l'instant elle lui en **coûte**. Sans baseline du temps
passé aujourd'hui, la note ne peut rien prouver.

## Notes

**Domaine.** Manon est masseur-kinésithérapeute D.E., exerçant sous la marque `rebuild.by.m`
en micro-entreprise, **hors nomenclature** — ce qu'elle vend est un accompagnement de coaching
sport-santé et de prévention, à distance, pas un acte de kinésithérapie remboursé. Ce statut
décide de tout : il disqualifie les DPI kiné français, il rend la qualification « données de
santé » ambiguë, et il interdit tout vocabulaire de soin.

Référentiel de marque complet : `C:\Users\alex2\Documents\rebuild by m\configuration\` —
`activite-et-offre.md` (offres, tarifs, parcours client), `cadre-legal.md` (ce qu'on ne promet
jamais), `voix-et-vocabulaire.md`.

**Chiffres qui cadrent l'économie.** ~10 clients actifs simultanés. Suivi RÉHAB à 150 €/mois,
Bilan de la Douleur à 60 €. Ordre de grandeur du CA mensuel : ~1 500 €. TrueCoach coûte
aujourd'hui **60 €/mois**. Tout scénario doit être lu contre ces chiffres : un SaaS à 40 €/mois
représente ~2,7 % du CA.

**Le seul manque du marché.** D'après le panorama, la comparaison photo/vidéo de mobilité à
8 semaines n'est faite par presque personne, et par aucun no-code. Si le sur-mesure se justifie,
c'est par là — pas par les formulaires, que tout le monde sait faire.

**Skills à convoquer.** `/grilling` et `/domain-modeling` par défaut sur tout ticket de décision.
`/research` pour les tickets de recherche. `/prototype` pour le ticket de vue comparative.

**Préférences de l'effort.**
- Ne jamais inventer un prix. Un prix non public s'écrit « sur demande ».
- Distinguer systématiquement ce qui a été **vu** de ce qui est **déduit**.
- Le code final appartient à **Manon** — c'est une décision prise, pas une option.
- La note doit défendre honnêtement le scénario « acheter ». Si elle ne le fait pas, ce n'est
  pas une décision, c'est un plaidoyer.

## Decisions so far

<!-- une ligne par ticket résolu -->

- [03 — L'hébergement certifié HDS s'impose-t-il à son activité ?](issues/03-hds-sapplique-t-il.md) —
  Le droit n'est pas tranché, mais l'incertitude est asymétrique : **on traite le HDS comme
  requis**. Ça élimine Netlify, Vercel et Supabase EU pour tout scénario sur-mesure, et laisse
  Clever Cloud, Scalingo, Scaleway et OVHcloud. Base légale : consentement explicite (art. 9.2.a),
  pas le 9.2.h. Le statu quo (WhatsApp + disque dur) est le moins conforme des trois scénarios.
  Un socle RGPD de 1 à 2 jours s'impute à Manon **dans tous les cas**, statu quo compris.
  *Corrigé le 5 septembre : l'argument tiré des CGV du site tombe — le site n'est pas en service
  et ce ne sont pas les vraies conditions (ticket [`11`](issues/11-lire-le-vrai-contrat.md)). La
  conclusion tient sur les deux autres appuis, et la description de la prestation par Alex —
  « prépa physique, mais avec son bagage de kiné pour soigner des douleurs » — renforce le risque
  au lieu de le dissoudre.*
- [01 — Ce que valent vraiment les quatre finalistes SaaS](issues/01-conformite-et-couverture-des-finalistes.md) —
  Trois éliminés : **Rehab Guru** (anglais strict confirmé par l'App Store, et DPA en 404),
  **Physitrack** (pas de champ numérique libre, pas de photo patient), **Andrew** (excellent
  cadre juridique, mais ni tests chiffrés, ni photos, ni comparaison). **Hexfit** seul en lice,
  sous réserves : il compare bien deux dates et exporte en libre-service, mais **range les photos
  à côté des mesures**, et son dossier juridique se dégrade à la vérification (politique
  québécoise, HDS annoncé sur un domaine dont les mentions légales sont en 404, aucun DPA public).
  **Aucun des quatre ne sait faire « photo attachée à une mesure » ET « comparaison entre deux
  dates »** — la thèse de l'angle mort du marché tient, documentation en main.

- [10 — Combien coûte vraiment un hébergement HDS](issues/10-combien-coute-vraiment-un-hebergement-hds.md) —
  Les prix HDS **sont publics**, contrairement à ce que supposait le ticket. **Scalingo HDS
  ≈ 49 €/mois** contre 234 € chez Clever Cloud (200 € fixes + coefficient 1,4) : être en règle
  coûte ~25 €/mois de plus, mais le choix du fournisseur pèse cinq fois plus. Scaleway et
  OVHcloud éliminés (plan de support ≥ 250 €/mois). Deux pièges : **Scalingo n'a pas de stockage
  objet** (arbitrage à ~2 500 €/an, à trancher dans `08`) et **le HDS n'y est pas rétrofittable**.
  Le risque réel est **faible et ailleurs** : dans 17 sanctions de libéraux sur 20, le déclencheur
  est un patient qui réclame son dossier sans réponse — d'où une exigence de conception,
  **l'export d'un dossier en un clic**. L'affaire du 6 nov. 2020 citée dans `03` est retirée :
  mal employée, et remplacée par SAN-2020-014/015.
  **Chiffrage corrigé le 5 septembre**, après contestation d'Alex : la pile non agréée est
  **~31 €** (Netlify Personal 9 $ + Supabase Pro 25 $) et non 45 $ — grille Netlify périmée, et
  **un seul siège nécessaire**, celui d'Alex. Le **plancher du marché**, jamais chiffré
  auparavant, est un **VPS OVH à 4,57 € TTC** avec Coolify — mais il coûte ~30 h/an
  d'administration, ne peut pas être agréé sans un support à 250 €/mois, et **placerait Alex dans
  le champ pénal de l'art. L1115-1** en le rendant hébergeur. Les **trois marches** : 4 € → 31 €
  achète la suppression du travail système ; 31 € → 49 € achète le HDS et rien d'autre (~215 €/an) ;
  au-delà, c'est de l'emballage. **Le « fournisseur unique » est reporté** : chez Netlify, les
  fichiers n'ont aucune sauvegarde publiée, aucune URL publique et pas de requêtes `Range`.
  Ajouter **~10 €/an de nom de domaine** aux chemins C et D.

- **TrueCoach — capacités et cadre juridique** (recherches
  [`04`](research/04-truecoach-capacites.md) et [`13`](research/13-truecoach-cadre-juridique-et-api.md),
  documentation publique ; le ticket [`04`](issues/04-audit-du-truecoach-existant.md) reste ouvert
  sur 4 vérifications en compte réel) — **~2 besoins sur 5 couverts.** Les métriques
  personnalisées sont bonnes et historisées (unité « degré » non confirmée) ; les photos sont
  attachées **au client, pas à une mesure**, un lot par jour, poses face/profil/dos — de la
  composition corporelle, pas de la capture de mouvement. **Aucun constructeur de formulaires**,
  aucun éditeur de bilan. Zapier n'expose qu'une action d'écriture, sur plan Pro.
  Et surtout, côté contrat : éditeur **Truecoach, Inc. / Xplor Technologies** (Delaware, droit de
  New York), hébergement **AWS Oregon**, **aucun DPA art. 28**, **absent de la liste Data Privacy
  Framework**, « not HIPAA compliant » de leur propre aveu, licence **perpétuelle et irrévocable**
  sur le contenu téléversé *y compris à des fins de marketing*, et un export limité à **15 champs
  de fiche client** — ni métriques, ni photos, ni notes, ni messages, donc un art. 15/20
  impraticable. **B.4.d interdit de développer une application tierce interagissant avec le
  service sans accord écrit** : le bookmarklet d'Alex est concerné.
  **Parké par Alex le 5 septembre** — c'est un outil personnel d'appoint, sans conséquence à cette
  échelle, et ce n'est pas le sujet du moment. La clause ne redeviendrait un sujet que si on
  voulait faire de cet accès une passerelle dans l'app ; la sortie propre serait alors de demander
  l'accord écrit à `support@truecoach.co`.

## Artefacts

- [`dossier-athlete.html`](dossier-athlete.html) — la **pré-spec montrée à Manon** : son process
  relu, les six briques de l'outil, la maquette de la vue comparative, le verdict sur les
  logiciels existants, le point juridique, les trois chemins chiffrés, et les huit questions du
  ticket `02` auxquelles elle répond dans la page.
  Publié : <https://claude.ai/code/artifact/a8bd1605-d97b-4353-8395-b71f21d52e11>
- [`research/00-panorama-marche.md`](research/00-panorama-marche.md) — le panorama initial du marché.
- [`research/01-finalistes-verifies.md`](research/01-finalistes-verifies.md) — la vérification des quatre finalistes.
- [`research/03-cadre-juridique.md`](research/03-cadre-juridique.md) — HDS, base légale, hébergeurs.

## Not yet specified

- **Le format et le canal de la note finale.** PDF façon `documents-imprimables.md` ? Page web ?
  Message ? Dépend de ce qu'on aura à montrer — un tableau comparatif ne se lit pas comme un
  argumentaire.
- **Qui héberge et qui paie, concrètement.** Le code appartient à Manon, mais le compte
  d'hébergement, le nom de domaine, les sauvegardes et les secrets ? Ne devient net que si le
  scénario sur-mesure l'emporte.
- **La migration des dossiers existants.** ~50 clients depuis 2023, aujourd'hui en PDF sur un
  disque dur. Reprise, archivage, ou rien ? Se pose différemment selon le scénario retenu.
- **Le sort de WhatsApp.** C'est aujourd'hui le canal des photos de tests — donc des données de
  santé chez Meta, sans contrat de sous-traitance. Aucun scénario ne le remplace vraiment. À
  regarder une fois la posture juridique établie.
- **L'interopérabilité avec `build_by_alex`.** Alex veut à terme relier un suivi des deux côtés.
  Ce que ça exige de l'app de Manon (un identifiant partagé ? une API ?) ne se spécifie pas
  avant de savoir ce qu'elle est.
- **Le cas où Manon dit non aux deux.** Le statu quo amélioré — meilleurs PDF, meilleur rangement,
  sans app — est un scénario qu'on n'a pas encore regardé.

## Out of scope

- **Programmation d'exercices, bibliothèque vidéo, suivi de séance** — TrueCoach reste, **mais
  pour les exercices et les vidéos uniquement, sans aucune donnée de santé**. Requalifié le
  5 septembre : ce n'est plus seulement un choix de périmètre, c'est une **contrainte de
  conception**. Les CGU de TrueCoach (clause C.4.j) interdisent explicitement tout contenu
  comportant « diagnostic, conseil ou traitement médical », sous peine de suppression
  discrétionnaire et de résiliation immédiate sans restitution — voir
  [`research/13-truecoach-cadre-juridique-et-api.md`](research/13-truecoach-cadre-juridique-et-api.md).
  Conséquence directe : les *metric sets* et les photos *then and now*, ce que TrueCoach fait de
  mieux, ne peuvent pas porter les tests de mobilité. **L'outil à construire ou à acheter doit
  les reprendre.** *(Reste à confirmer avec Manon — ticket `02`.)*
- **Facturation et encaissement** — Tiime fait déjà le travail, les virements fonctionnent. Le
  vrai sujet derrière n'est pas « facturer dans l'app » mais « prendre Stripe », et ça se décide
  sans app. Possible plus tard, pas en v1.
- **Héberger l'app dans `build_by_alex`** — « modifier Build by Alex pour Manon revient à
  spécifier une app générale pour une personne ». Build by Alex est centré programmation, n'est
  pas prêt, et n'a ni bilan ni questionnaire. Reste un point d'interop pour plus tard, pas un
  scénario à chiffrer.
- **Bilinguisme FR/EN en v1** — français seulement. L'anglais est un multiplicateur de coût sur
  chaque écran et chaque document ; il pourra être chiffré comme option.
- **Les scénarios no-code** (Airtable, Softr, Fillout, Baserow) — deux raisons cumulées : monter
  les pages et câbler les formulaires est du clic dans une UI, que l'assistant ne peut pas
  reprendre, donc ça déplace le temps d'Alex plutôt que de l'économiser ; et aucun no-code ne sait
  faire la comparaison photo à 8 semaines, qui est le seul besoin que le marché ne couvre pas.
- **Le scénario hybride** — SaaS pour l'admission et le bilan + micro-outil sur-mesure pour les
  tests photo. Écarté par Alex : « autant tout faire car le reste est petit, et ça fait pro aussi
  pour le client ». Un seul outil, une seule expérience.
- **Les DPI kiné français** (Vega, Kobus, Kinepratik, Kinemax…) — bâtis autour de Sesam-Vitale,
  de la FSE et de la NGAP, sans portail patient, sans anglais et sans API. Le statut hors
  nomenclature de Manon les rend structurellement inadaptés.
