# 03 — L'hébergement certifié HDS s'impose-t-il à son activité ?

Type: research
Status: resolved
Blocked by: —

## Question

Manon exerce **hors nomenclature**, en micro-entreprise, et vend un accompagnement de
« coaching sport-santé et de prévention ». Elle collecte pourtant des antécédents, des
descriptions de douleur et des photos de mobilité — des données de santé au sens de l'article 9
du RGPD.

L'article **L1111-8 du Code de la santé publique** impose un hébergeur certifié **HDS** pour les
données de santé recueillies « à l'occasion d'activités de prévention, de diagnostic, de soins »
et confiées à un **tiers**. Deux zones grises précises sur son cas :

- Le mot **« prévention »** est littéralement dans le texte, et c'est littéralement le mot
  qu'elle emploie pour décrire son activité. Est-ce que le fait d'être hors cadre conventionné
  la sort du champ, ou est-ce que sa qualité de kinésithérapeute D.E. l'y ramène ?
- Aujourd'hui elle **héberge chez elle** (ordinateur, disque dur), donc pas d'hébergeur tiers.
  Dès qu'on met ça sur un service en ligne, il y en a un.

Établir :

1. **L'obligation HDS s'applique-t-elle** — oui, non, ou « pas de réponse tranchée » ? Chercher
   les positions de la CNIL, de l'ANS (ex-ASIP), et les analyses de cabinets sur les activités
   de bien-être et de coaching santé.
2. **La base légale du traitement.** Le consentement explicite (art. 9.2.a) est-il la bonne voie,
   ou l'art. 9.2.h (médecine préventive, sous secret professionnel) s'applique-t-il ? Que doit
   contenir la clause, et pourquoi le contrat de suivi actuel ne suffit probablement pas ?
3. **Le socle obligatoire quel que soit le scénario** — registre des traitements, mention
   d'information, durée de conservation, droits d'accès et d'effacement, DPA avec chaque
   prestataire, mesures de sécurité. Ce que ça coûte concrètement à mettre en place.
4. **Le risque du statu quo.** Photos de mobilité sur WhatsApp, dossiers sur disque dur non
   chiffré : à comparer honnêtement, parce que si le statu quo est le moins conforme des
   scénarios, c'est un argument central de la note.
5. **Ce qu'un non-juriste peut décider seul**, et ce qui exige une relecture professionnelle.

Sortie attendue : une réponse utilisable par un développeur pour éliminer ou retenir des
hébergeurs, pas un mémoire. Citer les textes et les sources.

## Answer

Note complète : [`../research/03-cadre-juridique.md`](../research/03-cadre-juridique.md)

**HDS obligatoire ? Pas de réponse tranchée — mais l'incertitude est asymétrique.**
La FAQ du ministère (2 avril 2019) pose deux conditions cumulatives. Celle du « pour le compte
d'un professionnel de santé à l'origine des données » est remplie sans ambiguïté : le texte ne
mentionne ni nomenclature ni conventionnement, et Manon est MK D.E. Celle des « données
recueillies à l'occasion d'activités de prévention » est la zone grise, que le ministère renvoie
explicitement à une appréciation au cas par cas.

La lecture étroite est fragile dans son cas précis : le titre de kinésithérapeute est mis en
avant, une offre s'appelle littéralement *Bilan de la Douleur*, et les CGV parlent encore de
« rééducation fonctionnelle ».

**Conduite à tenir : traiter le HDS comme requis.** L'écart de coût est de quelques dizaines
d'euros par mois ; le risque en face est une fermeture en référé (TJ Paris, 6 nov. 2020,
astreinte de 3 000 €/jour).

**Base légale** — art. 6.1.b + **art. 9.2.a, consentement explicite**. Le 9.2.h est ouvert mais
l'invoquer reviendrait à revendiquer la nature sanitaire de la prestation, ce que
`cadre-legal.md` refuse : incohérence à ne pas créer. Le contrat de suivi actuel ne suffit pas —
accepter des CGV n'est pas un consentement explicite, spécifique, révocable et prouvable.

**Hébergeurs éliminés** : **Netlify**, **Vercel** (leurs fonctions et leurs logs feraient
transiter les données), **Supabase EU** (non certifié HDS — la région règle le transfert, pas
L1111-8). **Retenus** : Clever Cloud (HDS v2.1 sur les 6 activités, France, PaaS — meilleur
candidat), Scalingo (profil équivalent), Scaleway (activités 1-4 seulement, contrat HDS + plan
de support payant obligatoire), OVHcloud (offre exacte à vérifier). Aucun prix HDS n'est public.

**Le statu quo est le moins conforme des trois scénarios.** Le disque dur échappe au HDS (pas de
tiers) — c'est son seul avantage. Mais WhatsApp n'a aucun DPA art. 28 pour l'app grand public,
Meta n'est pas HDS, et le chiffrement de bout en bout ne couvre ni les métadonnées ni les
sauvegardes du téléphone. Un hébergement certifié retire du risque juridique, il n'en ajoute pas.

**Socle RGPD** — registre, mentions d'information, DPA, sécurité, durées de conservation : 1 à
2 jours de travail, et **il s'impute à Manon dans tous les scénarios, statu quo compris**. Sans
ça, la note comparerait des choses inégales.

**Cinq points exigent une relecture professionnelle** : la qualification « prévention » au sens
de L1111-8 (elle commande tout) · 9.2.a vs 9.2.h et le caractère « libre » du consentement quand
les données sont nécessaires au contrat · la clause de consentement et la mention d'information ·
l'arbitrage « rééducation fonctionnelle » vs « accompagnement » dans les CGV, qui est un choix
juridique et non rédactionnel · l'inscription au tableau de l'Ordre (R4321-51).

## Correction — 5 septembre 2026

Un des trois arguments de la réponse ci-dessus est affaibli. Il s'appuyait sur les CGV publiées
sur le site pour établir que la lecture étroite était fragile (« les CGV parlent encore de
rééducation fonctionnelle »). **Or le site n'est pas encore en service, et ces CGV ne sont
probablement pas le document que Manon fait réellement signer.**

Ce que ça change : cet argument-là est suspendu jusqu'à lecture du vrai contrat — nouveau ticket
[`11`](11-lire-le-vrai-contrat.md).

Ce que ça ne change pas : la conclusion tient sur deux appuis indépendants, et un troisième
apparaît. Manon met son titre de kinésithérapeute D.E. en avant. Une de ses offres s'appelle
littéralement *Bilan de la Douleur*. Et la description qu'Alex donne lui-même de la prestation —
« du coaching style prépa physique, mais avec son bagage de kiné pour soigner des douleurs » —
**renforce le risque plutôt qu'elle ne le dissout** : c'est le traitement de la douleur qui fait
basculer les notes de suivi dans la catégorie « données de santé », quel que soit le nom donné au
service. La conduite à tenir reste : traiter le HDS comme requis.
