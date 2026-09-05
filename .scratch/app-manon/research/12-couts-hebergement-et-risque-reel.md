# 12 — Coûts d'hébergement réels et risque réel pour une micro-entreprise

> **Avertissement.** Recherche documentaire faite par un non-juriste, à partir de sources citées.
> Ce n'est pas un avis juridique. Tous les prix sont **HT**, relevés le **5 septembre 2026**, et
> peuvent changer. Chaque chiffre porte son URL. La mention **[VU]** signale ce qui a été lu sur la
> source ; **[DÉDUIT]** signale un calcul ou une inférence de ma part.

---

## Le gabarit chiffré

Ce qu'on héberge, réellement :

| Élément | Dimension |
|---|---|
| Front + une API | 1 processus web, ~1 à 3 utilisateurs pro connectés simultanément |
| Utilisateurs finaux | ~10 clients actifs, ~50 dossiers historiques |
| PostgreSQL | quelques centaines de Mo |
| Stockage objet | quelques Go de photos et courtes vidéos, croissance lente |
| Déploiement | depuis un dépôt GitHub |
| Disponibilité | pas de HA, pas de pic, pas d'astreinte |

C'est le plus petit gabarit qu'un PaaS sait vendre. **Aucun de ces hébergeurs n'a de plan trop
petit pour ce besoin** — le sujet n'est pas la taille, c'est le HDS.

---

## Partie 1 — Les prix publics

### A) Clever Cloud

Les prix affichés sur la page tarifaire sont calculés par un estimateur JavaScript qui interroge
l'API tarifaire publique de Clever Cloud. J'ai lu **l'API directement**, c'est la même source :
`https://api.clever-cloud.com/v4/billing/price-system?zone_id=par` (devise EUR, zone Paris) et
`https://api.clever-cloud.com/v2/products/addonproviders`.

#### Instances applicatives — prix horaire × 720 h (mois de 30 jours)

| Flavor | RAM | vCPU | €/h [VU] | €/mois [DÉDUIT] |
|---|---|---|---|---|
| **pico** | 337 Mo | 1 | 0,00625 | **4,50 €** |
| **nano** | 582 Mo | 1 | 0,0083333 | **6,00 €** |
| **XS** | 1 152 Mo | 1 | 0,0222222 | **16,00 €** |
| S | 2 048 Mo | 2 | 0,0444444 | 32,00 € |
| M | 4 096 Mo | 4 | 0,1055556 | 76,00 € |

*Le ×720 est mon calcul, mais il tombe sur des nombres ronds (4,50 / 6 / 16 / 32 / 76), ce qui
confirme que la grille est bâtie sur une base 30 jours. Facturation réelle **à la seconde**.*

Sources : [API price-system](https://api.clever-cloud.com/v4/billing/price-system?zone_id=par) ·
[API instances](https://api.clever-cloud.com/v2/products/instances) ·
[page tarifs](https://www.clever.cloud/pricing/)

#### Add-on PostgreSQL — prix mensuels [VU, champ `price` de l'API]

| Plan | Prix/mois | RAM | vCPU | Taille max de base | Connexions | Sauvegardes |
|---|---|---|---|---|---|---|
| **DEV** | **0 €** | partagée | partagé | **256 Mo** | 5 | **non** — ni métriques, ni logs |
| **XXS Small Space** | **5,25 €** | 512 Mo | 1 | 1 Go | 45 | quotidiennes, 7 j de rétention |
| XXS Medium Space | 6,80 € | 512 Mo | 1 | 2 Go | 45 | idem |
| XXS Big Space | 7,70 € | 512 Mo | 1 | 3 Go | 45 | idem |
| XS Tiny Space | 15,00 € | 1 Go | 1 | 2 Go | 75 | idem |
| XS Small Space | 19,50 € | 1 Go | 1 | 5 Go | 75 | idem |

**Un plan gratuit existe** (DEV), mais il est **inutilisable en production** : base plafonnée à
256 Mo, ressources partagées, et surtout `Backups = No`. Le premier plan sérieux est **XXS Small
à 5,25 €/mois**, et il est déjà dédié, sauvegardé, avec métriques et logs — remarquablement bon
marché pour ce gabarit.

#### Cellar — stockage objet compatible S3

| Ligne | Prix [VU] |
|---|---|
| Stockage, 100 premiers Mo | **gratuit** |
| Stockage, jusqu'à 1 To | 2,8444 × 10⁻⁵ €/Go/h → **≈ 0,0205 €/Go/mois** [DÉDUIT ×720] |
| Stockage, 1 To → 25 To | 2,1333 × 10⁻⁵ €/Go/h → ≈ 0,0154 €/Go/mois |
| Trafic sortant, jusqu'à 10 To | **0,09 €/Go** |
| Trafic sortant, au-delà | 0,07 €/Go |

Ordre de grandeur pour 5 Go stockés et 5 Go de sortie par mois : **0,10 € + 0,45 € ≈ 0,55 €/mois**.
Le stockage des photos est économiquement négligeable. *(Le prix de 0,02 €/Go/mois est aussi
celui que reprennent les annuaires tiers, ce qui recoupe le calcul.)*

Source : [API price-system, entrées `cellar.storage` et `cellar.outbound`](https://api.clever-cloud.com/v4/billing/price-system?zone_id=par) ·
[page produit Cellar](https://www.clever.cloud/product/cellar-object-storage/)

#### Déploiement depuis GitHub — **oui, standard et gratuit** [VU]

Clever Cloud documente une intégration GitHub native : on lie le compte, on choisit un dépôt
public ou privé, et « any push is deployed ». Alternative : `git push` direct sur l'URL
`git+ssh://git@push.<zone>.clever-cloud.com/<app_id>.git`. Aussi : Clever Tools CLI, API REST,
GitHub Actions.
Source : [Deploy from GitHub — doc Clever Cloud](https://www.clever.cloud/developers/doc/ci-cd/github/)

#### Total mensuel réaliste — Clever Cloud **sans HDS**

| Poste | Choix | € |
|---|---|---|
| Instance applicative | XS (1,15 Go) | 16,00 |
| PostgreSQL | XXS Big Space (3 Go de base) | 7,70 |
| Cellar | 5 Go stockés + 5 Go sortants | 0,55 |
| **Total** | | **≈ 24 €/mois HT** |

Fourchette honnête : **12 €** (nano + XXS Small, si l'API tient dans 582 Mo) à **40 €** (S + XS Small).
[DÉDUIT — assemblage de prix VU]

---

### B) Scalingo

Prix relevés sur la grille publique, **HT, base 30 jours, région Standard** (la région SecNumCloud
coûte 20 % de plus, ligne par ligne). [VU]

#### Conteneurs applicatifs

| Taille | Mémoire | Priorité CPU | Standard | SecNumCloud |
|---|---|---|---|---|
| **S** | 256 Mo | low | **7,20 €** | 8,64 € |
| **M** | 512 Mo | standard | **14,40 €** | 17,28 € |
| L | 1 Go | standard | 28,80 € | 34,56 € |
| XL | 2 Go | high | 57,60 € | 69,12 € |

Toujours inclus : domaines personnalisés, certificats Let's Encrypt automatisés, métriques,
**collaborateurs illimités**, archives de logs illimitées, conteneurs toujours actifs.

#### PostgreSQL managé

| Plan | Taille | RAM | Stockage inclus | Connexions | Standard | SecNumCloud |
|---|---|---|---|---|---|---|
| **Starter** | 512M | 512 Mo | **10 Go** | 30 | **7,20 €** | 8,64 € |
| Starter | 1G | 1 Go | 20 Go | 60 | 14,40 € | 17,28 € |
| **Business (HDS)** | 512M | 512 Mo | **10 Go** | 30 | **20,00 €** | 24,00 € |
| Business (HDS) | 1G | 1 Go | 20 Go | 60 | 40,00 € | 48,00 € |

**Pas de plan gratuit**, mais un **essai gratuit de 30 jours**. Starter = mono-nœud, SLA 98 %,
jusqu'à 10 sauvegardes. Business = multi-nœuds, SLA 99,96 %, jusqu'à 50 sauvegardes. Les deux
incluent sauvegardes quotidiennes, PITR (PostgreSQL) et support mail/chat. Le dépassement du
quota de stockage est facturé en sus, **au Go-heure — le taux exact n'est pas public** [non trouvé].

#### Stockage objet — **Scalingo n'en propose pas** [VU]

Le catalogue d'add-ons de Scalingo tient en trois lignes : **TCP Gateway** (gratuit),
**Scalingo Docker Image** (50,00 €/mois), **Scalingo OpenVPN** (30,00 €/mois). Il n'y a **aucun
add-on de stockage objet**, et la documentation dit explicitement que le système de fichiers d'un
conteneur n'est pas persistant et qu'il faut recourir à un service S3 externe (Outscale OOS,
Amazon S3, Google Cloud Storage, Azure Blob, OVH Public Cloud Storage sont les exemples cités).

**C'est le trou le plus important de l'offre pour ce projet précis**, puisque les photos et les
vidéos de mobilité sont exactement la brique que le marché ne couvre pas et donc la raison d'être
de l'app. On y revient au § D.

Sources : [tarifs Scalingo](https://scalingo.com/pricing) · [add-ons](https://scalingo.com/addons) ·
[doc — système de fichiers](https://doc.scalingo.com/platform/app/filesystem) ·
[tailles de conteneurs](https://doc.scalingo.com/platform/internals/container-sizes)

#### Déploiement depuis GitHub — **oui, standard** [VU]

Intégration SCM native avec GitHub, GitHub Enterprise et GitLab : webhook posé automatiquement,
auto-deploy sur une branche choisie, et **review apps** par pull request.
Source : [doc — deploy with GitHub](https://doc.scalingo.com/platform/deployment/deploy-with-github) ·
[intégration SCM](https://doc.scalingo.com/platform/app/scm-integration)

#### Total mensuel réaliste — Scalingo **sans HDS**

| Poste | Choix | € |
|---|---|---|
| Conteneur web | M (512 Mo) | 14,40 |
| PostgreSQL | Starter 512M (10 Go inclus) | 7,20 |
| Stockage objet | **externe** (Scaleway One Zone, 5 Go) | ~0,04 |
| **Total** | | **≈ 22 €/mois HT** |

[DÉDUIT — assemblage de prix VU]

---

### C) Netlify

#### Ce que la note actuelle croit, et qui est faux depuis

> ⚠️ **Correction.** Le brief posait que « Netlify n'héberge pas de base de données ni de stockage
> de fichiers ». **Ce n'est plus vrai.** La grille tarifaire de septembre 2026 liste, **dès le plan
> Free** : « Store structured data with **Netlify Database** » et « Store files & images with
> **Blob storage** ». [VU]
>
> Ce qui reste vrai, et c'est le seul point qui décide ici : **Netlify n'est pas certifié HDS**,
> c'est une société américaine, et sa base managée est une brique tierce (Neon). L'argument
> d'élimination du ticket 03 tient toujours — mais il faut l'énoncer correctement, sinon il tombe
> à la première vérification.

#### La grille [VU — https://www.netlify.com/pricing/]

| Plan | Prix | Crédits/mois | Notes |
|---|---|---|---|
| **Free** | **0 $** | **300** (plafond) | Déploiement depuis Git/AI/API, previews illimitées, domaines + SSL, Functions, Netlify Database, Blob storage, CDN global, pare-feu de base |
| Personal | 9 $/mois | 1 000 | + détection de secrets, observabilité 1 j, support e-mail prioritaire |
| **Pro** | **20 $/mois, membres illimités** | 3 000 (palier de base) | + dépôts d'organisation privés, variables d'env partagées, 3+ builds concurrents, analytics 30 j. Paliers jusqu'à 20 000 crédits |
| Enterprise | sur devis | — | SLA 99,99 %, SSO/SCIM, log drains, support dédié 24/7 |

**La tarification par membre a disparu** : Pro est désormais **20 $/mois à membres illimités**.
*(Historiquement 19 $ par membre et par mois ; le changement est daté d'avril 2026 par des sources
tierces — [non vérifié sur une page Netlify].)*

Les paliers de crédits Pro ne sont pas affichés sur la page tarifaire mais **le sont dans la
documentation** [VU — [docs.netlify.com](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)] :

| Crédits/mois | Prix | Report des crédits inutilisés |
|---|---|---|
| 3 000 | **20 $/mois** | non |
| 5 000 | 33 $/mois | oui |
| 10 000 | 63 $/mois | oui |
| 15 000 | 95 $/mois | oui |
| 20 000 | 126 $/mois | oui |

Recharge automatique : 1 500 crédits pour 10 $ (Pro), 500 crédits pour 5 $ (Personal). Le plan Free
est un **plafond dur**, sans recharge — le site s'arrête quand les 300 crédits sont épuisés. Tous
les comptes créés après le **4 septembre 2025** sont en tarification par crédits.

Barème des crédits [VU] : déploiement de production **15 crédits**, compute **10 crédits/Go-heure**,
bande passante **20 crédits/Go**, requêtes web **2 crédits/10 000**, inférence IA variable.
→ 300 crédits gratuits = ~15 Go de bande passante, ou ~20 déploiements de production. Pour un
projet à 10 clients c'est jouable, mais serré dès que la cadence de déploiement monte. [DÉDUIT]

#### L'assemblage réel que quelqu'un ferait

Personne ne met une app métier avec base et photos sur Netlify seul. L'assemblage standard est
**Netlify (front + fonctions) + une base managée + un stockage objet**.

**Supabase** [VU — https://supabase.com/pricing] :

| Plan | Prix | Base | Fichiers | Egress | Point bloquant |
|---|---|---|---|---|---|
| Free | 0 $ | 500 Mo | 1 Go | 5 Go | **projet mis en pause après 1 semaine d'inactivité**, 2 projets max → inutilisable en prod |
| **Pro** | **à partir de 25 $/mois** | 8 Go (puis 0,125 $/Go) | 100 Go (puis 0,0213 $/Go) | 250 Go (puis 0,09 $/Go) | inclut 10 $ de crédit de calcul, couvrant une instance Micro (1 Go RAM, 2 cœurs ARM) |
| Team | à partir de **599 $/mois** | idem | idem | idem | SOC2 + ISO 27001, **HIPAA en option payante** |

**Neon** [VU — https://neon.com/pricing] : facturation purement à l'usage, **sans minimum mensuel**.
Free : 0,5 Go/projet, 100 CU-heures. Launch : **0,106 $/CU-heure** de calcul, **0,35 $/Go-mois** de
stockage, 500 Go d'egress inclus, scale-to-zero après 5 min. Pour une base de quelques centaines
de Mo qui dort la nuit, la facture est de l'ordre de **quelques dollars par mois** [DÉDUIT] — mais
Neon ne fait que la base, il faut un stockage objet en plus (leur Object Storage est en bêta,
gratuit et à limites d'usage, donc pas un socle sur lequel s'engager). HIPAA est disponible sur
le plan Scale.

#### Total mensuel réaliste — assemblage Netlify

| Poste | Choix | Prix |
|---|---|---|
| Front + fonctions | Netlify **Pro** | 20 $ |
| Base + stockage fichiers + auth | Supabase **Pro** | 25 $ |
| **Total** | | **≈ 45 $/mois HT** |

Soit, selon le change, **de l'ordre de 40 à 45 €/mois HT**. [DÉDUIT — l'équivalent exact en euros
dépend du taux du jour, que je ne fige pas.]

Variante minimale : Netlify **Free** + Neon **Launch** ≈ **quelques dollars par mois**, mais avec
300 crédits Netlify de plafond et un stockage objet à trouver ailleurs. Variante « je veux dormir » :
Netlify Pro + Supabase Pro + un stockage objet européen = ~45 $ + 1 €.

**Et 0 € de HDS, parce que le HDS n'y est pas disponible à aucun prix.** Le plafond de conformité
de cette pile est **HIPAA** — un référentiel *américain*, en option payante sur un plan Supabase
Team à 599 $/mois. HIPAA n'est pas HDS et ne vaut rien devant l'art. L1111-8.

---

### D) Le volet HDS — la vraie découverte

**La note actuelle (ticket 03, § 7) dit : « Le prix réel du HDS chez Clever Cloud, Scalingo,
Scaleway et OVHcloud : aucun n'est public. » C'est faux pour les quatre.** Les prix, ou les
planchers, sont publics — il fallait juste les chercher sur les bonnes pages. Voici ce qu'ils
disent, mot pour mot.

#### Clever Cloud — un abonnement fixe + un multiplicateur, **publié**

Sur la page **PaaS HDS pour éditeurs de logiciels de santé**, dans l'accordéon *Tarifs et
conditions*, question « Quel est le coût d'un hébergement certifié HDS sur Clever Cloud ? » :
[VU, verbatim]

> « L'hébergement certifié HDS inclut des mesures supplémentaires de sécurité, de traçabilité et de
> conformité, ce qui le rend plus coûteux qu'un hébergement standard.
> **Le tarif se compose d'un abonnement mensuel fixe de 200 €, auquel s'ajoute un coefficient
> multiplicateur de 1,4 sur le tarif standard applicable aux ressources consommées** (CPU, mémoire,
> stockage, DBaaS, etc.).
> Le prix final dépend donc de la taille et des ressources de votre projet. »

*(Version anglaise identique sur `/health-hds/` : « a fixed monthly subscription of €200, plus a
1.4 multiplier on the standard rate applied to the resources consumed ».)*

Sources : [Clever Cloud — Santé (HDS), FAQ « Tarifs et conditions »](https://www.clever.cloud/fr/sante-hds/) ·
[version anglaise](https://www.clever.cloud/health-hds/)

La page commerciale *Health data hosting* dit en parallèle que « HDS hosting requires a specific
contract whose scope is defined during a conversation with an Account Manager »
([source](https://www.clever.cloud/health-data-hosting/)). Donc : **contrat sur devis pour le
périmètre, mais formule de prix publique.**

**Total Clever Cloud AVEC HDS, pour notre gabarit** [DÉDUIT à partir de chiffres VU] :

```
200 €   (abonnement HDS fixe)
+ 1,4 × 24 €  (XS + PostgreSQL XXS Big + Cellar)  =  33,60 €
──────────────────────────────────────────────────────────
≈ 234 €/mois HT      ≈ 2 808 €/an
```

Ce qu'on achète pour ce prix : une pile HDS **complète et cohérente chez un seul fournisseur** —
runtime, PostgreSQL managé, **et le stockage objet Cellar**, tous certifiés sur les **6 activités**,
en France. Pas d'assemblage, pas de contrat à recoller.

#### Scalingo — **pas de surcoût direct**, mais des contraintes qui coûtent

La documentation est explicite. [VU, verbatim —
[doc.scalingo.com/platform/hds](https://doc.scalingo.com/platform/hds), mise à jour du 26 février 2026]

> « With equivalent specifications, **HDS coverage does not imply a direct surcharge**, but it does
> require high-availability resources. »
>
> **Application Runtime** — « The platform enforces `web` processes scaled to **2 or more containers**
> to ensure high availability. »
>
> **Database** — « Only **highly available service classes (Business and Enterprise)** are eligible
> for HDS database workloads. »
> « Scalingo for Elasticsearch®, Scalingo for MongoDB®, and Scalingo for InfluxDB® are not eligible
> for HDS workloads. »
>
> « HDS coverage must be enabled **when the resource is created**. Existing resources without HDS
> coverage **cannot be converted later**. »

⚠️ **Ce dernier point est une contrainte d'ingénierie, pas seulement de facture** : on ne migre pas
une app Scalingo existante vers le HDS. Si le HDS est retenu, il faut créer les ressources en HDS
**dès le premier jour**. Une erreur ici se paie en refonte, pas en euros.

Il faut aussi **signer l'annexe HDS** (« Annexe Hébergement de Données de Santé »), à laquelle « le
Client adhère sans réserve […] sans pouvoir prétendre à un aménagement ». Elle est publique, ne
contient **aucune clause de prix ni de plan minimum**, et ne coûte rien à signer.
Source : [Annexe HDS Scalingo](https://scalingo.com/gtc-appendix-health-data-hosting) ·
[certification HDS Scalingo — 6 activités](https://scalingo.com/hds-certification)

**Total Scalingo AVEC HDS** [DÉDUIT à partir de prix VU] :

| Poste | Contrainte HDS | € |
|---|---|---|
| Conteneurs web | **2 × M** (le minimum imposé) | 28,80 |
| PostgreSQL | **Business 512M** (Starter interdit) | 20,00 |
| **Sous-total app + base** | | **48,80 €/mois HT** |

Variante la plus serrée : 2 × conteneur **S** (256 Mo) = 14,40 € → **34,40 €/mois**. 256 Mo pour
une API, c'est jouable en Go ou en Rust, très inconfortable en Node ou en Python. [DÉDUIT]

**Mais il manque le stockage des photos**, et c'est là que le calcul se retourne.

#### Le piège du stockage objet — le point qui décide entre les deux

Scalingo n'a pas de stockage objet. Il faut donc un tiers. Et ce tiers stockera des **photos de
mobilité**, c'est-à-dire de la donnée de santé : **il doit donc lui aussi être certifié HDS**.
Or les trois fournisseurs français de stockage objet certifiés imposent chacun un plancher :

| Fournisseur de stockage objet | Prix du stockage | Condition HDS | Plancher mensuel |
|---|---|---|---|
| **Clever Cloud** Cellar | ~0,02 €/Go/mois | abonnement HDS | **200 €** + 1,4× |
| **Scaleway** Object Storage | 0,00803 €/Go/mois (One Zone) · 0,01606 €/Go/mois (Multi-AZ) · sortie : 75 Go gratuits puis 0,01 €/Go | contrat HDS **+ plan de support Business ou Enterprise obligatoire** | **250 €** (ou 10 % de la conso, le plus élevé des deux) |
| **OVHcloud** Object Storage | ~0,0119 €/Go/mois | avenant Healthcare **+ support Business ou Enterprise obligatoire** | **250 €** (10 % de la facture, seuil minimum 250 € HT/mois) |

Les deux exigences de support sont écrites noir sur blanc. **Scaleway**, FAQ de la page HDS,
question « Quel est le plan de support minimum requis pour accéder aux services HDS ? » : [VU, verbatim]

> « Pour les produits Scaleway Public Cloud, **le support Business ou Enterprise est obligatoire**. »

et, plus haut sur la même page : « Pour bénéficier des produits HDS, vous devez signer un contrat
HDS qui liste les produits spécifiques **et avoir un plan de support obligatoire minimum actif**. »
La même FAQ précise que « **la conformité HDS est strictement définie par le périmètre du contrat** » —
un produit ajouté plus tard n'est pas couvert sans avenant. *(C'est exactement le « piège n° 1 » du
ticket 03, confirmé par la source.)*

**OVHcloud** : [VU, verbatim] « customers must first subscribe to a **Business or Enterprise level
of support** for the service in question, and accept the terms set out in the "**OVHcloud Healthcare
Addendum**" specific to hosting this type of data. » Et le tarif du support Business : « **10 % de
votre facture mensuelle** de services OVHcloud, avec un **seuil minimum de facturation de 250 € HT/mois**. »

Sources : [Scaleway — tarifs stockage](https://www.scaleway.com/en/pricing/storage/) ·
[Scaleway — HDS : contrat + plan de support obligatoire](https://www.scaleway.com/fr/security-and-compliance/hds/) ·
[Scaleway — plans de support et prix (Basic gratuit · Advanced 50 € · Business 250 € · Enterprise 990 €, ou % de la conso, le plus élevé)](https://www.scaleway.com/en/support/) ·
[OVHcloud — conformité HDS, support Business/Enterprise + Healthcare Addendum requis](https://www.ovhcloud.com/en/compliance/hds/) ·
[OVHcloud — tarif du support Business](https://www.ovhcloud.com/fr/support-levels/business/) ·
[OVHcloud — garanties HDS par produit (Object Storage et Object Storage 3AZ couverts)](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/hds-garanties)

**Autrement dit : le stockage lui-même est gratuit à l'échelle du projet (quelques centimes pour
5 Go), mais le droit de l'utiliser en HDS coûte 200 à 250 €/mois.** Le coût du HDS n'est pas un
coût de ressource, c'est un **droit d'entrée**.

**Il reste une porte de sortie, et elle est sérieuse** [DÉDUIT — décision d'ingénierie, pas un
prix relevé] : **stocker les photos dans PostgreSQL**. Le plan Business 512M de Scalingo inclut
**10 Go de stockage**, ce qui couvre « quelques Go de photos et courtes vidéos » avec de la marge.
C'est laid — une base n'est pas un magasin de blobs, les sauvegardes gonflent, le streaming vidéo
est médiocre — mais à ce volume c'est parfaitement tenable, et ça **supprime le plancher de 200 €**.
Le jour où le volume dépasse la dizaine de Go, il faudra soit monter de plan Business, soit
assumer un stockage objet certifié et son droit d'entrée. À arbitrer explicitement, pas par défaut.

#### Le tableau qui décide

| Scénario | HDS | Coût mensuel HT | % du CA (~1 500 €/mois) |
|---|---|---|---|
| Netlify Pro + Supabase Pro | **non, et indisponible à tout prix** | ~45 $ (~40-45 €) | ~3 % |
| Scalingo standard | non | **≈ 22 €** | 1,5 % |
| Clever Cloud standard | non | **≈ 24 €** | 1,6 % |
| **Scalingo HDS, photos en base** | **oui** | **≈ 49 €** | **3,3 %** |
| Clever Cloud HDS (pile complète, Cellar inclus) | oui | **≈ 234 €** | **15,6 %** |
| Scalingo HDS + stockage objet certifié chez un tiers | oui | **≈ 300 €** | 20 % |

Repère : **TrueCoach coûte aujourd'hui 60 €/mois**, soit 4 % du CA.

**Trois conclusions qui changent la note :**

1. **Le HDS n'est plus « sur demande », il est chiffrable.** Et l'écart entre les deux PaaS français
   certifiés n'est pas marginal : **49 € contre 234 €, un facteur ~5**. Cette différence ne vient
   pas de la puissance achetée — elle vient de la **forme** du surcoût. Clever Cloud a choisi un
   droit d'entrée fixe ; Scalingo a choisi de n'imposer que de la haute disponibilité. À notre
   échelle, le droit d'entrée écrase tout.

2. **L'affirmation du ticket 03 selon laquelle « l'écart de coût entre la réponse conforme et la
   réponse non conforme est de l'ordre de quelques dizaines d'euros par mois » n'est vraie que
   d'un côté.** Chez Scalingo, oui : +27 €/mois (22 → 49). Chez Clever Cloud, non : **+210 €/mois**,
   soit **2 500 €/an**, soit près de deux mois de chiffre d'affaires. Le raisonnement « le calcul ne
   se discute pas » du § 1.5 **tient toujours, mais uniquement si l'hébergeur retenu est Scalingo**.
   C'est une correction importante : la conclusion du ticket 03 était juste, sa justification
   chiffrée ne l'était qu'à moitié.

3. **Le choix d'hébergeur du ticket 03 doit s'inverser.** Ce ticket désignait Clever Cloud
   « meilleur candidat » et Scalingo « à comparer ». Prix en main, **Scalingo est le meilleur
   candidat**, et de loin — à une réserve près, sérieuse : il n'a pas de stockage objet, et c'est
   précisément la brique dont dépend la seule fonctionnalité que le marché ne couvre pas. La
   comparaison honnête n'est donc pas « 49 € contre 234 € », c'est :
   - **Scalingo à ~49 €** avec les photos en base et une dette technique assumée, ou
   - **Clever Cloud à ~234 €** avec une pile propre, un seul contrat, et Cellar dedans.

   *Ce n'est pas un arbitrage que je tranche ici — c'est celui que la note de décision doit poser.*

#### Ce qui reste vraiment sur devis

- Le **périmètre du contrat HDS** chez Clever Cloud (les 200 € + 1,4× sont publics, le contrat ne
  l'est pas).
- Le **taux de dépassement du quota de stockage** chez Scalingo (facturé au Go-heure, taux non publié).
- Les **paliers de crédits Netlify Pro** au-dessus de 3 000 (des tiers citent 33/63/95/126 $ —
  **non officiel**).
- Le **plan Platinum** de Scaleway et l'**Enterprise** d'OVHcloud (custom) — sans objet ici.

**Aucun de ces inconnus ne change une décision à cette échelle.** Trois devis ne sont plus un
préalable ; un seul e-mail à Scalingo pour confirmer que l'annexe HDS s'applique bien à une
micro-entreprise suffit.

---

## Partie 2 — Le risque réel pour une micro-entreprise

> Cette partie répond à la question que le ticket 03 avait laissée en suspens : **« la probabilité
> est faible » — mais faible comment, et faible de quoi ?** Le ticket 03 s'arrêtait à une intuition
> (« aucun contrôle spontané sur une micro-entreprise »). Elle se vérifie. Mais la vérification
> déplace le risque plutôt qu'elle ne l'annule, et pas là où on l'attendait.

### 1. Qu'est-ce qui déclenche un contrôle de la CNIL ?

#### Les volumes, d'abord — pour poser l'échelle

Chiffres relevés dans les rapports annuels de la CNIL. [VU]

| | 2023 | 2024 | 2025 |
|---|---|---|---|
| Plaintes reçues | 16 433 | 17 772 | **20 150** |
| **Contrôles réalisés** | **340** | **321** | **323** |
| — sur place | 157 | 166 | 165 |
| — en ligne | 128 | 99 | 126 |
| — sur pièces | 38 | 44 | 27 |
| — sur audition | 17 | 12 | 5 |
| Violations de données notifiées | 4 668 | 5 629 | 6 167 *(voir note)* |
| Mises en demeure | 168 | 180 | 143 |
| **Sanctions** | **42** (18 formation restreinte / 24 simplifiées) | **87** (18 / **69**) | **83** (16 / **67**) |
| Montant total des amendes | 89 179 500 € | 55 212 400 € | 486 839 500 € |
| dont procédure simplifiée | 229 500 € | 715 500 € | non publié |

Sources : [RA 2023](https://www.cnil.fr/sites/cnil/files/2024-05/cnil_44e_rapport_annuel_2023.pdf) ·
[RA 2024](https://www.cnil.fr/sites/cnil/files/2025-04/rapport_annuel_2024.pdf) ·
[RA 2025](https://www.cnil.fr/sites/cnil/files/2026-05/rapport_annuel_2025.pdf) ·
[bilan répressif 2024](https://www.cnil.fr/fr/sanctions-et-mesures-correctrices-bilan-2024-de-laction-de-la-cnil) ·
[bilan 2025](https://www.cnil.fr/fr/bilan-sanctions-2025)

**~320 contrôles par an, en France, tous secteurs et toutes tailles confondus.** C'est le chiffre
à garder en tête pour tout le reste.

#### Ce qui déclenche, dans l'ordre

La CNIL **ne publie pas** de ventilation chiffrée par origine, mais elle énumère : [VU, verbatim]

> « La CNIL conduit des centaines de contrôles par an (321 en 2024) qui font suite à **des plaintes,
> de précédentes mesures correctrices, des signalements de violations de données ou sont en lien
> avec l'actualité**. »
> — [Les contrôles de la CNIL en 2025](https://www.cnil.fr/fr/les-controles-de-la-cnil-en-2025)

Deux chiffres cadrent le poids de la plainte : [VU]
- RA 2023 : « Les plaintes reçues par la CNIL sont à l'origine de **plus de 80 contrôles**, de
  **81 mesures correctrices** et de **22 sanctions**. »
- RA 2024 : « **plus de la moitié des dossiers ayant abouti à une sanction avaient pour origine une
  plainte**. »

Les **thématiques prioritaires annuelles** représentent selon les années « environ 20 % » (2020,
2026), « un quart » (2025) ou « environ 30 % » (RA 2024, RA 2025) des contrôles. [VU — le
pourcentage annoncé varie d'une publication à l'autre.]

#### La part des contrôles visant de très petites structures

**Elle n'est pas publiée.** Les rapports annuels 2023, 2024 et 2025 ne contiennent aucune
ventilation des contrôles ou des sanctions **par taille d'organisme** — la CNIL ventile par
**secteur** et par **type de manquement**. Les seules mentions de « TPE/PME » dans ces rapports
concernent l'**accompagnement**, jamais la répression. [VU — absence vérifiée par recherche
plein texte dans les trois rapports.]

**Ce qu'on peut dire à la place, et qui est plus utile** : quand la CNIL a fait de la santé une
priorité de contrôle, elle a systématiquement visé les **établissements**, pas les libéraux. [VU]

| Année | Thème | Cible réelle annoncée |
|---|---|---|
| **2020** | « La sécurité des données de santé » | « les mesures de sécurité mises en œuvre **par les professionnels de santé ou pour leur compte** » — formulation large ([source](https://www.cnil.fr/fr/quelle-strategie-de-controle-pour-2020)) |
| **2021** | idem, reconduit | « gestion des accès au **dossier patient informatisé au sein des établissements de santé**, plateformes de prise de rendez-vous en ligne » ; 30 missions auprès de **laboratoires d'analyses, hôpitaux, prestataires et courtiers** ([source](https://www.cnil.fr/fr/cybersecurite-donnees-de-sante-cookies-les-thematiques-prioritaires-de-controle-en-2021)) |
| **2023** | « Les dossiers patients informatisés » | « **au sein des établissements de santé** » ([source](https://www.cnil.fr/fr/thematiques-prioritaires-de-controle-2023-cameras-augmentees-applications-mobiles-fichiers-bancaires)) |
| 2022, 2024, 2025, 2026 | — | aucune thématique santé |

Résultat concret de la campagne DPI [VU, RA 2024] : « entre 2020 et 2024, **treize contrôles auprès
d'établissements de santé** », principalement des CHU. Suites : des **mises en demeure**, pas de
sanctions. **Aucun cabinet libéral dans ce périmètre.**

> **Réponse à la question 1.** Le contrôle spontané d'une micro-entreprise n'existe
> statistiquement pas : ~320 contrôles par an pour plus d'un million d'organismes assujettis, et
> les campagnes sectorielles santé ont visé des hôpitaux et des laboratoires. **Le déclencheur
> réaliste est unique : la plainte d'une personne.** Le ticket 03 avait raison sur ce point.

### 2. Quelles sanctions ont réellement été prononcées contre des libéraux ?

#### Le cadre : la procédure simplifiée

Créée en 2022 (art. 22-1 de la loi Informatique et Libertés), instruite par le seul président de la
formation restreinte. Elle permet : **rappel à l'ordre**, **injonction sous astreinte plafonnée à
100 €/jour**, et **amende administrative plafonnée à 20 000 €**. Les décisions ne sont **jamais
nominatives**, mais la CNIL les publie anonymisées (date, qualité, manquement, montant).
[VU — [procédure simplifiée](https://www.cnil.fr/fr/la-procedure-de-sanction-simplifiee)]

⚠️ **Le plafond de 20 000 € est l'ordre de grandeur pertinent ici, pas les 20 M€ / 4 % du CA du
RGPD.** Le ticket 03 mentionnait le plafond théorique en le qualifiant de « sans rapport avec une
micro-entreprise » — c'est exact, et voici le chiffre qui a un rapport.

#### Toutes les sanctions visant des praticiens libéraux, depuis 2017

Extraites de la [liste officielle des sanctions de la CNIL](https://www.cnil.fr/fr/les-sanctions-prononcees-par-la-cnil). [VU]

| Date | Qualité | Manquement | Sanction |
|---|---|---|---|
| 18/05/2017 | Cabinet médical (chirurgien-dentiste) | droit d'accès au dossier + défaut de réponse à la CNIL | **10 000 €**, publique — [SAN-2017-008](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000034899556/) |
| 07/12/2020 | **Médecin** (imagerie, Paris ; revenus déclarés 97 000 €/an) | art. 32 (pas de chiffrement, ports ouverts) + art. 33 — **&gt; 5 300 séries d'images librement accessibles ~4 mois** | **3 000 €** — [SAN-2020-014](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000042675720), **ramenée à 2 500 €** par le [Conseil d'État, 22/07/2022, n° 449694](https://www.legifrance.gouv.fr/ceta/id/CETATEXT000046082429) |
| 07/12/2020 | **Médecin** (radiologie, Paris ; revenus ~8 000 €/mois) | idem — **&gt; 1 200 séries d'images accessibles ~5 ans** | **6 000 €** — [SAN-2020-015](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000042676787) |
| 29/12/2022 ×2 | Médecins (simplifiée) | droit d'accès + défaut de coopération | 5 000 € chacun + injonction |
| 08/02/2023 | Médecin généraliste | droit d'accès + défaut de coopération | 3 000 € + injonction |
| 12/05/2023 | Chirurgien-dentiste | droit d'accès + défaut de coopération | 4 500 € + injonction |
| 22/11/2023 | **Orthophoniste** | défaut de coopération + droit d'accès (données de santé) | 5 000 € + injonction |
| 27/12/2023 | Médecin pédiatre | défaut de coopération | **1 000 €** |
| 31/01/2024 | Chirurgien-dentiste | **défaut de sécurité** + droit d'accès | 5 000 € |
| 29/02/2024 | Chirurgien-dentiste | défaut de coopération + droit d'accès | 4 000 € |
| 10/06/2024 | Médecin généraliste | droit d'accès + défaut de coopération | 4 000 € + injonction |
| 11/10/2024 | **Orthophoniste** | absence de réponse à l'injonction | liquidation d'astreinte **4 000 €** |
| 17/10/2024 | Chirurgien-dentiste | droit d'accès + défaut de coopération | 3 000 € + injonction |
| 19/12/2024 | Stomatologue | droit d'accès + défaut de coopération | 5 000 € |
| 19/12/2024 | Médecin généraliste | absence de réponse à l'injonction | liquidation d'astreinte **2 000 €** |
| 03/07/2025 | Médecin | défaut de coopération | 3 000 € + injonction |
| 11/09/2025 | Médecin généraliste | défaut de coopération | 3 000 € + injonction |
| 30/12/2025 | Chirurgien-dentiste | défaut de coopération | **rappel à l'ordre, sans amende** |
| 05/02/2026 | Médecin | absence de réponse à l'injonction | liquidation d'astreinte **1 000 €** |

**Aucune sanction identifiée contre un masseur-kinésithérapeute**, ni contre un infirmier libéral,
une sage-femme ou un pharmacien d'officine. [non trouvé — absence, pas preuve d'immunité]

#### Pour situer : les structures plus grandes

| Date | Organisme | Manquement | Sanction |
|---|---|---|---|
| 05/09/2024 | **Cegedim Santé** — éditeur de logiciels pour médecins | entrepôt de données de santé sans autorisation | **800 000 €** — [SAN-2024-013](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000050202759) |
| 05/12/2024 | Clinique (simplifiée) | défaut de coopération | 15 000 € |
| 19/12/2024 | Groupement régional d'appui à la e-santé (simplifiée) | traitements santé + encadrement du sous-traitant | **20 000 €** (le plafond) |
| 21/07/2026 | **Hôpital privé de la Loire** | violation touchant **524 867 patients** (pas de MFA, pas de cloisonnement) | **500 000 €** + injonctions + [publication nominative 2 ans](https://www.cnil.fr/fr/sanction-hopital-prive-loire) |

#### Les ordres de grandeur

Sur les **159 amendes en procédure simplifiée** publiées depuis 2022, tous secteurs : minimum
**500 €**, maximum **20 000 €**, **médiane 8 000 €**. Sur les **13 amendes visant un praticien
libéral de santé** : minimum **1 000 €**, maximum **5 000 €**, **médiane 4 000 €**.
[DÉDUIT — calcul sur les données publiées par la CNIL]

**Les libéraux sont sanctionnés à environ la moitié de la médiane générale, et à un cinquième du
plafond légal.**

#### Ce qui déclenche vraiment ces sanctions — et ce n'est pas l'hébergement

**17 des 20 dossiers ci-dessus suivent le même schéma : un patient demande son dossier, le
praticien ne répond pas, la CNIL le relance, il ne répond pas davantage.** Le manquement principal
sanctionné n'est ni la sécurité ni l'hébergement : c'est le **défaut de coopération avec la CNIL**.
[VU, verbatim]

> Bilan 2024 : « le principal manquement retenu dans le cadre de la procédure simplifiée est le
> **défaut de coopération avec la CNIL**, qui a concerné **27 organismes (sociétés, professionnels
> libéraux)**. »

> « Des **avocats, des médecins**, des sociétés n'ont pas répondu aux sollicitations de la CNIL dans
> le cadre de l'instruction des plaintes ou des suites de contrôles. »
> — [16 nouvelles sanctions simplifiées](https://www.cnil.fr/fr/la-cnil-prononce-16-nouvelles-sanctions-dans-le-cadre-de-la-procedure-simplifiee)

> « **Un professionnel de santé n'avait pas fait droit aux demandes de communication des données de
> santé qu'il avait reçues.** Les professionnels de santé doivent pourtant faire droit à ces
> demandes, en vertu de l'**article 64 de la loi Informatique et Libertés**. »
> — [six sanctions simplifiées, nov.–déc. 2023](https://www.cnil.fr/fr/la-cnil-prononce-six-nouvelles-sanctions-dans-le-cadre-de-sa-procedure-simplifiee)

Et la dernière ligne du tableau le dit mieux que tout : le chirurgien-dentiste du 30/12/2025 a eu
un **simple rappel à l'ordre, sans amende** — parce qu'il a fini par répondre.

> **Réponse à la question 2.** Sur neuf ans, une vingtaine de praticiens libéraux sanctionnés en
> France, pour **1 000 à 6 000 €**, presque tous pour **ne pas avoir répondu** — à un patient, puis
> à la CNIL. Les deux seules sanctions publiques et nominatives contre des libéraux concernent des
> radiologues qui laissaient **des milliers d'IRM en libre accès sur Internet pendant cinq ans** :
> **2 500 € et 6 000 €**. C'est cela, le plafond réel du risque réglementaire à cette échelle.
>
> **Corollaire opérationnel, et c'est le geste le plus rentable de tout le dossier** : construire
> dans l'app un **export du dossier client en un clic**, et répondre sous un mois à toute demande.
> Ça neutralise à peu près intégralement le seul mécanisme de sanction réellement observé.

### 3. L'article L1111-8 a-t-il une sanction pénale propre ?

**Oui — l'article L1115-1 CSP. Mais elle ne vise pas Manon.**

[VU, verbatim — [L1115-1 CSP, en vigueur depuis le 1er avril 2018](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862544)]

> « **La prestation d'hébergement** de données de santé à caractère personnel recueillies auprès de
> personnes physiques ou morales à l'origine de la production ou du recueil de ces données […]
> **sans être titulaire de l'agrément ou du certificat de conformité prévu par l'article L. 1111-8**
> ou de traitement de ces données sans respecter les conditions de l'agrément obtenu **est puni de
> trois ans d'emprisonnement et de 45 000 euros d'amende**. »

L'infraction vise **celui qui fournit la prestation d'hébergement**, pas le responsable de
traitement qui confierait ses données à un hébergeur non certifié. L'analyse d'un cabinet
spécialisé le formule ainsi : [VU]

> « L'article L. 1115-1 ne sanctionne pas le fait d'avoir fait appel à un hébergeur tiers non agréé
> mais seulement le fait d'héberger des données de santé sans agrément. »
> — [Lexing Avocats](https://www.lexing.law/avocats/hebergement-traitement-illicite-de-donnees-de-sante/2017/09/28/)

*Le ticket 03 disait déjà cela dans son tableau du § 1.4 — c'est confirmé, et c'est important : la
peine de 3 ans / 45 000 € qui circule dans les articles de blog n'a jamais visé les praticiens.*

#### A-t-elle déjà été appliquée ?

**Aucune condamnation sur ce fondement n'est documentée dans les sources publiques accessibles.**
[non trouvé]

La seule décision identifiée qui l'ait examinée est **TGI de Marseille, 6ᵉ ch. correctionnelle,
7 juin 2017** (plateforme de recueil de données épidémiologiques ; dossier médical d'un enfant et
son NIR ressortant dans Google) :
- le **médecin** responsable de traitement a été condamné à **5 000 € d'amende** — mais sur le
  fondement de l'**art. 226-16 du code pénal**, pas de L1115-1 ;
- le **gestionnaire de la plateforme** a été **relaxé** du chef de L1115-1, n'étant pas
  techniquement l'hébergeur ;
- l'**hébergeur** a été **relaxé**, faute de preuve qu'il savait que des données de santé y étaient
  externalisées.

Sources : [Life Avocats](https://www.life-avocats.com/donnees-de-sante-la-justice-sanctionne-un-responsable-de-traitement-tgi-marseille-6eme-ch-corr-07-06-2017/) ·
[Lexing](https://www.lexing.law/avocats/hebergement-traitement-illicite-de-donnees-de-sante/2017/09/28/)

Seule jurisprudence connexe : Cass., 26 septembre 2012, *Lor-Madinina / Croix-Rouge française* — les
prescriptions de L1111-8 sont d'**ordre public**, donc un contrat conclu en violation de ces règles
est **annulable**. Sanction **civile**, pas pénale — mais c'est un vrai levier pour un client
mécontent qui voudrait faire annuler son contrat de suivi.

**Réserve de méthode** : Légifrance ne publie pas les jugements correctionnels de première instance
non sélectionnés, et il n'existe pas de base exhaustive consultable. On peut affirmer qu'aucune
condamnation n'est **documentée publiquement**, pas qu'il n'en existe strictement aucune.

### 4. L'affaire du 6 novembre 2020 — vérification et remise en contexte

> **Verdict : la citer telle qu'elle figure dans le ticket 03 est trompeur.** Pas parce que
> l'affaire est inventée — elle est réelle et le texte a été lu — mais parce que la note en
> déforme trois choses sur quatre : l'objet de l'astreinte, le poids du grief HDS, et la nature
> de l'activité sanctionnée. En revanche, **l'argument « c'était un gros acteur » ne tient pas
> non plus** : il faut le remplacer par le bon.

#### Ce que la décision est réellement

**TJ Paris, RG n° 20/54799, 6 novembre 2020.** [VU — texte intégral de la minute, 29 pages]
[PDF de la minute](https://web.lexis360.fr/LexisActu/20-54799%20Conseil%20national%20de%20l'Ordre%20des%20Medecins.pdf) ·
[fiche Doctrine](https://www.doctrine.fr/d/TJ/Paris/2020/UB8E8F05888718DA8B81B)

Première correction, mineure : ce n'est pas une **ordonnance de référé** rendue par un juge unique,
mais un **« jugement rendu en état de référé » par une formation collégiale de trois magistrats**
(art. 487 CPC).

#### Qui contre qui

**Demandeurs** : le **Conseil national de l'Ordre des médecins** et la **Caisse nationale de
l'Assurance maladie**, rejoints en intervention volontaire par la **Caisse centrale de la MSA** et
la **Fédération nationale de la Mutualité française**.

**Défenderesses** :
- **DR. ANSAY AU SCHEIN GmbH**, société de droit allemand établie à **Hambourg**, éditrice
  d'`arretmaladie.fr` ;
- **SAS DOCTEURSECU**, Marseille, éditrice de `docteursecu.fr`.

#### La taille : la note du brief se trompait, et il faut le dire

Mon hypothèse de départ était que le défendeur devait être un acteur majeur (Health Data Hub,
Doctolib, un GIP). **C'est faux.** [VU]

- **DOCTEURSECU** : SAS créée le 19 août 2019, **capital social 5 425,80 €**, placée en
  **liquidation judiciaire le 9 septembre 2021**, clôturée pour **insuffisance d'actif** le
  9 juin 2022, radiée. ([societe.com](https://www.societe.com/societe/docteursecu-853238632.html))
  C'était une très petite structure, plus petite en capital que bien des micro-entreprises.
- **arretmaladie.fr** : son fondateur revendiquait **50 patients par jour**, consultation à **25 €**,
  et un objectif de 120 par jour ouvré. ([Next](https://next.ink/article/29990/108614-pourquoi-arretmaladie-fr-a-t-il-ete-mis-en-demeure-fermer))
  Chiffre d'affaires : **non trouvé** (comptes confidentiels).

> **Donc l'argument « ne citez pas ça, c'était un géant » est faux et ne doit pas être écrit.**
> Le bon argument n'est pas la taille — c'est **l'activité**.

#### Le vrai motif de distinction : héberger les données **d'autrui**

L'art. L1111-8 CSP vise celui qui héberge des données de santé « **pour le compte de** personnes
physiques ou morales à l'origine de la production ou du recueil de ces données ou pour le compte du
patient lui-même ». [VU — [Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049577902)]

Les deux défenderesses étaient des **plateformes** : elles hébergeaient les données de santé
recueillies par des médecins tiers. C'est exactement le fait générateur du régime HDS.

Et la CNIL le dit noir sur blanc pour le cas qui nous occupe, dans son **référentiel « gestion des
cabinets médicaux et paramédicaux »** (délibération n° 2020-081 du 18 juin 2020), qui « s'adresse
aux professionnels de santé exerçant à titre libéral » : [VU, verbatim]

> « En cas d'**externalisation** de l'hébergement des données, **les prestataires informatiques**
> doivent être agréés ou certifiés pour l'hébergement, le stockage, la conservation de données de
> santé conformément aux dispositions de l'article L. 1111-8 du code de la santé publique. »

Le même référentiel ajoute que l'AIPD et le DPO ne deviennent nécessaires, pour des libéraux en
cabinet groupé partageant un SI, qu'« **à partir d'un seuil annuel de 10 000 patients** ».
[PDF](https://www.cnil.fr/sites/default/files/atoms/files/referentiel_-_cabinet.pdf) ·
[JO](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042158211)

> **C'est la source la plus directement applicable au cas de Manon de tout le dossier, et le ticket
> 03 ne la cite pas.** Elle confirme sa conclusion opérationnelle — il faut un hébergeur certifié —
> tout en déplaçant l'obligation : **la certification pèse sur le prestataire ; l'obligation de
> Manon est contractuelle** (art. 28 RGPD : choisir un prestataire certifié et signer le contrat).
> Et à dix clients, ni AIPD ni DPO. *(À rapprocher du § 3 point 8 du ticket 03, qui arrivait à la
> même conclusion par un autre chemin — c'est confirmé, avec une meilleure source.)*

#### Le HDS était **un grief sur quatre**, et le dernier

Le tribunal retient **quatre troubles manifestement illicites distincts** : [VU, minute]

| # | Trouble retenu |
|---|---|
| 1 | Rémunération du médecin **facturée par la société**, « impératif de rentabilité », « célérité de la consultation » → atteinte à l'**indépendance professionnelle**, à la **liberté de prescription**, au **paiement direct des honoraires** |
| 2 | Relation médicale fondée sur un questionnaire et influencée par des « **assistants médicaux » non habilités à exercer la médecine en France** → atteinte au **libre choix du médecin** et au **secret professionnel** |
| 3 | **Méconnaissance du cadre territorial de la télémédecine** (art. 28.6.1.2 de la convention médicale) |
| 4 | **Hébergement chez des hébergeurs non certifiés** (art. L1111-8 CSP) |

Le jugement conclut « sans qu'il soit besoin de statuer sur le surplus des moyens présentés » — les
griefs de pratiques commerciales trompeuses et une partie des moyens RGPD n'ont **pas** été tranchés.
Il n'y a **pas** de grief d'exercice illégal de la médecine dans le dispositif.

Détail des hébergeurs incriminés [VU] : `arretmaladie.fr` chez **Gandi**,
`arretmaladie.web.app` chez **Fastly** (USA), `docteursecu.fr` chez **Infomaniak** (Suisse).

**Les trois autres griefs n'ont aucun équivalent possible dans l'activité de Manon.** Elle facture
sa propre prestation, il n'y a pas d'intermédiaire commercial qui capte ses honoraires, pas
d'assistant non habilité, et pas de cadre conventionnel de télémédecine à contourner puisqu'elle
est hors nomenclature.

#### L'astreinte de 3 000 €/jour : le chiffre est exact, son objet est déformé

C'est le contresens le plus grave de la note actuelle. [VU]

Les demandeurs sollicitaient 5 000 €/jour (CNOM et CNAM) et 3 000 €/jour (MSA) ; le tribunal retient
**3 000 €**. Mais le dispositif ordonne la **fermeture des sites dans les 24 heures de la
signification**, *puis* une astreinte de 3 000 € **par jour de retard**, **plafonnée à quatre mois**.

> **C'est une astreinte d'exécution, pas une amende.** Elle ne court que si la société refuse de
> fermer son site sous 24 heures. Si elle obtempère, elle vaut **zéro euro**. La note actuelle la
> présente comme une sanction encourue pour hébergement non conforme — ce n'est pas ce que le
> jugement dit.

Ce que les sociétés ont réellement payé : **24 500 € au titre de l'article 700** (10 000 € au CNOM,
10 000 € à la CNAM, 3 000 € à la MSA, 1 500 € à la FNMF), in solidum et par moitié. [VU, minute p. 28,
recoupé par [DSIH](https://www.dsih.fr/article/3975/fermeture-des-sites-d-arret-maladie-en-ligne.html)]
*(La fiche Doctrine annonce « 25 000 € + 25 000 € » — c'est la **demande**, pas la condamnation.)*

#### Les suites

**CA Paris, pôle 1 ch. 8, 18 février 2022, n° 20/16331** : confirmation, avec une modification — la
fermeture est requalifiée de **« temporaire »** et non « définitive », dans l'attente du juge du
fond. [source secondaire — [notice Lexbase](https://www.lexbase.fr/jurisprudence/79198460-ca-paris-1-8-18-02-2022-n-20-16331-confirmation) ;
texte intégral non lu]. Docteursecu a été liquidée pour insuffisance d'actif. Dr. Ansay a poursuivi
en Allemagne sous `DrAnsay.com`.

#### Ce qu'il faut écrire à la place, dans la note à Manon

Le bon comparable n'est pas une plateforme de téléconsultation fermée par l'Ordre des médecins.
C'est :

> **Deux médecins radiologues libéraux ont été sanctionnés par la CNIL, en décembre 2020, à 3 000 €
> et 6 000 € — le premier montant ramené à 2 500 € par le Conseil d'État — pour avoir laissé des
> milliers d'images médicales accessibles sur Internet, l'un pendant quatre mois, l'autre pendant
> cinq ans.**
> (CNIL [SAN-2020-014](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000042675720) et
> [SAN-2020-015](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000042676787) ;
> [CE, 22 juillet 2022, n° 449694](https://www.legifrance.gouv.fr/ceta/id/CETATEXT000046082429))

Même profil, même type de manquement, montants réels. C'est plus faible rhétoriquement, et
infiniment plus honnête.

*Réserve d'équité : l'article du cabinet ALTIJ cité par le ticket 03 rapporte la décision
correctement, dans un contexte de veille compliance. Le glissement vient de la note qui l'invoque,
pas de la source.*

### 5. Le risque non réglementaire — ce qui coûte vraiment le plus cher

C'est ici que le dossier se retourne. Le ticket 03 raisonnait entièrement en risque juridique. Les
chiffres disent que **le risque juridique « données » est le moins cher des risques que court
Manon**.

#### Ce qu'on ne peut pas chiffrer, et qu'il ne faut pas inventer

Avant les chiffres, l'inventaire honnête des trous. [non trouvé, vérifié]

- **La CNIL ne ventile pas les violations par taille d'organisme** (seule granularité : « environ
  deux tiers du secteur privé, dont 39 % de PME »).
- **Les cabinets libéraux ne sont pas dans le périmètre de déclaration du CERT Santé.**
  L'obligation de l'art. L1111-8-2 CSP vise « les établissements de santé, les hôpitaux des armées,
  les centres de radiothérapie et les laboratoires de biologie médicale », étendue aux ESMS. Les
  mots « libéral », « cabinet », « officine » n'apparaissent pas dans l'observatoire.
  **→ Il n'existe aucune statistique nationale d'incidents de sécurité pour les cabinets de ville.**
  Écrire « X % des incidents touchent les libéraux » serait une invention.
- **Aucun coût moyen de cyberattaque pour une TPE française n'est publié** en source primaire.
- **La MACSF ne publie aucun coût moyen de sinistre pour les kinés.**

⚠️ **Le chiffre de 58 600 € qu'on lit partout ne vaut pas ici.** L'étude Asterès pour le CRiP
(juin 2023), qui l'a produit, écrit elle-même : [VU, verbatim]

> « Pour le secteur privé, les **microentreprises (moins de 10 salariés) ne sont pas prises en
> compte** […] Les **PME (10 à 249 salariés) sont comptabilisées dans l'estimation du volume** de
> cyberattaques réussies en 2022, **mais pas dans l'estimation du coût**. »
> — [Asterès, *Le coût des cyberattaques réussies en France*](https://asteres.fr/site/wp-content/uploads/2023/06/ASTERES-CRIP-Cout-des-cyberattaques-reussies-16062023.pdf)

Transposer 58 600 € à un cabinet de kiné, c'est exactement le même vice de raisonnement que citer
le TJ de Paris. Deux chiffres qui circulent et dont la **publication primaire est introuvable** —
« 50 000 € médian PME, Asterès/MEDEF 2024 » et « 466 000 € pour une TPE, Groupama 2025 » — **ne
doivent pas être repris**. Le baromètre CESIN, souvent cité, interroge des **RSSI de grandes
entreprises** : non transposable.

#### Ce qu'on peut chiffrer

**(a) La cyberattaque.** [VU]
- **16 %** des entreprises de moins de 250 salariés déclarent au moins un incident sur 12 mois
  ([Baromètre national de la maturité cyber des TPE-PME, 2ᵉ éd., 2025, n = 588](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/etude-maturite-cyber-tpe-pme-2025)).
  Les trois quarts consacrent **moins de 2 000 €/an** à la cybersécurité ; 58 % ne savent pas
  évaluer les conséquences d'une attaque.
- **3 entreprises sur 1 000** ont recouru à l'assistance publique 17Cyber en 2025
  ([rapport cybermalveillance.gouv.fr 2025](https://www.cybermalveillance.gouv.fr/medias/2026/03/RA_2025_Cybermalveillance_gouv_fr.pdf)).
- Côté CNIL, **539 notifications liées à un rançongiciel en 2025 (9 % du total)** ; le secteur
  « santé humaine et action sociale » pèse **15 %** des notifications, deuxième derrière
  l'administration publique.

**(b) L'événement qui a réellement frappé les kinés libéraux en 2025 — et ce n'est pas leur faute.**
[VU, verbatim, rapport annuel 2025 de la CNIL]

> « la CNIL a été notifiée de **17 802** violations de données personnelles… Ce chiffre exceptionnel
> s'explique notamment par des attaques qui ont touché deux éditeurs de solutions, l'un pour les
> professionnels du conseil patrimonial, **l'autre pour les professionnels de santé libéraux**. À
> elles seules, ces deux violations ont entraîné un volume inédit de notifications (**11 635**) de
> la part des entreprises clientes, **en tant que responsables de traitement**. »

> **C'est le scénario le plus probable pour Manon, et il est absent du ticket 03.** Ce n'est pas
> elle qui se fait pirater : **c'est son fournisseur**. Et c'est *elle* qui doit notifier, en tant
> que responsable de traitement. Des milliers de professionnels de santé libéraux ont vécu
> exactement ça en 2025. **Aucune sanction n'en a découlé.** Mais ça déplace le critère de choix :
> ce qui compte n'est pas seulement que l'hébergeur soit certifié, c'est **combien de fournisseurs
> il y a dans la chaîne**. Une pile à un seul fournisseur est structurellement moins exposée qu'un
> assemblage à quatre.

**(c) Le sinistre professionnel classique.** [VU — [MACSF, rapport 2024](https://www.macsf.fr/le-risque-des-professionnels-de-sante-en-2024/risque-des-professions-de-sante/m/masseurs-kinesitherapeutes)]

| | Kinés (tous statuts) | Kinés **libéraux** |
|---|---|---|
| Sociétaires MACSF | 45 658 | 43 564 |
| Déclarations de dommages corporels | 121 | **101** |
| **Taux de sinistralité** | 0,27 % | **0,23 %** |

Sur 121 déclarations : 107 réclamations amiables, 5 procédures civiles, 5 ordinales, 3 saisines CCI,
**aucune procédure pénale**. Motifs : chutes pendant la séance, brûlures (infrarouge,
électrothérapie, cryothérapie), aggravations lors d'exercices.
Comparaison 2024 : médecins **1,01 %**, chirurgiens-dentistes **6,03 %**, kinés **0,27 %**.
→ Un kiné est mis en cause **~3,7 fois moins souvent qu'un médecin**, **~22 fois moins qu'un
dentiste**. Environ **1 kiné libéral sur 435 par an**. [DÉDUIT]

**(d) Le risque ordinal — le plus lourd, et le grand absent du ticket 03.** [VU —
[CNOMK, rapport d'activité 2025](https://www.ordremk.fr/wp-content/uploads/2026/07/ra_2025_cnomk_web-1.pdf)]

Sur **~110 000 kinés inscrits** :

| Chambres disciplinaires de première instance | 2025 | 2024 |
|---|---|---|
| Plaintes enregistrées | **313** | 273 |
| Affaires jugées | 247 | 181 |

**Sanctions prononcées en 2025** : **79 interdictions temporaires d'exercer**, 33 blâmes,
25 avertissements, **11 radiations**, 66 absences de sanction.
Motifs enregistrés : **fraudes / facturations / actes fictifs 61**, **contrats 52**, **mœurs 48**,
défaut de qualité et sécurité des soins 38, publicité / exercice commercial 8.

→ ≈ **0,28 plainte disciplinaire pour 100 kinés et par an**, mais **69 % des affaires jugées
aboutissent à une sanction**, et **37 % des issues sont une interdiction temporaire d'exercer**.
[DÉDUIT] Peu fréquent, mais **le coût est la perte totale de revenu pendant la durée**.
**Aucun des motifs dominants n'est informatique.** En revanche, deux le concernent de près :
**« contrats » (52 plaintes)** et **« publicité / exercice commercial » (8)** — c'est-à-dire
exactement le terrain du vocabulaire commercial et des CGV que le ticket 03 signalait déjà comme
incohérent (« rééducation fonctionnelle » vs « coaching sport-santé »).

**(e) Ce que l'assurance ne couvre pas.** [VU, verbatim — MACSF]

> « Nous attirons tout d'abord votre attention sur le **caractère non assurable des sanctions
> pénales et administratives** »
> — [MACSF, RGPD et responsabilité du professionnel de santé libéral](https://www.macsf.fr/responsabilite-professionnelle/cadre-juridique/rgpd-responsabilite-du-professionnel-de-sante-liberal)

Décomposition : une **amende CNIL n'est pas assurable** ; la responsabilité civile envers des
patients victimes d'une fuite est couverte **par la garantie Cyber d'une multirisque
professionnelle, pas par la RCP** ; les frais de défense relèvent de la protection juridique.
⚠️ **Condition LOPMI : dépôt de plainte sous 72 heures** après découverte, sous peine de perte
d'indemnisation.

L'assurance RCP, elle, est **obligatoire** (art. L1142-2 CSP) et son défaut est puni de
**45 000 € d'amende** et d'une interdiction d'exercer (art. L1142-25 CSP).
[[L1142-2](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000025076559) ·
[L1142-25](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006686044/)]

**(f) Le pénal.** Art. **226-13** c. pén. (violation du secret professionnel) : **1 an et 15 000 €**.
Art. **226-17** (défaut de sécurité au sens des art. 24, 25, 30 et 32 RGPD) : **5 ans et 300 000 €**.
**Aucune condamnation d'un praticien libéral sur ces fondements pour un défaut de sécurité
informatique n'a été trouvée** — le contentieux 226-13 devant la Cour de cassation porte sur la
production de pièces en justice et le témoignage du médecin. [non trouvé]

#### Le classement, par espérance de coût annuel

| Rang | Risque | Fréquence sourcée | Coût sourcé | Assurable ? |
|---|---|---|---|---|
| **1** | **Plainte ordinale** | **0,28 %/an** (313 plaintes / 110 000 inscrits) — fraude à la facturation, contrats, mœurs | **79 interdictions temporaires + 11 radiations en 2025** → perte totale de revenu. Montant : non trouvé | protection juridique oui ; perte d'exploitation non |
| **2** | **Mise en cause civile** (dommage corporel en séance) | **0,23 %/an** (MACSF libéraux 2024) | 107/121 réglés à l'amiable ; coût moyen non trouvé ; aucun kiné dans le top 10 des indemnisations | **oui — RCP obligatoire** |
| **3** | **Cyberattaque / fuite via un fournisseur** | **16 %** des &lt; 250 salariés sur 12 mois ; **11 635 notifications** en 2025 dues à **un seul** éditeur pour libéraux de santé | **aucun coût TPE français sourcé** | garantie Cyber d'une multirisque, **pas** la RCP ; plainte sous 72 h |
| **4** | **Perte pure de données** (le disque dur) | non mesurée pour les libéraux | non chiffrée — mais c'est la perte de **50 dossiers depuis 2023** | **non** |
| **5** | **Sanction réglementaire CNIL** | ~20 praticiens libéraux sanctionnés **en neuf ans**, en France | **1 000 à 6 000 €** ; plafond simplifiée **20 000 €** | **non assurable** |

> **Réponse à la question 5.** Ce qui coûte le plus cher à un praticien libéral français, c'est de
> **perdre le droit d'exercer** — 79 interdictions temporaires et 11 radiations en 2025, pour des
> motifs de **facturation, de contrats et de mœurs**. La sanction « données » arrive **dernière**,
> à 1 000-6 000 €, non assurable mais d'un ordre de grandeur dérisoire à côté.
>
> Et le risque le plus probable au quotidien n'est ni l'un ni l'autre : c'est la **perte pure** —
> un disque dur non sauvegardé qui meurt, et cinquante dossiers avec lui. Ça ne se plaide pas, ça
> ne se sanctionne pas, ça se constate.

---

## Ce que tout cela change pour la note de décision

**1. Le HDS est chiffrable, et le chiffre dépend entièrement de l'hébergeur.**
De **+27 €/mois** (Scalingo) à **+210 €/mois** (Clever Cloud). Le ticket 03 disait « quelques
dizaines d'euros » : vrai chez l'un, faux d'un facteur 7 chez l'autre. **Scalingo remplace Clever
Cloud comme meilleur candidat**, sous la réserve du stockage objet.

**2. La question d'ingénierie qui décide le budget n'est pas « quel hébergeur » mais « où vont les
photos ».** En base PostgreSQL : ~49 €/mois, tout compris, HDS. Dans un stockage objet certifié chez
un tiers : 250-300 €/mois, à cause du droit d'entrée (support Business obligatoire chez Scaleway et
OVHcloud, abonnement de 200 € chez Clever Cloud). **C'est un arbitrage technique qui vaut 2 500 €
par an.** Il doit être posé explicitement dans la note, pas subi.

**3. La conclusion « traiter le HDS comme requis » tient — mais pour de meilleures raisons.**
Pas à cause du TJ de Paris (motif déformé), pas à cause des 3 ans / 45 000 € (qui visent
l'hébergeur, pas Manon), pas à cause de 20 M€ / 4 % du CA (hors sujet). Elle tient parce que :
- le **référentiel CNIL pour les cabinets libéraux** dit explicitement qu'en cas d'externalisation,
  **le prestataire doit être certifié** — c'est la source la plus directement applicable, et elle
  ne coûte que 27 €/mois à respecter chez Scalingo ;
- et parce que le geste est **irréversible chez Scalingo** : une ressource non-HDS ne se convertit
  pas. Choisir le HDS au jour 1 coûte 27 €/mois ; y revenir plus tard coûte une refonte.

**4. Le risque de sanction est réel mais petit, et il n'est pas là où la note le cherchait.**
Le mécanisme observé n'est pas l'hébergement — c'est **le refus de donner son dossier à un client,
puis le silence face à la CNIL**. Conséquence concrète pour la spec de l'app : **un export du
dossier client en un clic** et une procédure de réponse sous un mois neutralisent à peu près
intégralement le seul mécanisme de sanction documenté. C'est le meilleur rapport risque/effort du
dossier, devant le choix d'hébergeur.

**5. Le risque qui monte est celui de la chaîne de fournisseurs.** 11 635 notifications en 2025
pour **un seul** éditeur piraté servant des libéraux de santé. Argument en faveur d'une pile à
**un seul fournisseur** (Scalingo ou Clever Cloud, tout compris) plutôt que d'un assemblage
Netlify + Supabase + stockage + monitoring, où chaque brique est une surface d'exposition et un
DPA de plus à tenir.

**6. Et le vrai danger pour Manon n'est pas dans ce document.** C'est l'Ordre, pour des motifs de
**contrats** et de **publicité / exercice commercial** — 60 plaintes sur 313 en 2025. C'est-à-dire
précisément l'incohérence de vocabulaire que le ticket 03 avait repérée sans la relier à ce
risque-là : des CGV qui parlent de « rééducation fonctionnelle » pour une prestation vendue comme
du « coaching sport-santé ». **Ça ne se corrige pas avec un hébergeur, ça se corrige avec un
avocat et une relecture de textes** — et c'est plus urgent que le choix du PaaS.

---

## Sources

**Tarifs**
- [Clever Cloud — API tarifaire publique (runtimes, Cellar)](https://api.clever-cloud.com/v4/billing/price-system?zone_id=par) · [API add-ons (PostgreSQL)](https://api.clever-cloud.com/v2/products/addonproviders) · [API instances](https://api.clever-cloud.com/v2/products/instances) · [page tarifs](https://www.clever.cloud/pricing/)
- [Clever Cloud — Santé (HDS) : 200 €/mois + coefficient 1,4](https://www.clever.cloud/fr/sante-hds/) · [version EN](https://www.clever.cloud/health-hds/) · [Health data hosting — contrat sur devis](https://www.clever.cloud/health-data-hosting/)
- [Clever Cloud — déploiement depuis GitHub](https://www.clever.cloud/developers/doc/ci-cd/github/)
- [Scalingo — tarifs (conteneurs, PostgreSQL Starter/Business, réseau)](https://scalingo.com/pricing) · [add-ons](https://scalingo.com/addons) · [tailles de conteneurs](https://doc.scalingo.com/platform/internals/container-sizes) · [système de fichiers non persistant](https://doc.scalingo.com/platform/app/filesystem) · [déploiement GitHub](https://doc.scalingo.com/platform/deployment/deploy-with-github)
- [Scalingo — HDS : pas de surcoût direct, mais 2 conteneurs et plan DB Business](https://doc.scalingo.com/platform/hds) · [certification HDS 6 activités](https://scalingo.com/hds-certification) · [annexe HDS](https://scalingo.com/gtc-appendix-health-data-hosting)
- [Netlify — tarifs](https://www.netlify.com/pricing/) · [paliers de crédits Pro](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)
- [Supabase — tarifs](https://supabase.com/pricing) · [Neon — tarifs](https://neon.com/pricing)
- [Scaleway — HDS : contrat + support Business/Enterprise obligatoire](https://www.scaleway.com/fr/security-and-compliance/hds/) · [plans de support](https://www.scaleway.com/en/support/) · [tarifs stockage](https://www.scaleway.com/en/pricing/storage/)
- [OVHcloud — conformité HDS](https://www.ovhcloud.com/en/compliance/hds/) · [tarif support Business](https://www.ovhcloud.com/fr/support-levels/business/) · [garanties HDS par produit](https://docs.ovhcloud.com/fr/guides/account-and-service-management/account-information/hds-garanties)

**CNIL**
- [Rapport annuel 2023](https://www.cnil.fr/sites/cnil/files/2024-05/cnil_44e_rapport_annuel_2023.pdf) · [2024](https://www.cnil.fr/sites/cnil/files/2025-04/rapport_annuel_2024.pdf) · [2025](https://www.cnil.fr/sites/cnil/files/2026-05/rapport_annuel_2025.pdf)
- [Liste officielle des sanctions](https://www.cnil.fr/fr/les-sanctions-prononcees-par-la-cnil) · [bilan 2024](https://www.cnil.fr/fr/sanctions-et-mesures-correctrices-bilan-2024-de-laction-de-la-cnil) · [bilan 2025](https://www.cnil.fr/fr/bilan-sanctions-2025) · [procédure simplifiée](https://www.cnil.fr/fr/la-procedure-de-sanction-simplifiee)
- [Les contrôles de la CNIL en 2025](https://www.cnil.fr/fr/les-controles-de-la-cnil-en-2025) · priorités [2020](https://www.cnil.fr/fr/quelle-strategie-de-controle-pour-2020) · [2021](https://www.cnil.fr/fr/cybersecurite-donnees-de-sante-cookies-les-thematiques-prioritaires-de-controle-en-2021) · [2023](https://www.cnil.fr/fr/thematiques-prioritaires-de-controle-2023-cameras-augmentees-applications-mobiles-fichiers-bancaires) · [2026](https://www.cnil.fr/fr/controles-prioritaires-2026)
- [**Référentiel « gestion des cabinets médicaux et paramédicaux », délib. n° 2020-081 du 18 juin 2020**](https://www.cnil.fr/sites/default/files/atoms/files/referentiel_-_cabinet.pdf) — la source la plus directement applicable
- [SAN-2020-014](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000042675720) · [SAN-2020-015](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000042676787) · [CE, 22/07/2022, n° 449694](https://www.legifrance.gouv.fr/ceta/id/CETATEXT000046082429) · [SAN-2017-008](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000034899556/) · [SAN-2024-013 (Cegedim, 800 000 €)](https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000050202759) · [Hôpital privé de la Loire, 500 000 €](https://www.cnil.fr/fr/sanction-hopital-prive-loire)

**Jurisprudence et textes**
- [TJ Paris, RG n° 20/54799, 6 novembre 2020 — minute intégrale (PDF)](https://web.lexis360.fr/LexisActu/20-54799%20Conseil%20national%20de%20l'Ordre%20des%20Medecins.pdf) · [fiche Doctrine](https://www.doctrine.fr/d/TJ/Paris/2020/UB8E8F05888718DA8B81B) · [CA Paris, 18/02/2022, n° 20/16331 (notice)](https://www.lexbase.fr/jurisprudence/79198460-ca-paris-1-8-18-02-2022-n-20-16331-confirmation) · [DSIH](https://www.dsih.fr/article/3975/fermeture-des-sites-d-arret-maladie-en-ligne.html) · [Next](https://next.ink/article/29990/108614-pourquoi-arretmaladie-fr-a-t-il-ete-mis-en-demeure-fermer) · [societe.com — DOCTEURSECU](https://www.societe.com/societe/docteursecu-853238632.html)
- [L1111-8 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049577902) · [L1115-1 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862544) · [L1142-2](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000025076559) · [L1142-25](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006686044/) · [226-13 c. pén.](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006417945) · [226-17 c. pén.](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037825504)
- [TGI Marseille, 7 juin 2017 — commentaire Life Avocats](https://www.life-avocats.com/donnees-de-sante-la-justice-sanctionne-un-responsable-de-traitement-tgi-marseille-6eme-ch-corr-07-06-2017/) · [Lexing](https://www.lexing.law/avocats/hebergement-traitement-illicite-de-donnees-de-sante/2017/09/28/)

**Risque non réglementaire**
- [MACSF — sinistralité des masseurs-kinésithérapeutes 2024](https://www.macsf.fr/le-risque-des-professionnels-de-sante-en-2024/risque-des-professions-de-sante/m/masseurs-kinesitherapeutes) · [chiffres clés 2024 (PDF)](https://www.macsf.fr/content/download/45582/file/Chiffres%20Cl%C3%A9s%20Rapport%20annuel%202024%20VF2.pdf) · [RGPD et RCP](https://www.macsf.fr/responsabilite-professionnelle/cadre-juridique/rgpd-responsabilite-du-professionnel-de-sante-liberal)
- [CNOMK — rapport d'activité 2025 (PDF)](https://www.ordremk.fr/wp-content/uploads/2026/07/ra_2025_cnomk_web-1.pdf) · [2024](https://www.ordremk.fr/wp-content/uploads/2025/09/ra_cnomk_2024_web.pdf) · [jurisprudence ordinale](https://jurisprudence.ordremk.fr/)
- [cybermalveillance.gouv.fr — rapport d'activité 2025 (PDF)](https://www.cybermalveillance.gouv.fr/medias/2026/03/RA_2025_Cybermalveillance_gouv_fr.pdf) · [baromètre maturité cyber TPE-PME 2025](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/etude-maturite-cyber-tpe-pme-2025)
- [ANS / CERT Santé — observatoire des incidents 2024 (PDF)](https://esante.gouv.fr/sites/default/files/media_entity/documents/observatoire-incidents-cybersecurite-sante-2024.pdf)
- [Asterès / CRiP — coût des cyberattaques réussies, juin 2023 (PDF)](https://asteres.fr/site/wp-content/uploads/2023/06/ASTERES-CRIP-Cout-des-cyberattaques-reussies-16062023.pdf) — ⚠️ exclut explicitement TPE et PME du calcul de coût

**Chiffres à ne pas reprendre** *(publication primaire introuvable)*
- « 50 000 € de coût médian pour une PME, Asterès/MEDEF 2024 »
- « 466 000 € pour une TPE/PME, Groupama 2025 »
- Paliers de crédits Netlify Pro cités par des comparateurs : ceux du tableau ci-dessus viennent de
  la documentation officielle, pas des comparateurs.

