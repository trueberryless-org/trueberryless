---
title: Diploma Thesis
publishDate: 2024-05-13 00:00:00
img: thesis.jpg
img_alt: The SOA of our prototype.
description: |
  A SOA solution with Siemens AG to analyze power grid anomalies, featuring a Kafka pipeline, PostgreSQL, GraphQL API, and an Angular dashboard for visualisation.
tags:
  - Siemens AG
  - Data Pipeline
  - Visualisation 
---

During my fifth year at HTL Krems (2023/24), every student was required to complete a diploma thesis—a substantial project split into two main parts: theoretical and practical. Working in pairs, we had to produce a theoretical paper of around 100 pages, where we introduced, analyzed, and explained our chosen topic.

The theoretical part was organized into three sections. The first involved gathering and summarizing existing knowledge from credible sources like books and previous theses. The second focused on the insights and findings derived from our prototype—a software solution we developed for the practical component. Finally, the third section combined these two, offering a critical comparison and reflection on what we learned through the project as a whole.

The practical aspect required us to design and implement a solution, either software or hardware-based, to tackle a real-world problem. My teammate, Clemens Schlipfinger, and I decided to focus exclusively on software to ensure reliability. Hardware can introduce unpredictable issues, but software—especially when deployed in robust Docker containers—offered a consistent environment that worked seamlessly everywhere.

What made our project particularly exciting was our partnership with Siemens AG, a renowned multinational company specializing in energy, automation, and digitalization. This collaboration was rare among our peers and added a professional dimension to our work. Siemens tasked us with developing a service-oriented software solution for analyzing anomalies in Europe's power grid.

The system we built comprised several components, each designed to handle a specific function. At the core was a Kafka application responsible for ingesting data—power grid anomaly reports we termed Findings. These reports detailed failures and irregularities across Europe’s intricate power network, comprising millions of interconnected components like transistors, switches, and generators. Kafka transmitted the most recent anomalies to a PostgreSQL database, which was then made accessible via a GraphQL API. This API provided comprehensive features like pagination, filtering, and querying to ensure seamless integration with our Angular-based frontend.

The frontend was designed as a user-friendly dashboard with three key sections:

1. Anomalies Table – A searchable, paginated, and filterable table for quick navigation of anomalies.

2. Graph View – A dynamic visualisation of anomaly data, making it easier to pinpoint the source of an issue within the vast, complex grid.

3. Overall Dashboard – Key metrics and insights for quick, actionable overviews.

Clemens and I divided our responsibilities evenly. Clemens handled the backend systems, including Kafka, PostgreSQL, and the GraphQL API, ensuring a reliable and efficient data pipeline. I took on the role of project leader, coordinating communication with Siemens while developing the frontend and ensuring the seamless integration of the various components. This collaboration allowed us to play to our strengths and maintain a balanced workload.

Our final product not only met Siemens' requirements but also demonstrated the power of a well-designed service-oriented architecture (SOA) in solving complex, real-world problems. It was immensely rewarding to see our software functioning reliably and providing actionable insights to tackle power grid anomalies.

For more details about our work, feel free to explore our thesis [here](/thesis.pdf) 📜 or read our video course [here](https://videos.trueberryless.org/videos/thesis/) 🎥 (both only available in German).

