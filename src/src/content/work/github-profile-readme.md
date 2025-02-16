---
title: GitHub Profile README
publishDate: 2025-02-05 20:25:00
img: github-profile-readme.svg
img_alt: GitHub Profile README Example
description: |
  How I Built a GitHub Profile README That Shouldn’t Exist But It Does
tags:
  - SVG
  - Markdown
  - Bento Grid
---

Every great project starts with a realization of a problem. My GitHub profile README was cluttered, filled with too much information, too many badges, and an overwhelming amount of content that lacked style and structure. It had hackathon achievements, GitHub contribution graphs, various technical badges, and much more, making it visually unappealing and difficult to navigate. Initially, I thought this was an effective way to present myself, but over time, it became clear that the information was overwhelming rather than informative. I wanted something new, a more refined and visually appealing approach to presenting my profile, and the idea of implementing a bento grid came to mind. The goal was to create a layout that was not only functional but also aesthetically impressive and structured.

The first step was designing an ideal layout using HTML and CSS. The result was promising, a structured and visually pleasing design that effectively conveyed the intended information. However, implementing this directly in my GitHub profile README was not straightforward. GitHub-flavored Markdown imposes strict limitations on supported HTML elements due to security constraints. Many essential HTML tags were restricted, making it impossible to embed the design as envisioned. Understanding these limitations meant rethinking the entire approach.

Faced with these restrictions, I considered alternative ways to dynamically generate and present the content. One approach involved automating the content updates using a Python script to fetch my latest GitHub repository and insert it into the README dynamically. The script accessed the GitHub API, retrieved the most recently updated repository, and modified the README accordingly. While this was an interesting experiment in automation, it did not address the core issue, which was the need for a structured and visually appealing design.

Considering alternative approaches, I briefly entertained the idea of taking a screenshot of the designed HTML layout and embedding it as a static image in the README. While this would have visually solved the issue, it felt like an inelegant solution that lacked flexibility and responsiveness. Moving forward, I sought a method that allowed both structure and adaptability while maintaining dynamic content updates.

SVGs emerged as a potential solution. They support scalability, maintain visual clarity across different resolutions, and allow embedding of text and other elements. An early experiment involved embedding HTML within an SVG using the `foreignObject` tag. While conceptually promising, the implementation proved complex and was set aside temporarily. Returning to the problem later, a more structured approach was required.

The final approach involved using a composite SVG structure. The solution consisted of several key components: converting the original HTML layout into an SVG representation, encoding images using Base64 to ensure they loaded correctly, integrating dynamic elements such as GitHub statistics and Spotify status updates as inline SVGs, and automating updates through GitHub Actions. By leveraging these techniques, the bento grid layout became fully functional, capable of self-updating while maintaining a clean, structured appearance within the constraints of GitHub-flavored Markdown.

A critical turning point was the discovery of a Stack Overflow post detailing a method for converting HTML to SVG in an efficient and effective manner. This method provided a structured way to generate the necessary SVG elements while preserving the intended design. Combining this with Base64 encoding for images and GitHub Actions for automation resulted in a fully realized solution that met all original requirements.

The final implementation consists of a refined and visually striking GitHub profile README that integrates dynamic content updates while maintaining an elegant structure. It presents information clearly without unnecessary clutter and is entirely automated, updating itself every five minutes without manual intervention. The project involved significant research and experimentation with SVGs, GitHub Actions, and Markdown limitations. The process required persistence and problem-solving to work within the constraints of the platform while achieving a technically impressive result. The outcome is a GitHub profile README that effectively balances design, automation, and functionality within the limitations of the platform.

If you're now inspired to create a stunning GitHub profile README yourself, read my [more technical and amusing blog post](https://blog.trueberryless.org/blog/technically-impressive-github-profile-readme/) or directly check out my repository [github.com/trueberryless/trueberryless](https://github.com/trueberryless/trueberryless/tree/7519c6f50094bdfd6fb47f610e6638ac8efdd6ad). And if you find my work helpful, consider giving it a ⭐ and following me on GitHub at [github.com/trueberryless](https://github.com/trueberryless)! 🚀
