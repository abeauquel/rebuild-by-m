# 14 — La rampe de coût : base, photos et vidéos, du démarrage à l'an 3

> **Avertissement.** Recherche documentaire. Tous les prix sont **HT**, relevés le **5 septembre 2026**,
> et portent leur URL. **[VU]** = lu sur la source. **[DÉDUIT]** = calcul ou inférence de ma part.
> Aucun prix n'est inventé ; ce qui n'est pas public est écrit « non publié ».
>
> Cette note **complète** [`12-couts-hebergement-et-risque-reel.md`](12-couts-hebergement-et-risque-reel.md),
> qui pose les prix de base. Elle ne les refait pas ; elle ajoute les **prix au Go**, les **quotas
> inclus**, les **seuils de dépassement** et l'**egress**, et elle les applique à trois paliers de volume.

---

## Le résultat, en une phrase

**Le constat d'Alex — « Netlify démarre gratuit puis monte quand on ajoute base, photos et
vidéos » — est vrai sur la première moitié et faux sur la seconde.** Le saut de prix a bien lieu,
mais il a lieu **au mois 1**, pas à l'an 3, et il n'est pas causé par le volume : il est causé par
le fait qu'aucun plan gratuit de cette pile n'est utilisable en production. Une fois passé sur les
plans payants, **la facture est plate du mois 1 à l'an 3** — de 45 $ à 45 $ chez Netlify+Supabase,
de 48,80 € à 57,37 € chez Scalingo, de 233,59 € à 236,20 € chez Clever Cloud. À l'échelle de
Manon, la rampe de coût liée aux médias **n'existe pas**.

Ce qui coûte, ce n'est ni le stockage ni la bande passante : c'est le **droit d'entrée** (le plan
minimum utilisable, et pour le HDS l'abonnement ou le plan de support obligatoire).

---

## 1. Le modèle de volume

Unités : **Go = 10⁹ octets**, comme facturent tous les fournisseurs cités (l'API Clever Cloud
utilise explicitement `data_quantity_for_price: 1 000 000 000`). Photo = 3 Mo, vidéo = 40 Mo.

### Palier 1 — Démarrage (fin du mois 3)

| Poste | Calcul | Volume |
|---|---|---|
| Photos | 10 athlètes × 1 session × 10 photos × 3 Mo | 100 photos → **0,30 Go** |
| Vidéos | 10 athlètes × 2 vidéos × 40 Mo | 20 vidéos → **0,80 Go** |
| Médias | | **1,10 Go** |
| Base (métadonnées, mesures, comptes, notes) | < 100 Mo, énoncé du brief | **0,10 Go** |
| **Total** | | **1,20 Go** |

### Palier 2 — Croisière (fin de l'an 1)

| Poste | Calcul | Volume |
|---|---|---|
| Photos | 15 athlètes × 2 sessions × 10 photos × 3 Mo | 300 photos → **0,90 Go** |
| Vidéos | 30 vidéos × 40 Mo | 30 vidéos → **1,20 Go** |
| Médias | | **2,10 Go** |
| Base | | **0,20 Go** |
| **Total** | | **2,30 Go** |

### Palier 3 — Charge (fin de l'an 3)

250 vidéos à 2 par session ⇒ **125 sessions**. Le brief dit « plusieurs milliers de photos » :
125 sessions × 10 photos ne donne que 1 250, donc le protocole s'est étoffé — je retiens
**20 photos par session = 2 500 photos**, et je donne la fourchette.

| Poste | Calcul | Volume |
|---|---|---|
| Photos | 2 500 × 3 Mo *(fourchette : 1 250 → 3,75 Go · 4 000 → 12,0 Go)* | **7,50 Go** |
| Vidéos | 250 × 40 Mo | **10,00 Go** |
| Médias | | **17,50 Go** *(fourchette 13,75 – 22,0 Go)* |
| Base | historique de 50 dossiers, métadonnées seules | **0,50 Go** |
| **Total** | | **18,00 Go** *(fourchette 14 – 23 Go)* |

### Le modèle d'egress — hypothèses explicites [DÉDUIT]

Aucun fournisseur ne publie de « trafic typique » ; ce modèle est le mien, et il est volontairement
**pessimiste** (aucun cache navigateur compté côté athlète — la praticienne change d'appareil, et
la vue comparative recharge).

- La praticienne regarde **3 fois** chaque nouvelle vidéo le mois de la session (relecture,
  annotation, mise en regard), puis **1 fois** à chaque session ultérieure du même athlète.
- Chaque athlète actif consulte son dossier **2 fois par mois** et charge alors sa dernière
  session complète (10 photos + 2 vidéos ≈ 110 Mo), plus un aller-retour sur la précédente.

| Palier | Détail | Egress/mois |
|---|---|---|
| **1** (régime de fin de palier, 10 athlètes en ligne) | praticienne ~1,0 Go + 10 athlètes × 2 × 110 Mo = 2,2 Go | **≈ 3 Go** *(1,5 – 4)* |
| **2** | praticienne ~0,8 Go + 15 × 2 × 145 Mo = 4,4 Go | **≈ 5 Go** *(4 – 8)* |
| **3** | praticienne ~4 Go + 20 actifs × 2 × 350 Mo = 14 Go + 30 dormants ≈ 1,8 Go | **≈ 20 Go** *(15 – 40)* |

**Repère utile pour toute la suite : 20 Go/mois = ~500 lectures de vidéo de 40 Mo.**
La borne haute de 40 Go correspond au cas où la page de dossier charge tout l'historique d'un
coup — c'est un choix de conception, pas une fatalité (levier 6, § 6).

---

## 2. A) Netlify + Supabase

### 2.1 Ce qui est INCLUS, plan par plan

**Netlify** [VU — <https://www.netlify.com/pricing/> et
<https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/>]

| | Free | Personal | Pro | Enterprise |
|---|---|---|---|---|
| Prix | **0 $** | 9 $ | **20 $** (3 000 cr) · 33 $ (5 000) · 63 $ (10 000) · 95 $ (15 000) · 126 $ (20 000) | sur devis |
| Crédits/mois | **300, plafond dur** | 1 000 | 3 000 → 20 000 | illimité |
| Report des crédits | non | non | **oui à partir de 5 000 cr** | — |
| Recharge | **aucune** | 500 cr / 5 $ | 1 500 cr / 10 $ | — |
| **Membres** | **1** + contributeurs Git illimités | **1** + contributeurs Git | **illimités** | sur devis |

> ⚠️ Les paliers de crédits Pro au-dessus de 3 000 sont désormais **officiels et publiés dans la
> documentation** (URL ci-dessus). La note 12 les classait « non officiels, cités par des tiers » —
> **cette réserve tombe**.

**Barème des crédits** [VU —
<https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/>]

| Ressource | Crédits |
|---|---|
| Bande passante web **et bande passante base** | **20 cr / Go** |
| Requêtes web | 2 cr / 10 000 |
| Compute (fonctions, preview servers, agent runners, **base**) | 10 cr / Go-heure |
| Déploiement de production | 15 cr |
| Formulaires Netlify | gratuit |
| Inférence IA | 180 cr / 1 $ |

**Valeur d'un crédit** [DÉDUIT] : 20 $ ÷ 3 000 = **0,006 667 $/crédit**, confirmé par la recharge
Pro (1 500 cr pour 10 $ = même taux). Donc **1 Go de bande passante Netlify = 0,133 $**.
Au taux de recharge Personal (500 cr pour 5 $ = 0,01 $/cr), c'est **0,20 $/Go**.

**Netlify Database** [VU —
<https://docs.netlify.com/build/data-and-storage/netlify-database/billing-and-usage/>, doc mise à
jour le **14 août 2026**]

| Limite | Free | Personal | Pro | Enterprise |
|---|---|---|---|---|
| Taille max d'une base | **5 Go** | 100 Go | 100 Go | illimité |
| Données écrites / période | 5 Go | 100 Go | 100 Go | illimité |
| Bande passante base (sortie) / période | **5 Go** | 100 Go | 100 Go | illimité |
| Unités de calcul | min 1 / max 1, **48 unités/mois** | 1–4, sans limite | 1–16, sans limite | 4–32 |
| Mise en veille sur inactivité | **5 min imposées** | 5 min | 5 min | « always on » possible |
| Bases par compte | 3 | 5 | 50 | 500 |

> 🚨 **Le tarif du stockage de Netlify Database n'est toujours pas publié, et la date annoncée est
> dépassée.** Verbatim [VU] : « However, database storage space (i.e., the size of data stored) is
> **free until July 1, 2026** » et « Database storage **will be billed no earlier than July 1, 2026**,
> with rates announced in advance ». La doc porte « Last updated: **Aug 14, 2026** » — soit six
> semaines **après** l'échéance — et ne donne toujours aucun taux. **C'est un trou de budget
> non chiffrable**, et c'est un tarif à surveiller : il peut apparaître à tout moment.
> Compliance de la même page [VU] : **PCI-DSS non**, **HIPAA non par défaut** (sur demande auprès
> de Netlify). Aucune mention de HDS ni de Neon.

**Netlify Blobs** [VU — <https://docs.netlify.com/build/data-and-storage/netlify-blobs/>]

Les seules limites publiées sont **structurelles**, pas volumétriques :
- « An individual object's total size cannot exceed **5 GB**. »
- métadonnées ≤ 2 Ko · clé ≤ 600 o · nom de store ≤ 64 o
- **Aucune limite de volume total publiée. Aucun tarif au Go publié.** Le service consomme le pot
  de crédits commun, mais aucune ligne « Blobs » n'apparaît au barème des crédits (barème complet
  ci-dessus, relevé sur deux pages de doc distinctes). → **prix : non publié.**
- Et surtout, verbatim [VU] : « **Netlify Blobs is not currently supported as part of our
  HIPAA-compliant hosting offering.** »
  → Netlify Blobs est **à écarter** pour des photos de mobilité : ni HDS (indisponible chez
  Netlify à tout prix, cf. note 12), ni même HIPAA, et un tarif inconnu qu'on ne peut pas budgéter.

**Supabase** [VU — <https://supabase.com/pricing> et
<https://supabase.com/docs/guides/platform/manage-your-usage/egress>]

| | Free | Pro | Team |
|---|---|---|---|
| Prix | 0 $ | **25 $** (inclut 10 $ de crédit de calcul) | 599 $ |
| Taille de base | **500 Mo** | **8 Go**, puis **0,125 $/Go** | 8 Go, puis 0,125 $/Go |
| Stockage fichiers | **1 Go** | **100 Go**, puis **0,0213 $/Go** | idem |
| Egress **non caché** | 5 Go | **250 Go**, puis **0,09 $/Go** | idem |
| Egress **caché (Smart CDN)** | 5 Go | **250 Go**, puis **0,03 $/Go** | idem |
| MAU | 50 000 | 100 000, puis 0,00325 $/MAU | idem |
| Membres d'organisation | illimités | illimités | illimités |
| Sauvegardes | **aucune** | 7 jours | 14 jours |
| Mise en pause | **« Free projects are paused after 1 week of inactivity »** | jamais | jamais |

> 🔑 **Le détail qui compte le plus, et que la note 12 n'avait pas :** Supabase facture l'egress
> **caché** et l'egress **non caché** séparément, avec **des quotas indépendants et des prix
> indépendants** [VU, verbatim : « Cached and uncached egress have independent quotas and
> independent pricing »]. Les fichiers servis par le **Smart CDN** de Supabase Storage tombent dans
> le caché, à **0,03 $/Go** — trois fois moins cher que le non caché, et **4,4 fois moins cher que
> la bande passante Netlify**.

### 2.2 Les plans gratuits sont-ils utilisables ? Non, et pas pour une raison de volume

| Plan gratuit | Contrainte disqualifiante | Verdict |
|---|---|---|
| **Supabase Free** | **1 Go de fichiers** — dépassé dès le **mois 1** (le palier 1 en demande 1,10 Go). Et : **projet mis en pause après 1 semaine d'inactivité**, **aucune sauvegarde**, 2 projets max *(note 12)*. | **disqualifié** |
| **Netlify Free** | **1 seul membre** (Manon + Alex = 2). Et surtout **plafond dur de 300 crédits sans recharge** : quand il est atteint, le service s'arrête jusqu'au cycle suivant. Un site professionnel qui s'éteint parce qu'un athlète a regardé trop de vidéos. | **disqualifié** |
| **Netlify Database Free** | 5 Go max, **48 unités de calcul/mois**, veille forcée à 5 min. | **disqualifié** |
| Clever Cloud PostgreSQL DEV | 256 Mo, **`Backups = No`** *(note 12)* | disqualifié |
| Scalingo | **il n'y a pas de plan gratuit** — 30 jours d'essai. | sans objet |

**Le « gratuit » de Netlify n'est donc pas un point de départ, c'est une impasse.** La bascule
gratuit → payant a lieu **avant le mois 1**, pour des raisons de gouvernance (membres, sauvegardes,
pause) et pas de volume. C'est la correction principale à apporter à l'intuition d'Alex.

### 2.3 La facture, aux trois paliers

**Netlify Pro (20 $) + Supabase Pro (25 $) = 45 $/mois de socle.**

| | Stockage fichiers (100 Go inclus) | Base (8 Go inclus) | Egress caché (250 Go inclus) | **Dépassement** | **Total** |
|---|---|---|---|---|---|
| Palier 1 | 1,10 Go — **1,1 %** | 0,10 Go — 1,3 % | 3 Go — **1,2 %** | **0,00 $** | **45 $** |
| Palier 2 | 2,10 Go — 2,1 % | 0,20 Go | 5 Go — 2,0 % | **0,00 $** | **45 $** |
| Palier 3 | 17,50 Go — **17,5 %** | 0,50 Go — 6,3 % | 20 Go — **8,0 %** | **0,00 $** | **45 $** |

[DÉDUIT — assemblage de prix et de quotas VU]. En euros : de l'ordre de **40 à 45 €** selon le
change, que je ne fige pas.

**La facture ne bouge pas d'un centime entre le mois 1 et l'an 3.** Au palier 3 on consomme 17,5 %
du stockage inclus et 8 % de l'egress inclus.

**Où la bascule a réellement lieu** [DÉDUIT] :

| Poste | Seuil | Traduction en volume métier | Quand |
|---|---|---|---|
| Stockage fichiers | **100 Go** puis 0,0213 $/Go | ~2 200 vidéos de plus | ≈ an 12 au rythme prévu |
| Egress caché | **250 Go/mois** puis 0,03 $/Go | ~6 250 lectures de vidéo/mois | **12,5 ×** le palier 3 |
| Egress non caché | 250 Go/mois puis 0,09 $/Go | idem | idem |
| Base | 8 Go puis 0,125 $/Go | jamais, tant que les blobs ne sont pas en base | — |
| Crédits Netlify Pro | ~130 Go de bande passante *(3 000 cr − ~390 cr de déploiements et requêtes)* | ~3 250 lectures/mois | **6,5 ×** le palier 3 |

Et pour situer le coût du dépassement quand il arrive : passer de 250 à 500 Go d'egress caché
coûte **7,50 $/mois**. Le premier « vrai » palier de douleur, à 1 To d'egress, coûte 22,50 $ —
soit la moitié du socle. **Il n'y a pas de falaise dans cette grille.**

> ⚠️ **Contrainte non tarifaire qui domine tout ça** : cette pile reste **inéligible au HDS à tout
> prix** (note 12, § C et D). Le chiffrage ci-dessus est donc un **repère de comparaison**, pas un
> scénario retenable si la position HDS du ticket 03 tient.

---

## 3. B) Scalingo

### 3.1 Le chiffre qui manquait à la note 12

La note 12 écrivait : « Le dépassement du quota de stockage est facturé en sus, **au Go-heure — le
taux exact n'est pas public** [non trouvé]. » **Il est public.** Il figure dans la description de
chacun des 16 plans PostgreSQL, servie par l'API publique de Scalingo — la même que celle qui
alimente la page tarifaire :

> **« Price for over plan disk space: 0.0007 €/GB-h »** [VU —
> <https://api.osc-fr1.scalingo.com/v1/addon_providers/postgresql/plans>]

⇒ × 720 h = **0,504 €/Go/mois** · × 730 h = 0,511 €/Go/mois. Je retiens **≈ 0,50 €/Go/mois**.

> ⚠️ **Contradiction interne à signaler.** La description au niveau du *fournisseur* (et non du
> plan), dans la même API, dit : « Base pricing rule: 0.02€/hour/GB of RAM. Every plan includes 5
> times the size of RAM as disk space. **Price for over plan disk space: 2€/GB.** » Ce texte est
> **périmé sur deux points vérifiables** — les plans incluent aujourd'hui **20 ×** la RAM en disque,
> pas 5 ×, et le prix à la RAM ne colle plus. Je retiens donc la valeur portée par les plans
> (0,0007 €/Go-h), plus récente et cohérente sur les 16 plans. **Mais si c'était 2 €/Go/mois, le
> palier 3 coûterait 34 €/mois de dépassement au lieu de 8,57 €** — c'est le seul point de cette
> note qui mérite un e-mail de confirmation à Scalingo.

### 3.2 Ce qui est INCLUS

**Conteneurs** [VU — <https://api.osc-fr1.scalingo.com/v1/features/container_sizes>, champ
`thirtydays_price` en centimes] : S 256 Mo **7,20 €** · M 512 Mo **14,40 €** · L 1 Go **28,80 €** ·
XL 2 Go **57,60 €** · 2XL 4 Go **115,20 €** · **3XL 8 Go 230,40 €** *(taille récemment ajoutée,
signalée « new » sur la page tarifaire)*. Région SecNumCloud : +20 %.

**PostgreSQL Business (les seuls plans éligibles HDS, `hds_available: true`)** [VU, même API] :

| Plan | Prix/mois | RAM/nœud | **Disque inclus/nœud** | Connexions | Sauvegardes |
|---|---|---|---|---|---|
| **Business 512M** | **20,00 €** | 512 Mo | **10 Go** | 30 | 7 j + 8 sem. + 12 mois, PITR 7 j |
| Business 1G | 40,00 € | 1 Go | 20 Go | 60 | idem |
| Business 2G | 80,00 € | 2 Go | 40 Go | 120 | idem |
| Business 4G | 160,00 € | 4 Go | 80 Go | 240 | idem |
| Business 8G | 320,00 € | 8 Go | 160 Go | 480 | idem |

Règle visible : **disque inclus = 20 × la RAM**, prix qui **double** à chaque cran. Les plans
Starter (7,20 € / 14,40 € / 28,80 €…) portent `hds_available: false` — **confirmation par l'API**
de ce que la doc HDS dit en toutes lettres, et donc du plancher Business.

**Membres : illimités, sur tous les plans** [VU, note 12 — « collaborateurs illimités »].

### 3.3 Le point décisif : **l'egress est gratuit**

> **« At Scalingo, there are no egress fees. This means that all egress traffic is free of
> charge. »** [VU, verbatim — <https://doc.scalingo.com/platform/networking/public/egress>]
>
> « Network bandwidth is limited to **20MB/s per container** (or 160Mbit/s). This limit comes with
> a burst of 1.6GB/s per container (12.8Gbit/s). »

**C'est la seule des trois piles où servir de la vidéo ne coûte rien, à aucun palier.** La limite
est un plafond de **débit**, pas de volume : à 20 Mo/s, une vidéo de 40 Mo part en 2 secondes, et
un conteneur soutient une dizaine de lectures simultanées. À deux utilisateurs professionnels et
une vingtaine d'athlètes, sans objet.

### 3.4 B.1 — Médias EN BASE (pas de tiers)

Socle HDS imposé (note 12) : **2 conteneurs web minimum** + **plan Business**.
→ 2 × M (14,40 €) = 28,80 € + Business 512M = 20,00 € ⇒ **48,80 €/mois**, 10 Go de base inclus.

⚠️ Un `bytea` ne pèse pas seulement son poids : les sauvegardes (7 j + 8 semaines + 12 mois) et le
WAL de la PITR gonflent le disque. Je compte **× 1,5** sur le volume net [DÉDUIT — règle de
prudence, pas un chiffre publié], et je donne aussi le calcul sans marge.

| Palier | Volume net | Disque (× 1,5) | Quota Business 512M | Dépassement | Coût dépassement | **Total** |
|---|---|---|---|---|---|---|
| **1** | 1,20 Go | 1,8 Go | 10 Go | — | 0,00 € | **48,80 €** |
| **2** | 2,30 Go | 3,5 Go | 10 Go | — | 0,00 € | **48,80 €** |
| **3** | 18,00 Go | 27,0 Go | 10 Go | **17,0 Go** | 17,0 × 0,504 = **8,57 €** | **57,37 €** |
| *3 sans marge de sauvegarde* | 18,00 Go | 18,0 Go | 10 Go | 8,0 Go | 4,03 € | *52,83 €* |

**Faut-il monter de plan au palier 3 ? Non — et c'est contre-intuitif.**

| Option au palier 3 (27 Go de disque) | Base | Dépassement | Total base | Total avec 2 × M |
|---|---|---|---|---|
| **Business 512M + 17 Go hors quota** | 20,00 € | 8,57 € | **28,57 €** | **57,37 €** |
| Business 1G (20 Go) + 7 Go hors quota | 40,00 € | 3,53 € | 43,53 € | 72,33 € |
| Business 2G (40 Go), zéro dépassement | 80,00 € | 0,00 € | 80,00 € | 108,80 € |

Le point d'équilibre [DÉDUIT] : l'écart de plan est de 20 € pour +10 Go de quota, donc monter de
plan n'est rentable qu'au-delà de **20 ÷ 0,504 ≈ 40 Go de dépassement**. **Payer le dépassement au
Go est le bon choix économique jusqu'à ~50 Go de base.** Le dépassement n'est pas un piège chez
Scalingo — c'est la sortie la moins chère.

La vraie limite n'est donc pas le prix, elle est **technique** : 512 Mo de RAM pour une base qui
sert des blobs de 40 Mo, c'est étroit. Le passage à Business 1G (40 €) se décidera pour la RAM,
pas pour le disque.

**Rampe Scalingo, médias en base : 48,80 € → 48,80 € → 57,37 €, soit +18 % pour ×15 de volume.**

### 3.5 B.2 — Médias chez un tiers (stockage objet certifié HDS)

Scalingo n'a pas de stockage objet [VU, note 12]. Le tiers stockera des photos de mobilité, donc de
la donnée de santé, donc **il doit lui aussi être certifié HDS** — et chacun impose un plancher
(note 12, § D) :

| Tiers | Prix du Go stocké | Prix du Go sortant | **Plancher HDS** |
|---|---|---|---|
| Scaleway Object Storage | 0,00803 €/Go/mois (One Zone) | 75 Go gratuits, puis 0,01 €/Go | **250 €/mois** (support Business obligatoire) |
| OVHcloud Object Storage | ~0,0119 €/Go/mois | variable | **250 €/mois** (10 % de la facture, seuil min. 250 € HT) |
| Clever Cloud Cellar | 0,0205 €/Go/mois | 0,09 €/Go | **200 €/mois** + coefficient 1,4 |

| Palier | Conso réelle (Scaleway) | Facturé |
|---|---|---|
| 1 — 1,10 Go stockés, 3 Go sortants | 0,009 € + 0 € (sous les 75 Go inclus) = **0,01 €** | **250 €** |
| 2 — 2,10 Go, 5 Go | **0,02 €** | **250 €** |
| 3 — 17,50 Go, 20 Go | **0,14 €** | **250 €** |

**Total Scalingo + objet tiers HDS : 48,80 + 250 = ≈ 299 €/mois, identique aux trois paliers.**
Le volume n'y change **strictement rien** : on paie 250 € pour le **droit** de stocker 140 milli-euros
de fichiers. Cela confirme et précise le « ≈ 300 € » de la note 12.

**L'écart entre B.1 et B.2 est donc de ~250 €/mois à tous les paliers, soit ~3 000 €/an, pour une
différence de propreté d'ingénierie et non de volume.** À ce prix-là, mettre les médias en base
n'est plus « laid mais tenable » : c'est le choix par défaut, et c'est le passage à un stockage
objet qui doit se justifier.

---

## 4. C) Clever Cloud

### 4.1 Cellar — prix relevés sur l'API tarifaire [VU]

<https://api.clever-cloud.com/v4/billing/price-system?zone_id=par> (EUR, zone Paris), entrées
`cellar.storage` et `cellar.outbound` :

| Ligne | Tarif brut [VU] | Par mois [DÉDUIT ×720 h] |
|---|---|---|
| Stockage, 100 premiers Mo | 0 | **gratuit** |
| Stockage, jusqu'à 1 To | 2,844 444 × 10⁻⁵ €/Go/h | **0,0205 €/Go/mois** |
| Stockage, 1 → 25 To | 2,133 333 × 10⁻⁵ €/Go/h | 0,0154 €/Go/mois |
| Stockage, > 25 To | 1,422 222 × 10⁻⁵ €/Go/h | 0,0102 €/Go/mois |
| **Trafic sortant, jusqu'à 10 To** | **0,09 €/Go** | (pas de franchise) |
| Trafic sortant, au-delà | 0,07 €/Go | |

Inchangé depuis le relevé de la note 12 — **recoupé sur la même API à deux jours d'intervalle**.

### 4.2 La majoration HDS

Verbatim [VU — <https://www.clever.cloud/fr/sante-hds/>, accordéon « Tarifs et conditions »] :
« **un abonnement mensuel fixe de 200 €**, auquel s'ajoute un **coefficient multiplicateur de 1,4**
sur le tarif standard applicable aux ressources consommées (CPU, mémoire, **stockage**, DBaaS, etc.) ».

- Que le 1,4 s'applique au **stockage** Cellar : **[VU]**, le mot est dans la phrase.
- Qu'il s'applique au **trafic sortant** : **[DÉDUIT]** — le « etc. » n'exclut rien, et la page ne
  liste aucune exception. Je chiffre les deux ; l'écart est de toute façon de l'ordre de l'euro.
- La page recommande de contacter un Account Manager pour un devis précis ; le **périmètre du
  contrat** reste non public (note 12).

### 4.3 La facture, aux trois paliers

Socle (note 12, prix VU sur l'API) : instance **XS** 16,00 € + PostgreSQL **XXS Big Space** (3 Go)
7,70 € = **23,70 €**. La base ne porte que des métadonnées ; les médias vont dans Cellar.

| Palier | Stockage Cellar | Egress Cellar | Cellar standard | Socle + Cellar | **× 1,4** | **+ 200 € = TOTAL HDS** |
|---|---|---|---|---|---|---|
| **1** — 1,10 Go / 3 Go | 1,00 Go facturé × 0,0205 = 0,02 € | 3 × 0,09 = 0,27 € | **0,29 €** | 23,99 € | 33,59 € | **233,59 €** |
| **2** — 2,10 Go / 5 Go | 0,04 € | 0,45 € | **0,49 €** | 24,19 € | 33,87 € | **233,87 €** |
| **3** — 17,50 Go / 20 Go | 17,40 × 0,0205 = 0,36 € | 20 × 0,09 = 1,80 € | **2,16 €** | 25,86 € | 36,20 € | **236,20 €** |

*(Pour situer, sans HDS : 23,99 € → 24,19 € → 25,86 €.)*

**Rampe Clever Cloud : 233,59 € → 233,87 € → 236,20 €, soit +1,1 % pour ×15 de volume.**

Le seul poste qui bouge est l'egress à 0,09 €/Go (0,126 € avec le coefficient). **Il faudrait
1 590 Go de sortie par mois pour que l'egress Cellar égale à lui seul l'abonnement HDS de 200 €** —
soit ~40 000 lectures de vidéo par mois, ~80 × le palier 3. [DÉDUIT]

Chez Clever Cloud, **le prix n'est pas une rampe, c'est un mur d'entrée** — et une fois passé, il
est horizontal.

---

## 5. Le point le plus important : la bande passante

### 5.1 Le prix du Go sortant, toutes piles confondues

| Fournisseur | Prix du Go sortant | Franchise incluse | Source |
|---|---|---|---|
| **Scalingo** | **0 €** | tout, sans quota de volume | [doc egress](https://doc.scalingo.com/platform/networking/public/egress) |
| Scaleway Object Storage | 0,01 € | 75 Go/mois | note 12 |
| OVHcloud Object Storage | ~0,011 € | variable | note 12 |
| **Supabase — egress caché (Smart CDN)** | **0,03 $** | 250 Go/mois (Pro) | [manage-your-usage/egress](https://supabase.com/docs/guides/platform/manage-your-usage/egress) |
| Supabase — egress non caché | 0,09 $ | 250 Go/mois (Pro) | idem |
| Clever Cloud Cellar | 0,09 € *(0,126 € en HDS)* | aucune | [API price-system](https://api.clever-cloud.com/v4/billing/price-system?zone_id=par) |
| **Netlify (20 cr/Go)** | **0,133 $** au tarif Pro · **0,20 $** au tarif de recharge Personal | ~130 Go/mois avec 3 000 cr | [how-credits-work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/) |

**Netlify est le Go sortant le plus cher du lot — 4,4 × Supabase Smart CDN, et infiniment plus que
Scalingo.**

### 5.2 La conséquence de conception, immédiate

**Ne jamais faire transiter une vidéo par Netlify.** Les médias doivent être servis par une URL
signée du magasin lui-même (Supabase Storage via son Smart CDN, ou Cellar), pas par une fonction
Netlify qui proxifie le fichier. Cette erreur d'architecture, invisible au code review, multiplie
la facture d'egress par **4,4**.

Chiffré au palier 3 (20 Go/mois) :

| Chemin de service du fichier | Coût mensuel de l'egress |
|---|---|
| Fonction Netlify qui relaie le fichier | 400 cr = **2,67 $** |
| URL signée Supabase Storage (Smart CDN) | **0,60 $** — et de toute façon dans la franchise |
| Conteneur Scalingo | **0,00 €** |

À 250 Go/mois (le jour où ça décolle), le même arbitrage vaut **33 $ contre 7,50 $**.
Coût de mise en œuvre du bon chemin : **nul** — c'est le comportement par défaut du SDK Supabase.

### 5.3 Les seuils de bascule, exprimés en lectures de vidéo

| Pile | Egress/mois avant le 1er euro de dépassement | En lectures de 40 Mo | Le palier 3 en % du seuil |
|---|---|---|---|
| Supabase Free | 5 Go | ~125 | **400 %** — cassé |
| Netlify Free (médias via Netlify) | ~7 Go *(300 cr − 10 déploiements − requêtes)* | ~175 | **285 %** — cassé |
| Netlify Pro (médias via Netlify) | ~130 Go | ~3 250 | 15 % |
| Supabase Pro (caché) | 250 Go | ~6 250 | **8 %** |
| Clever Cloud Cellar | dès le 1er Go, mais à 0,09 €/Go | — | 1,80 €/mois |
| **Scalingo** | **jamais** | — | 0 € |

**Lecture :** avec les plans payants, l'egress vidéo est un non-sujet financier à cette échelle.
Avec les plans gratuits, il casse **entre le palier 1 et le palier 2**. C'est la seule forme sous
laquelle le constat d'Alex se vérifie — et elle disparaît dès qu'on paie 45 $.

---

## 6. À partir de quel volume le prix cesse-t-il d'être négligeable ?

### 6.1 La réponse honnête

**Jamais, dans l'horizon du projet.** Du palier 1 au palier 3 — ×15 en volume, ×6,7 en trafic — la
facture bouge de :

| Pile | Palier 1 → Palier 3 | Variation |
|---|---|---|
| Netlify Pro + Supabase Pro | 45 $ → 45 $ | **0 %** |
| Scalingo HDS, médias en base | 48,80 € → 57,37 € | **+18 %** |
| Scalingo HDS + objet tiers | ~299 € → ~299 € | **0 %** |
| Clever Cloud HDS | 233,59 € → 236,20 € | **+1,1 %** |

**Ce qui monte quand on ajoute base, photos et vidéos, ce n'est pas le prix au Go — c'est le
passage du plan gratuit au plan payant. Et il se produit avant même le palier 1**, pour des raisons
qui n'ont rien à voir avec le volume : un seul membre autorisé chez Netlify, une mise en pause
après une semaine chez Supabase, zéro sauvegarde partout dans le gratuit.

**Le « moment où ça coûte » est le mois 1, pas l'an 3.** Le saut est de 0 à ~45 $ (Netlify+Supabase)
ou de 0 à 48,80 € (Scalingo HDS). Ensuite, plat pendant trois ans.

### 6.2 Le seul chiffre qui monte vraiment avec le volume

Le **dépassement de quota disque Scalingo à 0,504 €/Go/mois**, et seulement si l'on met les médias
en base. Il est **25 fois** le prix du même Go chez Cellar (0,0205 €/Go/mois) — c'est le prix de la
commodité, et il finit par se voir :

| Volume net en base | Disque (×1,5) | Dépassement sur Business 512M | Surcoût/mois | Facture totale |
|---|---|---|---|---|
| 18 Go (palier 3) | 27 Go | 17 Go | 8,57 € | 57,37 € — *négligeable* |
| 35 Go (≈ an 5) | 52 Go | 42 Go | 21,17 € | 69,97 € — *sensible* |
| 50 Go (≈ an 6-7, ~1 100 vidéos) | 75 Go | 65 Go | 32,76 € | **81,56 €** — *+67 % sur le socle* |
| 100 Go | 150 Go | 140 Go | 70,56 € | 119,36 € — *à ce stade, monter de plan* |

**Réponse chiffrée : le prix cesse d'être négligeable vers 35 à 50 Go de médias en base, soit
l'an 5 à 7 au rythme du modèle.** Et à ce moment-là, la bonne réponse n'est pas de payer : c'est
d'appliquer un levier (§ 7), qui coûte moins cher qu'un plan supérieur.

### 6.3 Le tableau de bascule, par pile

| Pile | Volume où la facture augmente pour de bon |
|---|---|
| Netlify + Supabase Pro — stockage | **100 Go** de fichiers ≈ 2 200 vidéos de plus ≈ **an 12** |
| Netlify + Supabase Pro — egress | **250 Go/mois** ≈ 6 250 lectures/mois ≈ **12,5 × le palier 3** |
| Netlify Pro — bande passante | ~130 Go/mois si les médias passent par Netlify |
| Scalingo, médias en base | **~35-50 Go** en base ≈ **an 5-7** |
| Scalingo + objet tiers HDS | **jamais** — plancher de 250 €, insensible au volume |
| Clever Cloud HDS | **jamais à cette échelle** — l'egress égalerait les 200 € à ~1 590 Go/mois |

---

## 7. Les leviers de conception, chiffrés

Base de calcul : **palier 3** (17,50 Go de médias, 18,00 Go avec la base, 20 Go d'egress/mois).
La colonne Scalingo suppose les médias en base, Business 512M, marge de sauvegarde ×1,5.

### Levier 1 — Compresser les vidéos à l'envoi

40 Mo pour 45 s ≈ **7 Mbit/s** : c'est du flux brut de téléphone. Un ré-encodage **720p à
1,5 Mbit/s** donne ~8 Mo, soit **÷ 5**, sans perte visible pour comparer une amplitude articulaire.

| | Avant | Après |
|---|---|---|
| Vidéos | 10,00 Go | **2,00 Go** |
| Médias + base | 18,00 Go | **10,00 Go** (−44 %) |
| Egress/mois | 20 Go | **~6 Go** (−70 %) |
| **Scalingo** | 57,37 € | **51,32 €** → **−6,05 €/mois, −73 €/an** |
| **Clever Cloud (HDS)** | 236,20 € | **234,20 €** → −2,00 €/mois, −24 €/an |
| **Netlify + Supabase** | 45 $ | **45 $** → **0 €** (tout était déjà sous quota) |

> ⚠️ **Le piège de rentabilité.** Si la compression se fait **côté serveur**, ffmpeg ne tourne pas
> dans un conteneur M à 512 Mo : il faut au minimum 2 × L (28,80 € l'unité), soit **+28,80 €/mois** —
> **quatre fois plus cher que l'économie réalisée**. Le levier n'est rentable que **dans le
> navigateur** (`MediaRecorder`, ou ffmpeg.wasm), au moment de l'envoi. Coût : ~1 jour de dev d'Alex,
> une fois.
>
> ✅ **Et son vrai bénéfice n'est pas le prix : c'est le temps de chargement.** 8 Mo au lieu de
> 40 Mo, c'est une vidéo qui s'ouvre en 1 s au lieu de 5 sur une 4G ordinaire. C'est un levier
> d'expérience déguisé en levier de coût — et c'est **le seul levier à prendre par défaut**.

### Levier 2 — Ne garder que des images clés plutôt que la vidéo

3 images par mouvement (départ / amplitude max / retour), JPEG 1080p ≈ 300 Ko.
250 vidéos → 750 images = **0,22 Go** au lieu de 10 Go. **÷ 45.**

| | Après |
|---|---|
| Médias + base | **8,22 Go** (−54 %) · Egress **~4 Go** (−80 %) |
| **Scalingo** | **49,96 €** → **−7,41 €/mois, −89 €/an** |
| **Clever Cloud (HDS)** | −2,30 €/mois, −28 €/an |
| **Netlify + Supabase** | **0 €** |

> ❌ **C'est le levier le plus destructeur fonctionnellement.** La comparaison de mobilité à
> 8 semaines est **la** raison d'être de l'app (map.md : « le seul manque du marché »). Une image
> clé perd exactement ce qui se regarde dans une vidéo de mouvement — la compensation, l'hésitation,
> le moment où ça bloque. **À écarter comme mode par défaut.** À garder comme **mode d'archivage**,
> ce qui est précisément le levier 3.

### Levier 3 — Purger après X mois

Politique : la **vidéo** est conservée 12 mois puis remplacée par 3 images clés ; les **photos**
sont conservées intégralement. À l'an 3, ~165 des 250 vidéos ont plus de 12 mois.

| | Après |
|---|---|
| Vidéos | 85 récentes (3,40 Go) + 165 en images clés (0,15 Go) = **3,55 Go** |
| Médias + base | **11,55 Go** (−36 %) |
| **Scalingo** | **52,48 €** → **−4,89 €/mois, −59 €/an** |
| **Clever Cloud (HDS)** | ~−1,6 €/mois |
| **Netlify + Supabase** | **0 €** |

> ✅ **Ce levier-là se prend même s'il rapportait zéro.** Une durée de conservation limitée n'est
> pas une optimisation, c'est une **obligation** (RGPD art. 5.1.e, limitation de la conservation),
> et elle doit figurer au registre quel que soit son effet sur la facture. **C'est le meilleur
> rapport du lot : on le prend pour la conformité et on trouve 59 €/an au passage.**
> Coût : ~0,5 jour de dev (un job de purge) + la décision de la durée avec Manon.

### Levier 4 — Renvoyer vers un lien plutôt qu'héberger

| | Après |
|---|---|
| Médias + base | **8,00 Go** (photos seules) · Egress ~2 Go |
| **Scalingo** | **49,81 €** → **−7,56 €/mois, −91 €/an** |
| **Clever Cloud (HDS)** | −2,56 €/mois |
| **Netlify + Supabase** | **0 €** |

> ❌ **À écarter, et pas pour une raison de prix.** Le dossier cesse d'être complet (le lien casse,
> le client supprime sa photo), la comparaison à 8 semaines ne fonctionne plus, et surtout **la
> donnée de santé part chez un tiers sans contrat de sous-traitance** — c'est exactement le reproche
> fait au statu quo WhatsApp dans le ticket 03. Ce levier économise 91 €/an en aggravant le risque
> qu'on cherche à réduire.

### Levier 5 — **Le levier que personne n'a listé, et le seul vraiment rentable** : où l'on sert le fichier

Servir un média par une **URL signée du magasin** plutôt que par une fonction de la plateforme.

| Chemin | Coût de 20 Go/mois | Coût de 250 Go/mois |
|---|---|---|
| Fonction Netlify qui relaie | 2,67 $ | **33,25 $** |
| URL signée Supabase Storage (Smart CDN) | 0,60 $ | 7,50 $ |
| Conteneur Scalingo | 0,00 € | 0,00 € |

**Facteur 4,4 sur toute la durée de vie du produit, pour un coût de mise en œuvre nul.** C'est le
chemin par défaut du SDK — il suffit de ne pas se tromper. C'est **le levier au meilleur rapport
économie/effort de toute la liste**.

### Levier 6 — Ne pas charger l'historique entier

Le modèle d'egress suppose qu'un athlète charge sa **dernière session**. Si la page de dossier
charge tout l'historique (2,5 sessions à l'an 3), l'egress passe de 20 à **~40 Go/mois** — ×2 —
pour zéro valeur ajoutée. Vignettes + chargement de la vidéo à la demande : **−50 % d'egress**,
~0,5 jour de dev.

| | 40 Go/mois | 20 Go/mois | Économie |
|---|---|---|---|
| Scalingo | 0 € | 0 € | 0 € |
| Clever Cloud HDS | 5,04 € | 2,52 € | 2,52 €/mois |
| Netlify (si les médias y passent) | 5,33 $ | 2,67 $ | 2,67 $/mois |
| Supabase Pro | 0 $ (inclus) | 0 $ | 0 $ |

### Classement des leviers, par rapport valeur / dégât

| Rang | Levier | Économie/an (Scalingo) | Dégât fonctionnel | Verdict |
|---|---|---|---|---|
| **1** | **Servir par URL signée, pas par une fonction** | 0 € ici, **jusqu'à 300 $/an** si le trafic décolle | **aucun** | **à faire, coût nul** |
| **2** | **Purge à 12 mois → images clés** | **59 €** | faible, et bornée | **à faire — c'est une obligation RGPD** |
| **3** | **Compresser à l'envoi, dans le navigateur** | **73 €** | aucun ; **gain d'UX majeur** | **à faire — pour la vitesse** |
| 4 | Chargement paresseux de l'historique | 0 € ici | aucun | à faire, c'est de l'hygiène |
| 5 | Images clés seulement | 89 € | **détruit la raison d'être de l'app** | **non** |
| 6 | Renvoyer vers un lien externe | 91 € | **détruit le produit et aggrave le risque juridique** | **non** |

**Les deux leviers qui rapportent le plus sont ceux qu'il faut refuser.** Les trois qu'il faut
prendre rapportent ~130 €/an — et se justifient tous les trois pour d'autres raisons que l'argent
(conformité, vitesse, hygiène). **C'est l'aveu que le sujet « coût des médias » n'est pas un sujet
de coût.**

---

## 8. Synthèse — trois piles × trois paliers

| | **Palier 1** — 1,2 Go, 3 Go/mois | **Palier 2** — 2,3 Go, 5 Go/mois | **Palier 3** — 18 Go, 20 Go/mois | HDS |
|---|---|---|---|---|
| Netlify Free + Supabase Free | **impossible** *(1 Go de fichiers, pause à 1 sem., 1 membre)* | impossible | impossible | non |
| **Netlify Pro + Supabase Pro** | **45 $** *(~41 €)* | **45 $** | **45 $** | **non, à aucun prix** |
| Scalingo standard *(hors HDS, repère)* | ~22 € | ~22 € | ~26 € | non |
| **Scalingo HDS — médias en base** | **48,80 €** | **48,80 €** | **57,37 €** | **oui** |
| Scalingo HDS + objet tiers certifié | ~299 € | ~299 € | ~299 € | oui |
| **Clever Cloud HDS** *(Cellar inclus)* | **233,59 €** | **233,87 €** | **236,20 €** | **oui** |

**Ce que ce tableau change pour la note de décision :**

1. **L'argument « le sur-mesure va coûter de plus en plus cher à mesure que les vidéos
   s'accumulent » ne tient pas.** Il faut le retirer du dossier, ou l'écrire à l'envers : le coût
   est **fixe**, et il est **connu dès le premier mois**.
2. **Le classement de la note 12 est confirmé, et l'écart se creuse au palier 3** :
   Scalingo médias-en-base reste ~4 × moins cher que Clever Cloud, et l'ajout du volume ne rattrape
   rien (+8,57 € contre +2,61 €, sur des socles de 48,80 € et 233,59 €).
3. **L'option « Scalingo + stockage objet tiers » est définitivement la plus mauvaise** : elle coûte
   250 €/mois de plancher pour stocker 14 centimes de fichiers, à tous les paliers. Elle ne devient
   jamais rentable par le volume.
4. **Le vrai risque budgétaire de la pile Netlify n'est pas le volume, c'est l'opacité** : le prix
   du stockage de Netlify Database n'est **toujours pas publié** alors que la gratuité était annoncée
   comme s'arrêtant le 1er juillet 2026, et Netlify Blobs n'a **ni tarif public ni volume plafond
   publié**. Un budget qu'on ne peut pas écrire est un budget qu'on ne peut pas défendre.

---

## 9. Tarifs qui ont changé, ou qui bougent

| Élément | Ce qui a changé | Statut |
|---|---|---|
| **Netlify — paliers Pro > 3 000 crédits** | La note 12 les disait « cités par des tiers, non officiels ». **Ils sont dans la documentation Netlify** : 33 / 63 / 95 / 126 $. | **corrigé — VU** |
| **Netlify — report des crédits** | Nouveauté visible : le report des crédits inutilisés existe **à partir de 5 000 cr**, pas sur 3 000. | VU |
| **Netlify — tarification par crédits** | Tous les comptes créés après le **4 sept. 2025** y sont. Pro à 20 $ **membres illimités** (historiquement 19 $ **par membre**), changement daté d'avril 2026 par des tiers — **non vérifié sur une page Netlify**. | note 12, inchangé |
| 🚨 **Netlify Database — stockage** | « free until **July 1, 2026** », « billed **no earlier than July 1, 2026**, with rates announced in advance ». Doc mise à jour le **14 août 2026**, soit six semaines après l'échéance, **sans taux publié**. | **échéance dépassée, tarif inconnu — à resurveiller** |
| **Netlify Blobs** | Toujours en **Beta**. Aucune limite de volume ni tarif au Go publié. « **not currently supported as part of our HIPAA-compliant hosting offering** ». | **non chiffrable** |
| **Supabase — egress caché / non caché** | Deux compteurs **séparés**, quotas et prix indépendants : 250 Go à 0,03 $/Go (caché, Smart CDN) et 250 Go à 0,09 $/Go (non caché). La note 12 ne mentionnait qu'un seul egress à 0,09 $. | **précisé — VU** |
| **Supabase — Spend Cap** | Sur le plan Pro, il **bloque le service** au lieu de facturer le dépassement : projets mis en pause, base en lecture seule, API en 402. Levée au cycle suivant ou en le désactivant. À décider **explicitement**. | VU |
| 🚨 **Scalingo — dépassement de quota disque** | La note 12 le disait « non public ». **Il l'est** : `0.0007 €/GB-h` = **~0,50 €/Go/mois**, dans la description de chacun des 16 plans. **Mais** la description au niveau du fournisseur, dans la même API, dit encore « 2€/GB » et contient deux autres affirmations périmées (5 × la RAM en disque au lieu de 20 ×). | **corrigé — VU, avec une contradiction interne à confirmer par e-mail** |
| **Scalingo — egress** | « **no egress fees** […] all egress traffic is free of charge », débit plafonné à 20 Mo/s par conteneur. | VU, décisif |
| **Scalingo — conteneur 3XL** | Taille 8 Go (230,40 €) **récemment ajoutée**. Sans objet ici. | VU |
| **Scalingo — plans Business** | 20 / 40 / 80 / 160 / 320 €, disque inclus = 20 × la RAM. `hds_available: true` **uniquement** sur Business — l'API confirme le plancher HDS documenté. | VU |
| **Clever Cloud — Cellar et HDS** | Prix identiques au relevé de la note 12, recoupés sur l'API à deux jours d'intervalle. 200 € + coefficient 1,4 toujours en ligne. | VU, inchangé |

---

## 10. Ce qui reste non public

- **Le tarif du stockage de Netlify Database** après le 1er juillet 2026 — annoncé, jamais publié.
- **Le tarif et le volume plafond de Netlify Blobs** — aucune ligne au barème des crédits.
- **Le taux exact de dépassement disque Scalingo** — deux valeurs contradictoires dans leur propre
  API (0,0007 €/Go-h au niveau du plan, 2 €/Go au niveau du fournisseur). Un e-mail suffit.
- **Le périmètre du contrat HDS de Clever Cloud**, et si le coefficient 1,4 s'applique au trafic
  sortant aussi bien qu'au stockage.
- **Ce que le contrat HDS de Clever Cloud impose en haute disponibilité** — Scalingo impose
  2 conteneurs et un plan Business ; l'équivalent chez Clever Cloud n'est pas documenté publiquement,
  et pourrait faire monter le socle de 23,70 € au-delà de ce qui est calculé ici.

**Aucun de ces inconnus ne déplace une décision à cette échelle** — sauf le premier, qui est une
raison de plus de ne pas bâtir sur Netlify Database.

---

## Sources

**Netlify**
- <https://www.netlify.com/pricing/>
- <https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/>
- <https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/>
- <https://docs.netlify.com/build/data-and-storage/netlify-database/billing-and-usage/>
- <https://docs.netlify.com/build/data-and-storage/netlify-blobs/>

**Supabase**
- <https://supabase.com/pricing>
- <https://supabase.com/docs/guides/platform/manage-your-usage/egress>
- <https://supabase.com/docs/guides/platform/cost-control>

**Scalingo**
- <https://api.osc-fr1.scalingo.com/v1/addon_providers/postgresql/plans> *(prix, disque inclus, taux de dépassement, `hds_available`)*
- <https://api.osc-fr1.scalingo.com/v1/features/container_sizes> *(prix des conteneurs, `thirtydays_price`)*
- <https://doc.scalingo.com/platform/networking/public/egress> *(« no egress fees »)*
- <https://scalingo.com/pricing> · <https://doc.scalingo.com/platform/hds> · <https://doc.scalingo.com/platform/app/filesystem>

**Clever Cloud**
- <https://api.clever-cloud.com/v4/billing/price-system?zone_id=par> *(`cellar.storage`, `cellar.outbound`)*
- <https://www.clever.cloud/fr/sante-hds/> *(200 € + coefficient 1,4)*
- <https://www.clever.cloud/product/cellar-object-storage/>

**Tiers HDS (rappel note 12)**
- <https://www.scaleway.com/en/pricing/storage/> · <https://www.scaleway.com/fr/security-and-compliance/hds/> · <https://www.scaleway.com/en/support/>
- <https://www.ovhcloud.com/en/compliance/hds/> · <https://www.ovhcloud.com/fr/support-levels/business/>
