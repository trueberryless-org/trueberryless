---
title: True Tracker
publishDate: 2024-07-06 00:00:00
img: true-tracker.png
img_alt: The landing page of the True Tracker website.
description: |
  A private time-tracking app storing all data in your browser—no accounts, no servers, just simple tracking.
tags:
  - Time Tracking
  - Next.js
  - Privacy-Focused
---

The summer of 2024 marked the start of an exciting new chapter for me as a developer. Up until that point, I’d worked primarily with Angular, a framework I appreciated for its structured and opinionated approach. But I’d always been curious about React—it felt lighter, more flexible, and just… different. When I came across Next.js, a framework built around React that offered features like server-side rendering and a focus on performance, I knew it was time to dive into something new.

At the same time, I’d been frustrated for ages with session tracking tools like Toggl. While they’re great in theory, their best features always seemed locked behind premium paywalls. Like every developer at some point, I thought, *“Why not just build my own?”* It’s practically a rite of passage—every programmer has to create a todo app or a tracker at least once in their career. And so, True Tracker was born.

True Tracker wouldn’t just be any tracker, though. I wanted to do something different. For starters, I wanted to keep it simple: users could add projects, break them down into tasks, and track their time in sessions. No bloat, no unnecessary features. But here’s the twist—True Tracker would save everything in local storage. No accounts, no cloud sync, and most importantly, no one (not even me) would have access to your data. It’s your tracker, and your data stays yours.

Of course, transitioning from Angular to Next.js wasn’t without its challenges. If there’s one piece of advice I’d give anyone learning a new framework, it’s this: *Read the documentation.* Seriously, don’t skip it. I didn’t, and it led to chaos. Next.js had recently transitioned to the app router, but I stubbornly started building with the page router. Turns out, this caused a mountain of problems when the app wouldn’t build properly because there was no `app` directory. I had to keep an empty `.gitkeep` file in the folder just so Git wouldn’t delete it and break everything again. Not my proudest moment.

After two weeks of nonstop coding, debugging, and running into what felt like every error imaginable, True Tracker finally worked. I remember that first successful run—it felt like shouting *“It’s alive!”* in my head.

The project also wasn’t without its jokes. A friend, after seeing the app’s branding, quipped, “So… the ‘true’ in True Tracker? That’s a bit much, even for the image. It’s *too much true!*” They weren’t wrong, but I embraced it. After all, if you’re going to brand something, you might as well commit.

True Tracker became my first-ever Next.js project—a simple but unique app for tracking time with no strings attached. It’s live now at [https://true-tracker.trueberryless.org](https://true-tracker.trueberryless.org/).

The journey taught me more than just how to use Next.js. It taught me about pushing past challenges, transitioning between frameworks, and embracing the quirks that make each project unique. True Tracker isn’t just an app; it’s a milestone—a little piece of proof that even small ideas can have a big impact.
