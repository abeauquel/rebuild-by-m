# rebuild-by-m — Notes pour Claude

## Stack
- **HTML/CSS/JS vanilla** — pas de React, pas de Node.js, pas de package.json
- **CSS écrit à la main** dans `css/cinema.css` (thème « Cinéma sombre »)
- **Lucide Icons** via CDN
- **Animations** : IntersectionObserver pour les scroll-reveals (classe `.reveal` → `.reveal.in`)

## Thème « Cinéma sombre » — tout le site

**Toutes les pages** (`index.html`, `offres/*.html`, `legal/*.html`) utilisent le thème éditorial sombre **« Cinéma »** (fond oxblood `#140809`, texte crème, accent corail, grain film), dont le style vit dans **`css/cinema.css`**.

> ✅ `css/cinema.css` est du **CSS vanilla écrit à la main** — on l'édite **directement**. Les variables du thème (`--ink`, `--cream`, `--accent`, etc.) et les classes partagées (`.wrap`, `.section`, `.card`, `.btn-cream`, `.serif-xl`, `.prose`, `#subnav`…) y sont définies. Les pages utilisent ces classes + du style inline.

> ⚠️ **Tailwind n'est plus utilisé.** Plus aucune page ne charge `css/output.css` — ce fichier généré, son source `css/input.css` et le binaire `tailwindcss` sont désormais orphelins (conservés mais inutilisés). Ne pas y toucher pour modifier le rendu : éditer `css/cinema.css`.

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
