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
    ├── .eslintrc.json
    ├── app
    │   ├── contact.tsx
    │   ├── curriculum-vitae.tsx
    │   ├── favicon.ico
    │   ├── footer.tsx
    │   ├── globals.css
    │   ├── header.tsx
    │   ├── images.tsx
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── projects.tsx
    │   └── social-media.tsx
    ├── components
    │   ├── index.ts
    │   └── ui
    │       ├── 3d-card.tsx
    │       ├── animated-tooltip.tsx
    │       ├── background-beams.tsx
    │       ├── card-hover-effect.tsx
    │       ├── globe.tsx
    │       ├── google-gemini-effect.tsx
    │       ├── infinite-moving-cards.tsx
    │       ├── parallax-scroll.tsx
    │       ├── sparkles.tsx
    │       ├── tracing-beam.tsx
    │       └── typewriter-effect.tsx
    ├── data
    │   └── globe.json
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   ├── cv
    │   │   ├── education.jpg
    │   │   ├── hobbies.jpg
    │   │   └── work_experience.webp
    │   ├── felix
    │   │   ├── 0.jpg
    │   │   ├── 1.jpg
    │   │   ├── 10.jpg
    │   │   ├── 2.jpg
    │   │   ├── 3.jpg
    │   │   ├── 4.jpg
    │   │   ├── 5.jpg
    │   │   ├── 6.jpg
    │   │   ├── 7.jpg
    │   │   ├── 8.jpg
    │   │   └── 9.jpg
    │   ├── logos
    │   │   ├── codepen.png
    │   │   ├── coolors.png
    │   │   ├── docker.png
    │   │   ├── editor_x.png
    │   │   ├── figma.png
    │   │   ├── fiverr.png
    │   │   ├── flaticon.png
    │   │   ├── flickr.png
    │   │   ├── gamebanana.png
    │   │   ├── github.png
    │   │   ├── github.webp
    │   │   ├── instagram.png
    │   │   ├── lichess.png
    │   │   ├── linkedin.png
    │   │   ├── linktree.png
    │   │   ├── monkeytype.png
    │   │   ├── paypal.png
    │   │   ├── pinterest.png
    │   │   ├── quizlet.png
    │   │   ├── reddit.png
    │   │   ├── spotify.png
    │   │   ├── stack-overflow.png
    │   │   ├── tumblr.png
    │   │   ├── twitch.png
    │   │   ├── x.jpg
    │   │   └── youtube.png
    │   ├── next.svg
    │   ├── projects
    │   │   ├── mutanuq.png
    │   │   └── true-tracker.png
    │   └── vercel.svg
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── utils
        └── cn.ts

```

## License

Licensed under the MIT license, Copyright © trueberryless.

See [LICENSE](/LICENSE) for more information.
