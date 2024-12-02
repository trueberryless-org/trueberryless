import {
    CardBody,
    CardContainer,
    CardItem,
    HoverEffect,
    TypewriterEffectSmooth,
} from "@/components";
import Image from "next/image";
import React from "react";

export function Projects() {
    const words = [
        {
            text: "My",
        },
        {
            text: "favourite",
            className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: "personal",
        },
        {
            text: "projects.",
        },
    ];

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-[10rem]">
                <TypewriterEffectSmooth words={words} />
            </div>
            <div className="max-w-5xl mx-auto px-10 lg:flex lg:justify-between lg:items-center">
                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-2xl h-auto rounded-xl p-6 border">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            Mutanuq
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            Knowledge of a technical college
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src="/projects/mutanuq.png"
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                        <div className="flex justify-between items-center mt-10">
                            <div></div>
                            <CardItem
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                <a href="https://mutanuq.trueberryless.org/">Try now →</a>
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-2xl h-auto rounded-xl p-6 border">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            True Tracker
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            Track your time spent per project!
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src="/projects/true-tracker.png"
                                height="2000"
                                width="2000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                        <div className="flex justify-between items-center mt-10">
                            <div></div>
                            <CardItem
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                <a href="https://true-tracker.trueberryless.org/">Try now →</a>
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </div>
            <div className="max-w-5xl mx-auto px-8">
                <HoverEffect items={projects} />
            </div>
        </div>
    );
}
export const projects = [
    {
        title: "About",
        description:
            "Find out more about me and my projects. I am a full stack developer with a passion for technology.",
        link: "https://trueberryless.org/",
    },
    {
        title: "Deep Thoughts",
        description: "Some cool blog posts about deployment and such technical stuff.",
        link: "https://blog.trueberryless.org/",
    },
    {
        title: "True Tracker",
        description: "Track your time spent per project! Clean and simple web app.",
        link: "https://true-tracker.trueberryless.org/",
    },
    {
        title: "Truzzles",
        description: "Collection of some interesting puzzles. More comming soon...",
        link: "https://truzzles.trueberryless.org/",
    },
    {
        title: "Mutanuq",
        description: "Get information about the knowledge of a technical college.",
        link: "https://mutanuq.trueberryless.org/",
    },
    {
        title: "Marketing",
        description:
            "How „trueberryless“ represents himself to the audience. Currently in development.",
        link: "https://marketing.trueberryless.org/",
    },
];
