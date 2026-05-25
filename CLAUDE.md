# rebuild-by-m — Notes pour Claude

## Stack
- **HTML/CSS/JS vanilla** — pas de React, pas de Node.js, pas de package.json
- **Tailwind CSS v4** via CLI standalone (binaire local)
- **Lucide Icons** via CDN
- **Animations** : IntersectionObserver pour les scroll-reveals, CSS keyframes + JS pour les effets hover

## CSS — règle importante

> **Ne jamais écrire directement dans `css/output.css`.**
> Ce fichier est généré automatiquement. Toute modification manuelle sera écrasée au prochain build.

**Toujours :**
1. Éditer `css/input.css` (source Tailwind)
2. Recompiler avec le binaire Tailwind du projet :

```bash
./tailwindcss -i css/input.css -o css/output.css
```

Le binaire `tailwindcss` (Linux x64 standalone) se trouve à la **racine du projet** (`/tailwindcss`).
Il est téléchargé automatiquement par le hook `.claude/hooks/session-start.sh` dans les environnements remote (Claude Code Web).

## Couleurs du projet

Définies dans `css/input.css` via `@theme` :

| Variable | Hex | Usage |
|---|---|---|
| `brand-terra` | `#d66d4f` | Accent principal |
| `brand-rust` | `#c74f2f` | Rust / rouge brique |
| `brand-coral` | `#f4ac94` | Saumon (titre RÉHAB) |
| `brand-sand` | `#f7d1cc` | Rose pâle |
| `brand-dark` | `#30100f` | Texte principal |
| `brand-muted` | `#6b6661` | Texte secondaire |
| `brand-navy` | `#203e46` | Vert sombre (titre MOBILITÉ) |
| `brand-petrol` | `#376875` | Bleu pétrole |
| `brand-slate` | `#a2b4c1` | Gris bleu clair — **trop clair pour du texte blanc** |
| `brand-ice` | `#eaf5f4` | Blanc cassé bleu |
| `brand-blush` | `#fadbe3` | Rose très pâle |
| `brand-light` | `#fdfbf9` | Background global |

## Fonts
- Display : **Outfit** (font-display)
- Body : **Plus Jakarta Sans** (font-sans)

## Animations JS existantes
- Scroll reveal : classe `.reveal` → `.reveal.active` via IntersectionObserver (`js/main.js`)
- Pricing cards : `.pricing-card` → tilt 3D au hover via `mousemove` / `mouseleave`
