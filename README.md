# Zh1yuShen.github.io

Academic homepage for Zhiyu Shen, built as a lightweight static site for GitHub Pages.

## Structure

- `index.html`: homepage content and section structure
- `styles.css`: custom visual design and responsive layout
- `script.js`: reveal animation, active navigation state, and footer year
- `assets/profile.jpg`: formal portrait used in the hero section
- `assets/publications/`: publication thumbnails
- `.nojekyll`: tells GitHub Pages to serve the site as plain static files

## Current Sections

- About
- News
- Education
- Internships
- Selected Publications
- Other Publications
- Contact

## Local Preview

Run from this directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` or forward port `8000` in your IDE.

## Publish on GitHub Pages

The repository name for a user site should be exactly:

`Zh1yuShen.github.io`

Then:

1. Create a public repository on GitHub with that exact name if it does not already exist.
2. Put these files in the repository root.
3. Commit and push to the `main` branch.
4. In GitHub, open `Settings -> Pages`.
5. If needed, choose `Deploy from a branch`, then select `main` and `/ (root)`.
6. After deployment finishes, the site should be available at `https://zh1yushen.github.io/`.
