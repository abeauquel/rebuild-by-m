# 16 — « Tout chez Netlify » : Netlify Database + Netlify Blobs suffisent-ils ?

> **Avertissement.** Recherche documentaire, pages relevées le **5 septembre 2026**.
> **[VU]** = lu sur une page officielle Netlify, URL donnée. **[DÉDUIT]** = calcul ou inférence de ma part.
> **[NON PUBLIÉ]** = cherché activement, absent des pages officielles. Aucun prix n'est inventé.
>
> Cette note répond à une question posée par la note [`14-rampe-de-cout-medias.md`](14-rampe-de-cout-medias.md) :
> le chiffrage retenu suppose **deux abonnements** (Netlify 20 $ + Supabase 25 $ = 45 $). Netlify seul
> ramènerait la pile à **un seul fournisseur**. Est-ce budgétable, et est-ce sûr ?

---

## Le résultat, en une phrase

**Sur le papier, tout-Netlify coûte 20 $ au lieu de 45 $ — et c'est aujourd'hui un mauvais échange.**
Les 25 $ économisés chaque mois s'achètent au prix de **deux compteurs dont le tarif n'est toujours pas
publié** (le stockage de la base, dont l'échéance est dépassée de deux mois ; le stockage des fichiers,
qui n'a jamais eu de tarif), d'**aucune sauvegarde documentée pour les photos et les vidéos**, et de
l'**impossibilité structurelle de servir un média autrement que par une fonction** — au Go sortant le
plus cher du marché. **C'est prématuré**, et j'en donne la liste exacte de ce qui manque au § 8.

Une bonne nouvelle inattendue au passage, qui corrige la note 14 : **Netlify Database sauvegarde
réellement la base**, et sur le plan Pro **mieux que Supabase Pro** (30 jours contre 7). Le problème
n'est pas la base — c'est tout le reste.

---

## 1. Netlify Database — quel est le tarif AUJOURD'HUI ?

### 1.1 Le trou de budget est toujours là, deux mois après l'échéance

J'ai cherché activement un tarif publié depuis le 1er juillet 2026 : page tarifaire, documentation de
facturation, changelog complet, changelog filtré sur l'étiquette `database`, blog, forum officiel.
**Rien.**

| Où j'ai cherché | Date de la page | Résultat |
|---|---|---|
| [Doc — Billing, limits, and compliance](https://docs.netlify.com/build/data-and-storage/netlify-database/billing-and-usage/) | **Last updated: Aug 14, 2026** | phrase inchangée, **aucun taux** |
| [Doc — How credits work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/) | **Last updated: Aug 12, 2026** | barème complet, **aucune ligne « stockage »** |
| [Doc — Billing FAQ, plans à crédits](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/) | **Last updated: Aug 12, 2026** | rien sur le stockage |
| [Changelog, étiquette `database`](https://www.netlify.com/changelog/tag/database/) | 3 entrées : 13 avr., 28 avr., **22 juin 2026** | **aucune entrée après le 1er juillet 2026** |
| [Page tarifaire](https://www.netlify.com/pricing/) | relevée le 5 sept. 2026 | « Store structured data with Netlify Database », **pas de $/Go** |

Verbatim, toujours en ligne au 5 septembre 2026 [VU] :

> « However, database storage space (i.e., the size of data stored) is **free until July 1, 2026**. »
>
> « Database storage **will be billed no earlier than July 1, 2026, with rates announced in advance**.
> Storage rates will be based upon comparable industry standards, and the vast majority of users are
> expected to utilize a very low credit amount for storage. »

**Le constat de la note 14 tient, et il s'est aggravé de trois semaines.** La page a été révisée le
**14 août 2026** — six semaines *après* l'échéance qu'elle annonce — et la phrase « free until July 1,
2026 » y a été **laissée telle quelle**. On ne sait donc même pas si le stockage est aujourd'hui
gratuit, facturé, ou facturé rétroactivement. [DÉDUIT] L'hypothèse la plus probable est qu'il est
encore gratuit et que la phrase est simplement périmée — mais **une hypothèse n'est pas un budget**.

### 1.2 Ce qui EST publié : les paliers, meter par meter

**Deux compteurs sont tarifés** [VU — [billing-and-usage](https://docs.netlify.com/build/data-and-storage/netlify-database/billing-and-usage/)] :

| Compteur | Tarif verbatim | En dollars [DÉDUIT] |
|---|---|---|
| **Calcul base de données** | « The current credit cost is **10 credits per unit** » (unité = 1 unité de calcul pendant **1 heure**) | **0,0667 $/unité-heure** |
| **Bande passante base (sortante)** | « The current credit cost is **20 credits per GB** » | **0,133 $/Go** |
| **Stockage** | — | **[NON PUBLIÉ]** |

Le caractère horaire de l'unité de calcul est explicite dans l'exemple de la doc [VU, verbatim] :
« 33 hours of using the minimum compute (1 unit) - consuming **1 unit per hour**, or 33 units in total ».
En revanche, **ce qu'une unité de calcul vaut en vCPU et en RAM n'est pas documenté** [NON PUBLIÉ] —
on ne peut donc pas savoir si 1 unité suffit à l'app.

**Les limites par palier** [VU, même page, tableau complet] :

| Limite | Free | Personal | Pro | Enterprise |
|---|---|---|---|---|
| Bases par compte | 3 | 5 | 50 | 500 |
| **Branches par base** | **20** | 100 | 300 | 450 |
| **Rétention des sauvegardes planifiées** | **3 jours** | 7 jours | **30 jours** | 30 jours |
| **Sauvegardes à la publication** | dernier déploiement seulement | 3 derniers | **10 derniers** | 10 derniers |
| Unités de calcul min / max | 1 / **1** | 1 / 4 | 1 / **16** | 4 / 32 |
| **Mise en veille sur inactivité** | 5 min **imposées** | 5 min | 5 min → **« Always on »** possible | idem |
| **Total d'unités de calcul / période** | **48 unités** | sans limite | sans limite | sans limite |
| Données écrites / période | 5 Go | 100 Go | 100 Go | sans limite |
| Bande passante base / période | 5 Go | 100 Go | 100 Go | sans limite |
| Taille max de la base | 5 Go | 100 Go | 100 Go | sans limite |

> ⚠️ **Les branches par base (20 / 100 / 300) sont une donnée neuve** que la note 14 n'avait pas. Sans
> objet ici : une app à un seul environnement de production n'en consomme pas plus de deux ou trois.

### 1.3 Que se passe-t-il quand on dépasse ?

La page des limites ne le dit pas ; elle renvoie au support [VU, verbatim] : « If you would like higher
limits […] If you have a Pro plan, please contact support. » **Mais le comportement du pot de crédits,
lui, est documenté, et il est brutal** [VU —
[Billing FAQ](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/), Aug 12, 2026] :

> « Once your monthly credit allotment is used up for all web projects on your team, **all of your web
> projects (sites/apps) are paused** and visitors to your web projects will find a `Site not available`
> page at each of your web project's URLs. »
>
> « In addition, while your web projects are paused, they will not receive new web requests, web
> traffic, or form submissions and you cannot trigger new production deploys. »

La seule parade est l'**auto-recharge** [VU — [credit-based-pricing-plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/), Sep 1, 2026] :
**1 500 crédits pour 10 $**, manuelle ou automatique.

> 🚨 **Le choix est donc binaire, et les deux branches sont mauvaises** [DÉDUIT] : soit l'auto-recharge
> est **désactivée** et un pic de trafic éteint le site — page `Site not available` sur le dossier
> médical d'un client — soit elle est **activée** et la facture n'a **aucun plafond documenté**. Netlify
> ne publie pas d'équivalent du **Spend Cap** de Supabase (note 14, § 9), qui dégrade le service au lieu
> de l'éteindre ou de facturer sans borne.

**Report des crédits** [VU, même page] : uniquement à partir du palier **5 000 crédits**, et les crédits
reportés « expire at the end of the billing cycle they roll into » — un mois de sursis, pas plus.
Le palier Pro de base à 3 000 crédits **ne reporte rien**.

---

## 2. Netlify Blobs — bêta ? prix ? limites ?

### 2.1 Le statut : ni bêta affichée, ni GA annoncée

**Correction à la note 14, qui écrivait « Toujours en Beta ».** Ce n'est plus exact, mais la réalité
n'est pas meilleure :

- La [page de doc Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/)
  (**Last updated: Sep 1, 2026**) **ne porte aucun badge « Beta »**. J'ai vérifié le HTML brut : la
  seule occurrence du mot « beta » sur la page est un lien vers le billet de blog de 2024
  [*Introducing Netlify Blobs Beta*](https://www.netlify.com/blog/introducing-netlify-blobs-beta/).
- **Mais aucune annonce de GA n'existe.** Netlify a publié des changelogs de GA pour
  [Netlify Database (28 avril 2026)](https://www.netlify.com/changelog/2026-04-28-netlify-database/),
  pour l'AI Gateway et pour l'extension Prerender. **Pour Blobs, rien** — le changelog Blobs le plus
  récent est [*Deletion improvements with Netlify Blobs*](https://www.netlify.com/changelog/blobs-ui-improve/),
  qui ne mentionne aucun statut.
- La [doc des Release Phases](https://docs.netlify.com/release-phases/) (Jun 19, 2025) définit bien
  Public Beta (« **not guaranteed production quality/stability**, bugs expected, breaking changes
  possible ») et GA (« **production-ready for mission-critical applications**, meets SLA standards »),
  mais **ne classe aucune fonctionnalité**.

**[DÉDUIT] Le statut de Netlify Blobs est indéterminé.** Le badge bêta a disparu sans qu'une GA soit
annoncée. Pour un dossier client, un statut indéterminé se traite comme l'hypothèse basse : **pas de SLA
opposable**.

### 2.2 Le prix : toujours aucun, et pas même une ligne au barème

Le barème complet des crédits [VU —
[how-credits-work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/), Aug 12, 2026] :

| Ressource | Crédits |
|---|---|
| Déploiement de production | 15 |
| Deploy Previews / branch deploys | **0** |
| Compute (fonctions, Agent Runs, **calcul base**) | **10 / Go-heure** |
| Bande passante (web **et base**) | **20 / Go** |
| Requêtes web | 2 / 10 000 |
| Inférence IA | 180 / $ |
| Netlify Forms | gratuit |

**Aucune ligne « Blobs », « stockage objet » ou « stockage » de quelque nature.** [VU par absence,
recoupé sur trois pages de facturation distinctes.]

La seule chose qui ressemble à un tarif est une page marketing de Netlify [VU —
[Netlify Blobs vs Vercel Blob](https://www.netlify.com/knowledge-base/netlify-blobs-vs-vercel-blob/),
**last updated Sep 5, 2026**] :

> « Netlify Blobs is included on every plan and **draws from your account's monthly credit pool**:
> 300 credits on Free, 1,000 on Personal, 3,000 on Pro »

**C'est une non-réponse** [DÉDUIT] : dire que Blobs puise dans le pot de crédits sans publier le taux de
conversion, c'est exactement l'inverse d'un tarif. On ne peut pas budgéter 17,5 Go de photos et de
vidéos avec cette phrase.

> ❌ **Le seul chiffre qui circule est à écarter formellement.** Sur le forum officiel
> [answers.netlify.com](https://answers.netlify.com/t/blobs-pricing-and-limits/119907), un salarié
> Netlify (Ramon Snir) écrivait le **7 juin 2024** : « Customers get 100GB for free, and additional GBs
> will cost 9 cents a month » — en ajoutant lui-même « **I can't officially promise you that this is
> final… that's the ballpark** ». C'est un propos de forum, **vieux de plus de deux ans**, antérieur au
> passage à la tarification par crédits (sept. 2025), et explicitement présenté comme non engageant.
> **Il ne rentre pas dans un chiffrage.**

### 2.3 Les limites : structurelles, jamais volumétriques

[VU — [doc Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/), Sep 1, 2026]

| Limite | Valeur |
|---|---|
| **Taille d'un objet** | **5 Go** max |
| Métadonnées d'un objet | 2 Ko max |
| Clé d'objet | 600 o max |
| Nom de store | 64 o max |
| **Volume total** | **[NON PUBLIÉ]** |

**Adapté aux photos et aux vidéos ?** Sur la taille unitaire, oui : 5 Go par objet couvre très
largement des vidéos de 40 Mo. Mais Netlify lui-même tempère, sur sa propre page comparative [VU,
verbatim] : « If you store **multi-gigabyte video or large archives**, Vercel's ceiling is the practical
one », et positionne Blobs pour « JSON, images, documents, and typical app data ». À l'échelle de Manon
(vidéos de 40 Mo), on reste dans le domaine annoncé. **Le problème n'est pas la taille — c'est la façon
de les servir (§ 3) et l'absence de sauvegarde (§ 4).**

---

## 3. La question qui décide : servir photos et vidéos sans passer par une fonction

### 3.1 La réponse est non, et elle est explicite

**Il n'existe aucun accès direct par URL, ni publique, ni signée.** Trois sources concordantes :

1. [Doc Netlify Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/) (Sep 1, 2026),
   verbatim [VU] : « **Your blobs can only be accessed through your own site.** » Les seuls chemins de
   lecture listés sont : Functions, Edge Functions, Build Plugins, la CLI Netlify, et l'interface du
   tableau de bord.
2. [Netlify Blobs vs Vercel Blob](https://www.netlify.com/knowledge-base/netlify-blobs-vs-vercel-blob/)
   (Sep 5, 2026), verbatim [VU] : « **Reads go through your functions, edge functions, or build; there
   are no public URLs.** »
3. Le guide officiel [*Serving user-generated uploads using Netlify Blobs*](https://developers.netlify.com/guides/user-generated-uploads-with-netlify-blobs/)
   montre le seul motif possible [VU] : une fonction appelle `getStore()`, puis
   `store.get(key, { type: "stream" })`, et renvoie `new Response(blob)`. Le `src` de la balise `<img>`
   est **le chemin de la fonction**. Verbatim : « Because this function returns the image as a stream,
   you can use it directly in an `img` tag. »

**L'Image CDN ne sauve pas la mise** [VU —
[doc Image CDN](https://docs.netlify.com/build/image-cdn/overview/), **Aug 17, 2026**] : `/.netlify/images`
n'accepte que **des chemins relatifs du déploiement** ou **des URL distantes explicitement autorisées**
(`remote_images` dans `netlify.toml`). **Netlify Blobs n'y est pas listé comme source.** Et la page ne
documente que des formats **images** (`avif`, `jpg`, `png`, `webp`, `gif`, `blurhash`) — **aucune
transformation ni diffusion vidéo**.

> 🚨 **Conséquence directe sur la note 14.** Son **levier 5** — « servir par une URL signée du magasin
> plutôt que par une fonction », classé **n° 1 du classement, coût de mise en œuvre nul** — est
> **structurellement indisponible** dans une pile 100 % Netlify. Ce n'est pas une erreur d'architecture
> qu'on peut éviter : c'est la seule architecture possible. Chez Supabase, l'URL signée servie par le
> Smart CDN est le comportement par défaut du SDK ; chez Netlify Blobs, elle n'existe pas.

### 3.2 Le chiffrage de l'obligation

Coût de servir **1 Go** de média par une fonction [DÉDUIT — assemblage de tarifs VU] :

| Poste | Calcul | Crédits / Go | $ / Go |
|---|---|---|---|
| Bande passante (réponse de fonction) | 20 cr/Go | **20** | **0,1333** |
| Compute fonction (mémoire par défaut **1024 Mo** [VU — [functions billing](https://docs.netlify.com/build/functions/usage-and-billing/), Jun 16, 2026]) | 1 Go × durée de transfert × 10 cr/Go-h ; à 10 Mo/s → 0,28 cr ; à 2 Mo/s (4G médiocre) → 1,39 cr | 0,3 – 1,4 | 0,002 – 0,009 |
| Requêtes web | ~25 requêtes/Go × 2 cr/10 000 | ~0,005 | ~0,00003 |
| **Lecture Blobs → fonction** | **[NON PUBLIÉ]** — nul ne sait si le trafic sortant du magasin est compté une seconde fois | **?** | **?** |
| **Total connu** | | **~20,3 – 21,4** | **0,135 – 0,143** |

Appliqué aux trois paliers d'egress de la note 14 :

| Palier | Egress/mois | Bande passante | Compute fonction | **Crédits** | **Coût** | Rappel : URL signée Supabase (0,03 $/Go, franchise 250 Go) |
|---|---|---|---|---|---|---|
| **P1** | **3 Go** | 60 cr | 1 – 4 cr | **61 – 64** | **0,41 – 0,43 $** | 0,09 $ *(en réalité 0 $, sous franchise)* |
| **P2** | **5 Go** | 100 cr | 1 – 7 cr | **101 – 107** | **0,67 – 0,71 $** | 0,15 $ *(0 $)* |
| **P3** | **20 Go** | 400 cr | 6 – 28 cr | **406 – 428** | **2,71 – 2,85 $** | 0,60 $ *(0 $)* |

**En valeur absolue, ce n'est pas ça qui coule le projet** — 2,85 $/mois au palier 3. **Le facteur 4,4
de la note 14 est confirmé, mais il porte sur des sommes dérisoires à cette échelle.** L'objection
sérieuse est ailleurs, et elle est technique.

### 3.3 L'objection technique que le prix cache : le `Range`

[DÉDUIT — et c'est le point que je considère le plus important de ce paragraphe.]

Une balise `<video>` qui permet de **se déplacer dans la vidéo** (chercher la 12ᵉ seconde, revenir en
arrière — le geste central de la comparaison de mobilité) exige que le serveur réponde aux requêtes
**HTTP `Range`** par un `206 Partial Content`. Le motif officiel de Netlify (`new Response(stream)`,
guide cité ci-dessus) **ne gère pas `Range`** et la doc n'en parle nulle part. Deux issues, aucune bonne :

- **Sans implémenter `Range`** : chaque déplacement dans la vidéo **retélécharge le fichier entier**.
  L'egress réel n'est plus 20 Go/mois mais un multiple — et l'expérience est mauvaise.
- **En implémentant `Range` à la main** dans la fonction : c'est du code à écrire, à tester et à
  maintenir, pour reproduire ce qu'un stockage objet avec URL signée fait gratuitement.

Un stockage objet (Supabase Storage, Cellar, Scaleway) répond nativement au `Range`. **Netlify Blobs
délègue ce problème à l'application.** C'est un coût de développement, pas un coût d'hébergement — et il
n'apparaît dans aucun tableau de prix.

---

## 4. Sauvegardes — la moitié bonne, la moitié éliminatoire

### 4.1 Netlify Database : réellement sauvegardé, et mieux que je ne le pensais

[VU — [Backup and recovery](https://docs.netlify.com/build/data-and-storage/netlify-database/backup-and-recovery/),
**Last updated: Sep 1, 2026**. Page que la note 14 n'avait pas consultée.]

| Question | Réponse [VU] |
|---|---|
| Fréquence | **Une fois par jour**, « at a time that varies by project » |
| Autre déclencheur | **À chaque publication d'un déploiement de production** |
| Contenu | **Données + schéma complets**, restaurables à l'identique |
| Rétention Free | 3 jours + dernier déploiement publié |
| **Rétention Pro** | **30 jours** planifiées + **10 derniers déploiements publiés** |
| Restauration | Tableau de bord → Data & Storage → Database → Backups → Restore ; **rôle Team Owner requis** |
| Filet de sécurité | Une branche dédiée conserve l'état de production **juste avant** la restauration |
| **Restauration à un instant donné (PITR)** | **NON — aucune PITR documentée** |
| **Export / téléchargement hors plateforme** | **[NON PUBLIÉ]** — aucune mention |
| Piège documenté | Revenir à un déploiement antérieur **ne restaure pas** automatiquement la base |

> ✅ **Correction à apporter à la note 14**, qui rangeait implicitement Netlify Database avec les
> solutions sans sauvegarde. **C'est faux : sur le plan Pro, la rétention de 30 jours est meilleure que
> les 7 jours de Supabase Pro** (note 14, § 2.1). Sur ce point précis, Netlify gagne.

**Les deux réserves qui restent** [DÉDUIT] :
- **Granularité d'un jour = RPO d'un jour.** Une saisie perdue peut représenter une journée de
  consultations. Scalingo Business offre **PITR 7 jours** (note 14, § 3.2), c'est-à-dire une
  restauration à la minute près. Netlify, non.
- **Aucun export documenté.** Des sauvegardes qu'on ne peut ni télécharger ni vérifier hors plateforme
  sont un **verrou fournisseur** sur la seule chose qui ne doit jamais être verrouillée : les données du
  client. À défaut, il faudra un `pg_dump` planifié maison — faisable (c'est du Postgres), mais à écrire,
  à héberger et à surveiller.

### 4.2 Netlify Blobs : rien. Et c'est là que ça se termine

**J'ai cherché : aucune page Netlify ne documente une sauvegarde, un versionnage, une corbeille, une
rétention ou une restauration pour Netlify Blobs.** [NON PUBLIÉ — vérifié sur la doc Blobs, la page
produit Storage, le changelog Blobs et les pages de facturation.] Le seul changelog Blobs récent va dans
le sens inverse : [*Deletion improvements*](https://www.netlify.com/changelog/blobs-ui-improve/) ajoute
« more options for deleting an entire store or individual entries » et une méthode `deleteAll` —
**des outils pour supprimer plus facilement, sans filet documenté derrière.**

> 🚨 **C'est le point éliminatoire, et il est net.** Dans une pile 100 % Netlify, **le dossier client
> — les photos, les vidéos, c'est-à-dire la substance même du produit — n'a aucune sauvegarde
> documentée.** Une erreur de clé, un `deleteAll` mal ciblé, un bug de la fonction d'upload, et il
> n'existe aucun mécanisme publié pour revenir en arrière. Pour des dossiers de santé soumis à une
> obligation d'intégrité, **cela suffit à clore la question**, indépendamment de tout prix.

---

## 5. Le total : coût mensuel réel d'une pile 100 % Netlify

### 5.1 Le compteur qui domine tout : le calcul de la base

Personne ne l'avait chiffré, et c'est de très loin le premier poste. À **10 crédits par unité-heure** et
**1 unité minimum** [VU], tout dépend du temps d'**éveil** de la base — la veille se déclenche après
5 minutes d'inactivité, et chaque réveil réarme ces 5 minutes.

| Éveil moyen (1 unité) | unité-h / mois | Crédits | Équivalent $ | Reste sur les 3 000 cr du Pro |
|---|---|---|---|---|
| 2 h/jour | 60 | **600** | 4,00 $ | 2 400 |
| 4 h/jour | 120 | **1 200** | 8,00 $ | 1 800 |
| 6 h/jour | 180 | **1 800** | 12,00 $ | 1 200 |
| 8 h/jour | 240 | **2 400** | 16,00 $ | 600 |
| 12 h/jour | 360 | **3 600** | 24,00 $ | **dépassement à lui seul** |
| **24 h/jour** (« Always on », permis en Pro) | 720 | **7 200** | **48,00 $** | **× 2,4 le plan** |

> 🚨 **Laisser la base « Always on » — l'option que le plan Pro met en avant — coûte à elle seule
> 7 200 crédits par mois**, soit 4 200 crédits au-delà du plan : **+30 $ d'auto-recharge (3 packs à
> 10 $), donc ~50 $/mois**, ou le passage au palier 10 000 crédits à **63 $/mois**. **Dans les deux cas,
> c'est plus cher que les 45 $ de Netlify + Supabase.** [DÉDUIT — calcul à partir des tarifs VU.]
> L'unique façon de rester à 20 $ est d'**accepter la veille à 5 minutes**, donc un démarrage à froid
> à chaque consultation espacée. Pour une app consultée par bouffées, c'est une latence perceptible sur
> le premier chargement.

### 5.2 Le budget complet, aux trois paliers

Hypothèses [DÉDUIT], délibérément modérées et énoncées pour être contestables : base éveillée **4 h/jour**
aux paliers 1 et 2, **6 h/jour** au palier 3 ; **10 déploiements de production** par mois en régime de
croisière ; volumes d'egress repris de la note 14.

| Poste | Tarif [VU] | **P1** (3 Go) | **P2** (5 Go) | **P3** (20 Go) |
|---|---|---|---|---|
| **Calcul base** | 10 cr/unité-h | **1 200** | **1 200** | **1 800** |
| Médias servis par fonction | 20 cr/Go + compute | 62 | 104 | 420 |
| Bande passante app (HTML/JS/CSS/vignettes) | 20 cr/Go | 20 *(1 Go)* | 30 *(1,5 Go)* | 60 *(3 Go)* |
| Bande passante base (métadonnées) | 20 cr/Go | 4 | 6 | 20 |
| Requêtes web | 2 cr/10 000 | 20 *(100 k)* | 30 *(150 k)* | 80 *(400 k)* |
| Déploiements de production | 15 cr | 150 | 150 | 150 |
| **Stockage base** *(0,1 / 0,2 / 0,5 Go)* | **[NON PUBLIÉ]** | **?** | **?** | **?** |
| **Stockage Blobs** *(1,1 / 2,1 / 17,5 Go)* | **[NON PUBLIÉ]** | **?** | **?** | **?** |
| **Total des compteurs connus** | | **≈ 1 456 cr** | **≈ 1 520 cr** | **≈ 2 530 cr** |
| **Part des 3 000 crédits Pro** | | **49 %** | **51 %** | **84 %** |
| **Facture** | | **20 $** | **20 $** | **20 $** |

### 5.3 La comparaison, et pourquoi elle est trompeuse

| Pile | P1 | P2 | P3 | Compteurs non tarifés |
|---|---|---|---|---|
| **100 % Netlify** (Pro 3 000 cr) | **20 $** | **20 $** | **20 $** | **2** — stockage base **et** stockage fichiers |
| **Netlify Pro + Supabase Pro** *(note 14)* | 45 $ | 45 $ | 45 $ | **0** |
| Écart apparent | −25 $ | −25 $ | −25 $ | — |

**25 $/mois, soit 300 $/an d'économie apparente. Trois raisons de ne pas y toucher** [DÉDUIT] :

1. **Le palier 3 consomme déjà 84 % du forfait avec deux compteurs éteints.** Le jour où le stockage
   sera tarifé — c'est annoncé, pas hypothétique — il s'ajoutera à une marge de 470 crédits. Il suffit
   que la base soit éveillée 8 h/jour au lieu de 6 pour dépasser **avant même** cette facturation.
2. **Le dépassement n'a pas de mode dégradé.** Site entièrement éteint, ou auto-recharge sans plafond
   publié (§ 1.3). Supabase Pro, lui, a un **Spend Cap** qui passe la base en lecture seule (note 14, § 9).
3. **Le rayon d'explosion.** C'est l'argument le plus fort en faveur des deux fournisseurs, et il n'est
   pas financier : **avec une pile 100 % Netlify, un seul compteur emballé éteint simultanément le site
   ET rend les données inaccessibles.** Avec Netlify + Supabase, l'épuisement des crédits Netlify met le
   site en pause mais **les données restent joignables** (export, restauration, migration d'urgence), et
   réciproquement. Les 25 $/mois achètent une **séparation des pannes** — pour des dossiers clients,
   ça vaut plus que 300 $/an.

---

## 6. Combien de sièges faut-il vraiment ?

**Réponse : un seul, celui d'Alex. Et cela corrige une erreur de la note 14.**

Définition officielle d'un siège [VU — [netlify.com/pricing](https://www.netlify.com/pricing/), relevé
le 5 sept. 2026, verbatim] :

> « **Trigger deploys on Netlify or log into the Netlify platform UI.** Sites connected to public repos
> will not have membership requirements for deploys. »

| Plan | Membres [VU] |
|---|---|
| Free | « **Limited to 1 free member**, with free & unlimited Git Contributors on public repos » |
| Personal | « $9/month for **1 member** » |
| **Pro** | « **$20/month for unlimited members**, with free & unlimited Git Contributors on all repos » |

Confirmé par la doc [VU — [credit-based-pricing-plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/), Sep 1, 2026] : sur Pro, les membres
sont « Unlimited (included in plan) », **sans frais par siège**.

> ⚠️ **Correction à la note 14.** Elle disqualifiait Netlify Free au motif « **1 seul membre**
> (Manon + Alex = 2) ». **Ce motif est erroné.** Manon utilise **l'application publiée** ; elle ne
> déclenche aucun déploiement et ne se connecte jamais à l'interface Netlify. **Elle n'est pas un siège.**
> Le compte Netlify n'a besoin que d'**un membre : Alex**.
>
> Netlify Free reste disqualifié — mais pour de **meilleures** raisons, toutes vérifiées :
> **48 unités de calcul de base par mois** (≈ 1,6 h d'éveil par jour, en tout et pour tout),
> **300 crédits en plafond dur sans aucune recharge possible**, **3 jours de rétention de sauvegarde**,
> et la mise en pause totale du site à l'épuisement. Le plancher payant reste **Pro à 20 $**, pas pour
> les sièges mais pour le calcul et les sauvegardes.

---

## 7. Le rappel qui rend la question largement théorique

Rien de ce qui précède ne déplace la position HDS de la note 12 et du ticket 03 — et sur ce terrain,
tout-Netlify est **pire** que Netlify + Supabase, pas meilleur :

| Composant | Conformité publiée |
|---|---|
| Netlify Database | « **not HIPAA-eligible by default** » — sur demande auprès de Netlify. « **not certified under PCI-DSS** ». Aucune mention de **HDS**. [VU — [billing-and-usage](https://docs.netlify.com/build/data-and-storage/netlify-database/billing-and-usage/)] |
| **Netlify Blobs** | « **Netlify Blobs is not currently supported as part of our HIPAA-compliant hosting offering.** » [VU — [doc Blobs](https://docs.netlify.com/build/data-and-storage/netlify-blobs/), Sep 1, 2026] |

**Netlify Blobs est explicitement exclu de l'offre HIPAA de Netlify — c'est-à-dire du seul régime de
conformité santé que Netlify propose.** Mettre les photos et vidéos de mobilité dans Blobs, c'est les
placer dans le composant que Netlify lui-même désigne comme non conforme. Si la position HDS tient,
**la question « Netlify seul ? » ne se pose pas** : ni Netlify seul, ni Netlify + Supabase ne sont
éligibles (note 14, § 2.3).

---

## 8. Conclusion — franchement : c'est prématuré

**Non, « tout chez Netlify » n'est pas aujourd'hui une pile budgétable et sûre pour des dossiers
clients.** Ce n'est pas une question de prix : c'est **20 $ contre 45 $**, et sur ce seul critère Netlify
gagne. C'est une question de ce qu'on ne peut pas écrire dans un budget et de ce qu'on ne peut pas
promettre à une praticienne.

### Ce qui manque, exactement

| # | Ce qui manque | Gravité | Ce qu'il faudrait |
|---|---|---|---|
| **1** | **Un prix pour le stockage de Netlify Database.** Échéance du 1er juillet 2026 **dépassée de deux mois** ; doc révisée le **14 août 2026** avec la phrase « free until July 1, 2026 » laissée intacte ; aucun changelog après le 22 juin. On ne sait même pas si c'est facturé. | **budget non écrivable** | un $/Go ou un cr/Go publié |
| **2** | **Un prix pour le stockage de Netlify Blobs.** Jamais publié, **aucune ligne au barème des crédits** vérifiée sur trois pages de facturation. Le seul chiffre existant est un propos de forum de **juin 2024** explicitement non engageant. | **budget non écrivable** | un tarif officiel, et un volume plafond |
| **3** | **Une garantie de sauvegarde pour les fichiers.** Aucune sauvegarde, aucun versionnage, aucune rétention documentée pour Blobs — alors que les photos et vidéos *sont* le dossier client. | **éliminatoire** | une politique de sauvegarde publiée pour Blobs |
| **4** | **Une sortie de bêta claire.** Badge « Beta » retiré de la doc, **mais aucune annonce de GA** alors que Netlify en publie pour ses autres produits. Statut indéterminé = pas de SLA opposable. | **forte** | un changelog GA, comme pour Netlify Database |
| **5** | **Un chemin de service direct pour les médias.** « There are no public URLs » : toute photo, toute vidéo passe par une fonction, au Go sortant le plus cher du marché (0,133 $), sans gestion du `Range` (donc sans navigation dans la vidéo). Le levier n° 1 de la note 14 est indisponible. | **forte** *(technique plus que financière)* | une URL signée, ou Blobs comme source de l'Image CDN |
| **6** | *(hors périmètre Netlify)* La conformité : Blobs **explicitement hors** de l'offre HIPAA ; aucun HDS nulle part. | **rédhibitoire si le HDS tient** | — |

### Ce qui a changé en faveur de Netlify, et qu'il faut inscrire au dossier

- **Netlify Database sauvegarde réellement** : quotidiennement + à chaque publication, données et schéma,
  **30 jours de rétention sur Pro** — soit **mieux que les 7 jours de Supabase Pro**. La note 14 doit
  être corrigée sur ce point.
- **Les sièges ne sont pas un obstacle** : Manon n'en consomme aucun, et Pro est de toute façon à
  membres illimités. La note 14 doit être corrigée sur ce point aussi.
- **Netlify Database est GA depuis le 28 avril 2026** — ce n'est plus un produit expérimental.

### La recommandation

**Conserver le chiffrage à 45 $ (Netlify Pro + Supabase Pro) comme repère de comparaison, et ne pas
substituer tout-Netlify.** Les 25 $/mois d'écart achètent : deux compteurs tarifés au lieu de deux
compteurs muets, une sauvegarde des fichiers, des URL signées servies par un CDN qui gère le `Range`,
un Spend Cap qui dégrade au lieu d'éteindre, et une séparation du site et des données qui fait qu'une
panne de facturation ne coupe pas les deux à la fois.

**Ce qui ferait rouvrir le dossier :** la publication simultanée (a) d'un tarif de stockage pour
Database **et** Blobs, (b) d'une politique de sauvegarde pour Blobs, (c) d'un changelog GA pour Blobs.
Les trois sont des annonces que Netlify peut faire n'importe quelle semaine — c'est **une note à
resurveiller au trimestre**, pas une porte définitivement fermée. Mais une échéance annoncée puis
dépassée sans un mot pendant deux mois est, en soi, une donnée sur la maturité du produit.

---

## 9. Ce qui reste non public (récapitulatif)

- **Le tarif du stockage de Netlify Database** — annoncé pour le 1er juillet 2026, jamais publié, doc
  révisée deux fois depuis sans le mentionner.
- **Le tarif et le volume plafond de Netlify Blobs** — aucune ligne au barème des crédits.
- **Ce qu'une « unité de calcul » de Netlify Database vaut en vCPU et en RAM** — impossible de savoir si
  1 unité suffit.
- **Si le trafic Blobs → fonction est compté une seconde fois** en bande passante, en plus de la réponse
  de la fonction au navigateur.
- **Toute politique de sauvegarde, de versionnage ou de rétention pour Netlify Blobs.**
- **La possibilité d'exporter les sauvegardes de Netlify Database** hors de la plateforme.
- **Le statut de release de Netlify Blobs** — ni bêta affichée, ni GA annoncée.

---

## Sources

Toutes consultées le **5 septembre 2026**. Date « Last updated » de la page indiquée quand elle est visible.

**Documentation Netlify**
- <https://docs.netlify.com/build/data-and-storage/netlify-database/billing-and-usage/> — *Aug 14, 2026* (limites par plan, 10 cr/unité, 20 cr/Go, « free until July 1, 2026 », HIPAA/PCI)
- <https://docs.netlify.com/build/data-and-storage/netlify-database/backup-and-recovery/> — *Sep 1, 2026* (fréquence, rétention, restauration, absence de PITR)
- <https://docs.netlify.com/build/data-and-storage/netlify-blobs/> — *Sep 1, 2026* (5 Go/objet, « can only be accessed through your own site », exclusion HIPAA, absence de badge Beta)
- <https://docs.netlify.com/build/image-cdn/overview/> — *Aug 17, 2026* (sources acceptées, formats image uniquement)
- <https://docs.netlify.com/build/functions/usage-and-billing/> — *Jun 16, 2026* (mémoire par défaut 1024 Mo, calcul en Go-heure)
- <https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/> — *Aug 12, 2026* (barème complet)
- <https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/> — *Sep 1, 2026* (paliers Pro, auto-recharge, report, membres illimités)
- <https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/> — *Aug 12, 2026* (« all of your web projects are paused »)
- <https://docs.netlify.com/release-phases/> — *Jun 19, 2025* (définitions Beta / GA)

**Site et changelog Netlify**
- <https://www.netlify.com/pricing/> (définition d'un siège, membres par plan)
- <https://www.netlify.com/changelog/tag/database/> (3 entrées, aucune après le 22 juin 2026)
- <https://www.netlify.com/changelog/2026-04-28-netlify-database/> (GA de Netlify Database)
- <https://www.netlify.com/changelog/blobs-ui-improve/> (`deleteAll`, aucun statut de release)
- <https://www.netlify.com/platform/storage/> (page produit)
- <https://www.netlify.com/knowledge-base/netlify-blobs-vs-vercel-blob/> — *Sep 5, 2026* (« there are no public URLs », « draws from your account's monthly credit pool »)
- <https://www.netlify.com/blog/introducing-netlify-blobs-beta/> (billet de 2024, référence historique)

**Guide développeur Netlify**
- <https://developers.netlify.com/guides/user-generated-uploads-with-netlify-blobs/> (le motif fonction + `get(key, {type:"stream"})` + `new Response()`)

**Forum officiel — à titre de réfutation, pas de source de prix**
- <https://answers.netlify.com/t/blobs-pricing-and-limits/119907> (7 juin 2024, propos non engageant d'un salarié Netlify)

**Notes internes**
- [`12-couts-hebergement-et-risque-reel.md`](12-couts-hebergement-et-risque-reel.md) · [`14-rampe-de-cout-medias.md`](14-rampe-de-cout-medias.md)
