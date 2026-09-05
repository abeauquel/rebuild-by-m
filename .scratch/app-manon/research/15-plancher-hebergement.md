# 15 — Le plancher réel de l'hébergement : un seul petit serveur, et ce qu'il coûte ailleurs

> **Avertissement.** Recherche documentaire, faite par un non-juriste. Prix relevés le
> **5 septembre 2026**, chacun avec son URL. **[VU]** = lu sur la page ou l'API du fournisseur.
> **[DÉDUIT]** = calcul ou raisonnement de ma part. **[TIERS]** = chiffre publié par un tiers, non
> confirmé sur le site du fournisseur — à traiter comme provisoire. Ce qui n'a pas été trouvé est
> écrit « non relevé », jamais comblé.
>
> Cette note **complète** [`12-couts-hebergement-et-risque-reel.md`](12-couts-hebergement-et-risque-reel.md)
> (prix des PaaS, volet HDS, risque CNIL) et [`14-rampe-de-cout-medias.md`](14-rampe-de-cout-medias.md)
> (prix au Go, quotas, egress). Elle ne refait aucun de leurs chiffres. Elle répond à une objection
> qu'aucune des deux n'avait instruite : **45 $/mois pour dix utilisateurs, c'est cher — quel est le
> plancher du marché ?**

---

## Le résultat, en trois phrases

1. **L'objection est fondée, et l'hypothèse des deux sièges Netlify était fausse.** La praticienne
   n'a jamais eu besoin d'un siège. Et de toute façon Netlify Pro n'est plus facturé par membre.
2. **Le plancher du marché est à 3,81 € HT / 4,57 € TTC par mois** — un VPS OVHcloud, sauvegarde
   quotidienne incluse, trafic illimité, en France. C'est **12 fois moins** que les 45 $ chiffrés.
3. **Et il ne faut probablement pas le prendre**, pour trois raisons qui n'ont rien à voir avec le
   prix : ~35 h d'administration par an, aucune couverture HDS, et — le point le plus sérieux —
   **l'auto-hébergement déplace le risque pénal de l'art. L1115-1 CSP sur Alex** (§ 3.4).

---

# Partie 1 — L'hypothèse des deux sièges Netlify

## 1.1 Combien de membres faut-il réellement ? **Un.**

Le chiffrage initial comptait deux sièges Netlify à 19 $ : un pour le développeur, un pour la
praticienne. **Les deux moitiés de cette hypothèse sont fausses.**

**Faux n° 1 — la praticienne n'a pas besoin d'un compte Netlify.** Un membre d'équipe Netlify est
quelqu'un qui accède au *tableau de bord* : déclencher un déploiement, lire les logs de build,
changer une variable d'environnement, gérer un domaine. Manon fait exactement zéro de ces choses.
Elle ouvre une URL et se connecte à l'application avec **le compte applicatif** que l'app gère
elle-même (Supabase Auth, ou équivalent) — un utilisateur en base, pas un siège chez l'hébergeur.
Confondre les deux, c'est confondre « utilisateur du produit » et « administrateur de la
plateforme ». **Il faut un seul siège : celui d'Alex.** [DÉDUIT — mais c'est une déduction sans
zone grise.]

*Corollaire à garder en tête pour toute la note :* cette confusion n'est pas propre à Netlify. Elle
gonfle aussi la facture chez Render (Hobby = **1 seul siège** [VU]) et partout où le plan d'entrée
est mono-utilisateur. La bonne question n'est jamais « combien d'utilisateurs a l'app » mais
**« combien de personnes ouvrent la console d'administration »**. Ici : une.

**Faux n° 2 — Netlify ne facture plus au membre.** La note 12 l'avait déjà relevé et c'est confirmé
sur la page tarifaire : **Pro = 20 $/mois, `unlimited members`** [VU —
<https://www.netlify.com/pricing/>]. La documentation de facturation le redit dans la ligne
d'add-ons : « Team members: N/A | N/A | **Unlimited (included in plan)** » pour Free / Personal /
Pro [VU —
[credit-based-pricing-plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)].
Le « 19 $ par membre » est un tarif historique.

> **Donc le raisonnement « 2 × 19 $ » était doublement caduc : le second siège n'existe pas, et le
> prix au siège non plus.** Ça ne change pas le total de 45 $ (qui reposait déjà sur 20 $ + 25 $),
> mais ça retire la *justification* qu'on donnait pour ne pas rester sur Free. Il faut la
> remplacer par la vraie, et elle est ailleurs.

## 1.2 Ce qu'on perd exactement en restant sur Netlify Free

Relevé ligne à ligne sur la documentation de facturation [VU, mêmes URL que ci-dessus] :

| | Free | Personal 9 $ | Pro 20 $ |
|---|---|---|---|
| Crédits/mois | **300, plafond dur** | 1 000 | 3 000 |
| Recharge de crédits | **aucune** — « Hard limit so no recharge option » | 500 cr / 5 $ | 1 500 cr / 10 $ |
| Report des crédits inutilisés | non | non | à partir de 5 000 cr |
| Membres du tableau de bord | 1 *(note 14)* | 1 | illimités |
| **Protection par mot de passe** | **N/A** | **N/A** | ✓ |
| Détection de secrets | — | ✓ | ✓ |
| Rétention analytics / RUM | jour courant | 24 h | 30 j |
| Journaux d'audit | N/A | N/A | ✓ (7 j) |
| Support | **standard email** | priority email | priority email |

**Sur les rollbacks : la documentation tarifaire ne les mentionne dans aucun plan** [VU — absence
vérifiée sur les deux pages de facturation]. Ce n'est pas une ligne de différenciation : chez
Netlify, chaque déploiement reste servi à une URL immuable et la restauration d'un déploiement
antérieur fait partie du fonctionnement de base. **Je n'ai trouvé aucune source disant que Free
perd le rollback — et je ne l'affirme donc pas.** [non trouvé]

**Sur les previews protégées par mot de passe : la perte est réelle et documentée.** La protection
par mot de passe est marquée `N/A` sur Free **et sur Personal**, `✓` sur Pro. Pour une app de
santé, mettre une preview publique en ligne avec des données de test réalistes serait une faute —
mais la parade ne coûte rien : **on ne met pas de données réelles dans une preview**. C'est une
règle d'hygiène, pas un achat.

## 1.3 Le plafond de 300 crédits éteint-il vraiment le site ? **Oui, littéralement.**

C'est le point qui décide, et il est écrit noir sur blanc [VU, verbatim —
[how-credits-work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)] :

> « Once your credit balance is completely used up, **all of your web projects (sites/apps) are
> paused** and visitors to your web projects will find a **`Site not available`** page at each of
> your web project's URLs. »

Et sur Free, **aucune issue** : « Free: **Hard limit so no recharge option** », et la ligne
« Ability to buy more credits with auto recharge : **N/A** » [VU].

Traduit dans le modèle de la note 14 : 300 crédits ≈ **7 Go de bande passante** une fois retirés les
déploiements et les requêtes — soit **~175 lectures de vidéo de 40 Mo**. Le palier 1 en consomme
déjà 285 %. **Le site s'éteindrait avant la fin du premier mois de production**, et il resterait
éteint jusqu'au cycle suivant. Pour une praticienne qui envoie le lien à un client, c'est
disqualifiant — pas « risqué », disqualifiant.

## 1.4 Peut-on relever le plafond sans passer Pro ? **Oui — et c'est le vrai correctif.**

**Personal, à 9 $/mois**, apporte les trois choses qui manquent réellement : **1 000 crédits**
(~3,3 ×), **la recharge automatique** (500 crédits pour 5 $, donc plus jamais de site éteint), et
la détection de secrets. Il ne donne ni membre supplémentaire (inutile) ni protection par mot de
passe (contournable par l'hygiène).

**Le bon assemblage n'est donc ni Free ni Pro :**

| Assemblage | Prix | Le site peut-il s'éteindre ? |
|---|---|---|
| Netlify **Free** + Supabase Pro | **25 $** | **oui, dès le mois 1** |
| Netlify **Personal** + Supabase Pro | **34 $** | non (recharge auto) |
| Netlify Pro + Supabase Pro *(chiffrage actuel)* | 45 $ | non |

> ### Réponse à l'angle 1
>
> **Netlify Free + Supabase Pro à 25 $ n'est pas défendable pour une app professionnelle** — non
> pas à cause des sièges, mais parce que le plafond de crédits **arrête le service** et qu'aucune
> recharge n'est possible. Le risque n'est pas théorique : le budget de 300 crédits est dépassé
> **au palier 1**.
>
> **En revanche, les 45 $ sont bien surévalués de 11 $.** Le plan Pro n'achète ici que la
> protection par mot de passe des previews et 30 jours d'analytics. **Netlify Personal + Supabase
> Pro = 34 $/mois** est la version honnête de cette pile. Et si le trafic médias sort par les URL
> signées de Supabase Storage plutôt que par Netlify (levier 5 de la note 14, coût de mise en œuvre
> nul), **1 000 crédits suffisent très largement** à tous les paliers.
>
> ⚠️ Rappel qui domine tout : cette pile reste **inéligible au HDS à tout prix** (note 12). Le
> passage de 45 à 34 $ ne la rend pas retenable, il la rend seulement correctement chiffrée.

---

# Partie 2 — Le plancher réel du marché

C'est l'étalon manquant : on n'avait comparé que des plateformes managées entre elles. Voici ce que
coûte « un seul petit serveur », qui est la référence face à laquelle 45 $ paraît cher.

## 2.1 OVHcloud — VPS : **le plancher, et il est français**

[VU — <https://www.ovhcloud.com/fr/vps/>, gamme « VPS 2027 », prix HT **et** TTC affichés côte à côte]

| Plan | vCores | RAM | Disque | Bande passante | **HT/mois** | **TTC/mois** |
|---|---|---|---|---|---|---|
| **VPS-1** | 2 | **4 Go** | **40 Go SSD NVMe** | illimitée, 500 Mbit/s | **3,81 €** | **4,57 €** |
| VPS-2 | 4 | 8 Go | 75 Go NVMe | illimitée, 1 Gbit/s | 7,21 € | 8,65 € |
| VPS-3 | 6 | 12 Go | 100 Go NVMe | illimitée, 2 Gbit/s | 10,40 € | 12,48 € |
| VPS-4 | 8 | 24 Go | 200 Go NVMe | illimitée, 3 Gbit/s | 19,96 € | 23,95 € |

**Inclus sans supplément** [VU, verbatim] : « **Sauvegarde automatisée 1 jour** » — « Une sauvegarde
quotidienne est **incluse gratuitement** avec votre VPS » — plus l'anti-DDoS et le **trafic
illimité**.

**Options de sauvegarde** [VU] : *Sauvegarde automatique Premium*, « restauration sur 7 jours
glissants », **à partir de 1,10 € HT / 1,32 € TTC** par mois. *Snapshots* : à partir de **0,30 € HT
/ 0,36 € TTC**.

⚠️ Les prix sont affichés « **à partir de** », ce qui chez OVHcloud désigne le tarif avec engagement
de 12 mois. **Le prix sans engagement n'est pas affiché sur la page** [non relevé] — il est
généralement supérieur. À vérifier au tunnel de commande avant de figer un budget.

**Pile complète pour notre gabarit** : VPS-1, tout dessus (app + PostgreSQL + médias sur le disque
de 40 Go, ce qui couvre les 18 Go du palier 3), + sauvegarde Premium 7 jours.
→ **4,91 € HT / 5,89 € TTC par mois.** Egress : **0 €**, trafic illimité. [DÉDUIT — assemblage de
prix VU]

## 2.2 OVHcloud — Public Cloud : plus cher que son propre VPS

Relevé sur **l'API du catalogue public OVHcloud**, qui est la source qui alimente les pages
tarifaires : `https://api.ovh.com/v1/order/catalog/public/cloud?ovhSubsidiary=FR`. Prix **HT**. [VU]

| Instance | vCore | RAM | Disque | €/h | **€/mois** |
|---|---|---|---|---|---|
| **d2-2** | 1 | 2 Go | 25 Go NVMe | 0,0104 | **5,71 €** |
| **d2-4** | 2 | 4 Go | 50 Go NVMe | 0,0206 | **11,44 €** |
| d2-8 | 4 | 8 Go | 100 Go | 0,0372 | 20,60 € |
| b3-8 | 2 | 8 Go | 50 Go | 0,0512 | — |
| b2-7 | — | 7 Go | — | 0,0709 | 25,17 € |

**Object Storage** (clés `storage-*.monthly.postpaid`) [VU] :

| Classe | €/Go/mois HT |
|---|---|
| **Standard (S3)** | **0,007 €** |
| Swift standard | 0,011 € |
| High Perf | 0,018 € |

**Et le chiffre qui compte le plus : l'egress est à zéro.** Toutes les lignes `bandwidth_*_out`
du catalogue — `bandwidth_instance_out`, `bandwidth_storage-standard_out`,
`bandwidth_storage-standard-3AZ_out`, `bandwidth_storage-high-perf_out` — portent
**`price: 0`** [VU, API]. Sortie de données gratuite, sur les instances comme sur le stockage objet.

**Managed Databases PostgreSQL** [VU, API] : la plus petite offre facturée est
`postgresql-essential-db1-4` à **54,46 €/mois HT**. C'est **plus cher que toute la pile Scalingo
HDS** (48,80 €, note 12). → **La base managée d'OVHcloud est hors sujet à cette échelle** ; sur
Public Cloud comme sur VPS, il faudrait installer PostgreSQL soi-même.

> **Observation contre-intuitive** : chez OVHcloud, **le VPS à 3,81 € est trois fois moins cher que
> l'instance Public Cloud comparable** (d2-4 à 11,44 €) pour des caractéristiques voisines, et il
> inclut en plus une sauvegarde quotidienne. Le Public Cloud n'a d'intérêt ici que si l'on veut son
> Object Storage à 0,007 €/Go — soit **0,13 €/mois** pour les 18 Go du palier 3.

## 2.3 Hetzner — moins cher encore sur le papier, mais les prix ont augmenté en juin 2026

**Fait à signaler avant tout chiffre** : Hetzner a procédé à un **ajustement tarifaire le 15 juin
2026**, qui touche les serveurs dédiés **et** les serveurs cloud. Les hausses vont de +22 % sur les
petites machines à **+128 %** sur les CPX et **+169 %** sur les CCX. La page est publique et donne
l'ancien et le nouveau prix, ligne par ligne. [VU —
<https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/>]

Extrait de la table **Germany (FSN/NBG) / Finlande (HEL)**, colonnes « Old price » → « New price »,
**hors IPv4** et — mention explicite du document — **hors TVA** :

| Produit | Ancien €/mois | **Nouveau €/mois HT** | Variation |
|---|---|---|---|
| **CX23** | 3,99 | **5,49** | +38 % |
| CX33 | 6,49 | 8,49 | +31 % |
| CX43 | 11,99 | 15,99 | +33 % |
| **CAX11** *(ARM)* | 4,49 | **5,99** | +33 % |
| CAX21 *(ARM)* | 7,99 | 10,49 | +31 % |
| **CPX22** | 7,99 | **19,49** | **+144 %** |
| CPX32 | 13,99 | 35,49 | +154 % |
| CCX13 *(vCPU dédié)* | 15,99 | 42,99 | +169 % |
| CCX63 | 374,49 | 853,49 | +128 % |

Spécifications du **CX23 : 2 vCPU partagés, 4 Go de RAM, 40 Go NVMe** [TIERS —
[sparecores.com/server/hcloud/cx23](https://sparecores.com/server/hcloud/cx23) ; non relevé sur
hetzner.com, dont la page tarifaire charge ses prix en JavaScript et bloque l'accès automatisé].
Pour référence, la génération précédente CX22 (2 vCPU / 4 Go / 40 Go) annonçait **20 To de trafic
inclus** [VU — <https://www.hetzner.com/pressroom/new-cx-plans/>, 6 juin 2024] ; le volume inclus du
CX23 n'a pas été relevé.

**TVA** : Hetzner affiche des prix **hors taxes** et applique la TVA du pays du client. L'endpoint
de géolocalisation du site le confirme pour la France : `{"currency":"EUR","vat":{"code":"fr","tax":20}}`
[VU — <https://www.hetzner.com/geo/init/>]. → **CX23 = 5,49 € HT / 6,59 € TTC.**

**Localisation** : Falkenstein et Nuremberg (Allemagne), Helsinki (Finlande) — **UE** [VU].

**Non relevé, et à ne pas inventer** : le supplément IPv4 (le tableau dit seulement « excl. IPv4 »),
le prix des sauvegardes automatiques, et les tarifs Storage Box (BX11 à BX41). Les quatre pages
concernées affichent leurs prix par un composant JavaScript qui ne s'est pas hydraté, et le site a
fini par renvoyer une page « Request on Hold » anti-robot. **Ces chiffres sont donc absents de cette
note.**

**Hetzner Object Storage** : base de **4,99 €/mois** incluant **1 To de stockage et 1 To d'egress**,
puis 0,0067 €/To-heure de stockage et **1,00 €/To** de trafic sortant. [TIERS — repris de la
couverture presse du lancement ; la page produit
<https://www.hetzner.com/storage/object-storage/> confirme **la structure** (« base price of ___ per
month… includes 1 TB of storage… and 1 TB of egress traffic », « All prices are exclusive of VAT »)
mais **les montants n'y sont pas rendus**.] Trafic entrant, trafic interne et appels d'API S3
**gratuits** [VU, FAQ de la page produit]. Localisations : FSN1, HEL1, NBG1 — **UE** [VU].

**Pile complète** : CX23, tout dessus, + sauvegardes → **~5,49 € HT / 6,59 € TTC**, plus IPv4 et
sauvegardes non chiffrés. En pratique **~7 € HT / ~8,40 € TTC** [DÉDUIT, avec deux inconnues].

## 2.4 Scaleway — le prix affiché inclut l'egress, le stockage est à part

[VU — <https://www.scaleway.com/en/pricing/virtual-instances/>, zone **PAR-1**, prix **HT**.
Mention en tête de page, verbatim : « **List prices include egress and IPv6 addresses.** Storage
(local, block) and attached public IPv4 addresses are excluded. »]

| Instance | vCPU | RAM | Bande passante | €/h | **≈ €/mois** |
|---|---|---|---|---|---|
| **STARDUST1-S** | 1 | 1 Go | 100 Mbps | 0,0006 | **~0,43 €** |
| **DEV1-S** | 2 | 2 Go | 200 Mbps | 0,00898 | **~6,55 €** |
| DEV1-M | 3 | 4 Go | 300 Mbps | 0,0202 | ~14,74 € |
| **PLAY2-PICO** | 1 | 2 Go | 100 Mbps | 0,01428 | **~10,42 €** |
| PLAY2-NANO | 2 | 4 Go | 200 Mbps | 0,02754 | ~20,10 € |
| BASIC2-A2C-4G | 2 | 4 Go | 200 Mbps | 0,023 | ~16,79 € |

**Stockage** [VU — <https://www.scaleway.com/en/pricing/storage/>] : Object Storage **One Zone
0,00803 €/Go/mois**, Multi-AZ 0,01606 €, Glacier 0,00254 € ; **75 Go d'egress gratuits par mois**
puis 0,01 €/Go ; ingress et requêtes inclus. Block Storage 5K : **0,0993 €/Go/mois**.

**Managed PostgreSQL** [VU — <https://www.scaleway.com/en/pricing/managed-databases/>, région
Paris] : le plus petit nœud **DB-DEV-S** (2 vCPU, 2 Go) est à **0,0156 €/h ≈ 11,39 €/mois**, plus
Block Storage 5K à 0,0993 €/Go/mois et **sauvegardes/snapshots à 0,03 €/Go/mois**. C'est la seule
base managée du panel de cette note qui reste dans l'ordre de grandeur d'un petit projet — les
autres (OVHcloud 54 €, Fly.io 38 $) sont hors jeu.

**Pile complète** : DEV1-S (6,55 €) + Block Storage 40 Go (3,97 €) + snapshots 40 Go (1,20 €)
≈ **11,72 €/mois HT**, plus l'IPv4 publique [prix **non relevé**]. Avec la base managée DB-DEV-S à
la place d'un PostgreSQL auto-installé : **~23 €/mois HT**. [DÉDUIT — assemblage de prix VU]

## 2.5 Fly.io, Render, Railway — les paliers d'entrée réels

### Fly.io [VU — <https://fly.io/docs/about/pricing/> et <https://fly.io/docs/mpg/>]

- Pas de plans nommés : **facturation purement à l'usage**.
- Plus petite machine : **shared-cpu-1x, 256 Mo = 2,02 $/mois** (Amsterdam). *Le prix des tailles
  512 Mo et 1 Go n'a pas été relevé.*
- Volumes persistants : **0,15 $/Go/mois** de capacité provisionnée. Snapshots : **0,08 $/Go/mois**,
  **10 premiers Go gratuits**.
- Egress UE : **0,02 $/Go** vers l'internet public ; 0,006 $/Go entre régions en réseau privé.
- **Managed Postgres** : Basic (shared-2x, 1 Go) = **38 $/mois** ; Starter (2 Go) = 72 $ ; stockage
  **0,28 $/Go** provisionné. Sauvegardes, HA et pooling inclus.

> ⚠️ **Le plancher managé de Fly.io est plus élevé que celui de Scalingo en HDS.** 38 $ pour une
> base de 1 Go, contre 20 € pour le plan Business 512M certifié HDS avec 10 Go de disque, PITR 7 j
> et rétention 12 mois (note 14). **Si Postgres est managé, Fly.io n'est pas une option
> économique.** En auto-géré (PostgreSQL dans une Machine + un volume), la pile tombe à
> **~8 à 12 $/mois** [DÉDUIT, avec le prix de la machine 512 Mo manquant].

### Render [VU — <https://render.com/pricing>]

| Poste | Prix |
|---|---|
| Workspace **Hobby** | **0 $/mois** + compute · **1 seul siège** |
| Workspace Pro | 25 $/mois + compute · Scale 499 $ |
| Web service, < 1 CPU / 512 Mo | **7 $/mois** *(un palier gratuit existe, « limitations apply »)* |
| Web service, 1 CPU / 2 Go | 25 $/mois |
| **PostgreSQL, < 1 CPU / 256 Mo** | **6 $/mois** — 1 Go SSD inclus, extensible à **0,30 $/Go** |
| PostgreSQL, < 1 CPU / 1 Go | 19 $/mois |
| Disque persistant | **0,25 $/Go/mois** |
| Bande passante | **5 Go inclus/mois**, puis **0,15 $/Go** |
| Rollbacks instantanés | inclus dès Hobby (5 builds conservés) |
| PITR | fenêtre de **3 jours** |
| Minutes de build | 500/mois incluses, puis 5 $ / 1 000 min |

Sauvegardes : « **Logical backup for paid instances** » + PITR — donc **incluses dès le plan
PostgreSQL à 6 $**. Région UE : **Francfort** [VU — <https://render.com/docs/regions>]. Conformité
affichée : GDPR DPA, SOC 2 Type II, ISO 27001 ; **HIPAA BAA réservé aux plans supérieurs**, **aucune
mention de HDS**.

**Pile complète Hobby** : 7 $ (web) + 6 $ (Postgres) + 5 $ (disque 20 Go) + 2,25 $ (15 Go de bande
passante au-delà des 5 inclus, au palier 3) ≈ **20 $/mois**. [DÉDUIT]
Avec la base à 1 Go (plus réaliste) : **33 $/mois**.

### Railway [VU — <https://railway.com/pricing> et <https://docs.railway.com/reference/regions>]

| Plan | Prix | Usage inclus |
|---|---|---|
| Trial | 0 $ | 5 $ de crédit une fois, 30 j |
| Free | 0 $ | 1 $/mois |
| **Hobby** | **5 $/mois** | **5 $/mois d'usage inclus** |
| Pro | 20 $/mois par workspace | 20 $/mois · **sièges illimités** |

Tarifs des ressources : mémoire **~0,0139 $/Go-heure** (≈ 10 $/Go-mois), CPU **~0,0278 $/vCPU-heure**
(≈ 20 $/vCPU-mois), volumes **0,15 $/Go/mois**, **egress 0,05 $/Go**, object storage 0,015 $/Go-mois.
Région UE : **EU West Metal, Amsterdam (`europe-west4-drams3a`)** [VU]. Sauvegardes : **non
documentées sur la page tarifaire** [non trouvé].

**Pile complète Hobby** : app (0,5 Go + 0,25 vCPU ≈ 10 $) + PostgreSQL (idem ≈ 10 $) + volume 20 Go
(3 $) + egress 20 Go (1 $) ≈ 24 $ d'usage, dont 5 $ inclus → **~24 $/mois tout compris**. [DÉDUIT]

> **Railway se paie à la ressource, et ses ressources sont chères** : 10 $/Go de RAM par mois, c'est
> **7 fois** le prix de la RAM d'un VPS OVH (4 Go pour 3,81 €). Et son egress à 0,05 $/Go est le
> deuxième plus cher du panel, derrière Netlify (0,133 $/Go, note 14).

## 2.6 Coolify / Dokku sur VPS — ce que ça change vraiment

**Coolify** [VU — <https://coolify.io/pricing>] : **auto-hébergé gratuit**, open source, « Full
access to all features », « No limitation or restrictions ». Option **Coolify Cloud à 5 $/mois**
pour 2 serveurs (+3 $ par serveur supplémentaire) — dans ce cas c'est le *plan de contrôle* qui est
managé, les applications tournant toujours sur vos propres serveurs. **Dokku** : open source,
gratuit, sans offre cloud.

**Ce que ça apporte, concrètement** : le déploiement par `git push`, les certificats Let's Encrypt
automatiques, les variables d'environnement, les conteneurs, une base PostgreSQL en un clic, des
sauvegardes programmées. C'est-à-dire **la couche d'ergonomie d'un PaaS, sur une machine à soi**.

**Ce que ça n'apporte pas, et c'est le point** : les mises à jour du système d'exploitation, la
supervision, le test de restauration, la réponse aux incidents — et **Coolify lui-même devient une
brique à maintenir**, avec ses propres mises à jour et ses propres pannes. On échange une partie du
travail contre une dépendance de plus. **Le gain est réel mais partiel : il supprime le travail de
déploiement, pas le travail d'exploitation.** [DÉDUIT]

**Pile complète** : OVH VPS-1 + Coolify auto-hébergé = **3,81 € HT / 4,57 € TTC**. C'est le plancher
absolu de cette note.

---

# Partie 3 — Ce que le prix bas achète, et ce qu'il coûte ailleurs

## 3.1 Le travail d'administration, estimé honnêtement

Aucun fournisseur ne publie ce chiffre : c'est **entièrement une estimation de ma part** [DÉDUIT].
Je la donne poste par poste pour qu'elle soit discutable plutôt que crue sur parole.

**Mise en place, une fois** — système, pare-feu, utilisateur non-root, Docker ou Coolify,
PostgreSQL, TLS, script de sauvegarde **et sa restauration testée**, supervision et alerte :
**16 à 32 h**.

**Régime permanent, par an** :

| Poste | h/an |
|---|---|
| Mises à jour système et redémarrages (~1 h/mois) | 12 |
| Renouvellement de certificats — automatisé, mais il casse une fois par an | 2 |
| Vérification des sauvegardes + **un test de restauration réel** | 4 |
| Montées de version mineures de PostgreSQL | 2 |
| Montée de version majeure (SE ou PostgreSQL) tous les 2-3 ans, amortie | 3 |
| Réponse aux CVE critiques (OpenSSL, noyau, image de base) | 3 |
| Incidents : disque plein, OOM, panne du fournisseur, alerte de sécurité | 4 à 8 |
| **Total** | **~30 à 35 h/an** |

Avec Coolify ou Dokku, retirer le déploiement et les certificats mais **ajouter la maintenance du
PaaS lui-même** : **~22 à 28 h/an**. Avec Fly.io et PostgreSQL auto-géré : l'hôte est géré, la base
non → **~15 à 20 h/an**. Avec un PaaS complet (Render, Railway, Netlify+Supabase, Scalingo, Clever
Cloud) : **~3 à 6 h/an**.

**Le calcul qui tranche** : passer d'un PaaS à ~45 € à un VPS à ~5 € économise **~480 €/an**. Le
surcroît de travail est de **~28 h/an**. **Cela valorise le temps d'Alex à environ 17 €/heure** —
et encore, hors les 16 à 32 h d'installation. Si son temps vaut plus que 17 €/h, **le VPS est une
perte sèche**, et pas de peu.

## 3.2 Le socle qu'un PaaS fournit sans qu'on y pense

C'est la colonne invisible du tableau. Sur un VPS nu, chacune de ces lignes est du travail ; sur un
PaaS, aucune n'est une décision.

Système d'exploitation à jour · certificats TLS renouvelés · sauvegardes quotidiennes **avec un
bouton de restauration** · PITR · redémarrage automatique après incident · métriques et journaux
conservés · rollback d'un déploiement raté · isolation réseau · protection DDoS · une adresse
d'assistance qui répond · et — le seul qui ne s'achète nulle part ailleurs — **une posture de
conformité opposable** : DPA, certifications, et le cas échéant le certificat HDS.

## 3.3 Aucune de ces options n'est certifiée HDS. Aucune.

**Il faut l'écrire sans nuance : Hetzner, Fly.io, Render, Railway, Coolify et Dokku ne sont pas
certifiés HDS**, et un VPS OVHcloud ou une instance Scaleway prise en libre-service **ne l'est pas
davantage**.

Et le détour par le HDS chez ces deux fournisseurs français ne sauve rien, parce que la note 12 en
a déjà relevé le prix d'entrée [VU, note 12] : **contrat HDS + avenant Healthcare, et surtout plan
de support Business obligatoire — minimum 250 €/mois HT** chez l'un comme chez l'autre.

> **La conséquence est le renversement le plus net de cette note.** Un VPS OVHcloud rendu
> réellement conforme coûterait **3,81 € + 250 € ≈ 254 €/mois** — soit **cinq fois** la pile
> Scalingo HDS complète à 48,80 € (note 12). **La voie « petit serveur pas cher » devient, si l'on
> exige le HDS, la plus chère de toutes.** Le plancher à 4 € et le HDS ne coexistent pas.

## 3.4 Le point qu'on n'avait pas vu : l'auto-hébergement déplace le risque pénal sur Alex

La note 12 avait établi un résultat rassurant : l'art. **L1115-1 CSP** (3 ans, 45 000 €) vise
**« la prestation d'hébergement »**, donc l'hébergeur — pas le professionnel de santé qui lui confie
ses données. C'est pourquoi Manon n'est pas la cible.

**Mais ce raisonnement suppose qu'il existe un hébergeur en face.** Sur un VPS nu, les activités
d'hébergement HDS n° 3 à 6 du référentiel — mise à disposition d'infrastructure virtuelle,
hébergement applicatif, sauvegarde externalisée, administration et supervision — **ne sont plus
exécutées par OVHcloud ou Hetzner : elles sont exécutées par Alex.** Le fournisseur ne vend plus
que les activités 1 et 2 (hébergement physique). Si Alex assure les autres **pour le compte de**
Manon, il se place lui-même dans la définition de l'art. L1111-8 — et donc dans le champ de la
sanction de l'art. L1115-1.

⚠️ **[DÉDUIT — raisonnement à partir de textes lus, pas un avis juridique, et à faire confirmer.]**
Je le signale parce que c'est asymétrique et rarement dit : **le VPS ne fait pas qu'ajouter du
travail, il transfère un risque de la catégorie « amende administrative de quelques milliers
d'euros » (le risque de Manon, note 12, § 2) vers la catégorie « infraction pénale » (le risque de
l'hébergeur), et il le transfère sur le développeur.** À 40 €/mois d'économie, ce n'est pas un
arbitrage rationnel.

---

# Le tableau unique, du moins cher au plus cher

Piles complètes pour le gabarit de la note 14 (app + PostgreSQL + ~18 Go de médias + ~20 Go
d'egress/mois au palier 3). **HT sauf mention.** Les lignes marquées ⬛ viennent des notes 12 et 14
et sont rappelées pour l'échelle.

| # | Pile | **Prix/mois** | HDS | UE | Sauvegardes | **Admin/an** |
|---:|---|---|:---:|:---:|---|---:|
| 1 | **OVHcloud VPS-1 + Coolify auto-hébergé** | **3,81 € HT · 4,57 € TTC** | non | **oui** (FR) | quotidienne **incluse** (1 j) | ~25 h |
| 2 | **OVHcloud VPS-1** + sauvegarde Premium 7 j | **4,91 € HT · 5,89 € TTC** | non | **oui** (FR) | 7 j glissants, **+1,10 €** | ~32 h |
| 3 | **Hetzner CX23** *(2 vCPU / 4 Go / 40 Go)* | **5,49 € HT · 6,59 € TTC** *(hors IPv4 et sauvegardes, non relevés)* | non | oui (DE/FI) | en supplément, **prix non relevé** | ~32 h |
| 4 | **Fly.io**, Postgres auto-géré | **~8 à 12 $** | non | oui (AMS) | snapshots 0,08 $/Go, 10 Go gratuits | ~18 h |
| 5 | **Scaleway DEV1-S** + block + snapshots | **~11,72 € HT** *(hors IPv4)* | non | **oui** (PAR) | snapshots **0,03 €/Go/mois** | ~30 h |
| 6 | **OVHcloud Public Cloud d2-4** + Object Storage | **~11,60 € HT** | non | **oui** (FR) | à construire | ~30 h |
| 7 | **Render Hobby** *(web 7 $ + PG 256 Mo 6 $ + disque + BP)* | **~20 $** | non | oui (FRA) | **incluses** + PITR 3 j | **~4 h** |
| 8 | ⬛ **Netlify Free + Supabase Pro** | **25 $** | **non** | non (US) | Supabase 7 j | ~4 h |
| 9 | ⬛ **Scalingo standard** *(note 12)* | **~22 €** | non | **oui** (FR) | **incluses** + PITR | **~4 h** |
| 10 | ⬛ **Clever Cloud standard** *(note 12)* | **~24 €** | non | **oui** (FR) | **incluses** | **~4 h** |
| 11 | **Scaleway DEV1-S + Managed PG DB-DEV-S** | **~23 € HT** | non | **oui** (PAR) | **incluses** 0,03 €/Go | ~12 h |
| 12 | **Railway Hobby** | **~24 $** | non | oui (AMS) | **non documentées** | **~4 h** |
| 13 | **Render Hobby**, base 1 Go *(réaliste)* | **~33 $** | non | oui (FRA) | **incluses** + PITR 3 j | **~4 h** |
| 14 | ⬛ **Netlify Personal + Supabase Pro** ← *corrigé* | **34 $** | **non** | non (US) | Supabase 7 j | ~4 h |
| 15 | **Fly.io + Managed Postgres Basic** | **~45 $** | non | oui (AMS) | **incluses** + HA | ~6 h |
| 16 | ⬛ **Netlify Pro + Supabase Pro** *(chiffrage actuel)* | **45 $** | **non** | non (US) | Supabase 7 j | ~4 h |
| 17 | ⬛ **Scalingo HDS, médias en base** *(notes 12 et 14)* | **48,80 → 57,37 €** | **OUI** | **oui** (FR) | **7 j + 8 sem. + 12 mois, PITR 7 j** | **~4 h** |
| 18 | ⬛ **Clever Cloud HDS** *(note 12)* | **~234 €** | **OUI** | **oui** (FR) | **incluses** | **~4 h** |
| 19 | **OVHcloud VPS-1 + contrat HDS** *(support Business obligatoire)* | **~254 €** | oui | **oui** (FR) | 1 j incluse | ~32 h |
| 20 | ⬛ **Scalingo HDS + objet tiers certifié** *(note 14)* | **~299 €** | **OUI** | **oui** (FR) | incluses | ~5 h |

*Colonne « Admin/an » : estimation personnelle [DÉDUIT], § 3.1. Les prix ⬛ sont ceux des notes 12
et 14, non recalculés.*

---

# La réponse franche

## Quel est le vrai plancher pour cette app ?

**3,81 € HT / 4,57 € TTC par mois.** Un VPS OVHcloud VPS-1 — 2 vCores, 4 Go de RAM, 40 Go de NVMe,
trafic illimité, sauvegarde quotidienne incluse, en France — avec Coolify par-dessus, l'application,
PostgreSQL et les médias sur la même machine. Les 40 Go de disque couvrent les 18 Go du palier 3 de
la note 14 avec de la marge. **Techniquement, ça marche.** Ce n'est pas un plancher théorique : c'est
un plancher qui tient debout pour ce gabarit précis.

**Donc oui, l'objection était juste : 45 $/mois pour dix utilisateurs, c'est douze fois le prix du
marché.** Et une partie de cet écart venait d'une erreur qu'il faut corriger dans le dossier — le
second siège Netlify n'a jamais existé.

## À partir de quel montant paie-t-on quelque chose d'utile ?

Il y a **trois marches**, et une seule est un abonnement de confort.

**De 4 € à 20 $ — on achète la suppression du travail de sysadmin. C'est la marche la plus
rentable des trois.** À ~20 $/mois, Render Hobby donne PostgreSQL managé avec sauvegardes et PITR,
les rollbacks, les certificats, les métriques, et une région européenne. L'écart avec le VPS est de
~16 $/mois, soit **~190 €/an, contre ~28 h/an de travail économisé**. **Toute valorisation du temps
d'Alex au-dessus de 7 €/heure rend cette marche rentable.** Ce n'est pas discutable ; c'est
arithmétique.

**De 20 $ à 49 € — on achète le HDS, et c'est la seule chose qu'on achète.** Scalingo HDS à 48,80 €
ne donne pas plus de puissance que Render à 20 $ ; il donne le certificat, l'annexe contractuelle,
la haute disponibilité imposée, et une rétention de sauvegarde à 12 mois. **Si la position HDS du
ticket 03 tient, cette marche n'est pas un choix : c'est la seule case du tableau qui coche à la
fois HDS, UE et sauvegardes sérieuses à un prix vivable.** ~29 €/mois au-dessus de Render, soit
**~350 €/an — moins que six mois d'abonnement TrueCoach** (60 €/mois, note 12).

**Au-delà de 49 € — on paie du confort, ou de l'emballage.** Les 234 € de Clever Cloud et les 299 €
de « Scalingo + stockage objet certifié » n'achètent, au gabarit de Manon, **aucune capacité
supplémentaire** : la note 14 l'a démontré chiffre en main (facture plate du palier 1 au palier 3
dans les trois cas). Ils achètent un droit d'entrée et une pile plus élégante. **Et les 45 $ de
Netlify Pro + Supabase Pro sont la pire ligne du tableau à ce titre** : c'est le prix d'une pile
HDS, pour une pile qui ne sera jamais HDS, avec deux tarifs encore non publiés (Netlify Database,
Netlify Blobs — note 14) et 11 $/mois qu'on peut retirer immédiatement.

## Ce que je recommanderais d'écrire dans la note de décision

1. **Corriger le chiffrage Netlify** : 34 $ (Personal + Supabase Pro), pas 45 $. Et retirer du
   dossier l'argument des deux sièges, qui est faux.
2. **Ajouter la ligne « VPS à 4 € » au tableau comparatif** — non pas pour la retenir, mais parce
   qu'un dossier qui ne montre pas le plancher du marché n'est pas crédible, et que l'objection
   reviendra. La montrer, puis dire pourquoi on ne la prend pas, est plus solide que ne pas la
   montrer.
3. **Ne pas la retenir**, pour trois raisons dans cet ordre : elle transfère un risque pénal sur
   Alex (§ 3.4) ; elle valorise son temps à 17 €/h ; et elle est **incompatible avec le HDS à moins
   de 254 €/mois**, ce qui la disqualifie précisément sur le critère qui a structuré tout le
   dossier.
4. **Retenir que l'écart réel à justifier n'est pas 45 € contre 4 €, mais 49 € contre 20 $** — soit
   ~350 €/an pour le HDS. **C'est un écart qui se défend en une phrase**, ce qui n'était pas le cas
   de celui qu'on affichait jusqu'ici.

---

## Ce qui reste non relevé

- **Hetzner** : supplément IPv4, prix des sauvegardes automatiques, tarifs Storage Box (BX11-BX41),
  montants exacts d'Object Storage, volume de trafic inclus au CX23. *(Page tarifaire en JavaScript,
  puis blocage anti-robot. La structure tarifaire est vue, les montants non.)*
- **Hetzner** : les spécifications du CX23 viennent d'un tiers, pas de hetzner.com.
- **OVHcloud** : le prix VPS **sans engagement** — la page n'affiche que le « à partir de ».
- **Scaleway** : le prix de l'adresse IPv4 publique, exclue du prix de liste des instances.
- **Fly.io** : le prix des machines shared-cpu au-dessus de 256 Mo.
- **Railway** : la politique de sauvegarde, absente de la page tarifaire.
- **Le raisonnement du § 3.4** sur l'art. L1115-1 appliqué à l'auto-hébergement : c'est une
  déduction de non-juriste. Elle mérite une confirmation avant d'être opposée à qui que ce soit.

---

## Sources

**Netlify** — <https://www.netlify.com/pricing/> ·
[credit-based-pricing-plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/) ·
[how-credits-work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)

**OVHcloud** — <https://www.ovhcloud.com/fr/vps/> ·
[API catalogue public (prix instances, stockage, egress, bases managées)](https://api.ovh.com/v1/order/catalog/public/cloud?ovhSubsidiary=FR)

**Hetzner** — [ajustement tarifaire du 15 juin 2026](https://docs.hetzner.com/general/infrastructure-and-availability/price-adjustment/) ·
[nouveaux plans CX (2024)](https://www.hetzner.com/pressroom/new-cx-plans/) ·
<https://www.hetzner.com/storage/object-storage/> · <https://www.hetzner.com/storage/storage-box/> ·
[geo/init — TVA FR 20 %](https://www.hetzner.com/geo/init/) ·
[CX23, spécifications — TIERS](https://sparecores.com/server/hcloud/cx23)

**Scaleway** — <https://www.scaleway.com/en/pricing/virtual-instances/> ·
<https://www.scaleway.com/en/pricing/storage/> ·
<https://www.scaleway.com/en/pricing/managed-databases/>

**Fly.io** — <https://fly.io/docs/about/pricing/> · <https://fly.io/docs/mpg/>

**Render** — <https://render.com/pricing> · <https://render.com/docs/regions>

**Railway** — <https://railway.com/pricing> · <https://docs.railway.com/reference/regions>

**Coolify** — <https://coolify.io/pricing>
