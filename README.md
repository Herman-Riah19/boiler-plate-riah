# 🧠 Boiler Plate Riah

A modern **Next.js** documentation boilerplate designed for creative AI libraries, technical toolkits, and developer documentation.  
Built with **MDX**, **Tailwind CSS**, and **Shadcn UI**, this boilerplate makes it simple to create visually appealing, performant, and content-driven documentation sites.

---

## 🚀 Features

✅ **Next.js 14+ (App Router)** — fast, scalable, and SEO-friendly  
✅ **MDX support** — write documentation with Markdown + React components  
✅ **Shadcn/UI components** — elegant design system built on Radix UI  
✅ **Tailwind CSS** — modern styling with dark mode support  
✅ **File-based routing** — pages auto-generated from your `docs/` folder  
✅ **Syntax highlighting** — with `rehype-prism`  
✅ **Server Components compatible** — supports `next-mdx-remote/rsc`  
✅ **Deployed-ready** — easily deploy on **Vercel** or **GitHub Pages**

---

## 📁 Project Structure

```

boiler-plate-riah/
│
├── app/                # Next.js App Router structure
│   ├── layout.tsx
│   ├── page.tsx
│   └── docs/           # MDX documentation pages
│
├── components/         # Custom UI components (cards, navbars, MDX blocks)
├── styles/             # Tailwind CSS configuration
├── next.config.js      # Next.js configuration
├── package.json
└── README.md

```

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Herman-Riah19/boiler-plate-riah.git
cd boiler-plate-riah
````

### 2️⃣ Install dependencies

```bash
npm install
# or
pnpm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Open your browser at 👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧩 Writing Documentation (MDX)

All documentation pages are written in **MDX** and stored inside the `app/docs/` folder.

Example:

````mdx
---
title: "Introduction"
description: "Welcome to the documentation of Artifex.js — the creative AI library."
---

# 🎨 Welcome to Artifex.js

Artifex.js is a library for **creative AI manipulation**, enabling developers and artists to design,
blend, and generate art using intelligent models.

> 💡 MDX lets you mix Markdown with React components:
```tsx
<Example code="npm install artifex" />
````

````

---

## 🧰 Configuration

### `next.config.js`

Example setup for MDX + RSC compatibility:

```js
const nextConfig = {
  experimental: {
    serverExternalPackages: [],
  },
  transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;
````

---

## 🧱 Built With

* [Next.js](https://nextjs.org/) — React framework for production
* [MDX](https://mdxjs.com/) — Markdown + JSX hybrid format
* [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS framework
* [Shadcn/UI](https://ui.shadcn.com/) — modern accessible UI components
* [Lucide Icons](https://lucide.dev/) — beautiful open-source icons

---

## 🧠 Philosophy

> "Code is the brush, AI is the color, and creativity is the canvas."

This boilerplate aims to **empower developers and digital artists** to build beautiful documentation that showcases their projects — whether it's a creative AI library, a toolkit, or a research project.

---

## 🌐 Deployment

Deploy in one click with **[Vercel](https://vercel.com)**:

```bash
vercel deploy
```

Or export static HTML for **GitHub Pages**:

```bash
npm run build
npm run export
```

Then deploy the `out/` folder.

---

## 🤝 Contributing

Contributions are welcome!
If you’d like to add features or fix bugs:

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add my feature"
   ```
4. Push the branch and open a Pull Request

---

## 📜 License

MIT License © 2025 — [Hermann Razafindranaivo](https://github.com/Herman-Riah19)

---

## 💬 Contact

For questions, ideas, or collaboration:

* 🧩 GitHub Issues: [Create an issue](https://github.com/Herman-Riah19/boiler-plate-riah/issues)
* 📧 Email: *[contact@riah.dev](mailto:contact@riah.dev)* (optional placeholder)
* 🌍 Website: [https://riah.dev](https://riah.dev) *(optional placeholder)*

---

> 🪄 *Boiler Plate Riah — A creative foundation for modern AI-driven documentation sites.*

```
