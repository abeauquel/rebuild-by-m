# Relecture — `dossier-athlete.html`

Relu le 5 septembre 2026 contre `map.md`, `research/01`, `research/12`, `research/14`,
`research/15`, `configuration/voix-et-vocabulaire.md` et `configuration/cadre-legal.md`.
Aucun fichier modifié.

**Verdict en une ligne.** Le squelette du document est sain — balisage propre, numérotation
continue, registre juste. Le problème est ailleurs et il est sérieux : **les chiffres
d'hébergement ne correspondent plus à la recherche, et toutes les divergences vont dans le même
sens.** Avec les vrais chiffres, la conclusion du § 05 s'inverse.

---

## A. Chiffres et contradictions

### A1. ⛔ Le prix de l'hébergement agréé est sous-évalué de 30 à 40 % — l.858, l.982-986, l.1003-1005

Le document annonce Scalingo agréé santé à **27 à 34 €/mois** (l.858 ; détail l.982-986 :
serveur 7,20 à 14,40 € + base 20,00 €). `research/12` l.338-346 donne **48,80 €/mois** :

| Poste | Contrainte HDS | € |
|---|---|---|
| Conteneurs web | **2 × M** (le minimum imposé) | 28,80 |
| PostgreSQL | Business 512M (Starter interdit) | 20,00 |
| **Total** | | **48,80 €/mois HT** |

`research/15` l.488 confirme : « Scalingo HDS, médias en base : **48,80 → 57,37 €** ».

Le document a retenu le prix d'**un seul** conteneur là où l'agrément en impose deux. Et il
justifie ce choix ainsi (l.1003-1005) :

> « leur documentation laisse entendre qu'il faudrait deux serveurs plutôt qu'un pour l'agrément,
> **sans qu'on en trouve la confirmation écrite** »

C'est faux, et la recherche contient la citation *verbatim* (`research/12` l.313-318, marquée
**VU**, source `doc.scalingo.com/platform/hds`) :

> « The platform enforces `web` processes scaled to **2 or more containers** to ensure high
> availability. »

**Correction.** Écrire « 34 à 49 € » (variante serrée 2 × S, signalée « très inconfortable en Node
ou en Python » par la recherche → référence 2 × M), et supprimer la phrase sur la confirmation
introuvable. C'est le point le plus grave du document : il fait vivre A6, A7, A8 et Q4.

### A2. ⛔ « Clever Cloud : prix non affichés » — l.1002-1003 — contredit par la recherche

Le document écrit « ses prix ne sont pas affichés — c'est un devis à demander ». `research/12`
l.267-300 dit l'inverse, sous le titre **« un abonnement fixe + un multiplicateur, publié »** :
200 €/mois + coefficient 1,4 ⇒ **≈ 234 €/mois** (tableau l.406). Seul le *périmètre du contrat*
est sur devis, pas le prix.

Conséquence : le seul chiffre qui montre qu'un agrément santé peut coûter très cher disparaît du
document. Manon lit « 13 à 20 € de plus par mois » sans jamais voir qu'à côté existe une option
certifiée à 234 €, et donc sans pouvoir juger que Scalingo est un bon prix.

**Correction.** « Clever Cloud, français et agréé, publie son tarif : 200 €/mois + un coefficient,
soit ≈ 234 € pour notre gabarit — cinq fois Scalingo. Le contrat, lui, est sur devis. »

### A3. ⛔ Render à « 14 € » — l.852, l.963-969, l.791, l.1163

`research/15` l.312-334 : Render Hobby = 7 $ (web) + 6 $ (Postgres 256 Mo) + 5 $ (disque) +
2,25 $ (bande passante) ≈ **20 $/mois**, et **33 $/mois** avec une base de 1 Go, « plus
réaliste ». Le document additionne 7 + 7 = 14 et s'arrête là.

Trois problèmes cumulés :
- le disque et la bande passante sont retirés du total (la case avoue d'ailleurs « **14 € + le
  disque** », l.968 — un total qui n'en est pas un) ;
- les 7 $ deviennent « 7 € » sans conversion annoncée, alors que la ligne Heroku juste en dessous
  garde ses « 7 $ » et « 9 $ » : deux devises dans la même colonne ;
- ce 14 € part ensuite dans le chemin C (l.791), dans le titre du § 06 (l.825) et dans la Q4
  (l.1163) comme s'il était établi.

**Correction.** « ≈ 20 $/mois, 33 $ avec une base confortable » (~19 à 31 €).

### A4. 🔴 Un prix TTC présenté comme HT — l.846, l.955, l.866

Le tableau annonce OVHcloud à **4,60 €** sous une légende « Prix hors taxes » (l.866).
`research/15` l.153 : VPS-1 = **3,81 € HT / 4,57 € TTC**. C'est le TTC qui a été recopié et
étiqueté HT.

### A5. 🔴 Hostinger n'existe nulle part dans la recherche — l.845, l.945-951

`grep -ric hostinger research/*.md` → **0 occurrence sur les neuf fiches.** Le fournisseur qui
porte le chiffre d'accroche du document (« environ 5 € par mois », l.827 ; « 5 € » en Q4, l.1162)
n'a jamais été vérifié. Sa valeur, 5,49 €, est par ailleurs exactement le prix HT du Hetzner CX23
relevé en `research/15` l.243 — confusion possible.

S'y ajoute que 5,49 € est **une promotion** (renouvellement 11,99 €, honnêtement signalé l.995,
mais seulement dans une légende de bloc technique replié).

**Correction.** Retirer Hostinger, ou le marquer « non vérifié ». Et bâtir l'accroche sur OVH à
3,81 € HT, qui est sourcé.

### A6. 🔴 « 13 à 20 € de plus par mois » — l.886, l.901, l.917

Chiffre dérivé de A1 et A3, donc faux deux fois. `research/15` l.523-529 pose la vraie marche :

> « De 20 $ à 49 € — on achète le HDS, et c'est la seule chose qu'on achète. […] **~29 €/mois
> au-dessus de Render, soit ~350 €/an — moins que six mois d'abonnement TrueCoach.** »

Soit **~29 €/mois et ~350 €/an**, contre « 13 à 20 € » et « 155 à 240 € par an » (l.901).
Erreur arithmétique en prime : 13 × 12 = **156**, pas 155.

Remarque : la formulation de la recherche (« moins de six mois de TrueCoach ») est plus parlante
*et* plus honnête que celle du document. Elle est utilisable telle quelle.

### A7. 🔴 « Les trois chemins tiennent dans une fourchette de 50 € par mois » — l.809

A = 0 €, B ≈ 40 €, C = 14 à 34 €. L'écart maximal est de **40 €**, et 50 ne correspond à aucun
chiffre du document. Avec les corrections A1/A3, l'écart réel monte à ~49 €.

### A8. 🔴 Trois fourchettes différentes pour la même chose

| Où | Ce qui est écrit |
|---|---|
| l.791 — chemin C | « 14 à 34 € » |
| l.825 — titre § 06 | « Entre 5 et 34 € par mois » |
| l.1162-1164 — Q4 | « 5 € », « 14 € », « 27 à 34 € » |

Le titre inclut la machine nue, le chemin C l'exclut. Manon lit deux planchers pour un même objet
à deux écrans d'intervalle.

### A9. 🟡 Hexfit : « ≈ 40 € » (l.777) contre « 39 € ou 50 € » (l.706)

`research/01` l.26 : « **39 €** ou **50 €** — deux grilles contradictoires ». Le chemin B retient
la moins chère sans le dire. S'y ajoute, non mentionné : **Hexfit Lab est « sur demande »**
(`research/01` l.557-558, l.631) et n'est pas inclus dans tous les paliers.

**Correction.** « 39 € ou 50 € selon la grille — deux prix affichés qui se contredisent — plus
Hexfit Lab, sur demande, si le palier retenu ne l'inclut pas. »

### A10. 🟡 Deux superlatifs juridiques incompatibles — l.693 et l.701

- Physitrack : « **Le meilleur dossier juridique du lot** » ;
- Andrew : « Français, hébergé en France, **contrat impeccable** ».

Les deux ne peuvent pas être vrais. `research/01` l.18-22 tranche en faveur d'Andrew (🇫🇷 OVH
Roubaix **HDS**, annexe 2 intégrée au contrat) contre Physitrack (Francfort, DPA public mais
version signée sur demande), et `map.md` retient « Andrew — excellent cadre juridique ».

**Correction.** Réserver le superlatif à Andrew, et décrire Physitrack comme « dossier juridique
solide, mais données à Francfort ».

### A11. 🟡 Dix athlètes, ou quinze ? — l.753, 827, 1070 contre l.994, 1210

Le document dit « une dizaine d'athlètes » (l.753), « dix personnes » (l.827), « une dizaine de
comptes » (l.1070) — puis calcule le stockage sur « une quinzaine d'athlètes » (l.994) et
raisonne sur quinze en Q6 (l.1210). `map.md` retient ~10 clients actifs, `research/14` l.80
modélise 10 athlètes. Fixer un seul nombre : c'est le paramètre dont dépendent les « seize ans ».

### A12. 🟡 « Un seul fournisseur, une seule facture » — l.927-928

Démenti 96 lignes plus bas par « **Chez un hébergeur agréé, un stockage séparé coûte 250 €/mois** »
(l.1024), par le « 14 € **+ le disque** » de Render (l.968), et par la recherche : **Scalingo n'a
pas de stockage objet** (`research/12` l.350-352), ce que `map.md` enregistre sous « le
"fournisseur unique" est reporté ».

### A13. 🟡 Le « 250 €/mois » du stockage séparé — l.1024

C'est le plancher de **plan de support** Scaleway et OVHcloud (`research/12` l.359-361). Chez
Clever Cloud c'est 200 € + 1,4×. Et le total réaliste de la pile « Scalingo HDS + objet tiers
certifié » est **≈ 300 €/mois** (`research/12` l.407). Le chiffre est présenté comme universel
alors qu'il est le moins élevé des trois.

### A14. 🟡 Tout est en HT, alors qu'elle paie le TTC — l.866

`cadre-legal.md` §2 : Manon est en **franchise en base de TVA** (art. 293 B du CGI). Elle ne
récupère rien : chaque euro HT du tableau lui coûte 1,20 €. Le § 06 sous-estime donc la facture
réelle de 20 % d'un bout à l'autre — et `voix-et-vocabulaire.md` impose par ailleurs « Prix :
toujours TTC ».

Avec A1 + A14, la version agréée n'est pas à « 27 à 34 € » mais à **~59 € TTC**.

### A15. ⛔ Conséquence combinée : la conclusion du § 05 s'inverse — l.807-808

> « acheter un logiciel coûte aujourd'hui *plus cher* que construire et héberger sans agrément, et
> à peu près autant que construire avec. »

Avec les chiffres de la recherche : B ≈ 40 €, C non agréé ≈ 19 à 31 €, **C agréé ≈ 49 € HT
(59 € TTC)**. Le chemin C agréé — celui que le document recommande (l.917) — devient le **plus
cher des trois**, pas « à peu près autant ». La phrase doit être réécrite, pas seulement
recalculée.

---

## B. Renvois

### B1. ⛔ Un renvoi circulaire : la limite de TrueCoach n'est expliquée nulle part

- l.642 (§ 03) : « on a découvert qu'il vient avec une limite qu'on n'avait pas vue : **voir plus
  bas**. »
- l.817 (§ 05) : « et surtout, **comme expliqué plus haut**, son contrat interdit d'y mettre ce
  genre de contenu. »

Les neuf occurrences de « TrueCoach » dans le fichier (l.462, 639, 642, 767, 815, 817, 1102, 1108,
1165) ont été vérifiées : **aucune n'explique la clause.** Chaque renvoi pointe vers l'autre.

Ce qui manque est dans `map.md` (*Out of scope*) : la clause **C.4.j** des CGU interdit tout
contenu comportant « diagnostic, conseil ou traitement médical », sous peine de suppression
discrétionnaire et de résiliation sans restitution — d'où l'impossibilité d'y loger les tests de
mobilité. Trois lignes suffiraient à réparer les deux renvois.

### B2. ⛔ Le point juridique a disparu, ses renvois sont restés

`map.md` décrit l'artefact comme contenant « le verdict sur les logiciels existants, **le point
juridique**, les trois chemins chiffrés ». Il n'y a aucune section juridique dans le document
(§ 01→07 : process, outil, frontières, marché, chemins, hébergement, questions). Restent orphelines
les affirmations qui s'appuyaient dessus :

| Ligne | Affirmation sans support |
|---|---|
| l.566-569 | « dans les sanctions prononcées contre des praticiens libéraux… » |
| l.769 | « le travail RGPD t'incombe même si tu ne changes rien » |
| l.884 | « se montre — à un athlète, à ton assureur, à l'Ordre » |
| l.910 | « un pari sur une lecture du droit qu'on a trouvée fragile » |
| l.1239-1240 | « si ton consentement actuel couvre les données de santé » |

C'est très probablement l'origine du « voir plus bas » de B1. Soit on réintroduit une section
courte, soit on rattache chaque affirmation à sa justification sur place.

### B3. 🟡 « Au vu du tableau juste au-dessus » — l.1161 (Q4)

Le tableau visé est celui du § 06 (l.833-863), une section plus haut. Le tableau *réellement* le
plus proche est celui du bloc `<details>` replié, explicitement étiqueté « tu peux sauter, c'est
pour Alex » (l.922). Si Manon ne l'a pas déplié, « juste au-dessus » ne désigne rien de visible.

**Correction.** « Au vu du tableau du chapitre 06 ».

### B4. 🟡 « Les six premières suivent exactement tes cinq étapes » — l.509-510

Sept briques (01→07, l.516-562, comptées) pour cinq étapes. La brique 04 — la comparaison — ne
correspond à aucune étape : c'est justement le geste que le processus actuel ne contient pas.
Dire « exactement » est faux, et affaiblit le seul argument fonctionnel du projet.

### B5. ✅ Renvois vérifiés et corrects

- `<a href="#hebergement">` (l.801) → `id="hebergement"` (l.824), unique dans le fichier ✅
- « à la section suivante » (l.801) : § 05 → § 06 ✅
- « voir plus bas pourquoi » (l.544) → § 04 ✅
- « Regarde la maquette plus haut » (l.1195) → l.577-619 ✅
- « l'étape 01 » (l.452) et « l'étape 04 » (l.722) → étapes existantes, désignation exacte ✅
- Numérotation 01→07 : continue, aucun trou ✅
- « Neuf questions » (l.1090) → Q1…Q9 présentes et numérotées dans l'ordre ✅

*(`map.md` l.127 parle encore de « six briques » et « huit questions » : c'est la carte qui est en
retard sur le document, pas l'inverse.)*

---

## C. HTML, CSS, accessibilité

### C0. ✅ Le balisage est propre

Vérifié programmatiquement : **aucune balise non fermée, aucune fermeture orpheline, aucun
croisement**. Aucun `<ul>`, `<div>` ni `<table>` à l'intérieur d'un `<p>`. `<details>`/`<summary>`
bien formé. Les trois tableaux ont un nombre de cellules conforme à leurs en-têtes (4/4, 4/4,
7/7), et la grille de la maquette fait bien 4 colonnes × 6 rangées. Rien à signaler ici.

### C1. 🔴 Variable CSS inexistante — l.845, l.851, l.857

`color:var(--cream-faint)` — cette variable n'est définie nulle part (seul reliquat du thème
« Cinéma » ; toutes les autres sont déclarées l.19-37). Les trois sous-libellés « une machine
nue », « une plateforme », « une plateforme française » n'obtiennent donc pas leur gris : la
déclaration est invalide à la valeur calculée, la couleur est héritée de `td:first-child`, et ils
s'affichent dans l'encre pleine. Remplacer par `var(--muted)`.

### C2. 🔴 Toutes les zones de réponse sont désalignées — l.346 et l.349

```css
.qa .field { grid-column: 2; margin-top: 13px; }
```

`.field` est un **frère** de `.qhead`, pas un enfant. C'est `.qhead` qui porte la grille
(l.325) ; `.qa` est un bloc ordinaire. `grid-column` n'a donc aucun effet, et la règle du
`@media` (l.349) est morte elle aussi. Les neuf `<textarea>` commencent sous « Q1 » au lieu de
s'aligner sous le texte de la question. Correctif : déplacer `.field` **dans** `.qhead`, ou
passer `.qa` en grille.

### C3. 🔴 Contraste insuffisant — `--off` (#a68f88)

Mesuré : **3,04:1 sur blanc**, **2,75:1 sur `--wash-soft`**. Le minimum WCAG AA pour du texte est
4,5:1. Concerne :

| Sélecteur | Ce que ça rend illisible |
|---|---|
| `.pill.out` (l.264) | les trois verdicts « **écarté** » du tableau comparatif — à 9 px |
| `.pc .lbl.minus` (l.296) | le libellé « **Mais** » de **chaque** colonne d'inconvénients — 9,5 px |
| `textarea::placeholder` (l.360) | les neuf indications de saisie |
| `.mock-grid .delta.flat` (l.231) | le seul écart non significatif de la maquette |

À noter : l'en-tête de la feuille de style (l.10-17) documente une cible de contraste pour
`--accent` (« ≥4.5:1 ») et pour `--accent-bar` (« ≥3:1 ») — mais aucune pour `--off`. Il n'a
jamais été mesuré. Assombrir vers ~#8a6f66 (≈4,6:1) suffit.

### C4. 🟡 `--accent` sur `--wash-soft` : 4,13:1 — contrat non tenu

Le commentaire l.15 promet « **TEXTE coloré — ≥4.5:1 sur blanc** ». C'est vrai sur blanc (4,58:1),
mais le code le pose systématiquement sur `--wash-soft`, où il tombe à 4,13:1 : `th` (l.251),
`.friction .lbl` (l.177), `.qa .alex .lbl` (l.344), `.pc .lbl.plus` (l.295), `.mock-grid .hd`
(l.226), `.photo span` (l.239), `.def .sigle` (l.305).

### C5. 🟡 `--accent-bar` utilisé comme texte — l.160 et l.326

Le commentaire l.16 est explicite : « FILETS et chiffres — ≥3:1, **jamais un mot à lire** ».
Mesuré 3,41:1. Or il colore « ÉTAPE 01 » (`.step .no`, l.160) et « Q1 » (`.qa .no`, l.326), qui
sont bien des mots à lire, à 11 px.

### C6. 🔴 Les `<textarea>` n'ont aucune étiquette — l.1116, 1140, 1154, 1187, 1200, 1214, 1229, 1244, 1280

Seul un `placeholder` les décrit, et il disparaît à la saisie. Échec WCAG 3.3.2 et 4.1.2 : un
lecteur d'écran annonce neuf champs sans nom. Le titre de la question est pourtant juste à côté.

**Correction.** `id` sur chaque `<h3>` de question, puis `aria-labelledby="…"` sur le `<textarea>`
correspondant.

### C7. 🟡 Le statut d'enregistrement est muet — l.1286

`#status` change de texte par script (« Connexion… », « Enregistré · … », « Échec — … ») sans
`role="status"` ni `aria-live="polite"`. L'information la plus importante de la page — ses
réponses sont-elles sauvées — n'est jamais annoncée.

### C8. 🟡 Tableaux : `<th>` sans `scope="col"` (l.674-677, 837-840, 934-940), aucun `<caption>`.
Les `<p class="caption">` (l.865, 992) sont des légendes visuelles non rattachées à leur tableau.

### C9. 🟡 La maquette comparative (l.583-613) est un tableau de données construit en `<div>`.
Sans sémantique de tableau, elle est lue comme une suite plate : « Mesure 12 mars 07 mai Écart
Flexion épaule D 142° 168° +26° … ». Ajouter `role="table"` / `role="row"` / `role="columnheader"`,
ou l'écrire en `<table>`.

### C10. 🟡 Corps de texte à 9, 9,5 et 10 px pour les pastilles, libellés, `.byline` et `.status`.
Beaucoup de texte en capitales à ces tailles.

### C11. ⚪ `@media (prefers-reduced-motion)` réinitialise `scroll-behavior` (l.396) alors qu'il
n'est jamais déclaré : règle morte, sans effet.

---

## D. Le script de sauvegarde (l.1298-1384)

### D0. ✅ Les clés sont saines

Neuf `data-q` : `q1` … `q9`, **toutes uniques, une par question, aucune manquante** (vérifié :
l.1116, 1140, 1154, 1187, 1200, 1214, 1229, 1244, 1280). Aucune collision non plus avec la clé
technique `enregistreLe` ajoutée l.1369.

### D1. ⛔ Course entre le chargement et la saisie — l.1348 et l.1351-1356

```js
saveBtn.disabled = false;      // l.1348 — le bouton s'active…
setStatus("Prêt", false);
return db.doc(DOC).get().then(...)   // l.1351 — …avant que les réponses existantes soient lues
```

Deux pertes de données possibles :

1. **Un clic dans cette fenêtre écrase tout.** `collect()` renvoie neuf chaînes vides, et
   `db.doc(DOC).set(payload)` (l.1374) **remplace** le document au lieu de le fusionner. Un
   « Enregistrer » cliqué trop tôt efface une séance de réponses.
2. **Un `get()` qui répond tard écrase la saisie en cours.** l.1355 fait `el.value = v` sans
   vérifier que le champ est resté vide ni que l'utilisatrice n'a pas commencé à écrire.

**Correction.** Déplacer `saveBtn.disabled = false` dans le `.then()` du `get()`, et n'écrire
`el.value` que si `el.value === ""`.

### D2. ⛔ La dégradation se déclenche à tort — l.1362-1364

Le `.catch` est accroché à toute la chaîne : il attrape aussi bien l'échec de
`window.claude.use("db")` que celui du `get()` initial. Une lecture qui échoue une fois — réseau,
document absent, aléa — appelle `degrade()`, **cache le bouton** et affiche « L'enregistrement
n'est pas disponible depuis cette vue » alors que l'écriture, elle, fonctionnerait. Le document
ment alors à Manon dans le sens le plus coûteux : elle recopie tout à la main pour rien.

**Correction.** Deux `.catch` distincts. Celui du `get()` doit se contenter d'un statut
(« impossible de recharger tes réponses précédentes ») en laissant le bouton actif.

### D3. 🔴 `dirty` ne protège rien — l.1308, 1322-1324, 1357, 1375

La variable est écrite en quatre endroits et lue une seule fois, comme garde d'affichage dans
`markDirty`. Il n'y a **aucun `beforeunload`**. Manon peut répondre aux neuf questions, lire
« Modifications non enregistrées », fermer l'onglet, et tout perdre sans un mot d'avertissement.

**Correction.** `window.addEventListener("beforeunload", e => { if (dirty) e.preventDefault(); })`.

### D4. 🔴 La page promet un enregistrement automatique qu'elle ne fait pas — l.1092

> « Tu peux répondre directement ici — **ce que tu écris est enregistré** et je le relis de mon
> côté. »

L'enregistrement est manuel (bouton l.1287). Soit on ajoute un enregistrement automatique
temporisé sur `input`, soit la phrase devient « ce que tu écris est enregistré **quand tu cliques
sur le bouton en bas** ».

### D5. 🔴 Les réponses sont écrites dans un espace partagé — l.1302

```js
var DOC = "reponses/manon";
```

Ce n'est pas un chemin privé. Le préfixe réservé à chaque lecteur est `data/users/me/…` ; une
collection ordinaire est **visible par toute personne qui peut ouvrir l'artefact**. Or les
réponses attendues contiennent son plafond de budget (Q4), son temps disponible (Q9), son volume
d'activité (Q6) et son contrat (Q8).

**Correction.** `data/users/me/reponses` — ou, si le partage est voulu, le dire dans la page.

### D6. 🔴 Le repli demande un travail qu'il ne rend pas possible — l.1290-1293

« Copie tes réponses et envoie-les à Alex par message » : il n'y a pas de bouton de copie, et les
neuf réponses sont dispersées dans neuf blocs. Ajouter un « Tout copier » qui assemble
question + réponse dans le presse-papiers rendrait la phrase vraie.

### D7. ⚪ Dépendance non visible dans le fichier

`window.claude.use("db")` suppose que la capacité `db` est déclarée à la publication. Si elle ne
l'est pas, **toutes** les lectrices tombent dans le repli D6. À vérifier sur l'artefact publié
(`a8bd1605-…` d'après `map.md`).

### D8. ⚪ Après `degrade()`, `markDirty` continue d'écrire dans un élément masqué (l.1333 puis
l.1324). Sans effet, mais mort.

---

## E. Lisibilité pour Manon

### E1. ⛔ « Agréé santé » n'est jamais expliqué — 9 occurrences

Le terme apparaît l.800, 840, 848/854/860, 879, 882, 894, 899, 917, 1002, 1024, 1164, 1179. Le
sigle **HDS n'apparaît pas une seule fois**, et « données de santé » une seule (l.1240, en
passant). Le document lui présente pourtant ce choix comme **« La seule décision qui te revient »**
(l.871) — « il engage ton nom et ta responsabilité, donc c'est toi qui tranches » (l.874-875).

On lui demande d'arbitrer une certification dont le document ne dit ni le nom, ni qui la délivre,
ni quelle obligation elle satisfait, ni pourquoi ses photos de mobilité relèveraient de la donnée
de santé. Sans ce paragraphe, la « décision qui lui revient » est une case à cocher à l'aveugle.

**Correction.** Trois phrases avant le bloc de choix : ce qu'est l'agrément HDS, qui le délivre,
pourquoi une photo d'épaule peut être une donnée de santé, et le fait que le droit n'est pas
tranché (`map.md`, ticket 03 : « on traite le HDS comme requis »).

### E2. 🔴 « le travail RGPD t'incombe » — l.769

Sigle jamais développé, contenu jamais décrit. `map.md` (ticket 03) chiffre ce socle à **1 à
2 jours** et précise qu'il s'impute à Manon **dans tous les cas, statu quo compris** — ce qui est
précisément l'argument que la ligne essaie de faire passer. Le chiffre manque là où il porterait.

### E3. 🟡 « Le VPS à 5 € » — l.1171

Unique occurrence, sigle non développé, et c'est le même objet que « **une machine nue** »
(l.845), qui est la bonne formulation. Deux noms pour une chose, dont un jargon.

### E4. 🔴 « Lecture ≈ 10 min » — l.416

~4 450 mots de contenu visible, **hors** bloc technique replié. En français, cela fait 20 à
22 minutes. Le repère est faux d'un facteur deux, et c'est le premier chiffre que Manon lit.

### E5. ✅ Longueur de phrase : globalement bonne

Les phrases sont courtes, une idée par paragraphe, conformément à `voix-et-vocabulaire.md`. Une
poignée dépasse 40 mots, toutes dans les encadrés « Ce qu'en pense Alex » ou dans le verdict du
chemin C : l.797-801, l.1109-1112, l.1222-1226, l.1270-1272, l.564-569. Rien d'alarmant.

### E6. ✅ Ce qui est très bien fait, et qu'il faut garder

- « 50 Go — **~80 ans** » : traduire un volume de stockage en durée de vie est exactement le bon
  registre (l.949, 958, 976, 985).
- La colonne « **Qui l'entretient** » (l.839) explique la différence machine nue / plateforme sans
  prononcer « PaaS ».
- « Écart » plutôt que « delta » (l.587).
- Le bloc technique replié (l.921-1085) protège correctement la lecture principale.

### E7. 🟡 « 14 € + le disque » (l.968) dans une colonne « Total / mois » : illisible comme nombre,
et impossible à comparer aux autres lignes.

---

## F. Ton et cadre légal

### F1. 🔴 « Patient » — l.568 et l.1207

`voix-et-vocabulaire.md`, tableau des substitutions : *patient* → **client, athlète, ou son
prénom**. Le reste du document dit « athlète » avec constance, ce qui rend les deux écarts
d'autant plus visibles :

- l.568 : « le déclencheur est presque toujours un **patient** qui réclame son dossier »
- l.1207 : « Certains logiciels facturent au **patient** actif »

Le second est du vocabulaire d'éditeur ; il peut rester entre guillemets. Le premier doit passer à
« une personne » ou « un client ».

### F2. 🟡 Alex parle de lui à trois personnes différentes

| Ligne | Forme |
|---|---|
| l.783, 811, 1173, 1177-1178 | « je » |
| l.797-798, 847, 1223 | « Alex », « il » |
| l.917, 1044, 1083 | « **Notre** choix » |

Le cas le plus net est la Q7 (l.1222-1224), où Alex écrit « c'est **Alex** qui s'en occupe […] le
jour où **il** n'est plus disponible » dans une question qu'il signe. Et « notre choix » désigne
une personne seule, ce qui donne à trois recommandations l'autorité d'un collectif.
`voix-et-vocabulaire.md` réserve le « on » au travail commun. Choisir « je », et garder « on »
pour ce que Manon et Alex font ensemble.

### F3. 🟡 « Thomas L. » dans la maquette — l.579

C'est **exactement** le témoignage d'exemple de `voix-et-vocabulaire.md` (« Thomas L. · 29 ans »).
Lui attribuer un dossier d'épaule fictif, avec une douleur inventée de 7/10 et une progression
inventée de +26°, est à éviter même dans une maquette — et `cadre-legal.md` interdit d'« inventer
un chiffre ou un témoignage ». Utiliser « A. B. » ou « Athlète démo ».

### F4. 🟡 Prix en HT — l.866

Voir A14. `voix-et-vocabulaire.md` : « Prix : `150 € / mois`, `60 €`. **Toujours TTC.** »

### F5. 🟡 Quatre notations de prix pour la même unité

`22,95 € / mois` (l.691) · `250 €/mois` (l.1024) · `60 € de TrueCoach` (l.1165) · `13 à 20 € par
mois` (l.901). La convention de marque est `150 € / mois`.

### F6. ⚪ « Soixante minutes » — l.448

`voix-et-vocabulaire.md` : chiffres dès qu'il s'agit d'une donnée, délais compris. → « 60 minutes ».

### F7. ⚪ « à ton assureur, à l'Ordre » — l.884

Affirme qui réclamerait le certificat. Rien dans les fiches de recherche ne l'établit. Sourcer ou
adoucir (« à un athlète qui pose la question, à ton assureur »).

### F8. ✅ Sur le fond légal, le document est propre

Vérifié ligne à ligne contre `cadre-legal.md` : **aucune promesse de résultat, aucun délai
garanti, aucun diagnostic, aucun vocabulaire de soin** (« soin », « traitement », « rééducation »,
« guérir », « prescrire », « consultation », « cabinet » : zéro occurrence). Tutoiement constant,
aucun emoji, pas de nom complet de client. La ligne l.1151 — « sans ce repère, on ne pourra
**jamais prouver** que l'outil t'a fait gagner quoi que ce soit » — est exactement le registre
d'obligation de moyens demandé par le référentiel.

---

## G. Honnêteté du document

C'est la partie la plus importante de cette relecture.

### G1. ⛔ Toutes les erreurs de chiffres vont dans le même sens

| Poste | Recherche | Document | Sens de l'écart |
|---|---|---|---|
| Plateforme managée (Render) | ~20 $, 33 $ réaliste | **14 €** | ↓ le sur-mesure |
| Agréé santé (Scalingo) | 48,80 € | **27 à 34 €** | ↓ le sur-mesure |
| Marche vers l'agrément | ~29 €/mois, ~350 €/an | **13 à 20 €**, 155 à 240 €/an | ↓ le sur-mesure |
| Clever Cloud agréé | **234 €/mois, publié** | « prix non affichés » | masque le haut de la fourchette |
| Deux conteneurs imposés | citation *verbatim* **VU** | « sans confirmation écrite » | ↓ le sur-mesure |
| Hexfit | 39 **ou 50 €** + Lab sur demande | « ≈ 40 € » | ↓ l'achat, mais sans le dire |
| Base de prix | HT et TTC distingués | tout en HT | ↓ tout, de 20 % |

**Six divergences sur sept abaissent le coût du chemin C ou masquent celui de l'agrément. Aucune
ne va dans l'autre sens.** Prise isolément, chacune est une erreur d'inattention plausible dans un
document édité par morceaux. Ensemble, elles forment un biais, et elles produisent la conclusion
de l'A15 : le chemin recommandé apparaît moins cher que l'achat alors qu'il est plus cher.

C'est le point à corriger avant d'envoyer quoi que ce soit. Un document dont les chiffres penchent
tous du côté de l'auteur perd sa valeur de note de décision même si chaque erreur est de bonne foi.

### G2. ⛔ Le compteur le plus lourd du chemin C est le seul laissé vide — l.792

> « Travail d'Alex — **offert, à chiffrer** »

Trois problèmes :
- « Offert » se lit « zéro » dans une colonne de coûts. Le travail est gratuit *pour Manon*, il
  n'est pas nul — c'est le compteur n° 2 de `map.md`, qui demande explicitement « **chiffré,
  jours-homme** ».
- C'est **le seul des douze compteurs** du § 05 sans valeur.
- L'asymétrie est nette : Manon reçoit un chiffre précis pour son propre engagement (« au minimum
  une heure par semaine », l.1268) et aucun pour celui d'Alex. Elle ne peut donc pas mesurer ce
  qu'elle lui doit, ni ce qu'elle risque s'il s'arrête.

L.1173-1175 dit d'ailleurs franchement « **je n'arrive pas à estimer honnêtement** combien de
temps ça représente ». Cet aveu est à sa place — mais il devrait figurer dans le compteur, pas
seulement dans un encadré de la Q4.

### G3. ⛔ Le chemin B est jugé sans le critère qu'on applique au chemin C

La carte du chemin B (l.782-784) présente Hexfit sous son meilleur jour — « Il existe sans nous,
il survit si je disparais, il se répare tout seul » — et ne mentionne **ni** les « trois points de
son dossier juridique restent à éclaircir » pourtant écrits l.710, **ni** le fait que
`research/01` l.498-502 envisage son élimination pure et simple s'il ne fournit pas de DPA
signable, **ni** que sa mention « HDS France » n'existe que sur un site vitrine
(`research/01` l.473-485).

Symétriquement, tout le § 06 érige l'agrément santé en question décisive — mais **uniquement pour
le chemin C**. La colonne « Agréé santé » n'existe que dans le tableau d'hébergement ; le tableau
des logiciels (l.670-714) n'a pas cette colonne. Hexfit échappe donc entièrement au test qu'on
applique à l'option d'Alex.

Un critère qui ne s'applique qu'à une colonne n'est pas un critère de comparaison.

### G4. ⛔ La seule action concrète recommandée sert le chemin C — l.736-739

> « **Le plus utile serait qu'il te fasse une démonstration en partage d'écran.** […] Si tu peux le
> lui demander, **c'est la chose la plus rentable de tout ce document.** »

C'est une bonne idée. Mais `research/01` l.694-698 identifie **trois questions écrites,
qualifiées de « bloquantes, pas informatives »**, à envoyer à Hexfit : le DPA art. 28 signable, la
liste des sous-traitants et l'attestation HDS ; puis « peut-on rattacher une photo à un résultat
de test, et afficher deux passages côte à côte ? — **si la réponse est oui et non documentée, tout
change** ».

Ces trois questions ont disparu du document. Ce sont pourtant les seules qui pourraient sauver ou
tuer le chemin B, et l'une d'elles pourrait retirer au chemin C sa justification centrale. Le
document recommande la démarche qui renforce le sur-mesure et omet celle qui pourrait le rendre
inutile.

**Correction.** Une ligne dans le § 04 : « En parallèle, on écrit à Hexfit ces trois questions. Si
la deuxième reçoit un oui, ce document change de conclusion. »

### G5. ⛔ Aucune des neuf questions ne demande à Manon quel chemin elle choisit

C'est la découverte la plus frappante du § 07. Le document s'annonce comme une aide à la décision
et **ne collecte pas la décision** :

| | Question | Présuppose |
|---|---|---|
| Q1 | On garde TrueCoach ? | qu'on construit |
| Q2 | Tes athlètes ont-ils un compte ? | qu'on construit |
| Q3 | Combien de temps tu y passes ? | neutre ✅ |
| Q4 | Tu mets combien par mois d'**hébergement** ? | qu'on construit |
| Q5 | La comparaison, tu veux voir quoi ? | qu'on construit |
| Q6 | Combien d'athlètes ? | neutre ✅ |
| Q7 | D'accord pour que tout soit à ton nom ? | qu'on construit |
| Q8 | Ton vrai contrat ? | neutre ✅ |
| Q9 | Combien de temps tu peux nous consacrer ? | qu'on construit |

Six questions sur neuf ne se posent que dans le chemin C. Aucune ne dit « A, B ou C ? », aucune ne
demande si elle veut essayer Hexfit (dont l'essai est gratuit 14 jours sans carte bancaire,
`research/01` l.611 — information absente du document), aucune ne demande ce qui la ferait
renoncer.

**Correction.** Une Q0 avant toutes les autres : « Après lecture, vers quoi tu penches — ne rien
changer, essayer Hexfit quatorze jours, ou construire ? Et qu'est-ce qui te ferait changer d'avis ? »

### G6. 🔴 Le chapeau annonce deux options sur trois — l.409-410

> « pour qu'on décide ensemble s'il faut **acheter quelque chose qui existe déjà, ou construire**. »

Le chemin A — que le document défend pourtant très correctement plus loin (« ce n'est pas là pour
faire joli : c'est **l'étalon** », l.751-753) — est absent de la première phrase que Manon lit.
Ajouter « ne rien changer, acheter, ou construire ».

### G7. 🔴 « Le faire reprendre par une IA » — l.799

Présenté comme atténuation du risque « une seule personne ». Rien ne l'étaye, aucune fiche de
recherche n'en parle, et c'est l'argument le plus rassurant placé sur la carte la plus risquée.
À retirer, ou à réduire à « le confier à un autre développeur » — qui, lui, est vrai.

### G8. 🔴 Le vrai risque du chemin C n'est écrit nulle part

Le compteur dit « Dans deux ans — ça dépend de moi » (l.793), ce qui est honnête. Mais le document
ne dit jamais ce que Manon a **si le projet s'arrête à moitié** : un outil inutilisable, ses
dossiers dedans, et les mois qu'elle y aura passés. C'est le seul risque que ni A ni B ne portent,
et c'est celui qui n'est pas nommé. Le chemin A, lui, reçoit un jugement de valeur : « Ton
temps — **inchangé, donc perdu** » (l.765).

### G9. 🟡 La mise en page rend les inconvénients moins lisibles que les avantages

Conséquence de C3, mais il faut la nommer ici : le libellé « **Mais** » de chaque colonne
d'inconvénients (`.pc .lbl.minus`) et les trois verdicts « **écarté** » (`.pill.out`) sont les
seuls éléments du document rendus dans `--off`, à **2,75:1** — sous le seuil d'accessibilité —
tandis que les libellés d'avantages (`.pc .lbl.plus`) utilisent l'accent. Dans les quatre blocs de
choix, le contre est systématiquement plus difficile à lire que le pour. L'intention est très
probablement graphique ; l'effet, lui, oriente.

### G10. ✅ Ce que le document fait honnêtement — et qu'il ne faut pas perdre en corrigeant

- l.751-753 : le chemin A posé en étalon, « un projet qui ne bat pas *on ne fait rien* n'a pas de
  raison d'exister ». C'est la bonne phrase.
- l.575 : « Maquette grossière, avec des **chiffres inventés** » — dit avant la maquette.
- l.996 : « Les durées de mise en route sont des **estimations d'Alex, pas des chiffres relevés**. »
- l.995 : la promotion Hostinger est signalée comme telle.
- l.730-733 : les deux réserves sur le site du collègue, dont « on ne l'a vue que de l'extérieur ».
- l.783 : « il survit **si je disparais** » — porté au crédit du concurrent.
- l.1173-1175 : « je n'arrive pas à estimer honnêtement […] c'est le seul endroit de ce dossier où
  je n'ai pas de chiffre à te donner. »
- l.1275-1276 : « si c'est zéro en ce moment, mieux vaut le savoir maintenant et attendre un
  meilleur moment. »
- l.747-748 : les chiffres annoncés comme des ordres de grandeur à confirmer.

Le document a une colonne vertébrale honnête, et elle est visible. Ce sont les chiffres qui l'ont
quittée, pas l'intention — ce qui rend la correction d'autant plus facile.

---

## Ordre de correction suggéré

1. **A1, A2, A3** — refaire le § 06 sur les chiffres de `research/12` et `research/15`, puis
   propager dans le chemin C, le titre, la Q4 et A6/A7/A8.
2. **A15** — réécrire la conclusion du § 05, qui s'inverse.
3. **G5** — ajouter la question qui manque : quel chemin ?
4. **B1, B2, E1** — écrire les trois paragraphes absents (clause TrueCoach, socle RGPD, ce qu'est
   l'agrément santé). Ils réparent quatre renvois cassés et la seule décision demandée à Manon.
5. **G2, G3, G4** — chiffrer le temps d'Alex, appliquer le critère « agréé » aussi au chemin B,
   réintroduire les trois questions à Hexfit.
6. **D1, D2, D5** — les trois bugs du script qui peuvent perdre ou exposer ses réponses.
7. **C2, C6, C1** — l'alignement des champs, leurs étiquettes, la variable morte.
8. **A14, C3, C4, C5** — TTC et contrastes.
9. Le reste : F1 à F8, E3, E4, E7, C7 à C11, D3 à D8.
