# 01 — Ce que valent vraiment les quatre finalistes SaaS

Type: research
Status: resolved
Blocked by: —

## Question

Le panorama (`../research/00-panorama-marche.md`) sort quatre candidats crédibles :
**Rehab Guru** (~20 £/mois, seul à couvrir 7 besoins sur 7), **Hexfit** (39–59 €/mois, HDS
France, offre « kinés hors nomenclature »), **Andrew** (34,90–49,90 €, français, HDS OVH),
**Physitrack** (22,95 €/mois, instance UE Francfort). Ces chiffres viennent de pages
commerciales. Il faut les vérifier sur les points qui décident.

Pour **chacun** des quatre, établir :

1. **Où vivent les données**, précisément — pays, entité juridique, sous-traitants. Rehab Guru
   est britannique : post-Brexit, ça passe par la décision d'adéquation UK, pas par le droit UE
   directement. Est-ce que ça tient pour des données de santé ?
2. **Le DPA (art. 28 RGPD)** — existe-t-il, est-il signable en ligne, liste-t-il les
   sous-traitants ultérieurs ? Un outil sans DPA accessible est éliminé, quel que soit son prix.
3. **Le français réel de l'interface**, pas la présence de quelques mots. Écrans praticien ET
   écrans client. Les documents générés (bilan, rapport) sont-ils en français ?
4. **La réversibilité** — export complet des données client, dans quel format, en un clic ou sur
   demande ? C'est la garantie que Manon n'est pas prisonnière.
5. **La couverture réelle** des besoins du noyau : questionnaire d'admission auto-rempli par le
   client, bilan structuré éditable en direct pendant une visio, saisie de mesures chiffrées de
   mobilité et de force, **photos attachées à une mesure**, et vue comparative entre deux dates.
   Le point 5 est celui où les pages marketing mentent le plus.
6. **Un essai gratuit existe-t-il**, sans carte bancaire, et combien de temps ?
7. **Le prix pour ~10 clients actifs** — beaucoup de grilles facturent par client actif.

Terminer par : quels candidats restent en lice, et pour chaque éliminé, la raison exacte.

Ne rien inventer. Citer l'URL de chaque affirmation. Distinguer VU de DÉDUIT.

## Answer

Note complète : [`../research/01-finalistes-verifies.md`](../research/01-finalistes-verifies.md)

**Trois éliminés sur quatre, et le survivant est sous réserves.**

**Rehab Guru — éliminé, deux motifs indépendants.** La fiche App Store officielle affiche
`Languages: English`, sans sélecteur de langue nulle part : **anglais strict**, côté praticien
comme côté client. Le « il y a du français dessus » du panorama est démenti. Et son DPA est
introuvable — les CGU renvoient vers une page qui répond **404**, en prévoyant que le contrat
« reste à conclure ». Sa liste de 18 sous-traitants localisés est pourtant la meilleure du
panel. Prix VU : 20 £/mois, clients illimités, essai 30 jours sans carte — le meilleur essai du
panel, et ça ne le sauve pas.

**Physitrack — éliminé sur la couverture.** Meilleur dossier de conformité du panel : DPA public
et téléchargeable, 21 sous-traitants nommés avec leur pays. Mais l'instance « fr » est à
**Francfort**, pas en France, et l'entité contractante est britannique. Surtout : une mesure
personnalisée n'accepte que deux types de question — choix unique et échelle bornée 0 → 10.
**Pas de champ numérique libre** (donc ni 142°, ni 38 kg), pas de champ fichier, et le patient ne
peut envoyer aucune image. Le panorama avait surestimé ce point.

**Andrew — éliminé sur la couverture.** Le meilleur cadre juridique des quatre : SAS lyonnaise,
OVH HDS nommé dans les CGU, DPA intégré au contrat en annexe 2, restitution des données en
format lisible par machine sous 60 jours ouvrés, français natif. Mais **aucune batterie de tests
chiffrés, aucune photo, aucune vue comparative** — ses dix sections de fonctionnalités ne
contiennent ni « bilan » ni « tests ». Seul du panel à exiger une carte bancaire pour l'essai.

**Hexfit — seul en lice, sous trois réserves.** Ce qui passe : mesures chiffrées libres,
**comparaison entre deux dates nativement documentée** (le delta première/dernière mesure est
une valeur du produit), formulaires remplissables par le client ou en direct, et le meilleur
export du panel — CSV/JSON en libre-service. Essai 14 jours sans carte. Ce qui coince :
**les photos ne sont pas attachées à une mesure**, elles vivent à côté dans des dossiers de
stockage ; même Hexfit Lab, qui prend deux à trois photos par test, ne documente aucune vue
côte à côte. Et le dossier juridique s'est dégradé à la vérification : la politique officielle
est celle de **Hexfit Solutions Inc., au Québec**, sans localisation d'hébergement, sans mention
HDS et sans un seul sous-traitant nommé ; le HDS France n'apparaît que sur un domaine dont la
page de mentions légales répond **404**. Aucun DPA public. Deux grilles tarifaires
contradictoires : 39 €/mois clients illimités d'un côté, 50 €/mois pour 50 patients de l'autre.

**Le résultat qui décide de la carte** : **aucun des quatre ne sait faire « photo attachée à une
mesure » ET « comparaison entre deux dates »**. Rehab Guru met la photo au bon endroit mais ne
compare rien et parle anglais ; Hexfit compare bien mais range les photos ailleurs. La thèse de
la carte sur l'angle mort du marché tient, documentation en main.
