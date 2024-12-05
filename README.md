This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Project structure

```
.
├── .changeset
│   ├── README.md
│   └── config.json
├── .dockerignore
├── .github
│   ├── labeler.yaml
│   ├── readmetreerc.yaml
│   └── workflows
│       ├── deployment.yaml
│       ├── format.yaml
│       ├── generate-readme-tree.yaml
│       ├── labeler.yaml
│       ├── release.yaml
│       └── welcome-bot.yaml
├── .gitignore
├── .prettierignore
├── .prettierrc
├── Dockerfile
├── LICENSE
├── README.md
├── manifest
│   ├── certificate.yaml
│   ├── deployment.yaml
│   ├── ingress.yaml
│   ├── namespace.yaml
│   └── service.yaml
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── src
    ├── .gitignore
    ├── CHANGELOG.md
    ├── README.md
    ├── astro.config.mjs
    ├── package.json
    ├── public
    │   ├── curriculum-vitae.pdf
    │   └── trueberryless.png
    ├── src
    │   ├── assets
    │   │   ├── about
    │   │   │   ├── about-1.jpg
    │   │   │   └── about-2.jpg
    │   │   ├── backgrounds
    │   │   │   ├── bg-footer-dark-1440w.jpg
    │   │   │   ├── bg-footer-dark-800w.jpg
    │   │   │   ├── bg-footer-light-1440w.jpg
    │   │   │   ├── bg-footer-light-800w.jpg
    │   │   │   ├── bg-main-dark-1440w.jpg
    │   │   │   ├── bg-main-dark-800w.jpg
    │   │   │   ├── bg-main-dark.svg
    │   │   │   ├── bg-main-light-1440w.jpg
    │   │   │   ├── bg-main-light-800w.jpg
    │   │   │   ├── bg-main-light.svg
    │   │   │   ├── bg-subtle-1-dark-1440w.jpg
    │   │   │   ├── bg-subtle-1-dark-800w.jpg
    │   │   │   ├── bg-subtle-1-light-1440w.jpg
    │   │   │   ├── bg-subtle-1-light-800w.jpg
    │   │   │   ├── bg-subtle-2-dark-1440w.jpg
    │   │   │   ├── bg-subtle-2-dark-800w.jpg
    │   │   │   ├── bg-subtle-2-light-1440w.jpg
    │   │   │   ├── bg-subtle-2-light-800w.jpg
    │   │   │   └── noise.png
    │   │   ├── portrait.jpg
    │   │   └── work
    │   │       ├── mutanuq.png
    │   │       ├── starlight-cooler-credit.png
    │   │       ├── stock-1.jpg
    │   │       ├── stock-2.jpg
    │   │       ├── stock-3.jpg
    │   │       ├── stock-4.jpg
    │   │       └── true-tracker.png
    │   ├── components
    │   │   ├── CallToAction.astro
    │   │   ├── ContactCTA.astro
    │   │   ├── Footer.astro
    │   │   ├── Grid.astro
    │   │   ├── Hero.astro
    │   │   ├── Icon.astro
    │   │   ├── IconPaths.ts
    │   │   ├── MainHead.astro
    │   │   ├── Nav.astro
    │   │   ├── Pill.astro
    │   │   ├── PortfolioPreview.astro
    │   │   ├── Skills.astro
    │   │   └── ThemeToggle.astro
    │   ├── content
    │   │   └── work
    │   │       ├── mutanuq.md
    │   │       ├── starlight
    │   │       │   └── starlight-cooler-credit.md
    │   │       └── true-tracker.md
    │   ├── content.config.ts
    │   ├── layouts
    │   │   └── BaseLayout.astro
    │   ├── pages
    │   │   ├── 404.astro
    │   │   ├── about.astro
    │   │   ├── index.astro
    │   │   ├── work
    │   │   │   └── [...slug].astro
    │   │   └── work.astro
    │   └── styles
    │       └── global.css
    └── tsconfig.json

```

## License

Licensed under the MIT license, Copyright © trueberryless.

See [LICENSE](/LICENSE) for more information.
