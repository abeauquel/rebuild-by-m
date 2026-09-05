# 03 — L'hébergement certifié HDS s'impose-t-il à l'activité de Manon ?

> **Avertissement.** Ce document est une recherche documentaire faite par un non-juriste, à partir
> de sources primaires citées. Ce n'est pas un avis juridique et ça n'en a pas la valeur. Les points
> marqués **⚖️ relecture pro** doivent être validés par un avocat avant toute décision engageante.
> Sources consultées : septembre 2026.

---

## Réponse courte

| Question | Réponse | Certitude |
|---|---|---|
| L'obligation HDS s'applique-t-elle ? | **Pas de réponse tranchée.** Une des deux conditions cumulatives est remplie sans ambiguïté, l'autre est une zone grise que l'ANS renvoie explicitement à une appréciation « au cas par cas ». | Faible sur la qualification, **forte sur la conduite à tenir** |
| Que faire alors ? | **Traiter le HDS comme requis.** Le surcoût d'un hébergeur certifié est faible (dizaines d'€/mois), le coût d'une erreur est disproportionné, et le doute lui-même n'est pas arbitrable par un développeur. | Forte |
| Base légale art. 9 RGPD | **Consentement explicite, art. 9.2.a**, cumulé avec l'art. 6.1.b pour la couche « licéité ». Le 9.2.h est ouvert sur le papier mais contredit frontalement le positionnement commercial. | Moyenne — ⚖️ relecture pro |
| Le statu quo est-il plus sûr ? | **Non.** Il échappe au HDS (pas de tiers), mais il échoue sur les art. 28, 30, 32 et sur le secret professionnel. C'est le scénario le moins conforme des trois. | Forte |

---

## 1. L'obligation HDS s'applique-t-elle ?

### 1.1 Le texte

**Article L1111-8 CSP, I** (version en vigueur au 1er juillet 2025 ; rédaction issue de l'ordonnance
n° 2017-27 du 12 janvier 2017) :

> « Toute personne qui héberge des données de santé à caractère personnel recueillies à l'occasion
> d'activités de prévention, de diagnostic, de soins ou de suivi social et médico-social, pour le
> compte de personnes physiques ou morales à l'origine de la production ou du recueil de ces données
> ou pour le compte du patient lui-même, réalise cet hébergement dans les conditions prévues au
> présent article. »

**II** : « L'hébergeur de données mentionnées au premier alinéa du I sur support numérique est
titulaire d'un certificat de conformité. »

**Article R1111-8-8, II CSP** — l'obligation qui pèse sur **Manon**, pas sur l'hébergeur :

> « Les responsables de traitement mentionnés au 1° du I, qui confient l'hébergement de données de
> santé à caractère personnel à un tiers, s'assurent que celui-ci est titulaire du certificat de
> conformité mentionné au II de l'article L. 1111-8. »

Sources : [L1111-8 sur Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049577902) ·
[R1111-8-8 sur Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036656709)

### 1.2 Les deux conditions cumulatives, selon le ministère (source la plus directe)

La FAQ officielle du ministère chargé de la Santé (DSSIS), publiée par l'ANS, version du
**2 avril 2019**, question 2 — *« Sur qui pèse l'obligation d'être certifié ? »* :

> « L'obligation de disposer d'un agrément ou d'un certificat de conformité mentionnée à l'article
> L.1111-8 [...] s'applique à toute entité qui propose un service d'hébergement
> **1/** portant sur des données de santé à caractère personnel recueillies à l'occasion d'activités
> de prévention, de diagnostic, de soins ou de suivi social et médico-social.
> **2/** pour le compte du patient ou pour le compte des professionnels de santé, des établissements
> et services de santé et tout autre organisme réalisant des missions de prévention, de soins, de
> suivi médico-social et social à l'origine de ces données.
> **Ces conditions sont cumulatives.** »

Et, décisif pour notre cas :

> « Toute personne relevant de l'une de ces catégories doit **apprécier au cas par cas** si ces
> données de santé dont il entend confier l'hébergement à un tiers proviennent de son activité de
> prévention, de diagnostic, de soins ou de suivi social et médico-social. **La prévention inclut
> les actes réalisés par les services de santé au travail.** »

Source : [FAQ HDS du ministère (PDF, 2 avril 2019)](https://esante.gouv.fr/sites/default/files/media_entity/documents/FAQ%20HDS_02042019_V0%2016.pdf) ·
[page ANS associée](https://esante.gouv.fr/faq/quel-est-lobjectif-du-regime-juridique-de-lhebergement-de-donnees-de-sante-fixe-larticle-l1111-8-du-code-de-la-sante-publique)

### 1.3 Application au cas de Manon

**Condition 2 — remplie, sans ambiguïté.**
Manon est masseur-kinésithérapeute D.E. Le masseur-kinésithérapeute est un **professionnel de santé**
au sens du CSP (livre III de la quatrième partie, art. L4321-1 et s.). La condition 2 vise « les
professionnels de santé […] à l'origine de ces données ». Elle est à l'origine des données.
**Le conventionnement, la nomenclature et le remboursement n'apparaissent nulle part dans le texte** —
ils ne sont donc pas un critère de sortie du champ. C'est le point que le statut « hors nomenclature »
ne règle pas.

**Condition 3 implicite — remplie dès qu'on met l'app en ligne.**
Aujourd'hui : disque dur chez elle → pas de tiers → **L1111-8 ne s'applique pas** (analyse confirmée
par Arnaud Dimeglio, avocat : le régime HDS vise l'externalisation chez un sous-traitant, pas
l'hébergement interne —
[Village de la Justice](https://www.village-justice.com/articles/hebergement-donnee-sante-rgpd,30355.html)).
Dès qu'un hébergeur en ligne entre en jeu, la condition est remplie.

**Condition 1 — la zone grise. Deux lectures.**

#### Lecture A — le HDS s'applique (lecture large)

- Le texte dit « **prévention** », sans le rattacher à un parcours de soins, à un acte remboursé ou
  à une prescription. C'est exactement le mot qu'emploie `cadre-legal.md` pour décrire l'activité
  (« coaching sport-santé et de **prévention** »).
- Le ministère élargit lui-même la notion : « la prévention inclut les actes réalisés par les
  services de santé au travail » — donc de la prévention sans soin et hors nomenclature entre bien
  dans le champ.
- **Le contenu collecté est de la donnée de santé par nature**, pas du bien-être : antécédents,
  description de la douleur, photos de mobilité. La CNIL classe les antécédents médicaux en donnée
  de santé « par nature », et la première offre s'appelle littéralement *Bilan de la Douleur*.
  ([CNIL — Qu'est-ce qu'une donnée de santé ?](https://www.cnil.fr/fr/quest-ce-ce-quune-donnee-de-sante))
- La CNIL, sur les applications mobiles en santé, écrit que le recours à un hébergeur certifié
  s'impose « dès que l'application mobile conduit **un professionnel ou établissement de santé** à
  confier à un tiers la conservation des données de santé » recueillies à l'occasion de ces
  activités. Le critère qu'elle retient est la **qualité de la personne**, pas son mode d'exercice.
  ([CNIL — Applications mobiles en santé](https://www.cnil.fr/fr/applications-mobiles-en-sante-et-protection-des-donnees-personnelles-les-questions-se-poser))
- Les cabinets qui traitent la frontière bien-être / santé la formulent ainsi : la qualification
  « bascule dès qu'un professionnel de santé entre dans la boucle ou que les données servent à un
  suivi médical ».
  ([Mirabile Avocat](https://www.mirabile-avocat.com/blog/certification-hds-qui-est-concerne-comment-obtenir))
  Ici, le professionnel de santé **est** la boucle.
- Manon met en avant son titre « Masseur-kinésithérapeute D.E. » dans sa communication — c'est
  précisément ce qui rend le client fondé à croire qu'il s'adresse à un professionnel de santé.

#### Lecture B — le HDS ne s'applique pas (lecture étroite)

- Les exclusions données par le ministère reposent sur un critère d'**origine** des données : sont
  hors champ les organismes qui manipulent des données de santé « mais ils n'en sont pas à
  l'origine » (assurance maladie, recherche hors soins, « les associations qui proposent des
  activités sportives à des personnes handicapées »). Ce dernier exemple est le plus proche du cas :
  activité physique adaptée à des personnes ayant une pathologie, hors champ HDS.
- Le ministère lui-même renvoie à une appréciation « au cas par cas » — il n'y a donc pas de réponse
  automatique tirée de la seule qualité de professionnel de santé.
- Manon ne pose pas de diagnostic, ne prescrit pas, ne dispense pas de soin, s'engage sur une
  obligation de moyens, et écrit dans tous ses documents que « ces recommandations ne remplacent pas
  un suivi médical ». On peut soutenir que les données ne proviennent pas d'une **activité de
  prévention au sens sanitaire du CSP**, mais d'une prestation de services sportive.
- Plusieurs analyses retiennent que « les données de bien-être produites hors de tout parcours de
  soins ne déclenchent pas l'obligation de certification HDS ».

#### Pourquoi la lecture B est fragile ici

Elle ne tient que si la prestation reste, dans les faits et dans les textes, une prestation
sportive. Or trois éléments la contredisent déjà : le titre est mis en avant, une offre s'appelle
*Bilan de la Douleur*, et les CGV actuelles parlent de « prestations de **rééducation
fonctionnelle** » (incohérence déjà relevée dans `cadre-legal.md`). **Ce n'est pas un problème de
rédaction, c'est un choix juridique** : le vocabulaire employé détermine dans quel régime on tombe.

### 1.4 Ce qui se passe si on se trompe — et qui risque quoi

C'est le point que les articles de blog confondent le plus systématiquement.

| Risque | Qui le porte | Fondement |
|---|---|---|
| 3 ans d'emprisonnement + 45 000 € | **L'hébergeur** non certifié, pas Manon | [Art. L1115-1 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862544) |
| Sanction CNIL (jusqu'à 20 M€ / 4 % du CA — plafond théorique, sans rapport avec une micro-entreprise) | **Manon**, responsable de traitement | RGPD art. 5.1.f, 9, 28, 32 + R1111-8-8 II |
| Fermeture du service en référé | **Manon** | TJ Paris, réf., **6 novembre 2020** (*arretmaladie.fr* / *Docteursecu.fr*) : recours à des hébergeurs non certifiés = **trouble manifestement illicite**, fermeture sous astreinte de 3 000 €/jour ([ALTIJ](https://www.altij.fr/detail-actualites/detail-actualites-compliance/hebergement-de-donnees-de-sante-trouble-manifestement-illicite-lie-au-defaut-de-recours-pour-un-site-internet-a-un-hebergeur-certifie)) |
| Sanction disciplinaire ordinale | **Manon**, si inscrite au tableau | Art. R4321-51 CSP : « Les dispositions du présent code de déontologie s'imposent aux masseurs-kinésithérapeutes inscrits au tableau de l'ordre » |

**La probabilité est faible** (aucun contrôle spontané de la CNIL sur une micro-entreprise à
10 clients) **mais le déclencheur typique n'est pas un contrôle** : c'est une plainte d'un client
mécontent, ou un vol de matériel. Et une fois déclenché, le manquement est trivial à constater.

### 1.5 Conclusion opérationnelle

> **Traiter le HDS comme requis.** Pas parce que le droit est tranché — il ne l'est pas — mais parce
> que l'écart de coût entre la réponse conforme et la réponse non conforme est de l'ordre de
> quelques dizaines d'euros par mois, alors que l'écart de risque est celui d'un service fermé en
> référé. Sur un projet à ~1 500 €/mois de CA, le calcul ne se discute pas.

**⚖️ relecture pro** — la qualification elle-même (l'activité est-elle « de prévention » au sens de
L1111-8 ?) est la seule question qu'un développeur ne peut pas trancher, et elle commande tout le
reste.

---

## 2. La base légale du traitement

Deux couches indépendantes, à documenter séparément dans le registre.

**Couche 1 — licéité (art. 6).** Art. 6.1.b, exécution du contrat de suivi. Non discuté.

**Couche 2 — levée de l'interdiction des données sensibles (art. 9.1).** C'est là que ça se joue.
Un contrat ne lève **pas** l'interdiction de l'art. 9.1 : l'art. 6.1.b n'est pas une exception de
l'art. 9.2. C'est la première raison pour laquelle **le contrat de suivi actuel ne suffit pas**.

### Option A — art. 9.2.h (médecine préventive)

> « le traitement est nécessaire aux fins de la médecine préventive […] de la prise en charge
> sanitaire ou sociale […] sur la base du droit de l'Union, du droit d'un État membre **ou en vertu
> d'un contrat conclu avec un professionnel de la santé** et soumis aux conditions et garanties
> visées au paragraphe 3 »

et art. 9.3 : les données doivent être traitées « par un professionnel de la santé soumis à une
obligation de secret professionnel ».

**Pour** : Manon coche les deux cases matériellement. Elle est professionnelle de santé, elle est
soumise au secret professionnel (art. L1110-4 CSP, art. R4321-55 CSP : « Le secret professionnel
institué dans l'intérêt des patients s'impose au masseur-kinésithérapeute […]. Le secret couvre tout
ce qui est venu à la connaissance du masseur-kinésithérapeute dans l'exercice de sa profession »),
et le contrat de suivi est bien « un contrat conclu avec un professionnel de la santé ». La voie
est ouverte sur le papier.

**Contre** : invoquer le 9.2.h, c'est **revendiquer la nature sanitaire de la prestation** — l'exact
contraire de ce que dit `cadre-legal.md` (« ce n'est pas un acte de kinésithérapie », « obligation
de moyens », « ne remplace jamais un suivi médical »). On ne peut pas dire au client et au fisc que
ce n'est pas du soin, et à la CNIL que c'est de la médecine préventive. **Cette incohérence est
exactement ce qu'un contrôleur cherche.**

### Option B — art. 9.2.a (consentement explicite) ← **à retenir**

C'est la voie cohérente avec le positionnement, et c'est celle que la CNIL indique pour les
applications de bien-être : « l'accord exprès de la personne doit être recueilli, après que
celle-ci a été informée que des données de santé sont collectées »
([CNIL, applications mobiles en santé](https://www.cnil.fr/fr/applications-mobiles-en-sante-et-protection-des-donnees-personnelles-les-questions-se-poser)).

**Ce que la clause doit contenir, pour être valable** (art. 4.11, 7 et cons. 32, 42, 43 RGPD) :

1. **Explicite** — un acte positif dédié : une case à cocher **distincte**, décochée par défaut,
   avec un libellé qui nomme la chose (« J'accepte que Manon collecte et conserve mes antécédents,
   la description de mes douleurs et mes photos de mobilité, qui sont des données de santé »).
2. **Spécifique** — un consentement par finalité. Le suivi n'est pas le même consentement que
   l'usage d'une photo en témoignage ou en formation. Séparer.
3. **Éclairé** — avant la case : qui traite, pourquoi, quels destinataires (l'hébergeur, TrueCoach…),
   combien de temps, quels droits, comment retirer.
4. **Libre** — le point faible. Le retrait doit être possible « à tout moment » et « aussi simple
   que de le donner » (art. 7.3). Si le refus rend la prestation impossible, le consentement est
   présumé non libre (cons. 43). **⚖️ relecture pro** : c'est la faiblesse structurelle du 9.2.a en
   contexte contractuel, et elle mérite un avis. Piste : distinguer le socle strictement nécessaire
   (couvert par 6.1.b + information) de ce qui est optionnel (photos, comparaison à 8 semaines,
   témoignages), et ne demander le consentement explicite que sur ce qui peut réellement être refusé.
5. **Prouvable** — art. 7.1 : horodatage, version du texte accepté, identifiant de la personne,
   conservé aussi longtemps que le traitement. **À prévoir en base dès la v1 de l'app.**
6. **Séparé des CGV** — accepter les CGV n'est pas consentir au sens de l'art. 9. Un bloc « j'accepte
   les conditions » qui engloberait tout est le manquement le plus fréquent et le plus facile à
   constater.

**Pourquoi le contrat actuel ne suffit probablement pas** — récapitulatif : (a) l'art. 6.1.b ne lève
pas l'art. 9.1 ; (b) l'acceptation d'un contrat n'est pas un consentement explicite et spécifique ;
(c) il n'y a probablement ni preuve horodatée, ni mécanisme de retrait, ni information sur les
destinataires et les durées.

**Recommandation de rédaction du registre** : base art. 6 = 6.1.b ; exception art. 9 = **9.2.a**,
avec mention subsidiaire du 9.2.h **seulement si** un avocat valide la cohérence avec le
positionnement commercial.

---

## 3. Le socle obligatoire — quel que soit le scénario retenu

Rien de ce qui suit ne dépend du choix acheter/développer. **Tout est déjà exigible aujourd'hui**,
avec le disque dur et WhatsApp.

| # | Obligation | Fondement | Coût réel |
|---|---|---|---|
| 1 | **Registre des activités de traitement** | RGPD art. 30. L'exemption « < 250 salariés » **ne joue pas** dès qu'il y a des données de l'art. 9 (art. 30.5) | ~2 h avec le modèle CNIL. 0 € |
| 2 | **Mention d'information** (identité, finalités, base légale, destinataires, durées, droits, réclamation CNIL) | RGPD art. 12-13 | ~3 h. À poser dans le parcours d'admission **et** en politique de confidentialité |
| 3 | **Durées de conservation** | Référentiel CNIL « conservation des données dans le secteur de la santé (hors recherche) » : **5 ans en base active** depuis la dernière intervention, puis **15 ans en archivage intermédiaire** séparé et sécurisé. Non contraignant — on peut s'en écarter en le justifiant. Pour une activité hors soin, une durée plus courte est défendable, **mais elle doit être écrite** | ~1 h de décision, puis du code |
| 4 | **Droits** : accès, rectification, effacement, portabilité, **retrait du consentement** | RGPD art. 15-21, réponse sous 1 mois | Concrètement : un export du dossier + une suppression **réelle**, sauvegardes comprises. À spécifier dans l'app |
| 5 | **DPA art. 28 avec chaque sous-traitant** | RGPD art. 28.3 | Hébergeur, e-mail, TrueCoach, visio, facturation, stockage photo, monitoring. Gratuits chez les prestataires sérieux, **mais il faut les signer et les archiver** |
| 6 | **Sécurité** | RGPD art. 32 ; art. R4321-116 CSP (« protège contre toute indiscrétion les documents professionnels […] quels que soient le contenu et le support ») | Chiffrement au repos et en transit, authentification forte, journalisation des accès, sauvegardes testées |
| 7 | **Procédure de violation de données** | RGPD art. 33 (CNIL sous 72 h) et 34 (information des personnes) | ~1 h : une page écrite disant qui fait quoi |
| 8 | **AIPD** | **Probablement non requise** : la CNIL a listé les traitements dispensés d'AIPD, qui incluent la prise en charge par un professionnel de santé exerçant à titre individuel ; et le critère « grande échelle » n'est pas rempli (~10 clients actifs, ~50 dossiers). Faire quand même une analyse de risque courte = bonne pratique, **pas** une obligation. ⚖️ à confirmer | 0 € si non requise |
| 9 | **DPO** | **Non obligatoire** (art. 37) : pas d'activité de base consistant en un traitement à grande échelle de données sensibles | 0 € |

**Total réaliste du socle : 1 à 2 jours de travail** en partant des modèles CNIL, plus 0 à ~1 500 €
si on fait relire par un avocat spécialisé. C'est un coût de mise en conformité **de l'activité**,
pas un coût de l'app — il doit être imputé à Manon dans tous les scénarios, y compris le statu quo,
sinon la note compare des choses inégales.

Références : [modèle de registre CNIL](https://www.cnil.fr/fr/RGPD-le-registre-des-activites-de-traitement) ·
[référentiels santé CNIL](https://www.cnil.fr/fr/la-cnil-publie-trois-referentiels-pour-le-secteur-de-la-sante) ·
[listes AIPD requise / non requise](https://www.cnil.fr/fr/listes-des-traitements-pour-lesquels-une-aipd-est-requise-ou-non)

---

## 4. Le risque du statu quo — comparaison honnête

Statu quo = photos de mobilité échangées sur **WhatsApp**, dossiers en PDF sur un **disque dur non
chiffré**, ~50 dossiers depuis 2023.

### 4.1 Ce que le statu quo fait *mieux* que tout scénario en ligne

**Un seul point, mais il est réel : il n'y a pas de tiers hébergeur, donc L1111-8 ne s'applique pas
au disque dur.** L'hébergement pour son propre compte est hors du régime HDS (FAQ ministère,
question 2 ; analyse Dimeglio). C'est le seul avantage juridique du statu quo, et il faut le dire
dans la note — sinon la note plaide au lieu de comparer.

### 4.2 Ce que le statu quo fait *moins bien*

**WhatsApp** — le point le plus faible, et de loin :

- **Pas de DPA art. 28.** L'app WhatsApp (grand public comme *WhatsApp Business App*) ne propose pas
  d'accord de sous-traitance. Le DPA existe pour la *Cloud API* via un Business Solution Provider,
  pas pour l'app installée sur le téléphone. Donc : un sous-traitant qui traite des données de santé
  **sans contrat**, manquement direct à l'art. 28.
- **Meta n'est pas certifié HDS**, et le canal est un tiers au sens de L1111-8. Si la lecture A
  (§ 1.3) est la bonne, **WhatsApp est déjà aujourd'hui un manquement à L1111-8** — le statu quo
  n'échappe au HDS que pour le disque dur, pas pour le canal photo.
- **Le chiffrement de bout en bout ne règle rien de tout ça.** Il protège le contenu en transit. Il
  ne protège pas : les métadonnées (qui parle à qui, quand, à quelle fréquence — ce qui suffit à
  révéler qu'une personne est suivie), les sauvegardes iCloud/Google Drive du téléphone (souvent non
  chiffrées de bout en bout), le carnet d'adresses remonté chez Meta, ni l'absence de contrat.
- **L'anonymisation par omission du nom ne marche pas** : un prénom, une initiale, un signe
  distinctif sur une photo ou une géolocalisation EXIF suffisent à réidentifier.
- **Secret professionnel** : art. R4321-55 et R4321-116 CSP couvrent « tout ce qui est venu à la
  connaissance […] dans l'exercice de sa profession », « quels que soient le contenu et le support ».
  L'exposition d'une photo de santé à un tiers non contractualisé est un sujet ordinal autant que
  CNIL.

**Le disque dur non chiffré** :

- Hors champ HDS, mais **pas** hors champ de l'art. 32. Un disque non chiffré perdu ou volé =
  violation de données sensibles → notification CNIL sous 72 h (art. 33) **et** information de
  chacune des ~50 personnes concernées (art. 34). C'est le scénario le plus probable et le plus
  humiliant.
- Sauvegarde inconnue → risque de **perte pure** des 50 dossiers, qui est un risque métier avant
  d'être un risque juridique.
- Manque aussi : registre (art. 30), mentions d'information (art. 13), procédure de droits, durées
  de conservation écrites.

### 4.3 Verdict comparatif

| Scénario | HDS | Art. 28 (DPA) | Art. 32 (sécurité) | Art. 30 / 13 | Verdict |
|---|---|---|---|---|---|
| **Statu quo** (WhatsApp + disque) | Hors champ pour le disque ; **manquement probable pour WhatsApp** | ❌ aucun DPA | ❌ pas de chiffrement, sauvegarde incertaine | ❌ | **Le moins conforme** |
| **SaaS non HDS** (photos uploadées) | ❌ manquement | ✅ si DPA signé | ✅ en général | ✅ si le socle est fait | **Pire que le statu quo** sur le seul point HDS |
| **Sur-mesure chez un hébergeur certifié HDS** | ✅ | ✅ | ✅ | ✅ si le socle est fait | **Le plus conforme** |

> **L'argument central pour la note :** un scénario en ligne bien construit n'ajoute pas du risque
> juridique, **il en retire**. Le statu quo n'est pas le scénario prudent, c'est le scénario le plus
> exposé — et le seul dans lequel on ne sait même pas où sont les données. La seule façon d'être
> plus mal qu'aujourd'hui est de choisir un SaaS ou un hébergeur non certifié tout en y mettant les
> photos.

---

## 5. Hébergeurs — décision d'ingénierie

### 5.1 La règle de tri

Le référentiel HDS découpe l'hébergement en **6 activités** ; un prestataire peut être certifié sur
tout ou partie :

1. Mise à disposition et maintien en condition opérationnelle des **sites physiques** (datacenters)
2. … de l'**infrastructure matérielle** (serveurs, stockage, réseau)
3. … de l'**infrastructure virtuelle**
4. … de la **plateforme d'hébergement applicatif**
5. **Administration et exploitation** du SI contenant les données de santé
6. **Sauvegarde externalisée** des données de santé

Pour une app web + base + photos, ce sont les activités **3, 4, 5 et 6** qui comptent (les 1-2
étant portées par le datacenter sous-jacent).

**Règle applicable composant par composant :** tout composant qui **stocke, traite ou journalise en
clair** des données de santé (base, stockage des photos, sauvegardes, logs applicatifs, files de
traitement) doit être chez un hébergeur certifié sur l'activité correspondante. Un composant qui ne
sert que des **assets statiques publics et anonymes** (le HTML/CSS/JS du site vitrine) n'héberge
aucune donnée de santé et n'est pas concerné.

### 5.2 Verdict par hébergeur

| Hébergeur | Verdict | Motif |
|---|---|---|
| **Netlify** | **Éliminé** pour l'app | Pas de certification HDS, société américaine. Utilisable **uniquement** pour le site vitrine public — sans formulaire de santé, sans fonction serverless touchant aux données |
| **Vercel** | **Éliminé** pour l'app | Idem, et le piège est plus grand : Serverless/Edge Functions et logs de plateforme feraient **transiter et journaliser** des données de santé sans qu'on s'en aperçoive |
| **Supabase (région EU)** | **Éliminé en l'état** | Supabase n'est pas certifié HDS. La région EU règle le transfert international et une partie du RGPD, **pas** L1111-8. *(Supabase tourne sur AWS, lui-même certifié HDS — mais la certification est nominative et couvre AWS, pas Supabase comme hébergeur intermédiaire. ⚖️ à faire confirmer si on tient à Supabase.)* |
| **Scaleway** | **Retenu, avec réserves** | Certifié HDS **v2.0, activités 1 à 4**, datacenters en France. Produits couverts nommément : Instances CPU/GPU, Block & Object Storage, Elastic Metal, Dedibox, VPC, Kapsule (K8s), Load Balancer. **Contraintes : signature d'un contrat HDS spécifique + souscription obligatoire d'un plan de support Business ou Enterprise** (payant, tarif à obtenir) |
| **OVHcloud** | **Retenu, avec réserves** | Certifié HDS, datacenters Roubaix/Strasbourg dans le périmètre. Couvre Public Cloud, serveurs dédiés, Hosted Private Cloud, Cloud Databases. Vérifier que l'offre exacte souscrite est bien dans le périmètre |
| **Clever Cloud** | **Retenu — meilleur candidat** | Certifié HDS **v2.1 sur les 6 activités**, obtenu le 20/12/2024, valide jusqu'au 19/12/2027. Régions France (Paris, Gravelines, Roubaix). Également ISO 27001:2022 et SecNumCloud. C'est un **PaaS** : le moins d'exploitation à la charge d'Alex, et les activités 5 et 6 (administration, sauvegarde externe) sont couvertes — ce que Scaleway ne couvre pas. Contrat spécifique requis, tarif **sur demande** |
| **Scalingo** *(non demandé, à ajouter)* | **À comparer avec Clever Cloud** | PaaS français, certifié HDS sur **les 6 activités**, certificat renouvelé en septembre 2025, valide jusqu'au 11/09/2028. PostgreSQL/MySQL/MongoDB managés. Profil très proche de Clever Cloud |

Sources : [Clever Cloud HDS](https://www.clever.cloud/health-data-hosting/) ·
[Scaleway HDS](https://www.scaleway.com/fr/security-and-compliance/hds/) ·
[OVHcloud — garanties HDS par produit](https://docs.ovhcloud.com/en/guides/account-and-service-management/account-information/hds-garanties) ·
[Scalingo HDS](https://scalingo.com/hds-certification) ·
[Liste officielle ANS des hébergeurs certifiés](https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies)

### 5.3 Trois pièges qui annulent le bénéfice d'un hébergeur certifié

1. **La certification porte sur des produits nommés, pas sur le catalogue.** Un même hébergeur vend
   des offres certifiées et non certifiées. Vérifier produit par produit, et exiger le **contrat HDS**.
2. **La chaîne fuit ailleurs.** À auditer aussi : e-mails transactionnels (un e-mail « ton bilan est
   prêt » ne doit contenir **aucune** donnée de santé), monitoring et rapports d'erreur (Sentry & co.
   capturent des payloads entiers), analytics, CDN d'images, et **toute API d'IA tierce**.
3. **Le surcoût HDS existe.** Contrat dédié, plan de support obligatoire chez Scaleway, tarifs « sur
   demande » chez Clever Cloud. Les estimations de marché parlent de **+20 à +50 %** par rapport à
   l'offre standard équivalente — **ordre de grandeur non vérifié, à confirmer par devis** avant
   d'entrer dans le compteur 1 de la carte. Aucun de ces prix n'est public : dans la note, ils
   s'écrivent « sur demande ».

---

## 6. Ce qu'un non-juriste peut décider seul

**Décidable seul (choix conservateurs, jamais reprochables) :**

- choisir un hébergeur certifié HDS plutôt qu'un non certifié ;
- écrire le registre, la mention d'information et la procédure d'exercice des droits à partir des
  modèles CNIL ;
- signer et archiver les DPA proposés par les prestataires ;
- chiffrer le disque, mettre en place et **tester** des sauvegardes ;
- arrêter d'envoyer des photos de santé par WhatsApp — c'est le geste au meilleur rapport
  risque/effort de tout le dossier, et il ne coûte rien en attendant l'app ;
- **minimiser la collecte** : ne pas demander ce qu'on n'utilise pas. Chaque champ retiré retire du
  risque ;
- prévoir dès la v1 le stockage de la **preuve de consentement** (horodatage, version du texte).

**⚖️ Exige une relecture professionnelle** (avocat en droit de la santé / données personnelles) :

1. **La qualification** : l'activité relève-t-elle de la « prévention » au sens de L1111-8 ? C'est la
   question qui commande tout le reste, et le seul point où « pas de réponse tranchée » est un
   problème coûteux.
2. **La base légale art. 9** : 9.2.a vs 9.2.h, et surtout l'articulation entre « consentement libre »
   et « données nécessaires à l'exécution du contrat ».
3. **La clause de consentement et la mention d'information** — à rédiger ou à valider mot à mot.
4. **La cohérence des textes commerciaux** : les CGV parlent de « rééducation fonctionnelle », la FAQ
   de « coaching sport-santé et de prévention ». Ce n'est pas un arbitrage de style : le premier
   terme ramène l'activité dans le champ du soin, donc dans celui du HDS. À trancher **avant**
   d'écrire quoi que ce soit d'autre.
5. **Le statut ordinal** : Manon est-elle inscrite au tableau de l'Ordre ? Si oui, le code de
   déontologie s'impose (R4321-51) et l'Ordre devient un régulateur supplémentaire. À vérifier
   auprès du conseil départemental.
6. **La durée de conservation retenue** si l'on s'écarte du 5 + 15 ans du référentiel CNIL.

---

## 7. Ce qui reste ouvert

- **Le prix réel du HDS** chez Clever Cloud, Scalingo, Scaleway et OVHcloud : aucun n'est public.
  Il faut trois devis avant de remplir le compteur 1 de la carte. En attendant : « sur demande ».
- **Supabase sur AWS** : la certification HDS d'AWS bénéficie-t-elle à un client de Supabase ?
  Intuition : non, la certification est nominative. À confirmer.
- **Le sort de WhatsApp** (point ouvert de la carte) : aucun scénario ne le remplace vraiment pour
  le fil de conversation quotidien. Mais **les photos de santé, elles, ont un remplaçant** dès qu'il
  y a un upload dans l'app. La bonne granularité n'est pas « quitter WhatsApp » mais « sortir les
  données de santé de WhatsApp ».
- **La reprise des ~50 dossiers existants** : les migrer vers un hébergement certifié résout le
  risque du disque dur ; les laisser hors ligne le laisse entier. À arbitrer avec Manon, pas seul.

---

## Sources

**Textes**
- [Art. L1111-8 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049577902) — hébergement des données de santé, certification
- [Art. R1111-8-8 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000036656709) — définition de l'activité d'hébergement ; obligation du responsable de traitement de vérifier le certificat
- [Art. L1115-1 CSP](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033862544) — sanction pénale de l'hébergeur non certifié
- Décret n° 2018-137 du 26 février 2018 ; ordonnance n° 2017-27 du 12 janvier 2017
- RGPD art. 4.15, 6, 7, 9 (spéc. 9.2.a, 9.2.h, 9.3), 12-21, 28, 30, 32-34, 37 ; cons. 32, 35, 42, 43
- Art. L1110-4, R4321-51, R4321-55, R4321-91, R4321-116 CSP — secret professionnel et déontologie des masseurs-kinésithérapeutes ([code de déontologie MK, version 25/12/2020](https://www.ordremk.fr/wp-content/uploads/2021/05/code-de-deontologie.pdf))

**Autorités**
- [FAQ HDS du ministère chargé de la Santé / DSSIS, 2 avril 2019 (PDF)](https://esante.gouv.fr/sites/default/files/media_entity/documents/FAQ%20HDS_02042019_V0%2016.pdf) — **la source la plus utile** : conditions cumulatives, exclusions, appréciation au cas par cas
- [ANS — Certification HDS](https://esante.gouv.fr/produits-services/hds) et [liste des hébergeurs certifiés](https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies)
- [ANS — Référentiel de certification HDS (PDF)](https://esante.gouv.fr/sites/default/files/media_entity/documents/referentiel_certification_hds---fr--v2.pdf)
- [CNIL — Qu'est-ce qu'une donnée de santé ?](https://www.cnil.fr/fr/quest-ce-ce-quune-donnee-de-sante)
- [CNIL — Applications mobiles en santé : les questions à se poser](https://www.cnil.fr/fr/applications-mobiles-en-sante-et-protection-des-donnees-personnelles-les-questions-se-poser)
- [CNIL — Trois référentiels pour le secteur de la santé](https://www.cnil.fr/fr/la-cnil-publie-trois-referentiels-pour-le-secteur-de-la-sante) (gestion des cabinets ; conservation hors recherche : 5 + 15 ans)
- [CNIL — Listes des traitements pour lesquels une AIPD est requise ou non](https://www.cnil.fr/fr/listes-des-traitements-pour-lesquels-une-aipd-est-requise-ou-non)

**Jurisprudence**
- TJ Paris, référé, 6 novembre 2020, *arretmaladie.fr* / *Docteursecu.fr* — hébergement non certifié = trouble manifestement illicite ([commentaire ALTIJ](https://www.altij.fr/detail-actualites/detail-actualites-compliance/hebergement-de-donnees-de-sante-trouble-manifestement-illicite-lie-au-defaut-de-recours-pour-un-site-internet-a-un-hebergeur-certifie))

**Analyses de cabinets**
- [Arnaud Dimeglio — Hébergement de données de santé et RGPD](https://www.village-justice.com/articles/hebergement-donnee-sante-rgpd,30355.html) — le régime HDS vise l'externalisation, pas l'hébergement interne
- [Mirabile Avocat — Certification HDS : qui est concerné](https://www.mirabile-avocat.com/blog/certification-hds-qui-est-concerne-comment-obtenir) — « la qualification bascule dès qu'un professionnel de santé entre dans la boucle »
- [Barbey Avocat — Données des applications de bien-être](https://www.cabinetbarbey.com/blog/donnees-applications-bien-etre-regime-juridique) — pas de réponse tranchée ; en cas de doute, retenir l'option la plus protectrice
- [Squair — Choisir son hébergeur de données de santé](https://www.squairlaw.com/fr/blog/choisir-son-hebergeur-de-donnees-de-sante-criteres-certifications-et-points-de-vigilance-contractuel)

**Hébergeurs**
- [Clever Cloud](https://www.clever.cloud/health-data-hosting/) · [Scaleway](https://www.scaleway.com/fr/security-and-compliance/hds/) · [OVHcloud](https://docs.ovhcloud.com/en/guides/account-and-service-management/account-information/hds-garanties) · [Scalingo](https://scalingo.com/hds-certification)
