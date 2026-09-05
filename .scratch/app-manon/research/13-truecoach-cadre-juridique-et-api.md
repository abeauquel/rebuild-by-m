# 13 — TrueCoach : posture RGPD réelle, et ce qu'on peut y brancher

> **Avertissement.** Recherche documentaire faite par un non-juriste à partir de sources primaires
> citées. Ce n'est pas un avis juridique. Sources consultées : **5 septembre 2026**.
>
> **Conventions.** **VU** = lu directement sur une page de l'éditeur ou d'une autorité, URL citée.
> **DÉDUIT** = inférence de ma part, signalée comme telle. **NON PUBLIC** = l'information n'existe
> pas publiquement, je le dis au lieu de la fabriquer.

---

## Réponse courte

| Question | Réponse | Statut |
|---|---|---|
| Qui édite, où sont les données ? | **Truecoach, Inc.**, filiale de **Xplor Technologies, LLC** (Delaware, siège Atlanta). `app.truecoach.co` et `api.truecoach.co` résolvent vers un load balancer AWS **`us-west-2`** (Oregon, **États-Unis**) | VU |
| DPA art. 28 public ? | **Non. Aucun.** Ni page DPA, ni annexe RGPD, ni liste de sous-traitants ultérieurs. Les CGU disent seulement « Xplor peut recourir à des Sub-Processors » | VU |
| Transferts USA couverts par quoi ? | **Rien de nommé.** **Ni Xplor ni TrueCoach ne figurent sur la liste DPF** (vérifié sur dataprivacyframework.gov, actifs *et* inactifs). Aucune mention de CCT/SCC. La formule employée est « des contrats lorsque c'est approprié » | VU |
| HIPAA ? | TrueCoach écrit lui-même : **« At this time, TrueCoach is not HIPAA compliant »**. Et de toute façon **HIPAA n'a aucune portée en France** | VU |
| HDS ? | **Aucune mention, nulle part.** Hébergement en Oregon → hors de tout périmètre HDS possible | VU |
| Les CGU autorisent-elles les données de santé ? | **Non — elles les interdisent explicitement.** Le contenu utilisateur ne doit pas contenir de « medical, mental or emotional diagnosis, advice or treatment […] dietary advice, or personal advice of any kind » | VU — **point décisif** |
| Droits des personnes (accès/export/effacement) ? | Effacement : oui, mais **destructif et sans export préalable**. Export : **CSV de 14–15 champs de fiche client, rien d'autre**. Aucun délai de réponse annoncé | VU |
| API publique ? | **Non.** Pas de portail développeur, pas de doc. Seule intégration officielle : **Zapier** (4 déclencheurs, 1 action), clé API dans *Settings → Integration*, **plan Pro et au-dessus** | VU |
| Les CGU autorisent-elles l'automatisation ? | **Non.** Interdiction de tout « robot, spider, crawler, scraper, or other manual or automated means or interface », **et** de développer une application tierce interagissant avec le service **sans accord écrit** | VU — **s'applique au bookmarklet** |

**Verdict** : garder TrueCoach tel qu'il est utilisé aujourd'hui **est une contradiction avec
l'exigence HDS**, et — plus grave et plus simple à constater — **une violation du contrat que
Manon a accepté**. Voir § 5.

---

## 1. Qui édite TrueCoach, et où sont les données

### 1.1 L'entité contractante

Les CGU en vigueur (« Last Updated: February 2026 ») s'ouvrent ainsi — **VU** :

> « These Terms of Service form a legally binding contract between you and/or the company that you
> represent (“You” or “Company”) and **Truecoach, Inc., or the applicable Affiliate** (“Xplor”,
> “we”, “our” or “us”). »

Source : <https://xplor.com/truecoach-terms-of-use/>

- **Droit applicable et juridiction — VU** : « These Terms […] shall be governed by and construed
  under the **laws of the State of New York**, U.S. […] exclusive jurisdiction of the courts of
  New York, New York. » Renonciation à l'action collective et **au procès devant jury**, arbitrage,
  et prescription contractuelle de 2 ans.
- **Adresse de notification — VU** : « Xplor Technologies, c/o Mariana Tek, Attn: General Counsel,
  1717 K St. NW, Suite 1100, Washington, DC 20006. »
- **Le groupe — VU** : `truecoach.co/privacy` et `truecoach.co/terms` **redirigent en 301** vers
  `xplor.com/us/privacy-notice` et `xplor.com/us/terms-use`. La notice de confidentialité Xplor liste
  `https://truecoach.co` parmi ses produits.
  Xplor Technologies, LLC est « a company registered in **Delaware** with file number 5160371 »
  (VU, <https://xplor.com/us/terms-use>), siège **950 East Paces Ferry Rd NE #1900, Atlanta, GA 30326,
  USA** (VU, <https://xplor.com/us/privacy-notice>).

> **Conséquence pratique** : le litige-type se plaide à New York, en anglais, sous droit américain.
> Pour une micro-entreprise française, c'est un recours théorique.

### 1.2 Où sont hébergées les données — **VU par résolution DNS**

```
app.truecoach.co → xfw-truecoach-app-prd-truecoach-1791879232.us-west-2.elb.amazonaws.com
api.truecoach.co → (le même load balancer)
                   34.210.30.122 · 44.238.20.254 · 44.226.101.172
```

- **Sous-traitant d'infrastructure : Amazon Web Services.** **Région : `us-west-2` — Oregon,
  États-Unis.** C'est lisible dans le nom d'hôte du load balancer lui-même. **VU** (résolution DNS
  du 5 septembre 2026).
- L'application est une SPA Ember dont le nom de code interne est resté `fitbot-client` (VU, source
  HTML de `app.truecoach.co` — TrueCoach s'appelait FitBot à l'origine).
- **DÉDUIT** : la base et le stockage des médias (photos de progression, vidéos client) suivent la
  même région. Rien ne suggère un découpage régional, et **aucune option de résidence des données
  européenne n'est proposée nulle part** (NON PUBLIC : aucune page produit, aide ou légale n'en parle).

La notice Xplor dit, plus vaguement — **VU** :

> « Currently, we primarily use data centers in the European Union, United Kingdom, United States,
> Canada, Australia, and New Zealand. »

C'est une liste couvrant tout le groupe (une trentaine de marques : Mariana Tek, Membr, Resamania,
Clearent, QikKids…). **Pour TrueCoach spécifiquement, la mesure DNS tranche : États-Unis.**

### 1.3 Ce que Xplor déclare collecter — et ce qui manque

Catégories listées dans la notice — **VU** : coordonnées, informations de paiement, identifiants,
« **Content and files**, such as the photos, documents, or other files you upload », et
« **Fitness data**, such as nutritional information, level of physical fitness, and workout metrics ».

> « Certain information included within **fitness data**, and certain payment information, may be
> treated as “**sensitive**” Personal Data under applicable law. »

**Il n'y a aucune catégorie « données de santé », aucune mention de « health data », et zéro
occurrence de « HIPAA », « GDPR », « Standard Contractual Clauses » ou « Data Privacy Framework »
dans toute la notice** (VU — vérifié par recherche plein texte sur la page).

> **Lecture** : Xplor a construit son cadre pour du **fitness grand public**, pas pour de la donnée
> de santé produite par un professionnel de santé. Ce n'est pas un oubli de rédaction, c'est le
> périmètre revendiqué du produit. Les antécédents, la description de la douleur et les photos de
> mobilité de Manon sont **hors de ce périmètre**.

---

## 2. DPA art. 28 : il n'y en a pas

### 2.1 Ce qui existe

Recherche exhaustive : **aucun DPA public, aucune page « legal », aucune liste de sous-traitants
ultérieurs.** Retours HTTP vérifiés le 5 septembre 2026 — **VU** :

| URL testée | Résultat |
|---|---|
| `xplor.com/dpa/` · `truecoach.co/dpa/` | 404 |
| `xplor.com/subprocessors/` · `xplor.com/sub-processors/` | 404 |
| `xplor.com/legal/` | 404 |
| `truecoach.co/security/` | 404 |
| `xplor.com/truecoach-data-processing-addendum/` | 404 |
| `xplor.com/eu/privacy-notice` · `xplor.com/gb/privacy-notice` | 404 |

Le seul texte contractuel touchant la sous-traitance est la section **E. PRIVACY** des CGU — la voici
**en entier**, ce qui suffit à mesurer le problème (**VU**) :

> **E.1 Xplor Privacy Notice.** « Xplor processes Personal Data in connection with its obligations
> and rights under these Terms, including the Privacy Notice, or as otherwise instructed by You or
> required by law. »
>
> **E.2 Company Privacy Notice.** « **Company is responsible for maintaining, posting, and adhering
> to its own privacy notice** […] including that such authorized End Users' personal data will be
> processed by Xplor, its affiliates and Sub-Processors and by Third Party Service Providers, on
> behalf of Company. […] Company shall (i) ensure that all individuals […] have received all legally
> required notifications […] (ii) where legally required, **ensure that consent of the individual
> […] is properly received and logged**; and (iii) **provide evidence of such consent […] to Xplor
> upon request**. […] Company acknowledges that **Xplor may aggregate, de-identify, anonymize,
> and/or pseudonymize Data** for the purposes set forth in these Terms. »
>
> **E.3 Security.** « Xplor will implement **commercially reasonable** technical and organization
> measures for the Services designed to protect Personal Information against accidental or unlawful
> destruction, loss, alteration, disclosure or access. »
>
> **E.4 Subprocessors.** « **You agree that Xplor may use Sub-Processors to assist Xplor in
> processing Personal Data for the performance of the Service.** »

### 2.2 Ce qui manque, article par article

| Exigence RGPD | Présent ? |
|---|---|
| Art. 28.3 — objet, durée, nature, finalité, catégories de données et de personnes | ❌ absent |
| Art. 28.3.a — traitement **sur instruction documentée** uniquement | ❌ au contraire : E.2 autorise Xplor à agréger/anonymiser pour ses propres finalités |
| Art. 28.3.b — engagement de **confidentialité** du personnel | ❌ absent |
| Art. 28.3.c — mesures de sécurité art. 32 | 🟡 « commercially reasonable », sans aucun détail (pas de chiffrement au repos annoncé, pas de journalisation, pas de certification) |
| Art. 28.2 / 28.4 — **liste des sous-traitants ultérieurs, information préalable des changements, droit d'opposition** | ❌ autorisation générale en blanc, sans liste, sans notification, sans droit d'objection |
| Art. 28.3.e — **assistance** pour répondre aux demandes de droits | ❌ absent |
| Art. 28.3.f — assistance art. 32-36 et **notification de violation** | ❌ absent (l'obligation de notifier va dans l'autre sens : c'est *Manon* qui doit signaler à Xplor) |
| Art. 28.3.g — **restitution ou suppression** des données en fin de contrat, au choix du responsable | ❌ **clause contraire**, voir ci-dessous |
| Art. 28.3.h — **audit** | ❌ absent |

**La clause de fin de contrat, section I.6 — VU, et c'est la plus dure :**

> « Upon any termination or expiration of this Agreement […] **You acknowledge that You shall have
> no further access to Content or Data, including any End User Data input into the Services, and
> that Xplor may delete any such Data at any time.** »

Aucune fenêtre de récupération, aucune obligation de restitution. **Le jour où l'abonnement s'arrête,
les dossiers peuvent disparaître sans préavis** — c'est un risque métier autant que juridique.

**Et la licence sur le contenu, section C.3 — VU :**

> « By uploading or posting any User Content to or through the Services, You hereby grant to Xplor
> […] a worldwide, **irrevocable, perpetual**, nonexclusive, assignable, sublicensable, royalty free
> and transferable right and license to reproduce, encode, store, copy, transmit, publish, post,
> broadcast, display, publicly perform, distribute, adapt, modify, create derivative works of,
> **disclose and use User Content** in connection with the Services and Xplor's business through all
> media now known or hereinafter developed, **including for the purpose of promotions and marketing**.
> […] **this license continues even if you stop using our Services.** »

Une licence perpétuelle et irrévocable, à des fins de **promotion et de marketing**, sur du contenu
téléversé — dont les photos de mobilité. C'est frontalement incompatible avec le rôle de simple
sous-traitant, et avec un consentement art. 9.2.a limité au suivi.

### 2.3 Le piège de la notice de confidentialité

La notice Xplor — le seul document que les CGU incorporent — **exclut elle-même le cas de Manon**
(**VU**, § 1. SCOPE) :

> « This Privacy Notice applies **when Xplor acts as a controller** […]. **It typically does not
> apply to situations where Xplor is acting as a service provider or processor** […]. This Privacy
> Notice does not typically apply to Personal Data that we process as a service provider or data
> processor on behalf of our Customers. »

Or dans la relation coach → clients, Xplor est **sous-traitant**. **Le seul document de
confidentialité auquel les CGU renvoient déclare donc ne pas s'appliquer à la situation qui nous
occupe.** Il ne reste rien.

**DÉDUIT (confiance moyenne)** : un DPA sur mesure est peut-être signable en écrivant à
`privacy@xplortechnologies.com`. Ce n'est **NON PUBLIC** — je n'ai vu ni formulaire, ni mention, ni
promesse en ce sens. À demander par écrit si l'on veut trancher.

---

## 3. Transferts vers les États-Unis : rien n'est affiché

### 3.1 Vérification sur la liste officielle DPF

Recherche faite le 5 septembre 2026 sur <https://www.dataprivacyframework.gov/list> (site officiel
de l'International Trade Administration, U.S. Department of Commerce) — **VU** :

| Terme cherché | Filtre | Résultat |
|---|---|---|
| `Xplor` | Active Participants | **Aucun.** Le moteur ne renvoie que « Xanterra » (Greenwood Village, CO), qui n'a rien à voir |
| `Xplor` | Inactive Participants | **« Query returned no results. »** |
| `TrueCoach` | Active Participants | **« Query returned no results. »** |
| `TrueCoach` | Inactive Participants | **« Query returned no results. »** |

*(3 659 participants actifs au total à cette date.)*

> **Conclusion : ni Xplor Technologies, ni Truecoach, Inc. ne sont certifiés au titre du
> EU-U.S. Data Privacy Framework** — ni aujourd'hui, ni par le passé. L'article 45 RGPD est donc
> hors-jeu.

### 3.2 Ce que Xplor dit à la place

**VU**, notice § 9.A « Location of processing European Personal Data » :

> « We transfer Personal Data from the European Economic Area, United Kingdom, and Switzerland to
> other countries (**including the USA**), some of which **have not been determined by the European
> Commission to have an adequate level of data protection**. When we do so, we use **a variety of
> legal mechanisms, including contracts where appropriate**, to help ensure your rights and
> protections. »

C'est un aveu, pas une garantie. « **Des contrats lorsque c'est approprié** » ne nomme ni les
clauses contractuelles types (art. 46.2.c), ni les BCR, ni le DPF. **Zéro occurrence de « Standard
Contractual Clauses », « Privacy Shield » ou « Data Privacy Framework » dans toute la notice** (VU,
recherche plein texte).

**Bilan chapitre V du RGPD** : le transfert UE → États-Unis des données de ses clients est,
**en l'état des documents publics, sans base juridique documentée**. Manon ne peut ni le décrire
dans son registre (art. 30.1.e), ni l'annoncer honnêtement dans sa mention d'information
(art. 13.1.f), parce que l'information n'existe pas.

---

## 4. HIPAA, HDS, et les CGU sur les données de santé

### 4.1 HIPAA : TrueCoach dit lui-même non — et ça n'aurait rien changé

Article d'aide officiel, titre : *« Is TrueCoach HIPAA Compliant? »* — **VU** :

> « **At this time, TrueCoach is not HIPAA compliant.** »

Source : <https://help.truecoach.co/en/articles/4821090-is-truecoach-hipaa-compliant>

> ⚠️ **Et même si la réponse avait été oui, ça ne servirait à rien ici.** HIPAA est une **loi
> fédérale américaine** (Health Insurance Portability and Accountability Act, 1996) qui s'applique
> aux *covered entities* américaines — assureurs, prestataires de soins et chambres de compensation
> américains. **Elle n'a aucune portée juridique en France, ne crée aucun droit opposable devant la
> CNIL, et ne remplace ni le RGPD ni l'article L1111-8 CSP.** C'est la confusion la plus fréquente
> du marché : plusieurs outils du panorama (Physitrack, Wibbi, Kinvent, Nabla) affichent un badge
> HIPAA qui rassure à tort. **Un badge HIPAA n'est pas un demi-HDS ; c'est un badge d'un autre pays,
> pour un autre régime, avec un autre régulateur.**

### 4.2 HDS : zéro mention, et c'était couru d'avance

**VU** : aucune occurrence de « HDS », « hébergeur de données de santé », ou « health data hosting »
sur `truecoach.co`, `help.truecoach.co`, `xplor.com/us/privacy-notice`,
`xplor.com/truecoach-terms-of-use` ni `xplor.com/acceptable-use-policy`. TrueCoach ne figure évidemment
pas sur la [liste ANS des hébergeurs certifiés](https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies).

**DÉDUIT (confiance forte)** : l'affaire est close par la géographie. La certification HDS est
**nominative** (elle porte sur l'hébergeur et sur des périmètres de services nommés) et suppose des
sites d'hébergement dans le périmètre certifié. Les données de TrueCoach sont dans un **datacenter
AWS en Oregon**. Même en admettant qu'AWS détienne une certification HDS pour certaines de ses
régions, elle ne couvrirait ni la région `us-west-2`, ni Truecoach, Inc. comme hébergeur
intermédiaire. C'est exactement le raisonnement déjà retenu pour Supabase-sur-AWS dans
[`03-cadre-juridique.md`](03-cadre-juridique.md) § 5.2.

### 4.3 **Les CGU interdisent d'y mettre des données de santé — le point décisif**

C'est le résultat le plus important de cette recherche, et il ne dépend d'aucune interprétation du
HDS. Section **C.4 Content Restrictions** des CGU TrueCoach — **VU** :

> « User Content posted on the Service **shall not contain** inappropriate material as determined by
> Xplor in its sole discretion, including but not limited to […] (j) **medical, mental or emotional
> diagnosis, advice or treatment, emotional advice, dietary advice, or personal advice of any
> kind.** »

La même interdiction est reprise, mot pour mot ou presque, dans l'**Acceptable Use Policy** du
groupe, que les CGU incorporent expressément — **VU**,
<https://xplor.com/acceptable-use-policy/> :

> « Materials containing **medical, mental or emotional diagnosis, advice or treatment**, emotional
> advice, **medical dietary advice or personal advice of any kind** »

Et la section **O** enfonce le clou — **VU** :

> « Nothing contained in the Services […] is intended to be a substitute for, nor does it replace,
> professional healthcare or wellness advice […] **XPLOR IS NOT A LICENSED HEALTHCARE PROVIDER.** »

**Ce que ça veut dire concrètement.** Un bilan de douleur, une liste d'antécédents, une consigne de
progression rédigée par une kinésithérapeute D.E. pour une épaule douloureuse : la qualification
« medical advice or treatment » est difficile à écarter. Et la sanction contractuelle est immédiate
et unilatérale — section C.5, **VU** : « **Xplor reserves the right to remove or delete any User
Content for any reason or no reason at all, at its sole discretion** », doublée d'un droit de
résiliation pour cause avec effet immédiat (section I.5).

> **Le risque n'est donc pas seulement réglementaire, il est opérationnel** : le compte peut être
> fermé et les dossiers effacés sans préavis, sans restitution (§ 2.2), au motif d'une clause que
> Manon a déjà acceptée. **⚖️ relecture pro** — la qualification exacte de ce qu'elle écrit dans
> TrueCoach au regard du (j) mérite un œil d'avocat, mais la prudence ne coûte rien.

---

## 5. Droits des personnes : accès, export, effacement

**Effacement — VU.** Il existe, mais il est brutal :
[« Deleting a Client »](https://help.truecoach.co/en/articles/2695325-deleting-a-client) — le client
doit d'abord être **archivé**, puis supprimé, et « **all client data is lost once the client is
deleted** ». Rien n'est dit sur les **sauvegardes**, ni sur un délai de purge effective.
→ On peut techniquement honorer un art. 17, mais **pas en conserver la trace ni en prouver la portée**.

**Export — VU, et le panorama avait raison.**
[« How to Export Clients »](https://help.truecoach.co/en/articles/5811721-how-to-export-clients) :
un **CSV envoyé par e-mail**, contenant la fiche client — *First Name, Last Name, Email, Compliance
Score, Total Workouts Completed, Birthday, Location, Timezone, Phone Number, Client Type, Client
State, Height, Weight, Unit Preference, Gender*. **Rien d'autre.**

**Ne sont exportables par aucun moyen en libre-service** (NON PUBLIC / absence constatée dans toute
la base d'aide) : l'historique des **métriques** et leurs graphiques, les **photos de progression**,
les **vidéos** téléversées par le client, les **notes du coach**, les **messages**, le journal
d'entraînement détaillé, les réponses aux pseudo-questionnaires bricolés dans le *workout builder*.

> **C'est exactement le manquement qui déclenche les sanctions.** Le ticket
> [`10`](../issues/10-combien-coute-vraiment-un-hebergement-hds.md) a établi que **dans 17 sanctions
> de libéraux sur 20, le déclencheur est un patient qui réclame son dossier sans réponse**. Si un
> client de Manon exerce son droit d'accès (art. 15) ou de portabilité (art. 20) sur l'intégralité
> de son suivi, **elle ne peut pas le servir depuis TrueCoach** : il lui faudrait recopier
> l'interface écran par écran. Le délai d'un mois (art. 12.3) devient très court.

**Délai de réponse — NON PUBLIC.** La notice Xplor liste bien les droits (accès, rectification,
effacement, portabilité, opposition, limitation, retrait du consentement) et donne un canal
(`yourdata@xplortechnologies.com`), mais **n'annonce aucun délai** — zéro occurrence de « 30 days »,
« 45 days » ou « one month » (VU). Elle **renvoie d'ailleurs le client vers Manon** : « If you are a
Consumer and we are processing your Personal Data on behalf of our Customer as a service provider,
**you should direct your request to the appropriate Customer** ». Autrement dit : la charge revient
entièrement à Manon, sans engagement d'assistance de la part de Xplor (art. 28.3.e — absent, § 2.2).

---

## 6. Que peut-on brancher sur TrueCoach ?

### 6.1 API publique : non

- **Pas de portail développeur — VU.** `developers.truecoach.co`, `developer.truecoach.co`,
  `docs.truecoach.co` et `api-docs.truecoach.co` répondent 200 mais servent **exactement le même
  fichier de 9 356 octets** que `app.truecoach.co` : c'est un **DNS joker** qui renvoie la coque de
  la SPA. **Ce ne sont pas des portails, ce sont des faux positifs.** `truecoach.co/api/` et
  `truecoach.co/integrations/` → **404**.
- **Confirmation par un tiers qualifié — VU.** Sur le forum Zapier, un *Community Manager* répond :
  « I couldn't find any **public API documentation for TrueCoach** online, so it looks like that
  approach might not be possible at the moment »
  ([fil](https://community.zapier.com/how-do-i-3/integrating-truecoach-workouts-into-a-custom-fitness-app-truecoach-50919)).
- **Pas de webhooks documentés, pas de place de marché d'intégrations** (NON PUBLIC).

### 6.2 Zapier : la seule porte officielle, et elle est étroite

**VU** — [aide officielle](https://help.truecoach.co/en/articles/8688374-zapier-integration) et
[page Zapier](https://zapier.com/apps/truecoach/integrations) :

- **Clé API** : *Settings → Integration → Zapier*. Il **existe donc une clé API par compte**, mais
  elle n'est utilisable qu'à travers Zapier — aucune documentation ne décrit d'endpoint.
- **Disponibilité : « Zapier is available on the Pro and above plans. »** ⚠️ **Manon est
  vraisemblablement sur un plan inférieur** (60 €/mois pour ~10 clients ; le Pro est annoncé à
  136,99 $/mois dans [`00-panorama-marche.md`](00-panorama-marche.md)). **DÉDUIT : Zapier lui est
  aujourd'hui inaccessible sans changer de palier.** À vérifier dans son compte.
- **4 déclencheurs** : *New Client*, *Added to a Client Group*, *Workout Created*, *Workout Completed*.
- **1 action** : *Add a Client to TrueCoach*.
- **Aucune action de lecture, aucune recherche, aucun export.** On peut **écrire** un client et
  **être notifié** d'événements. On ne peut **pas** lire une métrique, une photo, une note, un
  résultat de test. **Zapier ne permet donc pas de récupérer les données qui comptent** — ni pour la
  vue comparative, ni pour un export RGPD.
- Des connecteurs tiers existent par-dessus Zapier (Google Sheets, Stripe, Squarespace Forms,
  Bookafy…), mais ils héritent de ces mêmes 5 opérations.
- **Exports programmés : aucun** (NON PUBLIC).

### 6.3 L'API interne rétro-conçue — ce qu'elle vaut, et ce qu'elle coûte

Le dépôt `C:\Users\alex2\projet\automisation true coach` documente, dans son `FINDINGS.md`, une
**API interne** de `app.truecoach.co` : SPA Ember parlant à `/proxy/api/…`, endpoints
`GET /proxy/api/workouts/{id}`, `/proxy/api/exercises` (~3 800 fiches, toutes avec vidéo),
`/proxy/api/clients/{id}` (qui expose `goals`, `limitations`, `equipment`,
`completed_workouts_count`, `missed_sessions_count`, `compliance_rate_for_{7,30,90}_days`).
Authentification par **jeton porteur extrait du cookie `ember_simple_auth-session`** + en-tête
`Role: Trainer`. Le livrable est un **bookmarklet**, choisi précisément parce qu'il « emprunte la
session en cours et ne conserve rien ».

C'est un beau travail, et techniquement la seule voie qui atteigne les données réelles. **Mais ce
n'est pas une API publique**, et il faut énoncer les limites avant d'en dépendre :

1. **Les CGU l'interdisent — VU, section B.4, et c'est explicite sur deux points distincts :**
   > « You […] will not: […] (c) **use any robot, spider, crawler, scraper, or other manual or
   > automated means or interface to access the Services, retrieve, index, scrape, “data mine” or
   > otherwise gather Content** or extract other user's information. (d) **use or develop any
   > third-party applications that interact with the Services** or other users' content or
   > information **without our written consent.** »

   Le (c) vise l'accès automatisé ; le (d) vise, mot pour mot, le fait de *développer une application
   tierce qui interagit avec le service*. **Un bookmarklet qui appelle `/proxy/api/…` tombe sous les
   deux.** La même interdiction figure dans l'Acceptable Use Policy du groupe (VU).
   Sanction prévue : suspension ou résiliation immédiate du compte (section I.5), **sans restitution
   des données** (section I.6).

2. **Fragilité technique.** API non contractuelle, non versionnée, sans obligation de préavis. Le
   `FINDINGS.md` documente déjà trois pièges de format (`exercise_id` à `null`, `id` tantôt chaîne
   tantôt nombre, mouvements de circuit rangés ailleurs) — ce sont les symptômes normaux d'une API
   interne qui peut changer du jour au lendemain.

3. **Authentification par session de navigateur.** Impossible à automatiser côté serveur sans stocker
   des identifiants ou un jeton en clair. Donc : **pas de synchronisation planifiée, pas de tâche de
   fond, pas de sauvegarde nocturne.** Ça reste un geste manuel, déclenché par un humain connecté.

4. **Ça n'améliore pas la conformité, ça l'aggrave un peu.** Extraire les données ne les sort pas des
   États-Unis : ça en fait **une copie de plus**, cette fois sur le poste d'Alex ou de Manon, hors de
   tout registre et de toute mesure de sécurité documentée.

> **Position raisonnable.** Le bookmarklet est **acceptable comme outil ponctuel de confort**
> (fabriquer un PDF de séance pour un client, à la main, à la demande). Il n'est **pas** une
> fondation acceptable pour un produit, une migration automatisée ou une synchronisation permanente
> — non pas parce qu'il fonctionne mal, mais parce que **le contrat l'interdit** et que la sanction
> prévue est la perte des données.
>
> **La sortie propre existe et elle est simple** : demander un accord écrit à
> `support@truecoach.co` (les CGU prévoient elles-mêmes l'exception « without **our written
> consent** »). Coût : un e-mail. Réponse **NON PUBLIC** — à tenter.

---

## 7. Conclusion — garder TrueCoach, est-ce compatible avec l'exigence HDS ?

### Non. **En l'état, c'est une contradiction — et ce n'est pas la plus grave.**

L'incohérence est réelle et il faut l'écrire noir sur blanc dans la note à Manon :

> On s'apprête à écarter Netlify, Vercel et Supabase EU, et à payer ~49 €/mois de plus chez
> Scalingo pour être en règle avec le HDS — pendant qu'un sous-traitant américain, non certifié
> HDS, non couvert par le DPF, sans DPA, héberge en Oregon des antécédents, des descriptions de
> douleur et des photos de mobilité. **Ce serait mettre un blindage sur une porte et laisser la
> fenêtre ouverte.**

Mais le raisonnement HDS n'est même pas le plus fort. **Quatre manquements se constatent sans avoir
à trancher la zone grise de l'article L1111-8 :**

1. **Art. 28** — pas de contrat de sous-traitance. C'est le même manquement que WhatsApp, identifié
   dans [`03`](03-cadre-juridique.md) § 4.2. **Il n'est pas d'un ordre de gravité inférieur.**
2. **Chapitre V** — transfert vers les États-Unis sans mécanisme documenté (pas de DPF, pas de CCT
   nommées).
3. **Art. 15 / 20** — impossibilité pratique de servir une demande d'accès ou de portabilité
   complète. **C'est le déclencheur n° 1 des sanctions de libéraux** (ticket `10`).
4. **Le contrat lui-même** — les CGU interdisent d'y placer du contenu médical, et prévoient la
   suppression discrétionnaire du contenu et du compte. **Ce point ne dépend d'aucune interprétation
   du droit français : c'est l'éditeur qui le dit.**

Le point 4 dispense presque du débat. **Même si le HDS ne s'appliquait pas, TrueCoach resterait le
mauvais endroit — parce que son éditeur écrit lui-même qu'il n'en veut pas.**

Et il y a un effet de bord à ne pas manquer : le ticket [`03`](03-cadre-juridique.md) § 2 retient le
**consentement explicite (art. 9.2.a)** comme base légale, ce qui exige d'informer la personne des
**destinataires** avant de recueillir son accord. Aujourd'hui, la mention honnête serait : *« vos
données de santé sont hébergées aux États-Unis par une société américaine dont les conditions
d'utilisation interdisent d'y stocker des données médicales, sans contrat de sous-traitance ni
mécanisme de transfert documenté »*. **Une mention d'information sincère devient impossible à écrire
tant que TrueCoach reste dans la boucle des données de santé.**

### Les trois sorties

| # | Sortie | Ce que ça exige | Coût | Verdict |
|---|---|---|---|---|
| **A** | **Ne rien mettre de sensible dans TrueCoach.** TrueCoach redevient ce que le découpage de la carte dit déjà qu'il est : **programmation d'exercices, bibliothèque vidéo, suivi de séance** — et rien d'autre. Antécédents, douleur, bilans, photos et vidéos de mobilité vont dans l'app HDS. Les métriques restant dans TrueCoach sont des charges et des volumes, pas des symptômes. | Une **règle de contenu écrite**, tenue par Manon. Un nettoyage rétroactif du contenu de santé déjà présent. Et **renoncer à ce que TrueCoach fait de mieux sur B3** (metric sets, photos *then and now*, vidéos client) — c'est le vrai prix, et il tombe pile sur la fonction que l'app sur-mesure doit reprendre. | ~0 € | ✅ **Recommandée.** Cohérente avec la carte, gratuite, immédiate, et elle **renforce** le dossier du sur-mesure au lieu de l'affaiblir |
| **B** | **En sortir complètement.** Migrer B7 (programmation + vidéos) vers l'app ou vers un outil conforme. | Récupérer l'historique — et l'export ne le permet pas (§ 5). Reconstruire la bibliothèque d'exercices. Réapprendre un outil. | Élevé en temps de Manon (**compteur 4**), et ça fait grossir le périmètre de l'app | ❌ **Pas maintenant.** C'est exactement le « faire trop gros » que la carte cherche à éviter |
| **C** | **Assumer.** Garder l'usage actuel, documenter le risque, ne rien changer. | Une décision **écrite, datée et signée par Manon**, informée : elle sait que le contrat l'interdit, qu'il n'y a pas de DPA, et qu'elle ne peut pas honorer une demande d'accès complète. | 0 € comptant | ⚠️ **Défendable seulement si A est impossible** — et A n'est pas impossible. Surtout : **incompatible avec le fait de payer le HDS à côté.** Si on choisit C, il faut aussi renoncer au HDS et l'assumer, sinon on paie une assurance qu'on annule soi-même |

### Ce que ça change pour la note et pour la carte

- **La ligne « TrueCoach reste » de la section *Out of scope* de la carte tient — mais elle doit être
  requalifiée.** Ce n'est plus « TrueCoach reste » tout court, c'est **« TrueCoach reste, pour les
  exercices et les vidéos uniquement, sans donnée de santé »**. C'est une **contrainte de conception
  de l'app**, pas seulement une contrainte d'usage : la vue comparative photo/vidéo à 8 semaines
  doit vivre **dans l'app**, jamais dans TrueCoach.
- **L'argument central de [`03`](03-cadre-juridique.md) § 4.3 se renforce.** On y écrivait que le
  statu quo est le scénario le *moins* conforme. Ce ticket ajoute un troisième trou à côté de
  WhatsApp et du disque dur : **TrueCoach est aujourd'hui le troisième canal non contractualisé de
  données de santé**. Trois sur trois. L'app HDS n'ajoute pas du risque, elle en retire — et le
  chiffre a monté.
- **Le sort de WhatsApp et celui de TrueCoach se traitent désormais ensemble**, avec la même règle :
  *sortir les données de santé de tout ce qui n'est pas l'app*. C'est une seule décision, pas deux.
- **Rien de tout ça n'est un défaut de TrueCoach.** C'est un excellent outil de coaching sportif, qui
  dit clairement qu'il n'est pas un outil de santé. **L'erreur serait de le lui reprocher, ou de
  croire qu'un concurrent américain équivalent ferait mieux.**

**⚖️ relecture pro** — deux points seulement : (1) la qualification de ce que Manon écrit
aujourd'hui dans TrueCoach au regard de la clause C.4(j), et (2) le fait de savoir si la sortie A
suffit à purger le manquement art. 28 passé, ou s'il faut aussi supprimer l'historique.

---

## Sources

**TrueCoach / Xplor — contractuel**
- [Conditions de service TrueCoach (Xplor), « Last Updated: February 2026 »](https://xplor.com/truecoach-terms-of-use/) — entité, droit new-yorkais, C.3 licence perpétuelle, C.4(j) interdiction du contenu médical, B.4(c)(d) interdiction du scraping et des applications tierces, E.1–E.4 privacy/sous-traitants, I.6 effet de la résiliation, O disclaimer santé
- [Acceptable Use Policy Xplor](https://xplor.com/acceptable-use-policy/) — reprise de l'interdiction du contenu médical et de l'accès automatisé
- [Notice de confidentialité Xplor (US)](https://xplor.com/us/privacy-notice) — § 1 scope (ne s'applique pas quand Xplor est sous-traitant), § 2 catégories de données, § 7 droits, § 9 localisation et transferts, produits couverts (dont `truecoach.co`)
- [Conditions d'utilisation du site Xplor](https://xplor.com/us/terms-use) — Xplor Technologies, LLC, Delaware, file number 5160371
- Redirections 301 vérifiées : `truecoach.co/terms/` → `xplor.com/us/terms-use` ; `truecoach.co/privacy/` → `xplor.com/us/privacy-notice`

**TrueCoach — aide en ligne**
- [Is TrueCoach HIPAA Compliant?](https://help.truecoach.co/en/articles/4821090-is-truecoach-hipaa-compliant) — « At this time, TrueCoach is not HIPAA compliant »
- [Zapier Integration](https://help.truecoach.co/en/articles/8688374-zapier-integration) — clé API, 4 déclencheurs, 1 action, plan Pro requis
- [How to Export Clients](https://help.truecoach.co/en/articles/5811721-how-to-export-clients) — CSV, 15 champs de fiche client
- [Deleting a Client](https://help.truecoach.co/en/articles/2695325-deleting-a-client) — « all client data is lost once the client is deleted »

**API et intégrations**
- [TrueCoach sur Zapier](https://zapier.com/apps/truecoach/integrations) — inventaire des opérations
- [Fil Zapier Community — pas d'API publique documentée](https://community.zapier.com/how-do-i-3/integrating-truecoach-workouts-into-a-custom-fitness-app-truecoach-50919)
- `C:\Users\alex2\projet\automisation true coach\FINDINGS.md` — API interne rétro-conçue (`/proxy/api/…`), authentification par cookie de session, choix du bookmarklet

**Autorités**
- [Data Privacy Framework — liste officielle](https://www.dataprivacyframework.gov/list) (ITA, U.S. Dept. of Commerce) — recherches « Xplor » et « TrueCoach », participants actifs et inactifs : **aucun résultat**
- [ANS — liste des hébergeurs certifiés HDS](https://esante.gouv.fr/offres-services/hds/liste-des-hebergeurs-certifies) — TrueCoach/Xplor absents

**Mesures techniques (5 septembre 2026)**
- Résolution DNS : `app.truecoach.co` et `api.truecoach.co` → `xfw-truecoach-app-prd-truecoach-1791879232.us-west-2.elb.amazonaws.com` (AWS Oregon, États-Unis)
- Sondage HTTP : `xplor.com/dpa/`, `/subprocessors/`, `/legal/`, `truecoach.co/security/`, `truecoach.co/api/`, `truecoach.co/integrations/` → **404**
- `developers.truecoach.co`, `developer.truecoach.co`, `docs.truecoach.co`, `api-docs.truecoach.co` → 200, mais servent le fichier identique de 9 356 octets de la SPA (**DNS joker, pas de portail développeur**)

**Documents internes de la carte**
- [`03-cadre-juridique.md`](03-cadre-juridique.md) — HDS, base légale 9.2.a, socle RGPD, comparatif du statu quo
- [`00-panorama-marche.md`](00-panorama-marche.md) — § C.1 TrueCoach : couverture des besoins, prix, export limité, anglais strict
