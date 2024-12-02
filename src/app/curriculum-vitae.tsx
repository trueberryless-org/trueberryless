"use client";

import { TracingBeam, TypewriterEffectSmooth } from "@/components";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

export function CurriculumVitae() {
  const words = [
    {
      text: "The",
    },
    {
      text: "journey",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "begins",
    },
    {
      text: "here.",
    },
  ];

  return (
    <TracingBeam>
      <div className="flex flex-col items-center justify-center h-[10rem]">
        <TypewriterEffectSmooth words={words} />
      </div>
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {dummyContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10">
            <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </h2>

            <p className={twMerge("text-xl mb-4")}>{item.title}</p>

            <div className="text-sm  prose prose-sm dark:prose-invert">
              {item?.image && (
                <Image
                  src={item.image}
                  alt="blog thumbnail"
                  height="1000"
                  width="1000"
                  className="rounded-lg mb-10 object-cover"
                />
              )}
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const dummyContent = [
  {
    title: "From primary school to college",
    description: (
      <>
        <p>
          My journey begins in 2005, when I was born on 20 February. I started
          primary school in 2011 and eight years later I finished secondary
          school. The first big decision of my life after grammar school was to
          go to technical college. And that&apos;s where I graduated in Krems an
          der Donau in 2024.
        </p>
        <br />
        <p></p>
      </>
    ),
    badge: "Education",
    image: "/cv/education.jpg",
  },
  {
    title: "Internships and their advantages",
    description: (
      <>
        <p>
          I started doing internships during my technical college&apos;s summer
          holidays. These are extremely helpful for gaining real-life work
          experience that can&apos;t be learnt at school. This has also enabled
          me to find out which sectors in the information technology field I
          like and which I don&apos;t like. Because I prefer to work on the
          frontend rather than the backend. However, I also really enjoy working
          on any backend, as long as it is not an outdated and poorly documented
          programming language.
        </p>
        <br />
        <p></p>
      </>
    ),
    badge: "Work experience",
    image: "/cv/work_experience.webp",
  },
  {
    title: "Tennis, Golf and Rocket League",
    description: (
      <>
        <p>
          My father taught me to play golf at a very early age, as he is also a
          keen golfer himself. As a result, I have always been fascinated by
          beautiful golf courses, where I have always found my peace and
          connection with nature.
        </p>
        <br />
        <p>
          But golf is not my only hobby. I have had many hobbies over the years.
          For some months I was in love with the magic of card tricks and
          couldn&apos;t stop practising them and improving my dexterity.
          However, that too has now stopped. I also love to play tennis and the
          more subtle table tennis.
        </p>
        <br />
        <p>
          In terms of video and board games, I&apos;ve never been interested in
          third-person shooters and the like. I much prefer to play 2D
          platformers, the best by far still being Celeste, and racing games
          such as Trackmania or Rocket League. Speaking of board games, if you
          ever wanna play a game of chess against me, I&apos;m down for it.
        </p>
      </>
    ),
    badge: "Hobbies",
    image: "/cv/hobbies.jpg",
  },
];
