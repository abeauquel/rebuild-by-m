# 10 — Combien coûte vraiment un hébergement HDS

Type: task
Status: resolved
Blocked by: —

## Question

Le ticket `03` a tranché : on traite le HDS comme requis, ce qui élimine Netlify, Vercel et
Supabase EU, et laisse **Clever Cloud**, **Scalingo**, **Scaleway** et **OVHcloud**. Mais
**aucun de ces prix HDS n'est public** — ils sont tous « sur demande ». Or c'est exactement le
chiffre qui décide du scénario sur-mesure : à 30 €/mois il reste crédible, à 300 €/mois il est
mort face à un SaaS certifié à 39 €.

Demander un devis à Clever Cloud et à Scalingo (les deux candidats à 6 activités), en décrivant
honnêtement le besoin réel — il est minuscule, et ça compte dans la négociation :

- une petite application web, ~10 utilisateurs professionnels simultanés au maximum ;
- une base PostgreSQL de quelques centaines de mégaoctets ;
- un stockage objet pour des photos, de l'ordre de quelques gigaoctets ;
- pas de haute disponibilité requise, pas de pic de charge, pas d'astreinte ;
- un praticien libéral en micro-entreprise, pas un établissement de santé.

Demander explicitement :

1. Le **prix mensuel tout compris** pour ce gabarit, et ce qui déclenche un palier supérieur.
2. Si un **plan de support payant** est obligatoire pour bénéficier du périmètre HDS, et son prix
   (le ticket `03` signale que c'est le cas chez Scaleway).
3. Quelles **activités HDS** sont couvertes par l'offre proposée — les six, ou un sous-ensemble.
4. La **convention d'hébergement HDS** et le **DPA art. 28** : signables en ligne, ou négociés ?
5. S'ils ont déjà des **clients praticiens libéraux** de cette taille, et à quel prix.

Résolu quand les deux devis sont dans l'`## Answer`, avec le prix retenu pour le chiffrage du
scénario sur-mesure (`08`).

**Pourquoi ça compte** : sans ce chiffre, le compteur « récurrent mensuel » du sur-mesure est une
inconnue, et la note ne peut pas comparer honnêtement construire et acheter.

## Answer

Note complète : [`../research/12-couts-hebergement-et-risque-reel.md`](../research/12-couts-hebergement-et-risque-reel.md)

**Le postulat du ticket était faux : les prix HDS sont publics.** Pas besoin de devis pour
avancer.

| Scénario | € / mois HT | HDS |
|---|---|---|
| Netlify Pro + Supabase Pro | ~40-45 € | **non, et inatteignable** |
| Scalingo standard | ~22-24 € | non |
| **Scalingo HDS** | **~49 €** | **oui** |
| Clever Cloud standard | ~24 € | non |
| Clever Cloud HDS | **~234 €** | oui |

**Clever Cloud publie sa formule** : abonnement mensuel fixe de 200 € plus un coefficient
multiplicateur de 1,4 sur les ressources. **Scalingo publie l'inverse** : pas de surcoût direct
pour le HDS, mais deux conteneurs web et un plan de base Business imposés. **Écart entre les deux :
facteur ~5.** Scaleway et OVHcloud imposent tous deux un plan de support Business à partir de
250 €/mois — éliminés de fait.

**Conséquence pour le chiffrage : être en règle coûte ~25 €/mois de plus.** Le choix du
fournisseur pèse cinq fois plus lourd que le choix d'être certifié ou non.

**Deux pièges techniques qui coûtent cher.** D'abord, **Scalingo n'a aucun stockage objet** — son
catalogue d'add-ons se limite à TCP Gateway, Docker Image et OpenVPN. Les photos vont donc soit en
base (10 Go inclus dans le plan Business), soit chez un tiers certifié, ce qui réintroduit un
droit d'entrée de 200 à 250 €. **Cet arbitrage vaut ~2 500 €/an** et doit être tranché dans `08`.
Ensuite, **chez Scalingo le HDS ne se rétrofitte pas** : une ressource non-HDS ne se convertit
pas sur place. **Nuance apportée par Alex le 5 septembre** : ce n'est pas pour autant une
reconstruction — on remonte l'hébergement agréé à côté et on migre les données, le code ne
changeant pas. C'est du travail à prévoir, pas un point de non-retour.

**Correction au ticket `03`** : Netlify propose désormais une base de données et un Blob storage
dès le plan gratuit. L'argument d'élimination « Netlify n'héberge pas de base » est périmé —
Netlify reste écarté, mais pour les bonnes raisons : **pas de certification HDS, et société
américaine**.

### Le risque réel — la partie qui change le ton de la note

**Il est faible, et il n'est pas là où on le cherchait.** ~320 contrôles CNIL par an en France ;
les campagnes santé de 2020, 2021 et 2023 ont visé hôpitaux, CHU et laboratoires — 13 contrôles
sur les dossiers patients informatisés en cinq ans, **aucun cabinet libéral**. Sur neuf ans, une
vingtaine de praticiens libéraux sanctionnés, de 1 000 à 6 000 €, médiane 4 000 €, plafond légal
de la procédure simplifiée 20 000 €.

**Dans 17 affaires sur 20, le déclencheur est identique** : un patient demande son dossier, le
praticien ne répond pas, puis ignore la CNIL. Ce n'est pas le lieu de stockage qui déclenche la
sanction. L'article L1115-1 (3 ans, 45 000 €) **vise l'hébergeur, pas Manon**, et aucune
condamnation sur ce fondement n'est documentée.

**L'affaire du 6 novembre 2020 doit être retirée de la note.** Elle y était mal citée, trois fois :
l'astreinte de 3 000 €/jour est une astreinte d'exécution pour fermer un site sous 24 h, plafonnée
à 4 mois et nulle si on obtempère — ce n'est pas une amende ; le HDS n'était qu'un grief sur
quatre ; et les défenderesses hébergeaient les données **de médecins tiers**. La taille n'était pas
l'objection — DocteurSecu avait 5 425 € de capital et a été liquidée en 2021 — c'est l'activité.
**Comparable correct à lui substituer** : deux radiologues libéraux sanctionnés 2 500 € et 6 000 €
pour des milliers d'IRM restées en accès libre (SAN-2020-014 et 015, confirmé CE n° 449694).

**Ce qui coûte vraiment le plus cher à une kiné libérale**, dans l'ordre : perdre le droit
d'exercer — 79 interdictions temporaires et 11 radiations prononcées par l'Ordre en 2025, pour
fraude à la facturation, **contrats** et déontologie (le poste « contrats », 52 plaintes, recoupe
directement l'incohérence de vocabulaire des CGV, cf. ticket `11`) · puis la fuite **via un
fournisseur** : 11 635 notifications CNIL en 2025 causées par le piratage d'un seul éditeur pour
libéraux, sans aucune sanction pour les praticiens · puis la perte pure et simple du disque dur.
La sanction réglementaire arrive en dernier.

**Deux gestes valent plus que le choix d'hébergeur**, et deviennent des exigences de conception :
**l'export du dossier complet d'un client en un clic** — il neutralise le seul mécanisme de
sanction réellement observé — et **une pile chez un seul fournisseur** plutôt qu'un assemblage à
quatre.

## Complément — la rampe de coût n'existe pas (5 septembre)

Note complète : [`../research/14-rampe-de-cout-medias.md`](../research/14-rampe-de-cout-medias.md)

Hypothèse d'Alex à vérifier : « Netlify est quasi gratuit au début mais monte dès qu'on ajoute
vidéo, photo, base ». **Vraie au mois 1, fausse à l'an 3.**

| Pile | P1 · 1,2 Go / 3 Go max | P2 · 2,3 Go / 5 Go max | P3 · 18 Go / 20 Go max |
|---|---|---|---|
| Netlify Free + Supabase Free | **impossible** | impossible | impossible |
| Netlify Pro + Supabase Pro | 45 $ | 45 $ | **45 $** (+0 %) |
| Scalingo HDS, médias en base | 48,80 € | 48,80 € | **57,37 €** (+18 %) |
| Scalingo HDS + objet tiers | ~299 € | ~299 € | ~299 € |
| Clever Cloud HDS (Cellar) | 233,59 € | 233,87 € | **236,20 €** (+1,1 %) |

P1 = 100 photos + 20 vidéos · P3 = 2 500 photos + 250 vidéos. **Volume ×15, trafic ×6,7, facture
quasi plate.** Ce qui coûte, c'est le droit d'entrée, pas l'usage.

**Les paliers gratuits sont disqualifiés avant le palier 1.** Supabase Free casse à 1 Go de
fichiers (mois 1), se met en pause après une semaine, zéro sauvegarde. **Netlify Free
n'autorise qu'un seul membre** — Manon + Alex = 2 — et son plafond de 300 crédits est dur :
il **éteint le site**, sans recharge. Scalingo n'a pas de palier gratuit.

**Trois corrections à la réponse principale ci-dessus** (toutes VU) :
1. Le dépassement disque Scalingo **est** public : `0.0007 €/GB-h` = **0,50 €/Go/mois**, dans la
   description des 16 plans de leur API.
2. **Scalingo ne facture aucun egress** (« no egress fees », verbatim) — seule pile où servir de
   la vidéo est gratuit. Ça change l'arbitrage « médias en base » : il devient défendable.
3. Les paliers de crédits Netlify Pro (33/63/95/126 $) sont officiels ; la réserve tombe.

**Egress, prix du Go** : Scalingo 0 € · Supabase caché 0,03 $ · Supabase non caché et Cellar
0,09 € · **Netlify 0,133 $**, le plus cher, ×4,4 sur le CDN Supabase. Règle de conception qui en
découle : **ne jamais relayer une vidéo par une fonction Netlify**.

**Deux trous de budget côté Netlify, non chiffrables** : le stockage de Netlify Database était
« free until July 1, 2026 », échéance **dépassée**, doc mise à jour le 14 août 2026, **aucun taux
publié**. Netlify Blobs n'a ni plafond ni tarif au Go publiés, reste en bêta, et leur doc précise
qu'il n'entre pas dans leur offre conforme santé.

**Seuils où ça cesse d'être négligeable** : ~35-50 Go de médias en base chez Scalingo (an 5-7,
+21 à +33 €/mois) · 100 Go de fichiers ou 250 Go d'egress/mois chez Supabase (~an 12) · **jamais**
chez Clever Cloud, où l'egress n'égalerait les 200 € fixes qu'à 1 590 Go/mois.

### Leviers de conception — deux à refuser, trois à prendre

**À refuser** : *ne garder que des images clés* (89 €/an) détruit la comparaison à 8 semaines,
c'est-à-dire la raison d'être de l'app ; *pointer vers un lien externe* (91 €/an) sort la donnée
de santé sans DPA — exactement le reproche fait à WhatsApp.

**À prendre** : **URL signée plutôt que fonction proxy** (coût nul, jusqu'à 300 $/an d'économie si
le trafic décolle) · **purge à 12 mois vers images clés** (59 €/an, et surtout une obligation
RGPD art. 5.1.e) · **compression 720p à l'envoi, dans le navigateur** (73 €/an ; la faire côté
serveur imposerait 2 conteneurs à +28,80 €/mois, soit quatre fois l'économie — son vrai gain est
l'ergonomie : 8 Mo au lieu de 40).

**Réserve à lever par e-mail** : l'API Scalingo se contredit — `0,0007 €/Go-h` au niveau du plan,
« 2 €/GB » au niveau du fournisseur (texte périmé par ailleurs). Si c'était 2 €/Go/mois, le
palier 3 passerait de 57,37 € à 82,80 €.

## Correction majeure — le chiffrage était faux (5 septembre)

Notes : [`../research/15-plancher-hebergement.md`](../research/15-plancher-hebergement.md) ·
[`../research/16-netlify-seul.md`](../research/16-netlify-seul.md)

Alex a contesté les 45 $/mois de la pile non agréée. **Il avait raison, sur deux points.**

**1. La grille Netlify utilisée était périmée.** Pro n'est plus facturé au membre : **20 $/mois,
membres illimités**. Et le palier **Personal à 9 $** (1 000 crédits, recharge automatique) n'avait
jamais été relevé. Surtout, **un seul siège est nécessaire** — celui d'Alex : un siège sert à
« trigger deploys or log into the Netlify platform UI », or Manon n'utilise que l'app publiée.
L'hypothèse « Manon + Alex = 2 membres » était fausse. **La pile honnête est donc
Personal 9 $ + Supabase Pro 25 $ = 34 $ (~31 €), pas 45 $.**
Free reste écarté, mais pour la bonne raison, verbatim : « all of your web projects are paused and
visitors will find a `Site not available` page », sans recharge possible. 300 crédits ≈ 7 Go de
bande passante, dépassés dès le palier 1.

**2. Le plancher du marché n'avait jamais été chiffré : 3,81 € HT / 4,57 € TTC.** OVHcloud VPS-1
(2 vCores, 4 Go, 40 Go NVMe, trafic illimité, **sauvegarde quotidienne incluse**, France) +
**Coolify** auto-hébergé. **Douze fois moins** que les 45 $ annoncés. Autres relevés : Hetzner
CX23 5,49 € HT (hausse tarifaire du 15 juin 2026, jusqu'à +169 % sur certaines gammes) · Scaleway
DEV1-S ~6,55 € · Fly.io ~10 $ auto-géré · Render Hobby ~20 $ · Railway ~24 $. **Egress OVHcloud
= 0 €** partout (vérifié sur leur API catalogue). Deux planchers *managés* sont plus chers que
Scalingo HDS : Fly.io Managed Postgres 38 $, OVHcloud Managed PostgreSQL 54,46 €.

### Trois raisons de ne pas prendre le plancher

1. **~30-35 h/an d'administration.** Économiser 480 €/an pour 28 h de travail valorise le temps
   d'Alex à **17 €/h**.
2. **Aucune option n'est HDS**, et l'agrément chez OVH ou Scaleway impose le support Business à
   250 €/mois : **le VPS conforme coûterait ~254 €, cinq fois Scalingo HDS**. La voie « pas
   chère » devient la plus chère.
3. **Un risque qu'on n'avait vu nulle part.** Sur un VPS nu, les activités d'hébergement HDS 3 à 6
   sont exécutées **par Alex**, ce qui le place dans le champ de l'art. L1115-1 CSP — alors que la
   note 12 avait établi que cette peine vise l'hébergeur et non la praticienne.
   **L'auto-hébergement transfère un risque pénal sur le développeur.** *(Déduction de
   non-juriste, à faire valider.)*

### Les trois marches

De **4 € à 31 €**, on achète la suppression du travail système — rentable dès que l'heure d'Alex
vaut plus de 7 €. De **31 € à 49 €**, on achète le HDS et rien d'autre : ~215 €/an, soit quatre
mois de TrueCoach. **Au-delà de 49 €, c'est de l'emballage.**

### Tout-Netlify : prématuré

20 $ au lieu de 31 €, et c'est un mauvais échange. **Blobs n'a aucune URL publique** — verbatim,
« there are no public URLs » : toute photo et toute vidéo passe par une fonction, et le motif
officiel **ne gère pas les requêtes `Range`**, donc pas de navigation dans une vidéo sans la
retélécharger. Le levier « URL signée » devient structurellement indisponible. **Blobs n'a aucune
sauvegarde publiée** — la base en a de bonnes (quotidien + à chaque publication, 30 jours sur Pro,
**mieux que les 7 jours de Supabase**, correction à la note 14), mais les fichiers, non. Le tarif
de stockage de Database reste **non publié** deux mois après l'échéance, et Blobs n'a jamais eu de
prix au Go. Le P3 consomme déjà 84 % du forfait avec deux compteurs éteints ; passer la base en
« always on » coûterait 50-63 $/mois. Argument non financier retenu contre le fournisseur unique :
**le rayon d'explosion** — un compteur emballé éteint le site *et* les données, sans mode dégradé.
À resurveiller au trimestre : un $/Go pour Database et Blobs, une politique de sauvegarde pour
Blobs, une annonce de disponibilité générale.

**Nom de domaine** : ~10 €/an, à ajouter aux chemins C et D. Le chemin B (acheter un logiciel)
vient avec le sien.
