# TOP Todo List

The Odin Project's Todo List assignment. This file is a working roadmap — check things off as you go, especially useful while offline.

## Status as of now

Webpack is set up and split into three files, all using ES module syntax (`import`/`export default`), which works because `package.json` has `"type": "module"`.

- `webpack.common.js` — shared config: `entry: ./src/index.js`, `output` → `dist/`, `HtmlWebpackPlugin` (template: `src/template.html`), loader rules for `.css`, `.html`, and images (`asset/resource`).
- `webpack.dev.js` — merges common + `mode: development`, `devtool: inline-source-map`, `output.filename: main.js`, `devServer` (`static: ./dist`, `hot: true`).
- `webpack.prod.js` — merges common + `mode: production`, `devtool: source-map`, `output.filename: main.[contenthash].js`.

Installed: `webpack`, `webpack-cli`, `webpack-merge`, `webpack-dev-server`, `css-loader`, `style-loader`, `html-loader`, `html-webpack-plugin`.

`src/index.js` and `src/template.html` exist but are still mostly empty starters.

---

## Step 0 — Before anything else: wire up npm scripts and verify the build works

`package.json` has no `dev`/`build` scripts yet. Add these under `"scripts"`:

```json
"scripts": {
  "dev": "webpack serve --config webpack.dev.js --open",
  "build": "webpack --config webpack.prod.js"
}
```

Then verify, in this order:
- [ ] `npm run dev` — should open a browser tab (usually `http://localhost:8080`) showing whatever `src/template.html` renders. If it errors, check `src/template.html` actually has valid HTML content (an empty file may confuse `HtmlWebpackPlugin`).
- [ ] Edit `src/index.js` (even just `console.log('hello')`) and save — the dev server should rebuild automatically without you restarting it.
- [ ] `npm run build` — should produce a `dist/` folder containing `index.html` and a hashed `main.[hash].js`. Open `dist/index.html` directly in a browser (double-click it) to confirm the production build actually works standalone.

**Common snags to check if something breaks (no internet needed to debug these):**
- `"Unexpected token 'export'"` → some file is being parsed as CommonJS. Confirm `"type": "module"` is still in `package.json`.
- `HtmlWebpackPlugin` errors about the template → `src/template.html` needs to exist and contain at least `<!DOCTYPE html><html><head></head><body></body></html>` (webpack injects the `<script>` tag into `<body>` automatically).
- Port already in use → another `webpack serve` is probably still running in another terminal; close it, or add `devServer: { port: 8081 }`.
- `Cannot find module 'X'` → check it's actually listed in `package.json` (`dependencies`/`devDependencies`) and `node_modules` exists — if `node_modules` is missing (e.g. fresh clone), run `npm install` (needs internet once).

---

## Step 1 — Plan the data layer (no DOM yet)

The Odin Project's core lesson here is: **keep your data/logic completely separate from your DOM code.** Build and sanity-check this part first, using `console.log` in the browser devtools — no UI needed yet.

- [ ] **`Todo` factory/class** — fields: `title`, `description`, `dueDate`, `priority`, `notes`/checklist, `complete` (bool). Give it a method to toggle completion.
- [ ] **`Project` factory/class** — a `name` and an array of `Todo`s, with `addTodo`, `removeTodo`, `getTodos` methods.
- [ ] A small in-memory list of `Project`s to start (e.g. one default "Default" project), so you have something to render once the DOM layer exists.

Suggested file layout (create a `src/modules/` folder):

```
src/
  index.js              (entry — imports CSS, calls an init/render function)
  index.css
  template.html
  modules/
    Todo.js
    Project.js
    dom.js              (all DOM creation/manipulation lives here)
    storage.js          (localStorage read/write)
```

Each module uses `export`/`import` — webpack already understands this via `entry: ./src/index.js`, it'll follow every import automatically into the bundle. No extra webpack config needed as you add files here.

---

## Step 2 — Persistence

- [ ] `storage.js`: a `save(projects)` that does `localStorage.setItem('todoData', JSON.stringify(projects))`, and a `load()` that does the reverse with `JSON.parse`. Handle the case where nothing's stored yet (return a default project instead of `null`).
- [ ] Call `save()` after every add/edit/delete/toggle, and call `load()` once on startup in `index.js`.
- [ ] Note: `localStorage` only stores strings, and reviving JSON won't restore class instances/methods automatically — you may need to re-wrap loaded plain objects back into `Todo`/`Project` instances (or use factory functions instead of classes, which sidesteps this entirely).

---

## Step 3 — DOM layer

- [ ] Render the list of projects (sidebar).
- [ ] Render the list of todos for whichever project is currently selected.
- [ ] A way to view/expand one todo's full details.
- [ ] Forms/buttons: new project, new todo, edit todo, delete todo, delete project, toggle complete.
- [ ] Wire events with delegation where sensible (one listener on a container rather than one per todo item) so dynamically-added todos don't need listeners re-attached.

---

## Step 4 — Styling

- [ ] Write `src/index.css`, import it at the top of `index.js` with `import './index.css';` — `style-loader`/`css-loader` are already configured to handle this and inject the styles at runtime.
- [ ] Nice-to-have once functional: color-code todos by priority and/or by due-date urgency (e.g. red if overdue, yellow if due today).

---

## Step 5 — Polish (do this last)

- [ ] A date library for formatting/comparing due dates — `day.js` is the commonly recommended lightweight option (`npm install dayjs`, **no** `-D` since your app code imports it directly, unlike the webpack tooling packages which are dev-only).
- [ ] Form validation (e.g. can't submit a todo with no title).
- [ ] Default/seed data so the app isn't empty on first load for a new visitor.

---

## Reminders for working offline

- `npm run dev` / `npm run build` both work fully offline once `node_modules` already has everything installed — you only need internet for `npm install` itself.
- Commit to git after each working milestone (working dev server, first factory function passing a manual console check, first todo rendering on screen, etc.) so you always have a safe rollback point without needing to ask anyone.
- `-D`/`--save-dev` = tooling only used to build the project (loaders, webpack, plugins). No flag = a package your actual app code imports and ships to the browser (e.g. `dayjs`). Keep this distinction consistent as you add packages.

When you're back online, come back to this file, tell me what's checked off, and we'll pick up from there.
